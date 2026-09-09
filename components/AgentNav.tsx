"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/actions/auth";

const LINKS = [
  { href: "/agent", label: "Overview", exact: true },
  { href: "/agent/properties", label: "Properties" },
  { href: "/agent/inquiries", label: "Inquiries" },
];

export default function AgentNav({ agentName }: { agentName: string }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex h-14 items-center justify-between gap-3 sm:h-16">
          <div className="min-w-0">
            <Link href="/agent" className="text-base font-bold text-green sm:text-lg">
              Haven Agent
            </Link>
            <p className="truncate text-xs text-ink/50 sm:text-sm">
              {agentName}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Link
              href="/"
              className="rounded-full px-3 py-2 text-xs font-medium text-ink/70 hover:bg-sand-light/60 sm:px-4 sm:text-sm"
            >
              View site
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-full bg-sand-light px-3 py-2 text-xs font-semibold text-green sm:px-4 sm:text-sm"
              >
                Log out
              </button>
            </form>
          </div>
        </div>

        <nav className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-3 scrollbar-none sm:mx-0 sm:px-0">
          {LINKS.map((link) => {
            const active = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-green text-white"
                    : "text-ink/70 hover:bg-sand-light/60 hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
