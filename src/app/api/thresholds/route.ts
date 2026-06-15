import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const thresholds = await prisma.threshold.findUniqueOrThrow({
    where: { id: "singleton" },
  });

  return NextResponse.json({
    coldMax: thresholds.coldMax,
    hotMin: thresholds.hotMin,
  });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { coldMax, hotMin } = body;

  // Intentional: no check that coldMax/hotMin are actually numbers before logic
  if (coldMax >= hotMin) {
    return NextResponse.json(
      { error: "coldMax must be strictly less than hotMin", statusCode: 400 },
      { status: 400 }
    );
  }

  if (hotMin - coldMax < 2) {
    return NextResponse.json(
      { error: "Minimum gap between coldMax and hotMin must be 2°C", statusCode: 400 },
      { status: 400 }
    );
  }

  const updated = await prisma.threshold.update({
    where: { id: "singleton" },
    data: { coldMax, hotMin },
  });

  return NextResponse.json({
    coldMax: updated.coldMax,
    hotMin: updated.hotMin,
  });
}
