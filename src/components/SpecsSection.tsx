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
    <section id="specs" className="relative py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_50%,hsl(0_85%_55%/0.03),transparent)]" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">Performance Data</p>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight">
            Built to <span className="text-gradient-red">Perform</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-2xl border border-border/20 bg-card/20 p-6 hover:-translate-y-1 hover:border-primary/20 hover:bg-card/40 transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <spec.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-[11px] text-muted-foreground uppercase tracking-widest font-semibold">{spec.label}</span>
              </div>
              <p className="text-3xl font-display font-black text-foreground mb-1">{spec.value}</p>
              <p className="text-sm text-muted-foreground mb-4">{spec.sub}</p>
              <div className="h-1 rounded-full bg-border/30 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${spec.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.08, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-zebra-red"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl border border-border/20 bg-card/20 p-8 md:p-12"
        >
          <h3 className="font-display font-black text-2xl mb-8 text-center text-foreground tracking-tight">
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
                  <div className="h-2 rounded-full bg-border/30 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.zebraBar}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-zebra-red"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Traditional</span>
                    <span className="text-muted-foreground">{row.trad}</span>
                  </div>
                  <div className="h-2 rounded-full bg-border/30 overflow-hidden">
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
