"use client";

import { useActionState } from "react";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiries";

const initial: InquiryState = {};

export default function InquiryForm({ propertyId }: { propertyId: string }) {
  const [state, action, pending] = useActionState(submitInquiry, initial);

  if (state?.success) {
    return (
      <div className="rounded-2xl bg-green/5 p-6 text-center">
        <p className="font-semibold text-green">Inquiry sent</p>
        <p className="mt-2 text-sm text-ink/70">
          An agent will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="propertyId" value={propertyId} />

      {state?.error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Name</label>
        <input
          name="name"
          required
          className="w-full rounded-xl border border-ink/10 bg-cream px-4 py-3 outline-none focus:border-green text-base"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Email</label>
        <input
          type="email"
          name="email"
          required
          className="w-full rounded-xl border border-ink/10 bg-cream px-4 py-3 outline-none focus:border-green text-base"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Phone</label>
        <input
          name="phone"
          className="w-full rounded-xl border border-ink/10 bg-cream px-4 py-3 outline-none focus:border-green text-base"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={4}
          defaultValue="I'm interested in this property. Please contact me."
          className="w-full rounded-xl border border-ink/10 bg-cream px-4 py-3 outline-none focus:border-green text-base"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-green py-3.5 text-sm font-semibold text-white hover:bg-green-light disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send inquiry"}
      </button>
    </form>
  );
}
