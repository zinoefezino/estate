import Link from "next/link";
import PropertyForm from "@/components/PropertyForm";

export default function NewPropertyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link href="/agent/properties" className="text-sm font-medium text-green">
          ← Back to properties
        </Link>
        <h1 className="mt-3 text-3xl font-extrabold text-green">Add property</h1>
        <p className="mt-1 text-ink/60">Create a new listing with photos and details.</p>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-sm shadow-black/5 sm:p-8">
        <PropertyForm />
      </div>
    </div>
  );
}
