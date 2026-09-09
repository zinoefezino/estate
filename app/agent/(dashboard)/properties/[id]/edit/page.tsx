import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import PropertyForm from "@/components/PropertyForm";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/auth";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const auth = await requireAgent();
  if (!auth) redirect("/agent/login");

  const { id } = await params;
  const property = await prisma.property.findFirst({
    where: { id, agentId: auth.agent.id },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });

  if (!property) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link href="/agent/properties" className="text-sm font-medium text-green">
          ← Back to properties
        </Link>
        <h1 className="mt-3 text-3xl font-extrabold text-green">Edit property</h1>
        <p className="mt-1 text-ink/60">{property.title}</p>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-sm shadow-black/5 sm:p-8">
        <PropertyForm
          property={{
            id: property.id,
            title: property.title,
            description: property.description,
            price: property.price,
            location: property.location,
            beds: property.beds,
            baths: property.baths,
            sqft: property.sqft,
            propertyType: property.propertyType,
            listingType: property.listingType,
            status: property.status,
            featured: property.featured,
            images: property.images,
          }}
        />
      </div>
    </div>
  );
}
