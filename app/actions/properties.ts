"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/auth";
import { uploadImagesFromFormData, deleteImage } from "@/lib/uploads";

export type PropertyFormState = {
  error?: string;
};

function parsePropertyFields(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const price = Number(formData.get("price"));
  const location = String(formData.get("location") || "").trim();
  const beds = Number(formData.get("beds"));
  const baths = Number(formData.get("baths"));
  const sqft = Number(formData.get("sqft"));
  const propertyType = String(formData.get("propertyType") || "house");
  const listingType = String(formData.get("listingType") || "sale");
  const status = String(formData.get("status") || "available");
  const featured = formData.get("featured") === "on";

  return {
    title,
    description,
    price,
    location,
    beds,
    baths,
    sqft,
    propertyType,
    listingType,
    status,
    featured,
  };
}

function validateFields(fields: ReturnType<typeof parsePropertyFields>) {
  if (!fields.title || !fields.description || !fields.location) {
    return "Title, description, and location are required.";
  }
  if (!Number.isFinite(fields.price) || fields.price <= 0) {
    return "Enter a valid price.";
  }
  if (
    !Number.isFinite(fields.beds) ||
    !Number.isFinite(fields.baths) ||
    !Number.isFinite(fields.sqft)
  ) {
    return "Beds, baths, and sqft must be valid numbers.";
  }
  return null;
}

export async function createProperty(
  _prev: PropertyFormState,
  formData: FormData
): Promise<PropertyFormState> {
  const auth = await requireAgent();
  if (!auth) redirect("/agent/login");

  const fields = parsePropertyFields(formData);
  const error = validateFields(fields);
  if (error) return { error };

  let uploaded: string[] = [];
  try {
    uploaded = await uploadImagesFromFormData(formData);
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Image upload failed.",
    };
  }
  const existingUrls = formData
    .getAll("existingImages")
    .map((v) => String(v))
    .filter(Boolean);
  const allImages = [...existingUrls, ...uploaded];

  if (!allImages.length) {
    return { error: "Add at least one image." };
  }

  const property = await prisma.property.create({
    data: {
      ...fields,
      agentId: auth.agent.id,
      images: {
        create: allImages.map((url, index) => ({
          url,
          isPrimary: index === 0,
          sortOrder: index,
        })),
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/listings");
  revalidatePath("/agent");
  revalidatePath("/agent/properties");
  redirect(`/agent/properties/${property.id}/edit`);
}

export async function updateProperty(
  propertyId: string,
  _prev: PropertyFormState,
  formData: FormData
): Promise<PropertyFormState> {
  const auth = await requireAgent();
  if (!auth) redirect("/agent/login");

  const existing = await prisma.property.findFirst({
    where: { id: propertyId, agentId: auth.agent.id },
    include: { images: true },
  });
  if (!existing) return { error: "Property not found." };

  const fields = parsePropertyFields(formData);
  const error = validateFields(fields);
  if (error) return { error };

  const keepUrls = new Set(
    formData.getAll("keepImages").map((v) => String(v)).filter(Boolean)
  );
  let uploaded: string[] = [];
  try {
    uploaded = await uploadImagesFromFormData(formData);
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Image upload failed.",
    };
  }

  const toDelete = existing.images.filter((img) => !keepUrls.has(img.url));
  for (const img of toDelete) {
    await deleteImage(img.url);
  }

  await prisma.propertyImage.deleteMany({
    where: {
      propertyId,
      url: { notIn: [...keepUrls] },
    },
  });

  const remaining = await prisma.propertyImage.findMany({
    where: { propertyId },
    orderBy: { sortOrder: "asc" },
  });

  let sortBase = remaining.length;
  if (uploaded.length) {
    await prisma.propertyImage.createMany({
      data: uploaded.map((url, index) => ({
        propertyId,
        url,
        isPrimary: remaining.length === 0 && index === 0,
        sortOrder: sortBase + index,
      })),
    });
  }

  const allImages = await prisma.propertyImage.findMany({
    where: { propertyId },
    orderBy: { sortOrder: "asc" },
  });

  if (!allImages.length) {
    return { error: "A property must have at least one image." };
  }

  await prisma.propertyImage.updateMany({
    where: { propertyId },
    data: { isPrimary: false },
  });
  await prisma.propertyImage.update({
    where: { id: allImages[0].id },
    data: { isPrimary: true },
  });

  await prisma.property.update({
    where: { id: propertyId },
    data: fields,
  });

  revalidatePath("/");
  revalidatePath("/listings");
  revalidatePath(`/listings/${propertyId}`);
  revalidatePath("/agent");
  revalidatePath("/agent/properties");
  revalidatePath(`/agent/properties/${propertyId}/edit`);

  return {};
}

export async function deleteProperty(propertyId: string) {
  const auth = await requireAgent();
  if (!auth) redirect("/agent/login");

  const existing = await prisma.property.findFirst({
    where: { id: propertyId, agentId: auth.agent.id },
    include: { images: true },
  });
  if (!existing) return;

  for (const img of existing.images) {
    await deleteImage(img.url);
  }

  await prisma.property.delete({ where: { id: propertyId } });

  revalidatePath("/");
  revalidatePath("/listings");
  revalidatePath("/agent");
  revalidatePath("/agent/properties");
  redirect("/agent/properties");
}

export async function togglePropertyStatus(propertyId: string) {
  const auth = await requireAgent();
  if (!auth) redirect("/agent/login");

  const property = await prisma.property.findFirst({
    where: { id: propertyId, agentId: auth.agent.id },
  });
  if (!property) return;

  let nextStatus = property.status;
  if (property.listingType === "rent") {
    nextStatus = property.status === "available" ? "rented" : "available";
  } else {
    nextStatus = property.status === "available" ? "sold" : "available";
  }

  await prisma.property.update({
    where: { id: propertyId },
    data: { status: nextStatus },
  });

  revalidatePath("/");
  revalidatePath("/listings");
  revalidatePath(`/listings/${propertyId}`);
  revalidatePath("/agent");
  revalidatePath("/agent/properties");
}
