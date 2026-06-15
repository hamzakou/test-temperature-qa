import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const MAX_HISTORY_SIZE = 15;

export async function GET() {
  const readings = await prisma.temperatureReading.findMany({
    orderBy: { capturedAt: "desc" },
    take: MAX_HISTORY_SIZE,
  });

  return NextResponse.json({
    readings: readings.map((r) => ({
      id: r.id,
      temperature: r.temperature,
      state: r.state,
      coldMax: r.coldMax,
      hotMin: r.hotMin,
      capturedAt: r.capturedAt.toISOString(),
    })),
    count: readings.length,
    maxSize: MAX_HISTORY_SIZE,
  });
}
