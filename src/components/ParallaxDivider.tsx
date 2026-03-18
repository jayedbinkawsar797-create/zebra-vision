import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ParallaxDividerProps {
  image: string;
  title: string;
  subtitle?: string;
}

const ParallaxDivider = ({ image, title, subtitle }: ParallaxDividerProps) => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-[50vh] min-h-[400px] overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 -top-[20%] -bottom-[20%]"
        style={{
          transform: `translateY(${offsetY * 0.15}px)`,
          willChange: "transform",
        }}
      >
        <img src={image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
      <div className="relative z-10 text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-display font-black tracking-tight text-foreground"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-4 text-lg max-w-xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default ParallaxDivider;
