"use client";

import { useEffect, useState } from "react";

export function ThresholdForm() {
  const [coldMax, setColdMax] = useState("");
  const [hotMin, setHotMin] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/thresholds")
      .then((res) => res.json())
      .then((data) => {
        setColdMax(String(data.coldMax));
        setHotMin(String(data.hotMin));
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const res = await fetch("/api/thresholds", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coldMax: parseFloat(coldMax), hotMin: parseFloat(hotMin) }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage({ type: "success", text: "Thresholds updated successfully." });
    } else {
      setMessage({ type: "error", text: data.error });
    }

    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <div className="form-field">
          <label htmlFor="coldMax">Cold Max (°C)</label>
          <input
            id="coldMax"
            type="number"
            step="0.1"
            value={coldMax}
            onChange={(e) => setColdMax(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="hotMin">Hot Min (°C)</label>
          <input
            id="hotMin"
            type="number"
            step="0.1"
            value={hotMin}
            onChange={(e) => setHotMin(e.target.value)}
          />
        </div>
        <button className="btn-primary" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
      {message && (
        <div className={`message message--${message.type}`} aria-live="polite" role="alert">
          {message.text}
        </div>
      )}
    </form>
  );
}
