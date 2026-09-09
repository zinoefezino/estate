import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BedIcon,
  Bathtub01Icon,
  RulerDimensionLineIcon,
  Location01Icon,
  HeartIcon,
} from "@hugeicons/core-free-icons";
import { formatPrice, formatSqft, listingBadge, primaryImage } from "@/lib/format";

export type PropertyCardData = {
  id: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  listingType: string;
  status: string;
  images: { url: string; isPrimary: boolean }[];
};

export default function PropertyCard({ property }: { property: PropertyCardData }) {
  const badge = listingBadge(property.listingType, property.status);
  const image = primaryImage(property.images);
  const isSaleLike = badge === "For Sale" || badge === "Sold";

  return (
    <Link
      href={`/listings/${property.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm shadow-black/5 transition-shadow hover:shadow-lg hover:shadow-black/10"
    >
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={image}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
            isSaleLike
              ? "bg-green text-white"
              : "bg-sand text-green"
          }`}
        >
          {badge}
        </span>

        <span
          aria-hidden
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-green backdrop-blur-sm"
        >
          <HugeiconsIcon icon={HeartIcon} size={17} strokeWidth={2} />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-xl font-bold text-green">
          {formatPrice(property.price, property.listingType)}
        </span>

        <div>
          <h3 className="text-lg font-semibold text-ink">{property.title}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink/60">
            <HugeiconsIcon icon={Location01Icon} size={15} strokeWidth={2} />
            {property.location}
          </p>
        </div>

        <div className="mt-auto flex items-center gap-4 border-t border-ink/10 pt-4 text-sm text-ink/70">
          <span className="flex items-center gap-1.5">
            <HugeiconsIcon icon={BedIcon} size={16} strokeWidth={2} />
            {property.beds} beds
          </span>
          <span className="flex items-center gap-1.5">
            <HugeiconsIcon icon={Bathtub01Icon} size={16} strokeWidth={2} />
            {property.baths} baths
          </span>
          <span className="flex items-center gap-1.5">
            <HugeiconsIcon icon={RulerDimensionLineIcon} size={16} strokeWidth={2} />
            {formatSqft(property.sqft)} sqft
          </span>
        </div>
      </div>
    </Link>
  );
}
