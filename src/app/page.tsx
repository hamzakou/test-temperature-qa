"use client";

import { useState } from "react";
import { CaptureButton } from "./components/CaptureButton";
import { HistoryTable } from "./components/HistoryTable";
import { ThresholdForm } from "./components/ThresholdForm";
import { Logo } from "./components/Logo";

export default function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCapture = () => {
    setRefreshKey((k) => k + 1);
  };

  return (
    <main className="container">
      <header className="header">
        <Logo />
        <div className="header-text">
          <h1>Temperature Sensor</h1>
          <p className="subtitle">TEST QA ENGINEER</p>
        </div>
      </header>

      <section className="card">
        <h2>Capture</h2>
        <CaptureButton onCapture={handleCapture} />
      </section>

      <section className="card">
        <h2>History</h2>
        <HistoryTable refreshKey={refreshKey} />
      </section>

      <section className="card">
        <h2>Threshold Settings</h2>
        <ThresholdForm />
      </section>
    </main>
  );
}
