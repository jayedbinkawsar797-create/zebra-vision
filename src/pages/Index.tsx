import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsCounter from "@/components/StatsCounter";
import ModelsShowcase from "@/components/ModelsShowcase";
import ParallaxDivider from "@/components/ParallaxDivider";
import Configurator from "@/components/Configurator";
import FeaturesGrid from "@/components/FeaturesGrid";
import GalleryStrip from "@/components/GalleryStrip";
import SpecsSection from "@/components/SpecsSection";
import FinancingSection from "@/components/FinancingSection";
import TestimonialSection from "@/components/TestimonialSection";
import CTABanner from "@/components/CTABanner";
import TestDriveForm from "@/components/TestDriveForm";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import StickyReservationBar from "@/components/StickyReservationBar";
import heroWide2 from "@/assets/hero-wide2.jpeg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsCounter />
      <ModelsShowcase />
      <ParallaxDivider
        image={heroWide2}
        title="Adventure Elevated."
        subtitle="Superior aesthetics, unmatched performance, built for the road and beyond."
      />
      <Configurator />
      <FeaturesGrid />
      <GalleryStrip />
      <SpecsSection />
      <FinancingSection />
      <TestimonialSection />
      <CTABanner />
      <TestDriveForm />
      <AboutSection />
      <Footer />
      <StickyReservationBar />
    </div>
  );
};

export default Index;
