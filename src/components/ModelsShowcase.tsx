import { motion } from "framer-motion";
import cartAngle1 from "@/assets/cart-angle1.png";
import cartAngle2 from "@/assets/cart-angle2.png";
import cartAngle3 from "@/assets/cart-angle3.png";

const models = [
  {
    image: cartAngle1,
    name: "Breeze 4L",
    seats: "4-Seater",
    price: "From $14,999",
    specs: ["51.2V 150Ah Lithium", "5KW AC Motor", "80+ Mile Range"],
  },
  {
    image: cartAngle2,
    name: "Terrain 6",
    seats: "6-Seater",
    price: "From $17,999",
    specs: ["51.2V 230Ah Lithium", "5KW AC Motor", "100+ Mile Range"],
    featured: true,
  },
  {
    image: cartAngle3,
    name: "Terrain 6 Pro",
    seats: "6-Seater Pro",
    price: "From $19,999",
    specs: ["73.6V 205Ah Lithium", "7.5KW AC Motor", "100+ Mile Range"],
  },
];

const ModelsShowcase = () => {
  return (
    <section id="models" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_30%_at_50%_0%,hsl(0_85%_55%/0.04),transparent)]" />
      
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">Our Lineup</p>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight">
            Choose Your <span className="text-gradient-red">Model</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {models.map((model, i) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`group relative rounded-3xl border bg-card/30 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                model.featured 
                  ? "border-primary/40 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.2)]" 
                  : "border-border/30 hover:border-primary/20"
              }`}
            >
              {model.featured && (
                <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest">
                  Flagship
                </div>
              )}
              
              {/* Image container - fixed aspect ratio */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-card/50 to-background/50">
                <img
                  src={model.image}
                  alt={model.name}
                  className="absolute inset-0 w-full h-full object-contain object-center p-4 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-card to-transparent" />
              </div>

              <div className="p-6 pt-2">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-display font-black text-xl text-foreground">{model.name}</h3>
                  <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{model.seats}</span>
                </div>
                <p className="text-primary font-bold text-lg mb-4">{model.price}</p>
                <ul className="space-y-2 mb-6">
                  {model.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      {spec}
                    </li>
                  ))}
                </ul>
                <a
                  href="#configurator"
                  className="block w-full text-center py-3 rounded-full border border-primary/30 text-primary font-bold text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  Configure →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModelsShowcase;
