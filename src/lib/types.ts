export type SensorState = "COLD" | "WARM" | "HOT";

export interface TemperatureReading {
  id: string;
  temperature: number;
  state: SensorState;
  coldMax: number;
  hotMin: number;
  capturedAt: string;
}

export interface ThresholdConfig {
  coldMax: number;
  hotMin: number;
}

export interface HistoryResponse {
  readings: TemperatureReading[];
  count: number;
  maxSize: number;
}
