import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Calendar03Icon,
  Compass01Icon,
  File01Icon,
} from "@hugeicons/core-free-icons";

const STEPS = [
  {
    icon: Compass01Icon,
    number: "01",
    title: "Tell us what matters",
    description:
      "Share your budget, timing, and the details that make a place feel right.",
  },
  {
    icon: Calendar03Icon,
    number: "02",
    title: "Meet your local expert",
    description:
      "A Haven agent narrows the search and helps you compare your best options.",
  },
  {
    icon: File01Icon,
    number: "03",
    title: "Move forward clearly",
    description:
      "From offer to handover, you always know the next step and what to expect.",
  },
];

export default function AgentConsultation() {
  return (
    <section className="bg-cream px-6 py-22 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-sand">
              Your Haven, your way
            </span>
            <h2 className="mt-2 max-w-md text-3xl font-extrabold text-green sm:text-4xl">
              A little guidance goes a long way
            </h2>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink/65">
              Whether you are buying, renting, or preparing to sell, our agents
              make the process feel simple from the first conversation.
            </p>
            <Link
              href="/listings"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-green px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-green-light"
            >
              Start exploring
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={18}
                strokeWidth={2}
              />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl bg-white p-6 shadow-sm shadow-black/5"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sand-light/60 text-green">
                    <HugeiconsIcon icon={step.icon} size={21} strokeWidth={2} />
                  </span>
                  <span className="text-sm font-semibold text-sand">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-6 font-semibold text-green">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
