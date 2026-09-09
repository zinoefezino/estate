"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Menu01Icon,
  Cancel01Icon,
  Call02Icon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";

const NAV_LINKS = [
  { label: "Buy", href: "#" },
  { label: "Rent", href: "#" },
  { label: "Listings", href: "#" },
  { label: "Agents", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solid = scrolled || mobileOpen;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
          solid
            ? "bg-cream/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(27,58,47,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link
            href="/"
            className={`flex items-center gap-2 text-xl font-bold tracking-tight transition-colors ${
              solid ? "text-green" : "text-white"
            }`}
          >
            {/* <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sand text-green text-sm font-extrabold">
              H
            </span> */}
            Haven Realty
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[15px] font-medium transition-colors hover:text-sand ${
                  solid ? "text-ink" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href="tel:+2340000000000"
              className={`flex items-center gap-2 text-[15px] font-medium transition-colors ${
                solid ? "text-ink" : "text-white"
              }`}
            >
              <HugeiconsIcon icon={Call02Icon} size={18} strokeWidth={2} />
              +234 000 000 0000
            </a>
            <Link
              href="#"
              className="rounded-full bg-green px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-green-light"
            >
              List Your Property
            </Link>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className={`flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${
              solid ? "text-green" : "text-white"
            }`}
          >
            <HugeiconsIcon icon={Menu01Icon} size={26} strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-60 bg-cream transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-20 border-b border-black/5">
          <span className="flex items-center gap-2 text-xl font-bold tracking-tight text-green">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sand text-green text-sm font-extrabold">
              H
            </span>
            Haven Realty
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-green"
            aria-label="Close menu"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={28} />
          </button>
        </div>

        <div className="flex flex-col h-[calc(100%-5rem)] justify-between overflow-y-auto">
          <nav className="flex flex-col px-6 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between py-5 border-b border-black/5 text-lg font-medium text-ink"
              >
                {link.label}
                <HugeiconsIcon
                  icon={ArrowDown01Icon}
                  size={20}
                  className="-rotate-90 text-ink/50"
                />
              </Link>
            ))}
          </nav>

          <div className="px-6 py-6 border-t border-black/5 space-y-3">
            <a
              href="tel:+2340000000000"
              className="flex items-center justify-center gap-2 text-ink font-medium py-3"
            >
              <HugeiconsIcon icon={Call02Icon} size={18} />
              +234 000 000 0000
            </a>
            <Link
              href="#"
              onClick={() => setMobileOpen(false)}
              className="block text-center bg-green text-white px-5 py-3.5 rounded-full font-semibold"
            >
              List Your Property
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
