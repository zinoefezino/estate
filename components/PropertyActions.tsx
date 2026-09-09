"use client";

import { togglePropertyStatus, deleteProperty } from "@/app/actions/properties";

export function StatusToggleButton({
  propertyId,
  listingType,
  status,
}: {
  propertyId: string;
  listingType: string;
  status: string;
}) {
  const label =
    status === "available"
      ? listingType === "rent"
        ? "Mark rented"
        : "Mark sold"
      : "Mark available";

  return (
    <form action={togglePropertyStatus.bind(null, propertyId)}>
      <button
        type="submit"
        className="rounded-full border border-ink/10 px-3 py-1.5 text-xs font-semibold text-ink hover:bg-sand-light/50"
      >
        {label}
      </button>
    </form>
  );
}

export function DeletePropertyButton({ propertyId }: { propertyId: string }) {
  return (
    <form
      action={deleteProperty.bind(null, propertyId)}
      onSubmit={(e) => {
        if (!confirm("Delete this property permanently?")) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
      >
        Delete
      </button>
    </form>
  );
}
