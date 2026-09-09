"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import {
  createProperty,
  updateProperty,
  type PropertyFormState,
} from "@/app/actions/properties";

type ExistingImage = {
  id: string;
  url: string;
  isPrimary: boolean;
};

type PropertyDefaults = {
  id?: string;
  title?: string;
  description?: string;
  price?: number;
  location?: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  propertyType?: string;
  listingType?: string;
  status?: string;
  featured?: boolean;
  images?: ExistingImage[];
};

const initialState: PropertyFormState = {};

export default function PropertyForm({ property }: { property?: PropertyDefaults }) {
  const isEdit = Boolean(property?.id);
  const action = isEdit
    ? updateProperty.bind(null, property!.id!)
    : createProperty;

  const [state, formAction, pending] = useActionState(action, initialState);
  const [keptImages, setKeptImages] = useState<ExistingImage[]>(
    property?.images || []
  );

  function removeImage(url: string) {
    setKeptImages((prev) => prev.filter((img) => img.url !== url));
  }

  return (
    <form action={formAction} className="space-y-6" encType="multipart/form-data">
      {keptImages.map((img) => (
        <input key={img.url} type="hidden" name="keepImages" value={img.url} />
      ))}

      {state?.error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Title" name="title" defaultValue={property?.title} required />
        <Field
          label="Location"
          name="location"
          defaultValue={property?.location}
          required
          placeholder="City, Neighborhood"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Description</label>
        <textarea
          name="description"
          required
          rows={5}
          defaultValue={property?.description}
          className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-ink outline-none focus:border-green"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Field
          label="Price"
          name="price"
          type="number"
          step="1"
          min="1"
          defaultValue={property?.price?.toString()}
          required
        />
        <Field
          label="Beds"
          name="beds"
          type="number"
          min="0"
          defaultValue={property?.beds?.toString() ?? "1"}
          required
        />
        <Field
          label="Baths"
          name="baths"
          type="number"
          min="0"
          defaultValue={property?.baths?.toString() ?? "1"}
          required
        />
        <Field
          label="Sqft"
          name="sqft"
          type="number"
          min="1"
          defaultValue={property?.sqft?.toString()}
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Select
          label="Property Type"
          name="propertyType"
          defaultValue={property?.propertyType || "house"}
          options={[
            { value: "house", label: "House" },
            { value: "apartment", label: "Apartment" },
            { value: "condo", label: "Condo" },
            { value: "townhouse", label: "Townhouse" },
            { value: "land", label: "Land" },
          ]}
        />
        <Select
          label="Listing Type"
          name="listingType"
          defaultValue={property?.listingType || "sale"}
          options={[
            { value: "sale", label: "For Sale" },
            { value: "rent", label: "For Rent" },
          ]}
        />
        <Select
          label="Status"
          name="status"
          defaultValue={property?.status || "available"}
          options={[
            { value: "available", label: "Available" },
            { value: "sold", label: "Sold" },
            { value: "rented", label: "Rented" },
          ]}
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={property?.featured}
          className="h-4 w-4 rounded border-ink/20 text-green"
        />
        Show in featured listings
      </label>

      {keptImages.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-ink">Current images</p>
          <div className="flex flex-wrap gap-3">
            {keptImages.map((img) => (
              <div key={img.url} className="relative h-24 w-32 overflow-hidden rounded-xl">
                <Image src={img.url} alt="" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(img.url)}
                  className="absolute right-1 top-1 rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">
          {isEdit ? "Add more images" : "Images"}
        </label>
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          className="block w-full text-sm text-ink file:mr-4 file:rounded-full file:border-0 file:bg-sand-light file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green"
        />
        <p className="mt-1 text-xs text-ink/50">
          First image becomes the primary photo. JPEG, PNG, or WebP.
        </p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-green px-6 py-3 text-sm font-semibold text-white hover:bg-green-light disabled:opacity-60"
      >
        {pending ? "Saving..." : isEdit ? "Save changes" : "Create property"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
  placeholder,
  step,
  min,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  step?: string;
  min?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        step={step}
        min={min}
        className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-ink outline-none focus:border-green"
      />
    </div>
  );
}

function Select({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-ink outline-none focus:border-green"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
