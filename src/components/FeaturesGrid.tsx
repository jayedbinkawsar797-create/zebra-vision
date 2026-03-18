import { motion } from "framer-motion";
import { Sun, Shield, Zap, Monitor, Battery, Cpu } from "lucide-react";
import dashImage from "@/assets/cart-dashboard.webp";

const features = [
  {
    icon: Sun,
    title: "Solar Powered Roof",
    description: "Integrated solar panels charge your battery while parked. Extend your range effortlessly with clean energy.",
    span: "col-span-1",
  },
  {
    icon: Shield,
    title: "Street Legal with VIN",
    description: "Every Zebra cart is fully street-legal (LSV) with a registered VIN number for public road use.",
    span: "col-span-1",
  },
  {
    icon: Zap,
    title: "80+ Mile Range",
    description: "Advanced lithium technology delivers 80–100 miles on a single 4-hour charge. Go further, charge faster.",
    span: "col-span-1",
  },
  {
    icon: Monitor,
    title: '13" Smart Display',
    description: "Wireless Apple CarPlay, Bluetooth audio with 4 speakers, and a 4K backup camera — all at your fingertips.",
    span: "col-span-1",
  },
  {
    icon: Battery,
    title: "5-Year Battery Warranty",
    description: "Industry-leading 52.1V 230Ah advanced lithium battery backed by a comprehensive 5-year warranty.",
    span: "col-span-1",
  },
  {
    icon: Cpu,
    title: "Carbon Fiber Interior",
    description: "Diamond-stitched leather seats, carbon fiber dash, 3 USB ports, and electro-hydraulic braking.",
    span: "col-span-1",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const FeaturesGrid = () => {
  return (
    <section id="features" className="relative py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">The Zebra Advantage</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold">
            Why Choose <span className="text-gradient-amber">Zebra</span>
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group glass-strong rounded-2xl p-8 hover:border-primary/20 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-xl mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Dashboard showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 glass-strong rounded-2xl overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Cockpit Experience</p>
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
                Command Center <span className="text-gradient-cyan">Redefined</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The Zebra dashboard features a 13" touchscreen with wireless Apple CarPlay, 
                real-time battery monitoring, and full vehicle diagnostics. Carbon fiber accents 
                and ambient LED lighting create an automotive luxury cockpit experience.
              </p>
              <ul className="space-y-3">
                {["Wireless Apple CarPlay & Android Auto", "4K Rear Backup Camera", "Bluetooth 4-Speaker Audio", "3 USB Charging Ports"].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative overflow-hidden">
              <img
                src={dashImage}
                alt="Zebra Cart Carbon Fiber Dashboard with 13-inch Display"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/80 md:to-background/40" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
