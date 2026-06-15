const SENSOR_MIN = -10;
const SENSOR_MAX = 50;

export function readTemperature(): number {
  const fixedTemp = process.env.FIXED_TEMPERATURE;
  if (fixedTemp) {
    return parseFloat(fixedTemp);
  }

  const value = Math.random() * (SENSOR_MAX - SENSOR_MIN) + SENSOR_MIN;
  return Math.round(value * 10) / 10;
}
