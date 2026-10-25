# Validation protocol (to be executed and signed by team)

## Risk baseline
The prototype is an **experimental sensory aid**, not a replacement for a cane, guide, orientation-and-mobility instruction or traffic signal interpretation. Test first with static obstacles in a marked indoor course with a sighted spotter. Do not run public-road/blindfold trials without appropriately reviewed safeguards, informed consent and institutional permissions.

## Bench gates (must pass before a supervised user pilot)

1. **Electrical:** motors off at boot, MOSFET gates pulled down, inrush current and maximum current under worst-case condition, no MCU resets during triple-motor PWM, common ground checked, polarity verified, no exposed wires or hot surfaces.
2. **Signal freshness:** unplug USB, pause host, cover camera, disconnect video feed; verify hardware stops stale commands and logs failure. **Silence is not interpreted as a clear path.**
3. **Perception:** time-stamped video with known obstacle lanes and approach direction. Review false-negative objects (curbs/drop-offs/low obstacles, clutter, reflective surfaces, darkness, glare) not in COCO classes.
4. **Perceptibility:** ask volunteers to distinguish left, centre, right at least 30 randomized vibration trials each; report percent correct and confusion matrix, not only subjective anecdotes.
5. **Latency:** LED in camera scene or visible trigger synchronization; measure frame acquisition to motor onset end-to-end with high-speed camera or logic analyzer. Report median and p95, not only model inference speed.
6. **Walking:** supervised marked indoor obstacle course; measure navigational collisions/contacts, unnecessary warning count, warning lead time, speed, task completion, workload and acceptance. Compare baseline standard mobility-aid practice vs added haptic device using same course and controlled order; do not withdraw a participant's usual mobility aid.

## Required raw columns
`trial_id,date,time,video_source,condition,obstacle_direction,ground_truth_warning,warnings_issued,latency_ms,collision_or_contact,notes,operator`

## Proposed design targets — NOT measured outcomes

- Command refresh target: ≥5 Hz under controlled demo; include 95th-percentile total delay and dropout rate.
- Serial watchdog target: motor PWM disabled within 500 ms without valid command (firmware value; bench verify).
- Direction classification target: ≥90% on predefined labelled *indoor* scenes; no claim of field efficacy without trials.
- False warnings: report false alerts/hour; set acceptable target **after user co-design**.
- Portable battery runtime and complete device weight: report actual measured values after integrated build.

## Failure mode analysis

| Hazard | Cause | Planned engineering control | Evidence to collect |
|---|---|---|---|
| Missed obstacle | occlusion, classes not recognized, camera pitch or blur | emphasize complement-to-cane; mechanical camera angle stop; failure warning | video annotations and confusion cases |
| False high urgency | camera motion, depth-scale ambiguity | smoothing, persistence threshold, class-agnostic geometric channel | false warnings/h |
| Delayed alert | Wi-Fi, model overload, USB lag | timestamps and stale-frame rejection; reduced resolution / simplified model | p50/p95 total latency |
| Motor remains on | frozen host serial stream | MCU 500ms watchdog + gate pulldown | serial disconnect bench test |
| Sudden silence | voltage or streaming failure | user-facing operational-status protocol to be tested; always use cane | occlusion / power test |
| Wearability risk | cable snag, bad attachment, discomfort | quick-release cables, rounded housing, strain relief, adjustable strap | wearer feedback |
| Privacy | public video of bystanders | local processing, opt-in consent, no default upload | data handling checklist |

Relevant guidelines for *consideration*: ISO 14971 concepts (risk management), IEC 62366-1 concepts (usability engineering). **No conformity or certification is claimed.**
