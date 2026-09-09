import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/auth";
import { redirect } from "next/navigation";
import { formatPrice, listingBadge, primaryImage } from "@/lib/format";
import { DeletePropertyButton, StatusToggleButton } from "@/components/PropertyActions";
import Image from "next/image";

export default async function AgentPropertiesPage() {
  const auth = await requireAgent();
  if (!auth) redirect("/agent/login");

  const properties = await prisma.property.findMany({
    where: { agentId: auth.agent.id },
    include: { images: true, _count: { select: { inquiries: true } } },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-green">Properties</h1>
          <p className="mt-1 text-ink/60">{properties.length} listings in your portfolio</p>
        </div>
        <Link
          href="/agent/properties/new"
          className="rounded-full bg-green px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-light"
        >
          Add property
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm shadow-black/5">
        <div className="divide-y divide-ink/10">
          {properties.map((property) => (
            <div
              key={property.id}
              className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={primaryImage(property.images)}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <Link
                    href={`/agent/properties/${property.id}/edit`}
                    className="font-semibold text-ink hover:text-green"
                  >
                    {property.title}
                  </Link>
                  <p className="text-sm text-ink/50">
                    {formatPrice(property.price, property.listingType)} ·{" "}
                    {listingBadge(property.listingType, property.status)} ·{" "}
                    {property._count.inquiries} inquiries
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusToggleButton
                  propertyId={property.id}
                  listingType={property.listingType}
                  status={property.status}
                />
                <Link
                  href={`/listings/${property.id}`}
                  className="rounded-full border border-ink/10 px-3 py-1.5 text-xs font-semibold text-ink hover:bg-sand-light/50"
                >
                  View
                </Link>
                <Link
                  href={`/agent/properties/${property.id}/edit`}
                  className="rounded-full bg-sand-light px-3 py-1.5 text-xs font-semibold text-green"
                >
                  Edit
                </Link>
                <DeletePropertyButton propertyId={property.id} />
              </div>
            </div>
          ))}
          {properties.length === 0 && (
            <div className="p-10 text-center text-ink/50">
              No properties yet.{" "}
              <Link href="/agent/properties/new" className="font-medium text-green">
                Create your first listing
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
