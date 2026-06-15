import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.threshold.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      coldMax: 22,
      hotMin: 35,
    },
  });
  console.log("Seeded default thresholds: coldMax=22, hotMin=35");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
