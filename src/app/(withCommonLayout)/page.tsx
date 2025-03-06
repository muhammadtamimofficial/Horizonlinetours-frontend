import AboutSection from "@/components/HomePageComponents/AboutSection";
import HeroSection from "@/components/HomePageComponents/HeroSection";

export default function Home() {
  return (
    <div className="font-bold">
      <HeroSection />
      <div className="px-2 md:px-16">
        <AboutSection />
      </div>
    </div>
  );
}
