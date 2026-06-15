"use client";

import { useState } from "react";
import { TemperatureDisplay } from "./TemperatureDisplay";
import { SensorState } from "@/lib/types";

interface CaptureResult {
  temperature: number;
  state: SensorState;
}

interface CaptureButtonProps {
  onCapture: () => void;
}

export function CaptureButton({ onCapture }: CaptureButtonProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CaptureResult | null>(null);

  const handleCapture = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/temperature/capture", { method: "POST" });
      const data = await res.json();
      setResult({ temperature: data.temperature, state: data.state });
      onCapture();
    } catch {
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="btn-primary"
        onClick={handleCapture}
        disabled={loading}
        aria-label="Capture temperature"
      >
        {loading ? "Capturing..." : "Capture Temperature"}
      </button>
      {result && (
        <div className="capture-result" aria-live="polite">
          <TemperatureDisplay temperature={result.temperature} state={result.state} />
        </div>
      )}
    </div>
  );
}
