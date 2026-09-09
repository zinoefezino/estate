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
    <header className="border-b border-ink/10 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex items-center justify-between gap-6">
          <Link href="/agent" className="text-lg font-bold text-green">
            Haven Agent
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            {LINKS.map((link) => {
              const active = link.exact
                ? pathname === link.href
                : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
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

        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-ink/60">Signed in as {agentName}</span>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-full px-4 py-2 text-sm font-medium text-ink/70 hover:bg-sand-light/60"
            >
              View site
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-full bg-sand-light px-4 py-2 text-sm font-semibold text-green"
              >
                Log out
              </button>
            </form>
          </div>
        </div>

        <nav className="flex gap-1 sm:hidden">
          {LINKS.map((link) => {
            const active = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                  active ? "bg-green text-white" : "text-ink/70"
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
