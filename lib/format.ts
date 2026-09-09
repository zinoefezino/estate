export function formatPrice(price: number, listingType: string): string {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

  if (listingType === "rent") {
    return `${formatted} / mo`;
  }
  return formatted;
}

export function formatSqft(sqft: number): string {
  return new Intl.NumberFormat("en-US").format(sqft);
}

export function listingBadge(listingType: string, status: string): string {
  if (status === "sold") return "Sold";
  if (status === "rented") return "Rented";
  return listingType === "rent" ? "For Rent" : "For Sale";
}

export function primaryImage(
  images: { url: string; isPrimary: boolean }[] | undefined,
  fallback = "/house1.jpg"
): string {
  if (!images?.length) return fallback;
  const primary = images.find((img) => img.isPrimary);
  return primary?.url || images[0].url;
}
