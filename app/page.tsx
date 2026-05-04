import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import FeaturedListings from "@/components/FeaturedListings";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedListings />
      <WhyUs />
      <Testimonials />
      <CTABanner />
    </>
  );
}
