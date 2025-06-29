import AboutSection from "@/components/HomePageComponents/AboutSection";
import ContactSection from "@/components/HomePageComponents/ContactSection";
import GallerySection from "@/components/HomePageComponents/GallerySection";
import HeroSection from "@/components/HomePageComponents/HeroSection";
import ServicesSection from "@/components/HomePageComponents/ServicesSection";
import TestimonialSection from "@/components/HomePageComponents/TestimonialSection";

export default function Home() {
  return (
    <div className="font-bold">
      <HeroSection />
      <div className="md:px-16 mx-auto">
        <AboutSection />
        <ServicesSection />
        <TestimonialSection />
        <GallerySection />
        <ContactSection />
      </div>
    </div>
  );
}
