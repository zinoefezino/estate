import Image from "next/image";
import HeroSearchBar from "./HeroSearchBar";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/hero3.avif"
          alt="Modern home exterior"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-green/95 via-green/60 to-green/45" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 pb-32 pt-40 lg:px-10 lg:pb-40">
        <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-sand-light backdrop-blur-sm">
          Trusted by 2,000+ happy homeowners
        </span>
        <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
          Find a home that feels like Haven
        </h1>
        <p className="mt-5 max-w-lg text-lg text-white/85">
          Browse curated listings, connect with agents who know your
          neighborhood, and move into a place that&apos;s truly yours.
        </p>
      </div>

      <HeroSearchBar />
    </section>
  );
}
