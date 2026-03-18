import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Configurator from "@/components/Configurator";
import FeaturesGrid from "@/components/FeaturesGrid";
import SpecsSection from "@/components/SpecsSection";
import TestDriveForm from "@/components/TestDriveForm";
import AboutSection from "@/components/AboutSection";
import StickyReservationBar from "@/components/StickyReservationBar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <Configurator />
      <FeaturesGrid />
      <SpecsSection />
      <TestDriveForm />
      <AboutSection />
      <Footer />
      <StickyReservationBar />
    </div>
  );
};

export default Index;
