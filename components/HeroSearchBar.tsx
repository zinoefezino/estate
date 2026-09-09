"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  Location01Icon,
  Home03Icon,
  SearchDollarIcon,
} from "@hugeicons/core-free-icons";

const PROPERTY_TYPES = [
  { value: "", label: "Any type" },
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "condo", label: "Condo" },
  { value: "townhouse", label: "Townhouse" },
  { value: "land", label: "Land" },
];

export default function HeroSearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    if (type) params.set("type", type);
    if (maxPrice.trim()) params.set("maxPrice", maxPrice.trim());
    const qs = params.toString();
    router.push(qs ? `/listings?${qs}` : "/listings");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="absolute inset-x-0 bottom-0 z-20 translate-y-1/2 px-6 lg:px-10"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-2xl bg-white p-5 lg:flex-row lg:items-center lg:gap-3 lg:p-4">
        <SearchField
          icon={Location01Icon}
          label="Location"
          placeholder="City or neighborhood"
          value={location}
          onChange={setLocation}
        />
        <Divider />
        <div className="flex flex-1 items-center gap-3 rounded-xl px-3 py-2 lg:px-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sand-light text-green">
            <HugeiconsIcon icon={Home03Icon} size={18} strokeWidth={2} />
          </span>
          <div className="flex flex-1 flex-col text-left">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink/50">
              Property Type
            </span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full appearance-none border-none bg-transparent p-0 text-base text-ink focus:outline-none focus:ring-0"
            >
              {PROPERTY_TYPES.map((option) => (
                <option key={option.value || "any"} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Divider />
        <SearchField
          icon={SearchDollarIcon}
          label="Max Price"
          placeholder="Any price"
          value={maxPrice}
          onChange={setMaxPrice}
          inputMode="numeric"
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-xl bg-green px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-green-light lg:shrink-0"
        >
          <HugeiconsIcon icon={Search01Icon} size={18} strokeWidth={2.2} />
          Search
        </button>
      </div>
    </form>
  );
}

function SearchField({
  icon,
  label,
  placeholder,
  value,
  onChange,
  inputMode,
}: {
  icon: typeof Location01Icon;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  inputMode?: "numeric";
}) {
  return (
    <div className="flex flex-1 items-center gap-3 rounded-xl px-3 py-2 lg:px-2">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sand-light text-green">
        <HugeiconsIcon icon={icon} size={18} strokeWidth={2} />
      </span>
      <div className="flex flex-1 flex-col text-left">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink/50">
          {label}
        </span>
        <input
          type="text"
          inputMode={inputMode}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border-none bg-transparent p-0 text-base text-ink placeholder:text-ink/40 focus:outline-none focus:ring-0"
        />
      </div>
    </div>
  );
}

function Divider() {
  return <div className="hidden h-8 w-px shrink-0 bg-ink/10 lg:block" />;
}
