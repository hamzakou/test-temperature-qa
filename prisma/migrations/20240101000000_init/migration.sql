-- CreateTable
CREATE TABLE "temperature_readings" (
    "id" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "state" TEXT NOT NULL,
    "coldMax" DOUBLE PRECISION NOT NULL,
    "hotMin" DOUBLE PRECISION NOT NULL,
    "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "temperature_readings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thresholds" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "coldMax" DOUBLE PRECISION NOT NULL DEFAULT 22,
    "hotMin" DOUBLE PRECISION NOT NULL DEFAULT 35,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "thresholds_pkey" PRIMARY KEY ("id")
);
