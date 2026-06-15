import { SensorState } from "./types";

export function classifyTemperature(
  temperature: number,
  coldMax: number,
  hotMin: number
): SensorState {
  if (temperature < coldMax) return "COLD";
  if (temperature >= hotMin) return "HOT";
  return "WARM";
}
