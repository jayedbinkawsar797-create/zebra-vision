import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTABanner = () => {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px]" />
      
      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight mb-6">
            Your Next Cart Starts<br />
            with a <span className="text-gradient-red">Test Drive</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg">
            Experience the thrill of a Zebra Golf Cart firsthand. Feel the comfort, 
            luxury, and performance. Book your test drive today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/book-demo"
              className="group inline-flex items-center gap-2 px-10 py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest glow-red hover:scale-105 transition-all duration-300"
            >
              Book a Test Drive
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+19548204220"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full border border-foreground/20 font-bold text-sm uppercase tracking-widest text-foreground hover:border-primary/40 transition-all duration-300"
            >
              Call (954) 820-4220
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
