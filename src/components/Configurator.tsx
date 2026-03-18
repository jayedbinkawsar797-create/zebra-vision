import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Palette, Armchair, CircleDot, Gauge } from "lucide-react";

import cartBlack from "@/assets/cart-black.png";
import cartBurgundy from "@/assets/cart-burgundy.png";
import cartBlue from "@/assets/cart-blue.png";
import cartGrey from "@/assets/cart-grey.webp";
import cartWhite from "@/assets/cart-white.webp";
import cartMaroon from "@/assets/cart-maroon.webp";

const colors = [
  { id: "black", label: "Onyx Black", hex: "#1a1a1a", image: cartBlack },
  { id: "burgundy", label: "Royal Burgundy", hex: "#6b1a2a", image: cartBurgundy },
  { id: "blue", label: "Sapphire Blue", hex: "#1a3a8a", image: cartBlue },
  { id: "grey", label: "Platinum Grey", hex: "#8a8a8a", image: cartGrey },
  { id: "white", label: "Pearl White", hex: "#e8e8e8", image: cartWhite },
  { id: "maroon", label: "Deep Maroon", hex: "#5a1020", image: cartMaroon },
];

const seatOptions = [
  { id: "tan", label: "Tan Leather", hex: "#c49a6c" },
  { id: "black", label: "Black Leather", hex: "#1a1a1a" },
  { id: "burgundy", label: "Burgundy Leather", hex: "#6b1a2a" },
  { id: "grey", label: "Grey Leather", hex: "#6a6a6a" },
];

const configOptions = [
  { id: "4seat", label: "4-Seater", price: "$14,999", battery: "51.2V 150Ah", motor: "5KW" },
  { id: "6seat", label: "6-Seater", price: "$17,999", battery: "51.2V 230Ah", motor: "5KW" },
  { id: "6seat-pro", label: "6-Seater Pro", price: "$19,999", battery: "73.6V 205Ah", motor: "7.5KW" },
];

const tireOptions = [
  { id: "street", label: "Street Tires" },
  { id: "allterrain", label: "All-Terrain" },
];

const rimOptions = [
  { id: "chrome-black", label: "Chrome & Black" },
  { id: "all-black", label: "All Black" },
  { id: "chrome-red", label: "Chrome & Red" },
];

const Configurator = () => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSeat, setSelectedSeat] = useState(seatOptions[0]);
  const [selectedConfig, setSelectedConfig] = useState(configOptions[1]);
  const [selectedTire, setSelectedTire] = useState(tireOptions[1]);
  const [selectedRim, setSelectedRim] = useState(rimOptions[0]);

  return (
    <section id="configurator" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
      
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Interactive Configurator</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold">
            Build Your <span className="text-gradient-cyan">Dream Cart</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Customize every detail. Choose your color, configuration, and features — see changes in real time.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Cart Display - 3 cols */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-3 relative"
          >
            <div className="relative rounded-2xl glass-strong p-8 overflow-hidden">
              {/* Ambient glow matching selected color */}
              <div
                className="absolute inset-0 opacity-20 blur-[80px] transition-colors duration-700"
                style={{ backgroundColor: selectedColor.hex }}
              />
              
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedColor.id}
                  src={selectedColor.image}
                  alt={`Zebra Cart in ${selectedColor.label}`}
                  initial={{ opacity: 0, scale: 0.95, rotateY: -5 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.95, rotateY: 5 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative z-10 w-full object-contain max-h-[500px]"
                />
              </AnimatePresence>

              {/* Config badge */}
              <div className="absolute top-6 left-6 z-20 glass rounded-full px-4 py-2 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedColor.hex, border: "2px solid hsl(var(--border))" }} />
                <span className="text-sm font-medium text-foreground">{selectedColor.label}</span>
              </div>

              <div className="absolute bottom-6 right-6 z-20 glass rounded-xl px-5 py-3">
                <p className="text-2xl font-display font-bold text-foreground">{selectedConfig.price}</p>
                <p className="text-xs text-muted-foreground">Starting from · Reserve for $1,000</p>
              </div>
            </div>
          </motion.div>

          {/* Options Panel - 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Configuration */}
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Gauge className="w-5 h-5 text-primary" />
                <h3 className="font-display font-bold text-lg text-foreground">Configuration</h3>
              </div>
              <div className="space-y-3">
                {configOptions.map((config) => (
                  <button
                    key={config.id}
                    onClick={() => setSelectedConfig(config)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                      selectedConfig.id === config.id
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-secondary/50 border border-transparent hover:border-border"
                    }`}
                  >
                    <div className="text-left">
                      <p className="font-semibold text-foreground">{config.label}</p>
                      <p className="text-xs text-muted-foreground">{config.battery} · {config.motor}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-display font-bold text-foreground">{config.price}</span>
                      {selectedConfig.id === config.id && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Body Color */}
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-5 h-5 text-primary" />
                <h3 className="font-display font-bold text-lg text-foreground">Body Color</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 ${
                      selectedColor.id === color.id
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-secondary/50 border border-transparent hover:border-border"
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-full border-2 transition-all duration-300"
                      style={{
                        backgroundColor: color.hex,
                        borderColor: selectedColor.id === color.id ? "hsl(var(--primary))" : "hsl(var(--border))",
                      }}
                    />
                    <span className="text-xs text-muted-foreground">{color.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Seat Color */}
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Armchair className="w-5 h-5 text-primary" />
                <h3 className="font-display font-bold text-lg text-foreground">Seat Color</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {seatOptions.map((seat) => (
                  <button
                    key={seat.id}
                    onClick={() => setSelectedSeat(seat)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                      selectedSeat.id === seat.id
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-secondary/50 border border-transparent hover:border-border"
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2"
                      style={{
                        backgroundColor: seat.hex,
                        borderColor: selectedSeat.id === seat.id ? "hsl(var(--primary))" : "hsl(var(--border))",
                      }}
                    />
                    <span className="text-sm text-foreground">{seat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tires & Rims */}
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CircleDot className="w-5 h-5 text-primary" />
                <h3 className="font-display font-bold text-lg text-foreground">Wheels</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Tires</p>
                  <div className="flex gap-3">
                    {tireOptions.map((tire) => (
                      <button
                        key={tire.id}
                        onClick={() => setSelectedTire(tire)}
                        className={`flex-1 p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                          selectedTire.id === tire.id
                            ? "bg-primary/10 border border-primary/30 text-foreground"
                            : "bg-secondary/50 border border-transparent text-muted-foreground hover:border-border"
                        }`}
                      >
                        {tire.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Rims</p>
                  <div className="flex gap-3">
                    {rimOptions.map((rim) => (
                      <button
                        key={rim.id}
                        onClick={() => setSelectedRim(rim)}
                        className={`flex-1 p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                          selectedRim.id === rim.id
                            ? "bg-primary/10 border border-primary/30 text-foreground"
                            : "bg-secondary/50 border border-transparent text-muted-foreground hover:border-border"
                        }`}
                      >
                        {rim.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Reserve CTA */}
            <a
              href="#testdrive"
              className="block w-full text-center py-4 rounded-xl bg-accent text-accent-foreground font-bold text-lg glow-amber hover:scale-[1.02] transition-transform duration-300"
            >
              Reserve for $1,000 →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Configurator;
