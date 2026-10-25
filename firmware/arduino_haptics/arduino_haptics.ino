/* Vishwakarma Stage 2 research prototype: three directional vibration channels.
   Board: Arduino UNO R4 Minima; pins D3/D5/D6 PWM.
   Serial protocol: H,sequence,left_pwm,center_pwm,right_pwm\n  (0-255)
   Outputs stop after stale command; THIS IS NOT A CERTIFIED SAFETY DEVICE.
   Drivers: logic-level N-MOSFET low side; flyback diode on each ERM motor.
*/
#include <Arduino.h>
#include <stdio.h>
const uint8_t MOTOR_PIN[3] = {3, 5, 6};
const unsigned long COMMAND_TIMEOUT_MS = 500; // proposed setting; bench verify
const size_t MAX_LINE = 54;
char buffer[MAX_LINE];
size_t used = 0;
unsigned long lastGood = 0;
bool active = false;
void off() { for (uint8_t p : MOTOR_PIN) analogWrite(p, 0); }
void apply(char *line) {
  unsigned int seq = 0;
  int l = -1, c = -1, r = -1;
  if (sscanf(line, "H,%u,%d,%d,%d", &seq, &l, &c, &r) != 4) return;
  if (l<0 || l>255 || c<0 || c>255 || r<0 || r>255) return;
  analogWrite(MOTOR_PIN[0], l);
  analogWrite(MOTOR_PIN[1], c);
  analogWrite(MOTOR_PIN[2], r);
  lastGood = millis();
  active = true;
}
void setup() {
  for (uint8_t p : MOTOR_PIN) pinMode(p, OUTPUT);
  off();
  Serial.begin(115200);
  lastGood = millis();
}
void loop() {
  while (Serial.available()) {
    char c = Serial.read();
    if (c == '\r') continue;
    if (c == '\n') { buffer[used] = 0; apply(buffer); used = 0; }
    else if (used < MAX_LINE - 1) buffer[used++] = c;
    else used = 0;
  }
  if (active && (millis() - lastGood > COMMAND_TIMEOUT_MS)) {
    off(); active = false;
  }
}
