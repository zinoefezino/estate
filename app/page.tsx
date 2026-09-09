import FeaturedListings from "@/components/FeaturedListing";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="pt-24">
          <FeaturedListings />
        </div>
        <WhyChooseUs />
      </main>
    </>
  );
}
