"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, type AuthState } from "@/app/actions/auth";

const initial: AuthState = {};

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initial);

  return (
    <form action={action} className="space-y-5" autoComplete="on">
      {state?.error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Email</label>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="w-full rounded-xl border border-ink/10 bg-cream px-4 py-3 outline-none focus:border-green"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Password</label>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          placeholder="Enter your password"
          className="w-full rounded-xl border border-ink/10 bg-cream px-4 py-3 outline-none focus:border-green"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-green py-3.5 text-sm font-semibold text-white hover:bg-green-light disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
      <p className="text-center text-sm text-ink/50">
        <Link href="/" className="font-medium text-green hover:underline">
          Back to Haven Realty
        </Link>
      </p>
    </form>
  );
}
