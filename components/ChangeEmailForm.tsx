"use client";

import { useActionState } from "react";
import {
  changeEmailAction,
  type ChangeEmailState,
} from "@/app/actions/auth";

const initial: ChangeEmailState = {};

export default function ChangeEmailForm() {
  const [state, action, pending] = useActionState(changeEmailAction, initial);

  return (
    <form action={action} className="space-y-5" autoComplete="off">
      {state?.error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">
          New email
        </label>
        <input
          type="email"
          name="newEmail"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="w-full rounded-xl border border-ink/10 bg-cream px-4 py-3 outline-none focus:border-green"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">
          Current password
        </label>
        <input
          type="password"
          name="currentPassword"
          required
          autoComplete="current-password"
          placeholder="Confirm with your password"
          className="w-full rounded-xl border border-ink/10 bg-cream px-4 py-3 outline-none focus:border-green"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-green py-3.5 text-sm font-semibold text-white hover:bg-green-light disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {pending ? "Updating..." : "Update email"}
      </button>
      <p className="text-xs text-ink/50">
        After changing your email you will be signed out and must log in again
        with the new address.
      </p>
    </form>
  );
}