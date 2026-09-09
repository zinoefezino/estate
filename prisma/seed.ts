import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const isProd = process.env.NODE_ENV === "production";
  const email =
    process.env.AGENT_EMAIL ??
    (isProd ? undefined : "agent@havenrealty.com");
  const password =
    process.env.AGENT_PASSWORD ?? (isProd ? undefined : "haven123");

  if (!email || !password) {
    throw new Error(
      "AGENT_EMAIL and AGENT_PASSWORD must be set in production (or for seeding)."
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const agent = await prisma.agent.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash,
      name: "Haven Agent",
    },
  });

  const existing = await prisma.property.count();
  if (existing > 0) {
    console.log("Properties already seeded, skipping.");
    return;
  }

  const samples = [
    {
      title: "Willow Creek Residence",
      description:
        "A warm family home nestled among maple trees. Open-plan living, chef kitchen, and a private backyard perfect for weekend gatherings.",
      price: 450000,
      location: "Maplewood, Portland",
      beds: 4,
      baths: 3,
      sqft: 2400,
      propertyType: "house",
      listingType: "sale",
      status: "available",
      featured: true,
      images: ["/house1.jpg"],
    },
    {
      title: "The Cedar House",
      description:
        "Contemporary lakefront living with floor-to-ceiling windows, a spacious primary suite, and a wraparound deck overlooking the water.",
      price: 780000,
      location: "Lakeview, Austin",
      beds: 5,
      baths: 4,
      sqft: 3150,
      propertyType: "house",
      listingType: "sale",
      status: "available",
      featured: true,
      images: ["/house2.jpg"],
    },
    {
      title: "Birchwood Cottage",
      description:
        "Charming cottage in the heart of Old Town. Bright living spaces, updated baths, and walking distance to cafes and parks.",
      price: 2200,
      location: "Old Town, Denver",
      beds: 2,
      baths: 2,
      sqft: 1150,
      propertyType: "house",
      listingType: "rent",
      status: "available",
      featured: true,
      images: ["/house3.jpg"],
    },
  ];

  for (const sample of samples) {
    const { images, ...data } = sample;
    await prisma.property.create({
      data: {
        ...data,
        agentId: agent.id,
        images: {
          create: images.map((url, index) => ({
            url,
            isPrimary: index === 0,
            sortOrder: index,
          })),
        },
      },
    });
  }

  console.log("Seeded demo agent and 3 sample properties.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
