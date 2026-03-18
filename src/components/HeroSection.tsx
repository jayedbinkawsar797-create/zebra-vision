import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-wide.png";

const HeroSection = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="hero" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 -top-[10%] -bottom-[10%]"
        style={{
          transform: `translateY(${offsetY * 0.3}px)`,
          willChange: "transform",
        }}
      >
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Dark overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

      {/* Subtle red ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/8 blur-[150px]" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        {/* Animated badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-xl text-sm font-semibold tracking-widest uppercase text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Street Legal · Solar Powered · 5-Year Warranty
          </span>
        </motion.div>

        {/* Main heading with animated text */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-display font-black leading-[0.95] tracking-tighter"
          >
            DRIVE INTO THE
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-display font-black leading-[0.95] tracking-tighter text-gradient-red"
          >
            FUTURE.
          </motion.h1>
        </div>

        {/* Animated line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}
          className="w-24 h-[2px] bg-primary mx-auto mb-8 origin-center"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-muted-foreground max-w-2xl mx-auto mb-10 text-base md:text-lg leading-relaxed"
        >
          Luxury meets innovation. Solar-integrated roofs, 80+ mile range, and 
          automotive-grade interiors — redefining the fairway and beyond.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="#configurator"
            className="group relative px-10 py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest overflow-hidden transition-all duration-300 hover:scale-105 glow-red"
          >
            <span className="relative z-10 flex items-center gap-2">
              Customize Your Cart
              <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </a>
          <a
            href="#testdrive"
            className="px-10 py-4 rounded-full border border-foreground/20 bg-foreground/5 backdrop-blur-xl font-bold text-sm uppercase tracking-widest text-foreground hover:bg-foreground/10 hover:border-primary/40 transition-all duration-300"
          >
            Book a Test Drive
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <a href="#models" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
