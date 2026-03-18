import { motion } from "framer-motion";
import { Battery, Gauge, Zap, Timer, Ruler, Shield } from "lucide-react";

const specs = [
  { icon: Battery, label: "Battery", value: "52.1V 230Ah", sub: "Advanced Lithium", progress: 95 },
  { icon: Gauge, label: "Top Speed", value: "30 MPH", sub: "Street Legal LSV", progress: 75 },
  { icon: Zap, label: "Range", value: "80–100 mi", sub: "Single Charge", progress: 90 },
  { icon: Timer, label: "Charge Time", value: "4 Hours", sub: "Fast Charge", progress: 85 },
  { icon: Ruler, label: "Motor", value: "5 KW AC", sub: "High-Performance", progress: 80 },
  { icon: Shield, label: "Warranty", value: "5 Years", sub: "Battery Coverage", progress: 100 },
];

const SpecsSection = () => {
  return (
    <section id="specs" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Performance Data</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold">
            Built to <span className="text-gradient-cyan">Perform</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-strong rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <spec.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{spec.label}</span>
              </div>
              <p className="text-3xl font-display font-bold text-foreground mb-1">{spec.value}</p>
              <p className="text-sm text-muted-foreground mb-4">{spec.sub}</p>
              {/* Progress bar */}
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${spec.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.08, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-cyan"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass-strong rounded-2xl p-8 md:p-12"
        >
          <h3 className="font-display font-bold text-2xl mb-8 text-center text-foreground">
            Zebra vs. Traditional Golf Carts
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: "Range", zebra: "80–100 mi", trad: "15–25 mi", zebraBar: 90, tradBar: 25 },
              { label: "Charge Time", zebra: "4 hrs", trad: "8–12 hrs", zebraBar: 90, tradBar: 35 },
              { label: "Maintenance", zebra: "Minimal", trad: "Frequent", zebraBar: 95, tradBar: 30 },
            ].map((row) => (
              <div key={row.label} className="space-y-4">
                <p className="font-display font-bold text-foreground text-center">{row.label}</p>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-primary font-semibold">Zebra</span>
                    <span className="text-foreground">{row.zebra}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.zebraBar}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-cyan"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Traditional</span>
                    <span className="text-muted-foreground">{row.trad}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.tradBar}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-muted"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecsSection;
