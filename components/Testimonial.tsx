import { HugeiconsIcon } from "@hugeicons/react";
import { QuoteUpIcon, StarIcon } from "@hugeicons/core-free-icons";

type Testimonial = {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Alan Jones",
    location: "Bought in Lakeview, Austin",
    quote:
      "Our agent found us three homes that matched exactly what we asked for, then walked us through every step of closing. We had keys in under six weeks.",
    rating: 5,
  },
  {
    id: "2",
    name: "Erlinda Martinez",
    location: "Sold in Bayside, Seattle",
    quote:
      "Haven priced our listing right the first time. We had two offers within a week and never had to drop the price once.",
    rating: 5,
  },
  {
    id: "3",
    name: "Priya Nair",
    location: "Rented in Midtown, Chicago",
    quote:
      "I was relocating on short notice and the team turned around a lease in days, not weeks. Genuinely made a stressful move easy.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-cream px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-sand">
            Client Stories
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-green sm:text-4xl">
            Loved by buyers, sellers, and renters alike
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-white p-7 shadow-sm shadow-black/5">
      <HugeiconsIcon
        icon={QuoteUpIcon}
        size={28}
        strokeWidth={2}
        className="text-sand"
      />

      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <HugeiconsIcon
            key={i}
            icon={StarIcon}
            size={16}
            strokeWidth={0}
            className={
              i < testimonial.rating
                ? "fill-sand text-sand"
                : "fill-ink/10 text-ink/10"
            }
          />
        ))}
      </div>

      <p className="flex-1 text-[15px] leading-relaxed text-ink/80">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="flex items-center gap-3 border-t border-ink/10 pt-5">
        <div>
          <div className="text-sm font-semibold text-ink">
            {testimonial.name}
          </div>
          <div className="text-xs text-ink/60">{testimonial.location}</div>
        </div>
      </div>
    </div>
  );
}
