"use client";

import { SensorState } from "@/lib/types";

interface TemperatureDisplayProps {
  temperature: number;
  state: SensorState;
}

export function TemperatureDisplay({ temperature, state }: TemperatureDisplayProps) {
  const badgeClass = `badge badge--${state.toLowerCase()}`;

  return (
    <span>
      {temperature}°C <span className={badgeClass}>{state}</span>
    </span>
  );
}
