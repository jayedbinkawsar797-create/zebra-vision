import { motion } from "framer-motion";
import { ChevronDown, Zap, Shield, Sun } from "lucide-react";
import heroImage from "@/assets/cart-black.png";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layered background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,hsl(193_100%_50%/0.08),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_60%,hsl(38_92%_50%/0.05),transparent)]" />
      
      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[15%] w-72 h-72 rounded-full bg-primary/5 blur-[100px]"
      />
      <motion.div
        animate={{ y: [15, -15, 15], x: [10, -10, 10] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] left-[10%] w-96 h-96 rounded-full bg-accent/5 blur-[120px]"
      />

      <div className="container relative z-10 mx-auto px-6 pt-28 pb-16">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-border/50 bg-card/30 backdrop-blur-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <span className="text-sm font-medium text-muted-foreground tracking-wide">
              Street Legal · Solar Powered · 5-Year Warranty
            </span>
          </div>
        </motion.div>

        {/* Main heading - centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] tracking-tighter">
            <span className="block">Redefining</span>
            <span className="block text-gradient-cyan">Luxury</span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-2 text-muted-foreground">
              on the Fairway <span className="text-gradient-amber">&amp; Beyond</span>
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center text-muted-foreground max-w-2xl mx-auto mb-10 text-base md:text-lg leading-relaxed"
        >
          Experience the pinnacle of electric mobility. Solar-integrated roofs,
          80+ mile range, and automotive-grade interiors — engineered for those
          who demand excellence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <a
            href="#configurator"
            className="group relative px-8 py-4 rounded-2xl bg-accent text-accent-foreground font-bold text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-8px_hsl(var(--solar-amber)/0.5)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Configure Your Cart
              <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
          </a>
          <a
            href="#testdrive"
            className="px-8 py-4 rounded-2xl border border-border/50 bg-card/20 backdrop-blur-xl font-semibold text-base text-foreground hover:bg-card/40 hover:border-primary/30 transition-all duration-300"
          >
            Book a Test Drive
          </a>
        </motion.div>

        {/* Hero Image with 3D perspective */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="relative max-w-5xl mx-auto"
          style={{ perspective: "1200px" }}
        >
          {/* Glow behind cart */}
          <div className="absolute inset-0 -bottom-10 bg-[radial-gradient(ellipse_70%_40%_at_50%_80%,hsl(193_100%_50%/0.12),transparent)]" />
          
          <motion.div
            whileHover={{ rotateY: 2, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src={heroImage}
              alt="Zebra Golf Cart 6-Seater in Onyx Black"
              className="relative z-10 w-full max-w-4xl mx-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
            />
          </motion.div>

          {/* Reflection */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[50%] h-20 bg-primary/5 blur-[40px] rounded-full" />
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Zap, value: "80+", unit: "mi", label: "Range Per Charge" },
              { icon: Shield, value: "30", unit: "mph", label: "Top Speed (LSV)" },
              { icon: Sun, value: "5", unit: "yr", label: "Battery Warranty" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="relative group text-center p-5 rounded-2xl border border-border/30 bg-card/20 backdrop-blur-sm hover:border-primary/20 hover:bg-card/40 transition-all duration-500"
              >
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl md:text-4xl font-display font-black text-foreground">{stat.value}</span>
                  <span className="text-sm font-semibold text-primary uppercase">{stat.unit}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#configurator" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span className="text-[11px] uppercase tracking-[0.2em] font-medium">Explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
