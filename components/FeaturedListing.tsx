"use client";

import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BedIcon,
  Bathtub01Icon,
  RulerDimensionLineIcon,
  Location01Icon,
  HeartIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

type Property = {
  id: string;
  image: string;
  price: string;
  status: "For Sale" | "For Rent";
  title: string;
  location: string;
  beds: number;
  baths: number;
  sqft: string;
};

const PROPERTIES: Property[] = [
  {
    id: "1",
    image: "/house1.jpg",
    price: "$450,000",
    status: "For Sale",
    title: "Willow Creek Residence",
    location: "Maplewood, Portland",
    beds: 4,
    baths: 3,
    sqft: "2,400",
  },
  {
    id: "2",
    image: "/house2.jpg",
    price: "$780,000",
    status: "For Sale",
    title: "The Cedar House",
    location: "Lakeview, Austin",
    beds: 5,
    baths: 4,
    sqft: "3,150",
  },
  {
    id: "3",
    image: "/house3.jpg",
    price: "$2,200 / mo",
    status: "For Rent",
    title: "Birchwood Cottage",
    location: "Old Town, Denver",
    beds: 2,
    baths: 2,
    sqft: "1,150",
  },
  {
    id: "4",
    image: "/house4.jpg",
    price: "$610,000",
    status: "For Sale",
    title: "Harborline Villa",
    location: "Bayside, Seattle",
    beds: 4,
    baths: 3,
    sqft: "2,780",
  },
  {
    id: "5",
    image: "/house5.jpg",
    price: "$1,850 / mo",
    status: "For Rent",
    title: "The Aster Apartments",
    location: "Midtown, Chicago",
    beds: 1,
    baths: 1,
    sqft: "820",
  },
  {
    id: "6",
    image: "/house6.jpg",
    price: "$925,000",
    status: "For Sale",
    title: "Stonebrook Manor",
    location: "Green Hills, Nashville",
    beds: 6,
    baths: 5,
    sqft: "4,050",
  },
];

export default function FeaturedListings() {
  return (
    <section className="bg-[--color-cream] px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-[--color-sand]">
              Featured Listings
            </span>
            <h2 className="mt-2 max-w-lg text-3xl font-extrabold text-[--color-green] sm:text-4xl">
              Homes our agents are proud to show
            </h2>
          </div>
          <Link
            href="#"
            className="flex items-center gap-1.5 text-[15px] font-semibold text-[--color-green] hover:text-[--color-green-light]"
          >
            View all listings
            <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={2} />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PROPERTIES.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href="#"
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm shadow-black/5 transition-shadow hover:shadow-lg hover:shadow-black/10"
    >
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
            property.status === "For Sale"
              ? "bg-[--color-green] text-white"
              : "bg-[--color-sand] text-[--color-green]"
          }`}
        >
          {property.status}
        </span>

        <button
          type="button"
          aria-label="Save listing"
          onClick={(e) => e.preventDefault()}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[--color-green] backdrop-blur-sm transition-colors hover:bg-white"
        >
          <HugeiconsIcon icon={HeartIcon} size={17} strokeWidth={2} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-xl font-bold text-[--color-green]">
          {property.price}
        </span>

        <div>
          <h3 className="text-lg font-semibold text-[--color-ink]">
            {property.title}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-[--color-ink]/60">
            <HugeiconsIcon icon={Location01Icon} size={15} strokeWidth={2} />
            {property.location}
          </p>
        </div>

        <div className="mt-auto flex items-center gap-4 border-t border-[--color-ink]/10 pt-4 text-sm text-[--color-ink]/70">
          <span className="flex items-center gap-1.5">
            <HugeiconsIcon icon={BedIcon} size={16} strokeWidth={2} />
            {property.beds} beds
          </span>
          <span className="flex items-center gap-1.5">
            <HugeiconsIcon icon={Bathtub01Icon} size={16} strokeWidth={2} />
            {property.baths} baths
          </span>
          <span className="flex items-center gap-1.5">
            <HugeiconsIcon
              icon={RulerDimensionLineIcon}
              size={16}
              strokeWidth={2}
            />
            {property.sqft} sqft
          </span>
        </div>
      </div>
    </Link>
  );
}
