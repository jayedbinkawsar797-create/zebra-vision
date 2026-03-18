import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Shield, Sun, Users } from "lucide-react";

const stats = [
  { icon: Zap, value: 80, suffix: "+", unit: "mi", label: "Range Per Charge" },
  { icon: Shield, value: 30, suffix: "", unit: "mph", label: "Top Speed (LSV)" },
  { icon: Sun, value: 5, suffix: "", unit: "yr", label: "Battery Warranty" },
  { icon: Users, value: 500, suffix: "+", unit: "", label: "Happy Owners" },
];

const CountUp = ({ end, suffix }: { end: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const StatsCounter = () => {
  return (
    <section className="relative py-20">
      <div className="absolute inset-0 bg-card/40" />
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6"
            >
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-4 opacity-70" />
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl md:text-5xl font-display font-black text-foreground">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </span>
                {stat.unit && (
                  <span className="text-sm font-bold text-primary uppercase">{stat.unit}</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2 font-semibold uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
