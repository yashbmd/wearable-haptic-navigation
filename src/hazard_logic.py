"""Transparent research controller. Not a certified mobility safety device.

Bounding-box growth is a weak proxy for closing motion, not calibrated distance.
This module does not turn relative monocular depth into meters.
"""
from dataclasses import dataclass
from typing import Optional


@dataclass(frozen=True)
class Detection:
    track_id: int
    label: str
    cx: float               # Normalized image horizontal center [0, 1]
    box_area_ratio: float   # Box area / image area [0, 1]
    area_growth_per_s: float = 0.0
    confidence: float = 1.0
    distance_m: Optional[float] = None  # only an independently calibrated measurement
    closing_mps: Optional[float] = None  # only calibrated; never inferred from monocular area alone


def lane(cx: float) -> int:
    if not 0 <= cx <= 1:
        raise ValueError("cx outside normalized frame")
    return 0 if cx < 1/3 else (2 if cx >= 2/3 else 1)


def preview_distance_m(walking_mps: float, response_s: float = 1.50,
                       pipeline_s: float = 0.25, margin_m: float = 0.50) -> float:
    """Illustrative engineering design equation, NOT a measured user reaction model."""
    if min(walking_mps, response_s, pipeline_s, margin_m) < 0:
        raise ValueError("Parameters must be nonnegative")
    return walking_mps * (response_s + pipeline_s) + margin_m


def hazard_level(d: Detection, walking_mps: float = 1.0) -> int:
    """0/1/2/3 = off/low/medium/high; uncertain data never asserts metric distance.

    With metric range: boundary follows adjustable preview distance.
    With no metric range: bbox size / growth trigger *attention* cues only.
    """
    if d.confidence < 0.35:
        return 0
    if d.distance_m is not None:
        if d.distance_m <= 0:
            return 0
        w = preview_distance_m(walking_mps)
        if d.closing_mps is not None and d.closing_mps > 0.01:
            ttc = d.distance_m / d.closing_mps
            if ttc < 1.0: return 3
            if ttc < 2.0: return 2
        if d.distance_m <= w * 0.60: return 3
        if d.distance_m <= w: return 2
        if d.distance_m <= w * 1.4: return 1
        return 0
    # Relative-only fallback: heuristic attention signal, not collision estimate.
    if d.box_area_ratio > .16 and d.area_growth_per_s > .02: return 3
    if d.box_area_ratio > .08 and d.area_growth_per_s > .005: return 2
    if d.box_area_ratio > .05 or d.area_growth_per_s > .025: return 1
    return 0


def zones(detections: list[Detection], walking_mps: float = 1.0) -> tuple[int, int, int]:
    result = [0, 0, 0]
    for d in detections:
        i = lane(d.cx)
        result[i] = max(result[i], hazard_level(d, walking_mps))
    return tuple(result)


def pwm_from_level(level: int) -> int:
    return (0, 85, 160, 235)[max(0, min(3, int(level)))]


def serial_packet(sequence: int, levels: tuple[int, int, int]) -> bytes:
    values = [pwm_from_level(x) for x in levels]
    return f"H,{sequence % 65536},{values[0]},{values[1]},{values[2]}\n".encode("ascii")


class TemporalGate:
    """Per-zone persistence gate; adds delay by design. Measure this delay on hardware."""
    def __init__(self, attack_frames: int = 2, release_frames: int = 3):
        if attack_frames < 1 or release_frames < 1:
            raise ValueError("frame counts must be positive")
        self.attack_frames = attack_frames
        self.release_frames = release_frames
        self._output = [0, 0, 0]
        self._attack = [0, 0, 0]
        self._release = [0, 0, 0]

    def update(self, proposed: tuple[int, int, int]) -> tuple[int, int, int]:
        if len(proposed) != 3: raise ValueError("expect three zones")
        for i, x in enumerate(proposed):
            x = max(0, min(3, int(x)))
            if x > self._output[i]:
                self._attack[i] += 1
                self._release[i] = 0
                if self._attack[i] >= self.attack_frames:
                    self._output[i] = x; self._attack[i] = 0
            elif x < self._output[i]:
                self._release[i] += 1
                self._attack[i] = 0
                if self._release[i] >= self.release_frames:
                    self._output[i] = x; self._release[i] = 0
            else:
                self._attack[i] = 0
                self._release[i] = 0
        return tuple(self._output)
