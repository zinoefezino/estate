import Link from "next/link";

const LISTING_LINKS = [
  { label: "Buy a home", href: "/listings?listing=sale" },
  { label: "Rent a home", href: "/listings?listing=rent" },
  { label: "Browse listings", href: "/listings" },
];

const COMPANY_LINKS = [
  { label: "Why Haven", href: "/#about" },
  { label: "Contact", href: "/#contact" },
  { label: "Agent login", href: "/agent/login" },
];

export default function Footer() {
  return (
    <footer className="bg-cream px-6 pb-8 pt-16 text-ink lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-ink/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.25fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-green">
              Haven Realty
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/60">
              Thoughtful guidance for finding a home that feels like yours.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-sand">Explore</h2>
            <ul className="mt-4 space-y-3 text-sm text-ink/65">
              {LISTING_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-green">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-sand">Haven</h2>
            <ul className="mt-4 space-y-3 text-sm text-ink/65">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-green">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div id="contact">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-sand">Get in touch</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/60">
              Have a question about a listing or want to work with Haven?
            </p>
            <a
              href="mailto:agent@havenrealty.com"
              className="mt-4 inline-block text-sm font-semibold text-green underline decoration-sand underline-offset-4 transition-colors hover:text-green-light"
            >
              agent@havenrealty.com
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-xs text-ink/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Haven Realty. All rights reserved.</span>
          <span>Find your place. Feel at home.</span>
        </div>
      </div>
    </footer>
  );
}
