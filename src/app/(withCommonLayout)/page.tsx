import AboutSection from "@/components/HomePageComponents/AboutSection";
import HeroSection from "@/components/HomePageComponents/HeroSection";
import ServicesSection from "@/components/HomePageComponents/ServicesSection";
import TestimonialSection from "@/components/HomePageComponents/TestimonialSection";

export default function Home() {
  return (
    <div className="font-bold">
      <HeroSection />
      <div className="absolute top-160 px-2 md:px-16">
        <AboutSection />
        <ServicesSection />
        <TestimonialSection />
      </div>
    </div>
  );
}
