"""Research demonstration from live camera or licensed video, requires ultralytics.

Examples:
    python -m src.run_video --source 0 --dry-run
    python -m src.run_video --source street.mp4 --serial COM4

The optional Depth Anything V2 stage should be run separately until metric scale,
performance and camera-motion treatment are experimentally verified. This script
uses YOLOv8n tracking and *apparent-size growth* only. No depth in meters is assumed.
"""
import argparse, csv, time
from pathlib import Path
from src.hazard_logic import Detection, zones, serial_packet, TemporalGate


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--source", default="0", help="0 webcam, path to video or stream URL")
    p.add_argument("--serial", help="COM4 or /dev/ttyACM0; omit for dry run")
    p.add_argument("--baud", type=int, default=115200)
    p.add_argument("--log", default="hazard_commands.csv")
    p.add_argument("--model", default="yolov8n.pt")
    p.add_argument("--walking-speed", type=float, default=1.0, help="assumed calibrated speed (m/s); not measured")
    p.add_argument("--display", action="store_true")
    p.add_argument("--dry-run", action="store_true")
    args = p.parse_args()
    try:
        import cv2
        from ultralytics import YOLO
    except ImportError as e:
        raise SystemExit("Install optional packages: pip install -r requirements-vision.txt") from e
    serial_port = None
    if args.serial and not args.dry_run:
        try:
            import serial
        except ImportError:
            raise SystemExit("Install pyserial: pip install pyserial")
        serial_port = serial.Serial(args.serial, args.baud, timeout=0.2)
        time.sleep(1.5)
    capture = cv2.VideoCapture(int(args.source) if args.source.isdigit() else args.source)
    if not capture.isOpened():
        raise SystemExit(f"Cannot open source {args.source}")
    model = YOLO(args.model)  # downloads external model if no local checkpoint exists
    previous = {}
    gate = TemporalGate(attack_frames=2, release_frames=3)
    sequence = 0
    last_sent = time.monotonic()
    log_path = Path(args.log)
    with log_path.open("w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(["wall_clock_s", "frame", "latency_ms", "L", "C", "R", "note"])
        try:
            while True:
                ok, frame = capture.read()
                if not ok: break
                start = time.monotonic()
                result = model.track(frame, persist=True, tracker="bytetrack.yaml", verbose=False, conf=0.35)[0]
                dets = []
                if result.boxes is not None:
                    for box in result.boxes:
                        if box.id is None: continue
                        tid = int(box.id.item())
                        x1, y1, x2, y2 = box.xyxy[0].tolist()
                        h, w = frame.shape[:2]
                        area_ratio = min(1.0, max(0.0, (x2-x1)*(y2-y1)/(w*h)))
                        now = time.monotonic()
                        past = previous.get(tid)
                        growth = (area_ratio - past[0]) / (now - past[1]) if past and now > past[1] else 0
                        previous[tid] = (area_ratio, now)
                        dets.append(Detection(track_id=tid,
                            label=str(model.names[int(box.cls.item())]), cx=((x1+x2)/2)/w,
                            box_area_ratio=area_ratio, area_growth_per_s=max(0.0, growth),
                            confidence=float(box.conf.item())))
                levels = gate.update(zones(dets, walking_mps=args.walking_speed))
                packet = serial_packet(sequence, levels)
                if serial_port:
                    serial_port.write(packet)
                elif sequence % 10 == 0:
                    print(packet.decode().strip())
                latency = (time.monotonic()-start)*1000
                writer.writerow([f"{time.time():.3f}", sequence, f"{latency:.2f}",
                                 *levels, "relative-visual-cue-not-metric-range"])
                if args.display:
                    display = result.plot()
                    cv2.putText(display, f"L/C/R {levels}  {latency:.0f}ms", (12,32),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.75,(255,255,255),2)
                    cv2.imshow("Research-only preview", display)
                    if cv2.waitKey(1) & 0xff == ord("q"): break
                sequence += 1
                last_sent = time.monotonic()
        finally:
            if serial_port:
                serial_port.write(b"H,0,0,0,0\n")
                serial_port.close()
            capture.release()
            cv2.destroyAllWindows()
    print(f"Saved {sequence} frame entries to {log_path}; these are actual only if run locally.")

if __name__ == '__main__':
    main()
