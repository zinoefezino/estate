import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShieldCheckIcon,
  HandshakeIcon,
  Clock01Icon,
  Award01Icon,
} from "@hugeicons/core-free-icons";

type Feature = {
  icon: typeof ShieldCheckIcon;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    icon: ShieldCheckIcon,
    title: "Verified Listings",
    description:
      "Every property is inspected and confirmed before it goes live.",
  },
  {
    icon: HandshakeIcon,
    title: "Trusted Agents",
    description:
      "Local experts who know the neighborhood and negotiate for you.",
  },
  {
    icon: Clock01Icon,
    title: "Fast Closings",
    description: "Streamlined paperwork gets you the keys sooner, not later.",
  },
  {
    icon: Award01Icon,
    title: "Award-Winning Service",
    description:
      "Recognized for client satisfaction across every market we serve.",
  },
];

const STATS = [
  { value: "12+", label: "Years in Business" },
  { value: "3,400+", label: "Properties Sold" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "45", label: "Agents Nationwide" },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-green px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative h-105 overflow-hidden rounded-2xl lg:h-120">
            <Image
              src="/about.jpg"
              alt="Agent handing over house keys to happy clients"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-sand">
              Why Choose Haven
            </span>
            <h2 className="mt-2 max-w-md text-3xl font-extrabold text-white sm:text-4xl">
              A smoother way to buy, sell, and rent
            </h2>
            <p className="mt-4 max-w-md text-sand-light/90">
              We pair local expertise with a genuinely simple process, so you
              spend less time worrying and more time picturing yourself home.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="flex flex-col gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-sand">
                    <HugeiconsIcon
                      icon={feature.icon}
                      size={22}
                      strokeWidth={2}
                    />
                  </span>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm text-white/70">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-8 border-t border-white/10 pt-12 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <div className="text-3xl font-extrabold text-sand sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
