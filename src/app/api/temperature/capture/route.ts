import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readTemperature } from "@/lib/sensor";
import { classifyTemperature } from "@/lib/classifier";

export async function POST() {
  const temperature = readTemperature();

  const thresholds = await prisma.threshold.findUniqueOrThrow({
    where: { id: "singleton" },
  });

  const state = classifyTemperature(temperature, thresholds.coldMax, thresholds.hotMin);

  const reading = await prisma.temperatureReading.create({
    data: {
      temperature,
      state,
      coldMax: thresholds.coldMax,
      hotMin: thresholds.hotMin,
    },
  });

  return NextResponse.json(
    {
      id: reading.id,
      temperature: reading.temperature,
      state: reading.state,
      coldMax: reading.coldMax,
      hotMin: reading.hotMin,
      timestamp: reading.capturedAt.toISOString(), // Intentional inconsistency: "timestamp" instead of "capturedAt"
    },
    { status: 201 }
  );
}
