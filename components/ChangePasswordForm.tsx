"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  changePasswordAction,
  type ChangePasswordState,
} from "@/app/actions/auth";

const initial: ChangePasswordState = {};

export default function ChangePasswordForm() {
  const [state, action, pending] = useActionState(changePasswordAction, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state?.success]);

  return (
    <form ref={formRef} action={action} className="space-y-5" autoComplete="off">
      {state?.error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="rounded-xl bg-green/10 px-4 py-3 text-sm text-green">
          Password updated successfully.
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">
          Current password
        </label>
        <input
          type="password"
          name="currentPassword"
          required
          autoComplete="current-password"
          placeholder="Enter current password"
          className="w-full rounded-xl border border-ink/10 bg-cream px-4 py-3 outline-none focus:border-green"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">
          New password
        </label>
        <input
          type="password"
          name="newPassword"
          required
          minLength={8}
          autoComplete="new-password"
          placeholder="At least 8 characters"
          className="w-full rounded-xl border border-ink/10 bg-cream px-4 py-3 outline-none focus:border-green"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">
          Confirm new password
        </label>
        <input
          type="password"
          name="confirmPassword"
          required
          minLength={8}
          autoComplete="new-password"
          placeholder="Re-enter new password"
          className="w-full rounded-xl border border-ink/10 bg-cream px-4 py-3 outline-none focus:border-green"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-green py-3.5 text-sm font-semibold text-white hover:bg-green-light disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {pending ? "Updating..." : "Update password"}
      </button>
    </form>
  );
}