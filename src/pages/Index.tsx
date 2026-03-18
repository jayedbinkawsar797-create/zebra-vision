import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsCounter from "@/components/StatsCounter";
import ModelsShowcase from "@/components/ModelsShowcase";
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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsCounter />
      <ModelsShowcase />
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
