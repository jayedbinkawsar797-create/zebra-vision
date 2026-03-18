import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Palette, Armchair, CircleDot, Gauge, RotateCcw, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import cartBlack from "@/assets/cart-black.png";
import cartBurgundy from "@/assets/cart-burgundy.png";
import cartBlue from "@/assets/cart-blue.png";
import cartWhite from "@/assets/cart-white.webp";

const colors = [
  { id: "black", label: "Onyx Black", hex: "#1a1a1a", image: cartBlack },
  { id: "burgundy", label: "Royal Burgundy", hex: "#6b1a2a", image: cartBurgundy },
  { id: "blue", label: "Sapphire Blue", hex: "#1a3a8a", image: cartBlue },
  { id: "white", label: "Pearl White", hex: "#e8e8e8", image: cartWhite },
];

const seatOptions = [
  { id: "tan", label: "Tan Leather", hex: "#c49a6c" },
  { id: "black", label: "Black Leather", hex: "#1a1a1a" },
  { id: "burgundy", label: "Burgundy", hex: "#6b1a2a" },
  { id: "grey", label: "Grey Leather", hex: "#6a6a6a" },
];

const configOptions = [
  { id: "4seat", label: "Breeze 4L", sub: "4-Seater", price: "$14,999", battery: "51.2V 150Ah", motor: "5KW" },
  { id: "4seat-pro", label: "Breeze 4L Pro", sub: "4-Seater Pro", price: "$15,999", battery: "51.2V 230Ah", motor: "5KW" },
  { id: "6seat", label: "Terrain 6", sub: "6-Seater", price: "$17,999", battery: "51.2V 230Ah", motor: "5KW" },
  { id: "6seat-pro", label: "Terrain 6 Pro", sub: "6-Seater Pro", price: "$19,999", battery: "73.6V 205Ah", motor: "7.5KW" },
];

const tireOptions = [
  { id: "street", label: "Street Tires" },
  { id: "allterrain", label: "All-Terrain Tires" },
];

const rimOptions = [
  { id: "chrome-black", label: "Chrome & Black" },
  { id: "all-black", label: "All Black" },
  { id: "chrome-red", label: "Chrome & Red" },
  { id: "red-chrome", label: "Red & Chrome" },
];

const accessoryOptions = [
  { id: "lightbar", label: "Small Bumper Light Bar", price: "+$299" },
];


const Configurator = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSeat, setSelectedSeat] = useState(seatOptions[0]);
  const [selectedConfig, setSelectedConfig] = useState(configOptions[2]);
  const [selectedTire, setSelectedTire] = useState(tireOptions[1]);
  const [selectedRim, setSelectedRim] = useState(rimOptions[0]);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"model" | "exterior" | "interior" | "wheels">("model");

  const tabs = [
    { id: "model" as const, label: "Model", icon: Gauge },
    { id: "exterior" as const, label: "Color", icon: Palette },
    { id: "interior" as const, label: "Seats", icon: Armchair },
    { id: "wheels" as const, label: "Wheels", icon: CircleDot },
  ];

  const handleReset = () => {
    setSelectedColor(colors[0]);
    setSelectedSeat(seatOptions[0]);
    setSelectedConfig(configOptions[2]);
    setSelectedTire(tireOptions[1]);
    setSelectedRim(rimOptions[0]);
    setSelectedAccessories([]);
  };

  const toggleAccessory = (id: string) => {
    setSelectedAccessories((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    const config = {
      model: selectedConfig,
      color: { id: selectedColor.id, label: selectedColor.label, hex: selectedColor.hex },
      seat: selectedSeat,
      tire: selectedTire,
      rim: selectedRim,
      accessories: selectedAccessories,
    };
    // Store in sessionStorage for the quote page
    sessionStorage.setItem("zebra-config", JSON.stringify(config));
    navigate("/quote");
  };

  return (
    <section id="configurator" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_30%_50%,hsl(0_85%_55%/0.03),transparent)]" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">Interactive Configurator</p>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight">
            Build Your <span className="text-gradient-red">Dream Cart</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Customize every detail, then get your personalized quote.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Cart Display - Left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative lg:sticky lg:top-28"
          >
            <div className="relative rounded-3xl border border-border/20 bg-card/30 backdrop-blur-sm overflow-hidden">
              {/* Ambient glow */}
              <div
                className="absolute inset-0 opacity-10 blur-[100px] transition-colors duration-700"
                style={{ backgroundColor: selectedColor.hex }}
              />

              {/* Config strip */}
              <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full border-2 border-border/50" style={{ backgroundColor: selectedColor.hex }} />
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider">{selectedColor.label}</span>
                </div>
                <button onClick={handleReset} className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider font-semibold">
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* Cart image */}
              <div className="pt-14 pb-8 px-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedColor.id}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src={selectedColor.image}
                      alt={`Zebra Cart in ${selectedColor.label}`}
                      className="w-full object-contain max-h-[420px] drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] mx-auto"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Ground reflection */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

              {/* Price badge */}
              <div className="absolute bottom-4 right-5 z-20">
                <div className="px-5 py-2.5 rounded-2xl border border-border/20 bg-card/60 backdrop-blur-xl">
                  <p className="text-2xl font-display font-black text-foreground">{selectedConfig.price}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Starting From</p>
                </div>
              </div>
            </div>

            {/* Summary chips */}
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                { label: selectedConfig.label, value: selectedConfig.sub },
                { label: "Color", value: selectedColor.label },
                { label: "Seats", value: selectedSeat.label },
                { label: "Tires", value: selectedTire.label },
                { label: "Rims", value: selectedRim.label },
              ].map((chip) => (
                <span key={chip.label} className="px-3 py-1.5 rounded-full border border-border/30 bg-card/30 text-[11px] font-semibold text-muted-foreground">
                  {chip.label}: <span className="text-foreground">{chip.value}</span>
                </span>
              ))}
            </div>
          </motion.div>

          {/* Options Panel - Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Tab Navigation */}
            <div className="flex rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "model" && (
                  <div className="space-y-3">
                    <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Select Configuration</h3>
                    {configOptions.map((config) => (
                      <button
                        key={config.id}
                        onClick={() => setSelectedConfig(config)}
                        className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border ${
                          selectedConfig.id === config.id
                            ? "bg-primary/10 border-primary/40 shadow-[0_0_30px_-10px_hsl(var(--primary)/0.15)]"
                            : "bg-card/30 border-border/20 hover:border-border/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-display font-bold text-lg text-foreground">{config.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{config.sub} · {config.battery} · {config.motor}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-display font-black text-xl text-foreground">{config.price}</span>
                            {selectedConfig.id === config.id && (
                              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                <Check className="w-3.5 h-3.5 text-primary-foreground" />
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {activeTab === "exterior" && (
                  <div>
                    <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Body Color</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {colors.map((color) => (
                        <button
                          key={color.id}
                          onClick={() => setSelectedColor(color)}
                          className={`group flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 border ${
                            selectedColor.id === color.id
                              ? "bg-primary/10 border-primary/40"
                              : "bg-card/30 border-border/20 hover:border-border/50"
                          }`}
                        >
                          <div className="relative">
                            <div
                              className="w-14 h-14 rounded-full border-2 transition-all duration-300 group-hover:scale-110"
                              style={{
                                backgroundColor: color.hex,
                                borderColor: selectedColor.id === color.id ? "hsl(var(--primary))" : "hsl(var(--border))",
                                boxShadow: selectedColor.id === color.id ? `0 0 25px ${color.hex}60` : "none",
                              }}
                            />
                            {selectedColor.id === color.id && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                <Check className="w-3 h-3 text-primary-foreground" />
                              </div>
                            )}
                          </div>
                          <span className="text-sm text-foreground font-bold">{color.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "interior" && (
                  <div>
                    <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Seat Material & Color</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {seatOptions.map((seat) => (
                        <button
                          key={seat.id}
                          onClick={() => setSelectedSeat(seat)}
                          className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 border ${
                            selectedSeat.id === seat.id
                              ? "bg-primary/10 border-primary/40"
                              : "bg-card/30 border-border/20 hover:border-border/50"
                          }`}
                        >
                          <div
                            className="w-10 h-10 rounded-full border-2 shrink-0"
                            style={{
                              backgroundColor: seat.hex,
                              borderColor: selectedSeat.id === seat.id ? "hsl(var(--primary))" : "hsl(var(--border))",
                            }}
                          />
                          <div className="text-left">
                            <span className="text-sm font-bold text-foreground block">{seat.label}</span>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Diamond Stitched</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "wheels" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Tire Type</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {tireOptions.map((tire) => (
                          <button
                            key={tire.id}
                            onClick={() => setSelectedTire(tire)}
                            className={`p-4 rounded-2xl text-sm font-bold transition-all duration-300 border ${
                              selectedTire.id === tire.id
                                ? "bg-primary/10 border-primary/40 text-foreground"
                                : "bg-card/30 border-border/20 text-muted-foreground hover:border-border/50"
                            }`}
                          >
                            {tire.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Rim Style</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {rimOptions.map((rim) => (
                          <button
                            key={rim.id}
                            onClick={() => setSelectedRim(rim)}
                            className={`p-3 rounded-2xl text-xs font-bold transition-all duration-300 border text-center ${
                              selectedRim.id === rim.id
                                ? "bg-primary/10 border-primary/40 text-foreground"
                                : "bg-card/30 border-border/20 text-muted-foreground hover:border-border/50"
                            }`}
                          >
                            {rim.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Accessories</h3>
                      {accessoryOptions.map((acc) => (
                        <button
                          key={acc.id}
                          onClick={() => toggleAccessory(acc.id)}
                          className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 border ${
                            selectedAccessories.includes(acc.id)
                              ? "bg-primary/10 border-primary/40"
                              : "bg-card/30 border-border/20 hover:border-border/50"
                          }`}
                        >
                          <span className="text-sm font-bold text-foreground">{acc.label}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground">{acc.price}</span>
                            {selectedAccessories.includes(acc.id) && (
                              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                <Check className="w-3 h-3 text-primary-foreground" />
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Continue CTA */}
            <div className="pt-4 space-y-3">
              <button
                onClick={handleContinue}
                className="group block w-full text-center py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest glow-red hover:scale-[1.02] transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  Continue to Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <p className="text-center text-[11px] text-muted-foreground">
                Review your build & get a personalized quote
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Configurator;
