export const dynamic = "force-dynamic";

import AgentConsultation from "@/components/AgentConsultation";
import ConversionCta from "@/components/ConversionCta";
import FeaturedListings from "@/components/FeaturedListing";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonial";
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
        <Testimonials />
        <AgentConsultation />
        <ConversionCta />
      </main>
      <Footer />
    </>
  );
}
