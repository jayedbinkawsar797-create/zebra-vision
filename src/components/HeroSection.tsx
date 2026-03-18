import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/cart-black.png";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />
      
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-6 pt-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              Street Legal · Solar Powered · 5-Year Warranty
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[0.95] tracking-tight">
              Redefining{" "}
              <span className="text-gradient-cyan">Luxury</span>
              <br />
              on the Fairway
              <br />
              <span className="text-gradient-amber">& Beyond</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Experience the pinnacle of electric mobility. Solar-integrated roofs, 
              80+ mile range, and automotive-grade interiors — engineered for those 
              who demand excellence.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#configurator"
                className="group px-8 py-4 rounded-xl bg-accent text-accent-foreground font-bold text-base glow-amber hover:scale-105 transition-transform duration-300"
              >
                Configure Your Cart
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href="#testdrive"
                className="px-8 py-4 rounded-xl glass font-semibold text-base text-foreground hover:bg-foreground/10 transition-colors duration-300"
              >
                Book a Test Drive
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-10 pt-4">
              {[
                { value: "80+", label: "Mile Range" },
                { value: "30", label: "MPH Top Speed" },
                { value: "5yr", label: "Battery Warranty" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-display font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px] scale-75" />
            <img
              src={heroImage}
              alt="Zebra Golf Cart 6-Seater in Onyx Black"
              className="relative z-10 w-full max-w-2xl object-contain animate-float drop-shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a href="#configurator" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <span className="text-xs uppercase tracking-widest">Explore</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
