"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/auth";

export type InquiryState = {
  error?: string;
  success?: boolean;
};

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  const propertyId = String(formData.get("propertyId") || "");
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!propertyId || !name || !email || !message) {
    return { error: "Please fill in name, email, and message." };
  }

  const property = await prisma.property.findUnique({
    where: { id: propertyId },
  });
  if (!property) {
    return { error: "Property not found." };
  }

  await prisma.inquiry.create({
    data: {
      propertyId,
      name,
      email,
      phone: phone || null,
      message,
    },
  });

  revalidatePath(`/listings/${propertyId}`);
  revalidatePath("/agent/inquiries");
  revalidatePath("/agent");

  return { success: true };
}

export async function markInquiryRead(inquiryId: string) {
  const auth = await requireAgent();
  if (!auth) redirect("/agent/login");

  await prisma.inquiry.update({
    where: { id: inquiryId },
    data: { read: true },
  });

  revalidatePath("/agent/inquiries");
  revalidatePath("/agent");
}

export async function markInquiryUnread(inquiryId: string) {
  const auth = await requireAgent();
  if (!auth) redirect("/agent/login");

  await prisma.inquiry.update({
    where: { id: inquiryId },
    data: { read: false },
  });

  revalidatePath("/agent/inquiries");
  revalidatePath("/agent");
}
