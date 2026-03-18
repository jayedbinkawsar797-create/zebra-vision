import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/z2-hero.webp";

const words = ["FUTURE", "FAIRWAY", "LUXURY", "ROAD"];

const HeroSection = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative h-screen min-h-[700px] flex items-end justify-center overflow-hidden pb-32">
      {/* Parallax Background */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 -top-[10%] -bottom-[10%]"
        style={{ transform: `translateY(${offsetY * 0.25}px)`, willChange: "transform" }}
      >
        <img
          src={heroBg}
          alt="Zebra Golf Cart front grille close-up"
          className="w-full h-full object-cover object-center scale-110"
        />
      </div>

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
      <div className="absolute inset-0 bg-background/30" />

      {/* Animated red vignette */}
      <motion.div
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_70%,hsl(var(--primary)/0.15),transparent)]"
      />

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
      }} />

      <div className="container relative z-10 mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-2xl text-xs font-bold tracking-[0.25em] uppercase text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Street Legal · Solar Powered · 5-Year Warranty
          </span>
        </motion.div>

        {/* Heading line 1 */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-display font-black leading-none tracking-tighter text-foreground"
          >
            REDEFINING THE
          </motion.h1>
        </div>

        {/* Animated rotating word */}
        <div className="overflow-hidden mb-8 h-[1.1em] relative" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
          <AnimatePresence mode="wait">
            <motion.h1
              key={words[wordIndex]}
              initial={{ y: "120%", rotateX: -40 }}
              animate={{ y: 0, rotateX: 0 }}
              exit={{ y: "-120%", rotateX: 40, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black leading-none tracking-tighter text-gradient-red absolute inset-0"
              style={{ perspective: "600px" }}
            >
              {words[wordIndex]}.
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Animated separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
          className="w-32 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8 origin-center"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-muted-foreground max-w-2xl mx-auto mb-10 text-base md:text-lg leading-relaxed"
        >
          Luxury meets innovation. Solar-integrated roofs, 80+ mile range, and
          automotive-grade interiors — built for the road and beyond.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/customize"
            className="group relative px-10 py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest overflow-hidden transition-all duration-300 hover:scale-105 glow-red"
          >
            <span className="relative z-10 flex items-center gap-2">
              Build Your Cart
              <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>
          <Link
            to="/book-demo"
            className="px-10 py-4 rounded-full border border-foreground/20 bg-foreground/5 backdrop-blur-xl font-bold text-sm uppercase tracking-widest text-foreground hover:bg-foreground/10 hover:border-primary/40 transition-all duration-300"
          >
            Book a Test Drive
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#models" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">Explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
