"use client";

import { useEffect, useState } from "react";
import { TemperatureReading } from "@/lib/types";

interface HistoryTableProps {
  refreshKey: number;
}

export function HistoryTable({ refreshKey }: HistoryTableProps) {
  const [readings, setReadings] = useState<TemperatureReading[]>([]);

  useEffect(() => {
    fetch("/api/temperature/history")
      .then((res) => res.json())
      .then((data) => setReadings(data.readings));
  }, [refreshKey]);

  if (readings.length === 0) {
    return <p>No readings yet. Capture a temperature to get started.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Temperature</th>
          <th>State</th>
          <th>Cold Max</th>
          <th>Hot Min</th>
          <th>Captured At</th>
        </tr>
      </thead>
      <tbody>
        {readings.map((r) => (
          <tr key={r.id}>
            <td>{r.temperature}°C</td>
            <td>
              <span className={`badge badge--${r.state.toLowerCase()}`}>{r.state}</span>
            </td>
            <td>{r.coldMax}°C</td>
            <td>{r.hotMin}°C</td>
            <td>{new Date(r.capturedAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
