import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  Location01Icon,
  Home03Icon,
  SearchDollarIcon,
} from "@hugeicons/core-free-icons";

export default function HeroSearchBar() {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 translate-y-1/2 px-6 lg:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-2xl bg-white p-5  lg:flex-row lg:items-center lg:gap-3 lg:p-4">
        <SearchField
          icon={Location01Icon}
          label="Location"
          placeholder="City or neighborhood"
        />
        <Divider />
        <SearchField
          icon={Home03Icon}
          label="Property Type"
          placeholder="House, apartment, land..."
        />
        <Divider />
        <SearchField
          icon={SearchDollarIcon}
          label="Price Range"
          placeholder="Any price"
        />
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl bg-green px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-green-light lg:shrink-0"
        >
          <HugeiconsIcon icon={Search01Icon} size={18} strokeWidth={2.2} />
          Search
        </button>
      </div>
    </div>
  );
}

function SearchField({
  icon,
  label,
  placeholder,
}: {
  icon: typeof Location01Icon;
  label: string;
  placeholder: string;
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
          placeholder={placeholder}
          className="w-full border-none bg-transparent p-0 text-[15px] text-ink placeholder:text-ink/40 focus:outline-none focus:ring-0"
        />
      </div>
    </div>
  );
}

function Divider() {
  return <div className="hidden h-8 w-px shrink-0 bg-ink/10 lg:block" />;
}
