# Design decisions, traceable calculations and boundaries

## Design concept
Input RGB video (ESP32-CAM stream or USB webcam), compute host (currently laptop), risk transform into per-zone PWM, Arduino UNO R4 PWM and motor drivers. MPU6050, optional HC-SR04 provide auxiliary study paths. **Bare HC-SR04 beam ~15° is not a substitute for wide peripheral coverage.** Current ultrasonic readings must be proven functional before fusion.

## Human-in-the-loop feedback
The navigational loop is physical: world → camera → hazard detector → L/C/R tactile cue → person adjusts route/speed → changed world observation. The person/locomotion is the plant, not the vibration motor. PWM signal is manipulated control variable; alert direction and urgency are outputs. No fixed navigation setpoint, PID gains, or certified autonomous guidance is claimed.

## Proposed speed-adaptive warning horizon

`D_warn(v) = v(T_react + T_pipeline) + D_margin` (meter)

For analysis only: T_react=1.50s, T_pipeline=0.25s and margin=0.50m. At v=0.8, 1.0 and 1.4 m/s: 1.90, 2.25 and 2.95 m respectively. **These are calculated engineering scenarios, not observed reaction times or actual depth estimates.** Where monocular depth is uncalibrated, do not activate metric comparisons. Calibrate walking speed and camera-to-range mapping prior to enabling distance-driven claims.

## Time-to-collision
If independently calibrated range and closing speed are available: `TTC = d/max(v_close,epsilon)`. With bounding-box expansion and constant apparent object geometry plus fixed camera motion, `tau ≈ A/(dA/dt)` is an approximation and may be wrong for rotations/complex objects; avoid overinterpreting it. System must bias toward handling uncertainty.

## Freshness and PWM
Each valid host command contains 3 bytes of 0..255 PWM and sequence number. 500 ms MCU timeout is a proposed fault-management setting, not a reported proven safety limit. The host must transmit at ~5Hz or higher for the current watchdog to avoid unintentional cutoff; measure max processing delays. A high-quality product also needs an explicit distinct fault cue because absence of warning must not imply a clear path.

## Mechanical
No 3D printing assumed: spectacle clip with hook-and-loop / small clamp, strain relief, soft strap with three independently distinguishable coin motors, controller and powerbank in pocket. CAD drawings and load analyses are optional only if actual fabricated enclosure warrants them; do not fabricate FEA results for the preliminary textile and clip interface. Required dimensions after fabrication: camera angle, mass, strap motor separation, enclosure dimensions, contact pressure and cable pull-out force.

## Electronics
- USB-C 5V to UNO R4. Separate protected 5V branch to 3 rated low-voltage ERM motors. Connect supply grounds. Never connect a motor straight to UNO GPIO (datasheet max 8mA per pin).
- For each motor: supply positive → motor → N-channel logic-level MOSFET drain, source → ground. Body diode is **not** an adequate substitute for motor flyback across terminals; separate flyback diode cathode to supply positive, anode to drain. Gate from D3/D5/D6 through ~220Ω. Gate → 10kΩ GND resistor. Choose correct part pinout and check RDS(on) at 4.5V VGS.
- Put 100nF ceramic near each driver and a 100–470µF bulk capacitor on motor supply; component voltage ratings to exceed rail.
- MPU6050 chip I/O is 3.3V domain; breakout-board regulator/level adaptation varies. Check exact module before connecting to UNO I2C A4/A5. Do not assume bare 5V tolerant sensor pins.
- If camera module has 3.3V logic, do not attach it to 5V UNO GPIO without verified level shifter. Camera frames travel to host via own 5V-regulated board WiFi or USB webcam.

## Cost
Known retailer catalogue items can be included in a dated lower-bound tally. Other items must remain provisional estimates until actual retailer links or receipts exist. Laptop host cost is **not** included in electronics-only build cost and must be explicitly disclosed. There is no basis for claiming this system is cheaper than commercial mobility aids without consistent comparator specifications.
