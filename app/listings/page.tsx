import Header from "@/components/Header";
import PropertyCard from "@/components/PropertyCard";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import Link from "next/link";

type SearchParams = Promise<{
  location?: string;
  type?: string;
  listing?: string;
  status?: string;
  beds?: string;
  minPrice?: string;
  maxPrice?: string;
  q?: string;
}>;

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const where: Prisma.PropertyWhereInput = {};

  if (params.location) {
    where.location = { contains: params.location };
  }
  if (params.type) {
    where.propertyType = params.type;
  }
  if (params.listing) {
    where.listingType = params.listing;
  }
  if (params.status) {
    where.status = params.status;
  } else {
    // Default public browse: show available unless filtered
    // Still allow sold/rented via status filter
  }
  if (params.beds) {
    const beds = Number(params.beds);
    if (Number.isFinite(beds)) where.beds = { gte: beds };
  }
  if (params.minPrice || params.maxPrice) {
    where.price = {};
    if (params.minPrice) {
      const min = Number(params.minPrice);
      if (Number.isFinite(min)) where.price.gte = min;
    }
    if (params.maxPrice) {
      const max = Number(params.maxPrice);
      if (Number.isFinite(max)) where.price.lte = max;
    }
  }
  if (params.q) {
    where.OR = [
      { title: { contains: params.q } },
      { description: { contains: params.q } },
      { location: { contains: params.q } },
    ];
  }

  const properties = await prisma.property.findMany({
    where,
    include: { images: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  const title =
    params.listing === "sale"
      ? "Homes for sale"
      : params.listing === "rent"
        ? "Homes for rent"
        : "All listings";

  return (
    <>
      <Header solid />
      <main className="bg-cream pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10">
            <span className="text-sm font-semibold uppercase tracking-wide text-sand">
              Browse
            </span>
            <h1 className="mt-2 text-3xl font-extrabold text-green sm:text-4xl">
              {title}
            </h1>
            <p className="mt-2 text-ink/60">
              {properties.length} propert{properties.length === 1 ? "y" : "ies"}{" "}
              found
            </p>
          </div>

          <form className="mb-10 grid gap-3 rounded-2xl bg-white p-4 shadow-sm shadow-black/5 sm:grid-cols-2 lg:grid-cols-6 lg:items-end">
            <FilterField
              label="Location"
              name="location"
              defaultValue={params.location}
              placeholder="City or area"
            />
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink/50">
                Type
              </label>
              <select
                name="type"
                defaultValue={params.type || ""}
                className="w-full rounded-xl border border-ink/10 bg-cream px-3 py-2.5 text-sm outline-none focus:border-green"
              >
                <option value="">Any type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink/50">
                Listing
              </label>
              <select
                name="listing"
                defaultValue={params.listing || ""}
                className="w-full rounded-xl border border-ink/10 bg-cream px-3 py-2.5 text-sm outline-none focus:border-green"
              >
                <option value="">Buy or rent</option>
                <option value="sale">For sale</option>
                <option value="rent">For rent</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink/50">
                Beds
              </label>
              <select
                name="beds"
                defaultValue={params.beds || ""}
                className="w-full rounded-xl border border-ink/10 bg-cream px-3 py-2.5 text-sm outline-none focus:border-green"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
            <FilterField
              label="Max price"
              name="maxPrice"
              defaultValue={params.maxPrice}
              placeholder="e.g. 500000"
              type="number"
            />
            <button
              type="submit"
              className="rounded-xl bg-green px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-light"
            >
              Apply filters
            </button>
          </form>

          {properties.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
              <p className="text-ink/60">No properties match these filters.</p>
              <Link
                href="/listings"
                className="mt-4 inline-block font-semibold text-green"
              >
                Clear filters
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function FilterField({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink/50">
        {label}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-xl border border-ink/10 bg-cream px-3 py-2.5 text-base outline-none focus:border-green"
      />
    </div>
  );
}
