import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, Palette, Armchair, CircleDot, Gauge, RotateCcw, ArrowRight,
  Battery, Paintbrush, Settings2, Wrench
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  { id: "4seat", label: "Breeze 4L", sub: "4-Seater", price: "$14,999", battery: "51.2V 150Ah", motor: "5KW", seats: 4 },
  { id: "4seat-pro", label: "Breeze 4L Pro", sub: "4-Seater Pro", price: "$15,999", battery: "51.2V 230Ah", motor: "5KW", seats: 4 },
  { id: "6seat", label: "Terrain 6", sub: "6-Seater", price: "$17,999", battery: "51.2V 230Ah", motor: "5KW", seats: 6 },
  { id: "6seat-pro", label: "Terrain 6 Pro", sub: "6-Seater Pro", price: "$19,999", battery: "73.6V 205Ah", motor: "7.5KW", seats: 6 },
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

type TabId = "models" | "battery" | "paint" | "seats" | "wheels" | "accessories";

const verticalTabs: { id: TabId; label: string; icon: typeof Gauge }[] = [
  { id: "models", label: "Models", icon: Gauge },
  { id: "battery", label: "Battery", icon: Battery },
  { id: "paint", label: "Paint", icon: Paintbrush },
  { id: "seats", label: "Seat Colors", icon: Armchair },
  { id: "wheels", label: "Wheels", icon: CircleDot },
  { id: "accessories", label: "Accessories", icon: Wrench },
];

const CustomizePage = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSeat, setSelectedSeat] = useState(seatOptions[0]);
  const [selectedConfig, setSelectedConfig] = useState(configOptions[2]);
  const [selectedTire, setSelectedTire] = useState(tireOptions[1]);
  const [selectedRim, setSelectedRim] = useState(rimOptions[0]);
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<TabId>("models");

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
    sessionStorage.setItem("zebra-config", JSON.stringify(config));
    navigate("/quote");
  };

  // Render options panel content based on active tab
  const renderOptions = () => {
    switch (activeTab) {
      case "models":
        return (
          <div className="space-y-3">
            <h3 className="font-display font-bold text-base uppercase tracking-wider text-foreground mb-5">
              Select Models
            </h3>
            <div className="space-y-4">
              {/* Group by seat count */}
              {[4, 6].map((seatCount) => (
                <div key={seatCount}>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-semibold">
                    {seatCount} Seats
                  </p>
                  <div className="space-y-2">
                    {configOptions
                      .filter((c) => c.seats === seatCount)
                      .map((config) => (
                        <button
                          key={config.id}
                          onClick={() => setSelectedConfig(config)}
                          className={`w-full text-left p-4 rounded-xl transition-all duration-300 border ${
                            selectedConfig.id === config.id
                              ? "bg-primary/10 border-primary/50 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.2)]"
                              : "bg-card/40 border-border/20 hover:border-border/50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-display font-bold text-foreground">{config.label}</p>
                              <p className="text-[11px] text-muted-foreground mt-0.5">
                                {config.battery} · {config.motor}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-display font-black text-foreground">{config.price}</span>
                              {selectedConfig.id === config.id && (
                                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                  <Check className="w-3 h-3 text-primary-foreground" />
                                </div>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "battery":
        return (
          <div className="space-y-3">
            <h3 className="font-display font-bold text-base uppercase tracking-wider text-foreground mb-5">
              Battery & Motor
            </h3>
            <div className="p-5 rounded-xl bg-card/40 border border-border/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Battery</span>
                <span className="text-sm font-bold text-foreground">{selectedConfig.battery}</span>
              </div>
              <div className="w-full h-px bg-border/20" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Motor</span>
                <span className="text-sm font-bold text-foreground">{selectedConfig.motor}</span>
              </div>
              <div className="w-full h-px bg-border/20" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Configuration</span>
                <span className="text-sm font-bold text-foreground">{selectedConfig.sub}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Battery and motor specs are tied to the selected model. Choose a different model to see other options.
            </p>
          </div>
        );

      case "paint":
        return (
          <div>
            <h3 className="font-display font-bold text-base uppercase tracking-wider text-foreground mb-5">
              Body Color
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color)}
                  className={`group flex flex-col items-center gap-3 p-5 rounded-xl transition-all duration-300 border ${
                    selectedColor.id === color.id
                      ? "bg-primary/10 border-primary/50"
                      : "bg-card/40 border-border/20 hover:border-border/50"
                  }`}
                >
                  <div className="relative">
                    <div
                      className="w-16 h-16 rounded-full border-2 transition-all duration-300 group-hover:scale-110"
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
                  <span className="text-xs text-foreground font-bold text-center">{color.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case "seats":
        return (
          <div>
            <h3 className="font-display font-bold text-base uppercase tracking-wider text-foreground mb-5">
              Seat Color
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {seatOptions.map((seat) => (
                <button
                  key={seat.id}
                  onClick={() => setSelectedSeat(seat)}
                  className={`flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-300 border ${
                    selectedSeat.id === seat.id
                      ? "bg-primary/10 border-primary/50"
                      : "bg-card/40 border-border/20 hover:border-border/50"
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-full border-2 shrink-0"
                    style={{
                      backgroundColor: seat.hex,
                      borderColor: selectedSeat.id === seat.id ? "hsl(var(--primary))" : "hsl(var(--border))",
                    }}
                  />
                  <div className="text-center">
                    <span className="text-xs font-bold text-foreground block">{seat.label}</span>
                    <span className="text-[10px] text-muted-foreground">Diamond Stitched</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case "wheels":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-bold text-base uppercase tracking-wider text-foreground mb-5">
                Tire Type
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {tireOptions.map((tire) => (
                  <button
                    key={tire.id}
                    onClick={() => setSelectedTire(tire)}
                    className={`p-4 rounded-xl text-sm font-bold transition-all duration-300 border ${
                      selectedTire.id === tire.id
                        ? "bg-primary/10 border-primary/50 text-foreground"
                        : "bg-card/40 border-border/20 text-muted-foreground hover:border-border/50"
                    }`}
                  >
                    {tire.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                Rim Style
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {rimOptions.map((rim) => (
                  <button
                    key={rim.id}
                    onClick={() => setSelectedRim(rim)}
                    className={`p-3 rounded-xl text-xs font-bold transition-all duration-300 border text-center ${
                      selectedRim.id === rim.id
                        ? "bg-primary/10 border-primary/50 text-foreground"
                        : "bg-card/40 border-border/20 text-muted-foreground hover:border-border/50"
                    }`}
                  >
                    {rim.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case "accessories":
        return (
          <div>
            <h3 className="font-display font-bold text-base uppercase tracking-wider text-foreground mb-5">
              Accessories
            </h3>
            <div className="space-y-3">
              {accessoryOptions.map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => toggleAccessory(acc.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 border ${
                    selectedAccessories.includes(acc.id)
                      ? "bg-primary/10 border-primary/50"
                      : "bg-card/40 border-border/20 hover:border-border/50"
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
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ===== DESKTOP LAYOUT: 3-column (image | vertical tabs | options) ===== */}
      <div className="hidden lg:flex h-[calc(100vh-80px)] mt-20">
        {/* Left: Large Cart Preview */}
        <div className="flex-1 relative overflow-hidden bg-secondary/30">
          {/* Ambient color glow */}
          <div
            className="absolute inset-0 opacity-8 blur-[120px] transition-colors duration-700"
            style={{ backgroundColor: selectedColor.hex }}
          />

          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-5">
            <div className="flex items-center gap-3">
              <span
                className="w-4 h-4 rounded-full border-2 border-border/50"
                style={{ backgroundColor: selectedColor.hex }}
              />
              <span className="text-sm font-bold text-foreground uppercase tracking-wider">
                {selectedConfig.label}
              </span>
              <span className="text-xs text-muted-foreground">— {selectedColor.label}</span>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          {/* Cart image centered */}
          <div className="h-full flex items-center justify-center px-12">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedColor.id + selectedConfig.id}
                src={selectedColor.image}
                alt={`Zebra Cart in ${selectedColor.label}`}
                className="w-full max-w-[700px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>
          </div>

          {/* Summary chips at bottom */}
          <div className="absolute bottom-6 left-8 right-8 flex flex-wrap gap-2">
            {[
              { label: "Model", value: selectedConfig.sub },
              { label: "Color", value: selectedColor.label },
              { label: "Seats", value: selectedSeat.label },
              { label: "Tires", value: selectedTire.label },
              { label: "Rims", value: selectedRim.label },
            ].map((chip) => (
              <span
                key={chip.label}
                className="px-3 py-1.5 rounded-full border border-border/30 bg-background/60 backdrop-blur-sm text-[11px] font-semibold text-muted-foreground"
              >
                {chip.label}: <span className="text-foreground">{chip.value}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Middle: Vertical Icon Tabs */}
        <div className="w-20 border-x border-border/20 bg-card/40 backdrop-blur-sm flex flex-col items-center py-6 gap-1">
          {verticalTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-16 flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/60"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-[9px] font-bold uppercase tracking-wider leading-tight text-center">
                {tab.label}
              </span>
            </button>
          ))}

          {/* Continue button at bottom */}
          <div className="mt-auto">
            <button
              onClick={handleContinue}
              className="w-14 h-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
              title="Continue to Quote"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Right: Options Panel */}
        <div className="w-[360px] overflow-y-auto bg-background border-l border-border/10">
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
              >
                {renderOptions()}
              </motion.div>
            </AnimatePresence>

            {/* Continue CTA */}
            <div className="mt-8 pt-6 border-t border-border/20">
              <button
                onClick={handleContinue}
                className="group w-full text-center py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest glow-red hover:scale-[1.02] transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  Continue to Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <p className="text-center text-[11px] text-muted-foreground mt-2">
                Review your build & get a personalized quote
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MOBILE LAYOUT: stacked (same as before) ===== */}
      <div className="lg:hidden">
        <section className="pt-32 pb-10">
          <div className="container mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">
                Interactive Configurator
              </p>
              <h1 className="text-4xl font-display font-black tracking-tight mb-4">
                Customize Your <span className="text-gradient-red">Cart</span>
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Choose your model, color, interior, and wheels — then get a personalized quote.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-6">
            {/* Cart Display */}
            <div className="relative mb-8">
              <div className="relative rounded-3xl border border-border/20 bg-card/30 backdrop-blur-sm overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10 blur-[100px] transition-colors duration-700"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full border-2 border-border/50"
                      style={{ backgroundColor: selectedColor.hex }}
                    />
                    <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                      {selectedColor.label}
                    </span>
                  </div>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider font-semibold"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>
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
                        className="w-full object-contain max-h-[320px] drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] mx-auto"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="absolute bottom-4 right-5 z-20">
                  <div className="px-4 py-2 rounded-2xl border border-border/20 bg-card/60 backdrop-blur-xl">
                    <p className="text-xl font-display font-black text-foreground">{selectedConfig.price}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Starting From</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  { label: selectedConfig.label, value: selectedConfig.sub },
                  { label: "Color", value: selectedColor.label },
                  { label: "Seats", value: selectedSeat.label },
                  { label: "Tires", value: selectedTire.label },
                  { label: "Rims", value: selectedRim.label },
                ].map((chip) => (
                  <span
                    key={chip.label}
                    className="px-3 py-1.5 rounded-full border border-border/30 bg-card/30 text-[11px] font-semibold text-muted-foreground"
                  >
                    {chip.label}: <span className="text-foreground">{chip.value}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Mobile Horizontal Tabs */}
            <div className="space-y-6">
              <div className="flex overflow-x-auto gap-1 rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm p-1 no-scrollbar">
                {verticalTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-shrink-0 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderOptions()}
                </motion.div>
              </AnimatePresence>

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
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default CustomizePage;
