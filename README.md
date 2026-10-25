# Wearable vision-assisted haptic navigation | Vishwakarma Awards 2026–27

**Stage 2 engineering design package — 25 October 2026**  
**Proposed theme alignment:** Assistive Solutions & Inclusive Living (EnAble India), IIT Indore. **Use the team's actual registered theme in the official application.**

## What we are building

An experimental warning layer for pedestrians with visual impairment: camera detections are translated into distinct **left / centre / right** vibration patterns. A proposed speed-adaptive warning horizon responds to walking speed. The system **complements a white cane and orientation-and-mobility training; it does not replace either.** The present architecture explicitly separates the image-processing host from Arduino UNO R4 Minima hardware actuation. An ESP32-CAM may transmit camera frames but is **not** assumed to execute YOLOv8n + Depth Anything V2 locally.

## Evidence status (read before sharing)

| Item | Current status | What is verified |
|---|---|---|
| Design architecture and equations | Documented | Traceable proposal, not measured field efficacy |
| Source code for L/C/R cues and watchdog firmware | Present | Eight host-side unit tests passed in this package |
| YOLOv8n / ByteTrack integration | Source implemented | Needs local installation, video data and benchmark run |
| Depth Anything V2 inference | Discussed in design, not implemented in this demo runner | Relative depth **cannot** be treated as calibrated meters |
| Arduino / motor end-to-end test | Not independently demonstrated in this package | Hardware/wiring still needs on-bench testing |
| User studies and outdoor safety validation | Not performed | Must be ethics- and safety-reviewed before human mobility trials |
| Photographs / CAD / raw logs | Not included | Must be team-created and uploaded, not generated representations |

## Run the code

**Pure-Python unit tests** (no installed dependencies):

```bash
python -m unittest discover -s tests -v
```

**Optional laptop video demo** (installs substantial computer-vision libraries):

```bash
python -m pip install -r requirements-vision.txt
python -m src.run_video --source 0 --dry-run --display
python -m src.run_video --source path/to/licensed_video.mp4 --dry-run --log local_result.csv
```

**Arduino haptic actuation:** open `firmware/arduino_haptics/arduino_haptics.ino` in the Arduino IDE, set board to Arduino UNO R4 Minima, then upload. Use an isolated, current-limited 5 V motor circuit with three suitable logic-level N-MOSFETs and inductive protection. With board attached by USB, from the laptop:

```bash
python -m src.run_video --source 0 --serial COM4 --display
```

Change `COM4` as needed. Do not use with pedestrians in uncontrolled streets. See `docs/SAFETY_AND_TESTING.md`.

## Protocol

`H,<sequence>,<left_pwm>,<centre_pwm>,<right_pwm>\n` at 115200 baud.

Example `H,11,85,160,235\n` means low on left, medium in centre, high on right. Values are **command intensities** and are not measured vibration acceleration. UNO R4 D3/D5/D6 are PWM pins; the MOSFET low-side switches carry motor current. Commands cease after 500 ms of silence (bench-validation target). The motor supply and Arduino share ground.

## Where the evidence must go

- `evidence/photographs/`: actual team photo with institutional IDs, circuit wiring, assembled module, physical haptic placement, bench test
- `evidence/results/`: raw CSV from real runs, timestamped oscilloscope or video annotations, actual frame and latency benchmark
- `design/`: real CAD source/native schematics or hand drawings with author/date and construction details

Consult `docs/SUBMISSION_CHECKLIST.md` before sharing your GitHub URL. This ZIP is the package **to upload to your own GitHub repository**; this file does not itself create a public URL. For the PPT, use `https://github.com/YOUR-ORG/YOUR-REPOSITORY` only **after** creating the repository and making it accessible.

## Methodological limits

- Bounding-box scale change is not reliable range estimation when the camera wearer moves or turns; the fallback cue is explicitly attention-only.
- Depth Anything V2's default Small model is a *relative* depth predictor. Metric thresholds require independent calibration or metric-depth model validation.
- No detection does not mean that a path is safe; disabled vision, occlusion, small hazards, drops, traffic, sensor occlusion and rain remain failure cases.
- All reported software tests are synthetic unit tests, not field efficacy or validation of safety.

## Literature, datasheets and competition rules

See `docs/REFERENCES.md`, which identifies authoritative source URLs and access date. Source/model software licenses are separate from the MIT license of the original project scripts; check Ultralytics and Depth Anything terms before public or commercial use.
