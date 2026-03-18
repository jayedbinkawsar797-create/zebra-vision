import { motion } from "framer-motion";
import { Sun, Shield, Zap, Monitor, Battery, Cpu } from "lucide-react";
import dashImage from "@/assets/cart-dashboard.webp";

const features = [
  { icon: Sun, title: "Solar Powered Roof", description: "Integrated solar panels charge your battery while parked. Extend your range effortlessly." },
  { icon: Shield, title: "Street Legal with VIN", description: "Every Zebra cart is fully street-legal (LSV) with a registered VIN number." },
  { icon: Zap, title: "80+ Mile Range", description: "Advanced lithium delivers 80–100 miles on a single 4-hour charge." },
  { icon: Monitor, title: '13" Smart Display', description: "Wireless Apple CarPlay, Bluetooth audio, and 4K backup camera." },
  { icon: Battery, title: "5-Year Warranty", description: "52.1V 230Ah advanced lithium battery backed by 5-year warranty." },
  { icon: Cpu, title: "Carbon Fiber Interior", description: "Diamond-stitched seats, carbon fiber dash, 3 USB ports." },
];

const FeaturesGrid = () => {
  return (
    <section id="features" className="relative py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">The Zebra Advantage</p>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight">
            Why Choose <span className="text-gradient-red">Zebra</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-2xl border border-border/20 bg-card/20 p-7 hover:border-primary/20 hover:bg-card/40 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.1)] transition-all duration-500">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Dashboard showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 rounded-3xl border border-border/20 bg-card/20 overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">Cockpit Experience</p>
              <h3 className="text-3xl md:text-4xl font-display font-black mb-4 text-foreground tracking-tight">
                Command Center <span className="text-gradient-red">Redefined</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                13" touchscreen with wireless Apple CarPlay, real-time battery monitoring, 
                and full vehicle diagnostics. Carbon fiber accents and ambient LED lighting.
              </p>
              <ul className="space-y-3">
                {["Wireless Apple CarPlay & Android Auto", "4K Rear Backup Camera", "Bluetooth 4-Speaker Audio", "3 USB Charging Ports"].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-foreground font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative overflow-hidden">
              <img src={dashImage} alt="Zebra Cart Carbon Fiber Dashboard" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/80 md:to-background/40" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
