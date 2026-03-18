import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Robert M.",
    location: "Naples, FL",
    rating: 5,
    text: "The Zebra 6-seater is hands-down the best golf cart I've ever owned. The solar roof actually works — I barely need to plug it in. The Apple CarPlay is a game changer on the course.",
  },
  {
    name: "Jennifer L.",
    location: "Scottsdale, AZ",
    rating: 5,
    text: "We've had our Terrain 6 Pro for six months now and absolutely love it. The carbon fiber dash and diamond-stitched seats make it feel like a luxury car. The 80+ mile range means we never worry about charging.",
  },
  {
    name: "David K.",
    location: "The Villages, FL",
    rating: 5,
    text: "After comparing every cart on the market, Zebra was the clear winner. Street-legal, incredible range, and the 5-year battery warranty gives real peace of mind. Worth every penny.",
  },
];

const TestimonialSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight">
            What Owners <span className="text-gradient-red">Say</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-border/20 bg-card/30 backdrop-blur-sm p-10 md:p-14 text-center"
            >
              <Quote className="w-10 h-10 text-primary/20 mx-auto mb-6" />
              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 font-medium">
                "{testimonials[current].text}"
              </p>
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="font-bold text-foreground">{testimonials[current].name}</p>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{testimonials[current].location}</p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-border/30 bg-card/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-primary" : "w-2 bg-border/50"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-11 h-11 rounded-full border border-border/30 bg-card/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
