import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Call02Icon } from "@hugeicons/core-free-icons";

export default function ConversionCta() {
  return (
    <section className="px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-green px-7 py-14 sm:px-12 lg:px-16 lg:py-16">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-sand/20" />
          <div className="absolute -bottom-36 right-16 h-80 w-80 rounded-full border border-white/10" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-wide text-sand">
                Ready when you are
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
                The right next move starts here.
              </h2>
              <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-white/75">
                Browse homes that fit your life, or let a Haven agent help you
                make your next move with confidence.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/listings?listing=sale"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-sand px-5 py-3 text-[15px] font-semibold text-green transition-colors hover:bg-sand-light"
              >
                Find a home
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={18}
                  strokeWidth={2}
                />
              </Link>
              <a
                href="tel:+2340000000000"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                <HugeiconsIcon icon={Call02Icon} size={18} strokeWidth={2} />
                +234 000 000 0000
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
