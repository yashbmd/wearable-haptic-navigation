import unittest
from src.hazard_logic import Detection, lane, preview_distance_m, zones, serial_packet, TemporalGate

class LogicTests(unittest.TestCase):
    def test_three_sectors(self):
        self.assertEqual([lane(x) for x in [0, 0.3, 0.34, .66, .67, 1]], [0,0,1,1,2,2])
    def test_adaptive_design_equation(self):
        self.assertAlmostEqual(preview_distance_m(0.8), 1.90)
        self.assertAlmostEqual(preview_distance_m(1.4), 2.95)
    def test_relative_cue(self):
        d = Detection(1, "person", cx=0.1, box_area_ratio=.2, area_growth_per_s=.08)
        self.assertEqual(zones([d]), (3,0,0))
    def test_metric_is_explicit(self):
        d = Detection(2, "person", .50, .01, distance_m=0.7)
        self.assertEqual(zones([d]), (0,3,0))
    def test_low_confidence_suppressed(self):
        d = Detection(3, "person", .9, .9, .8, confidence=.20)
        self.assertEqual(zones([d]), (0,0,0))
    def test_temporal_attack_release(self):
        gate = TemporalGate(2, 3)
        self.assertEqual(gate.update((3,0,0)), (0,0,0))
        self.assertEqual(gate.update((3,0,0)), (3,0,0))
        self.assertEqual(gate.update((0,0,0)), (3,0,0))
        self.assertEqual(gate.update((0,0,0)), (3,0,0))
        self.assertEqual(gate.update((0,0,0)), (0,0,0))
    def test_gate_counts_valid(self):
        with self.assertRaises(ValueError): TemporalGate(0, 2)

    def test_serial_packet(self):
        self.assertEqual(serial_packet(11,(1,2,3)), b'H,11,85,160,235\n')

if __name__ == '__main__': unittest.main()
