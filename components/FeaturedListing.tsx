import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import PropertyCard, { type PropertyCardData } from "@/components/PropertyCard";
import { prisma } from "@/lib/prisma";

export default async function FeaturedListings() {
  let properties: PropertyCardData[] = await prisma.property.findMany({
    where: { featured: true, status: "available" },
    include: { images: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  if (properties.length === 0) {
    properties = await prisma.property.findMany({
      where: { status: "available" },
      include: { images: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    });
  }

  return (
    <section className="bg-cream px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-sand">
              Featured Listings
            </span>
            <h2 className="mt-2 max-w-lg text-3xl font-extrabold text-green sm:text-4xl">
              Homes our agents are proud to show
            </h2>
          </div>
          <Link
            href="/listings"
            className="flex items-center gap-1.5 text-[15px] font-semibold text-green hover:text-green-light"
          >
            View all listings
            <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={2} />
          </Link>
        </div>

        {properties.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl bg-white p-10 text-center text-ink/60 shadow-sm">
            Featured listings will appear here once agents publish properties.
          </div>
        )}
      </div>
    </section>
  );
}
