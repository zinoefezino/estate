import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BedIcon,
  Bathtub01Icon,
  RulerDimensionLineIcon,
  Location01Icon,
  ArrowLeft01Icon,
} from "@hugeicons/core-free-icons";
import Header from "@/components/Header";
import InquiryForm from "@/components/InquiryForm";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatSqft, listingBadge, primaryImage } from "@/lib/format";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      agent: { select: { name: true, email: true } },
    },
  });

  if (!property) notFound();

  const badge = listingBadge(property.listingType, property.status);
  const hero = primaryImage(property.images);
  const gallery = property.images.length
    ? property.images
    : [{ id: "fallback", url: hero, isPrimary: true, sortOrder: 0 }];

  return (
    <>
      <Header solid />
      <main className="bg-cream pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Link
            href="/listings"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-green"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
            Back to listings
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
            <div>
              <div className="relative h-80 overflow-hidden rounded-2xl sm:h-[28rem]">
                <Image
                  src={hero}
                  alt={property.title}
                  fill
                  priority
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 rounded-full bg-green px-3 py-1 text-xs font-semibold text-white">
                  {badge}
                </span>
              </div>

              {gallery.length > 1 && (
                <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {gallery.map((img) => (
                    <div
                      key={img.id || img.url}
                      className="relative h-24 overflow-hidden rounded-xl"
                    >
                      <Image src={img.url} alt="" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8">
                <p className="text-3xl font-extrabold text-green">
                  {formatPrice(property.price, property.listingType)}
                </p>
                <h1 className="mt-2 text-3xl font-extrabold text-ink">
                  {property.title}
                </h1>
                <p className="mt-2 flex items-center gap-1.5 text-ink/60">
                  <HugeiconsIcon icon={Location01Icon} size={16} />
                  {property.location}
                </p>

                <div className="mt-6 flex flex-wrap gap-6 border-y border-ink/10 py-5 text-sm text-ink/70">
                  <span className="flex items-center gap-2">
                    <HugeiconsIcon icon={BedIcon} size={18} />
                    {property.beds} beds
                  </span>
                  <span className="flex items-center gap-2">
                    <HugeiconsIcon icon={Bathtub01Icon} size={18} />
                    {property.baths} baths
                  </span>
                  <span className="flex items-center gap-2">
                    <HugeiconsIcon icon={RulerDimensionLineIcon} size={18} />
                    {formatSqft(property.sqft)} sqft
                  </span>
                  <span className="capitalize">{property.propertyType}</span>
                </div>

                <div className="mt-8">
                  <h2 className="text-xl font-bold text-ink">About this home</h2>
                  <p className="mt-3 whitespace-pre-wrap leading-relaxed text-ink/75">
                    {property.description}
                  </p>
                </div>

                <p className="mt-8 text-sm text-ink/50">
                  Listed by {property.agent.name}
                </p>
              </div>
            </div>

            <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm shadow-black/5 lg:sticky lg:top-28">
              <h2 className="text-xl font-bold text-green">Request a tour</h2>
              <p className="mt-1 text-sm text-ink/60">
                Send a message and an agent will follow up.
              </p>
              <div className="mt-6">
                <InquiryForm propertyId={property.id} />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
