import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Send, CreditCard, Landmark } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(7, "Phone number is required").max(20),
  location: z.enum(["florida", "arizona", "other"]),
  paymentPreference: z.enum(["financing", "direct"]),
  message: z.string().trim().max(500).optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

interface ConfigData {
  model: { label: string; sub: string; price: string; battery: string; motor: string };
  color: { id: string; label: string; hex: string };
  seat: { id: string; label: string };
  tire: { id: string; label: string };
  rim: { id: string; label: string };
  accessories: string[];
}

const Quote = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState<ConfigData | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<ContactForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "florida",
    paymentPreference: "financing",
    message: "",
  });

  useEffect(() => {
    const stored = sessionStorage.getItem("zebra-config");
    if (!stored) {
      navigate("/");
      return;
    }
    try {
      setConfig(JSON.parse(stored));
    } catch {
      navigate("/");
    }
  }, [navigate]);

  const updateField = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    // In production this would submit to backend
    setSubmitted(true);
  };

  if (!config) return null;

  const summaryItems = [
    { label: "Model", value: `${config.model.label} (${config.model.sub})` },
    { label: "Battery", value: config.model.battery },
    { label: "Motor", value: config.model.motor },
    { label: "Body Color", value: config.color.label, color: config.color.hex },
    { label: "Seat", value: config.seat.label },
    { label: "Tires", value: config.tire.label },
    { label: "Rims", value: config.rim.label },
  ];

  if (config.accessories.length > 0) {
    summaryItems.push({ label: "Accessories", value: config.accessories.includes("lightbar") ? "Bumper Light Bar" : config.accessories.join(", ") });
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-lg mx-auto px-6"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-black text-foreground mb-4">
              Quote Request <span className="text-gradient-red">Sent!</span>
            </h1>
            <p className="text-muted-foreground mb-8">
              Thank you, {form.firstName}! Our team will review your custom build and get back to you within 24 hours with a detailed quote.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Back to Home
            </button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 font-semibold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Configurator
          </motion.button>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Build Summary - Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <div className="rounded-3xl border border-border/40 bg-secondary p-8 lg:sticky lg:top-28">
                <h2 className="font-display font-black text-2xl text-foreground mb-1">Your Build</h2>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-6">Configuration Summary</p>

                <div className="space-y-4">
                  {summaryItems.map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-3 border-b border-border/20 last:border-0">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <div className="flex items-center gap-2">
                        {"color" in item && item.color && (
                          <span className="w-3 h-3 rounded-full border border-border/50" style={{ backgroundColor: item.color }} />
                        )}
                        <span className="text-sm font-bold text-foreground">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border/20">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-muted-foreground">Starting From</span>
                    <span className="text-3xl font-display font-black text-foreground">{config.model.price}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1 text-right">
                    Final pricing provided upon quote review
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form - Right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3"
            >
              <h2 className="font-display font-black text-3xl md:text-4xl text-foreground mb-2">
                Get Your <span className="text-gradient-red">Quote</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill in your details and we'll prepare a personalized quote for your custom Zebra build.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-border/40 bg-secondary p-8">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">First Name</label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      className="w-full px-5 py-3.5 rounded-xl border border-border/50 bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                      placeholder="John"
                    />
                    {errors.firstName && <p className="text-xs text-primary mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Last Name</label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      className="w-full px-5 py-3.5 rounded-xl border border-border/50 bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="text-xs text-primary mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full px-5 py-3.5 rounded-xl border border-border/50 bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-xs text-primary mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="w-full px-5 py-3.5 rounded-xl border border-border/50 bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && <p className="text-xs text-primary mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Preferred Location</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "florida", label: "Florida" },
                      { id: "arizona", label: "Arizona" },
                      { id: "other", label: "Other" },
                    ].map((loc) => (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => updateField("location", loc.id)}
                        className={`py-3 rounded-xl text-sm font-bold transition-all duration-300 border ${
                          form.location === loc.id
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border/50 text-muted-foreground hover:border-border/80"
                        }`}
                      >
                        {loc.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Preference */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">How Would You Like to Pay?</label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => updateField("paymentPreference", "financing")}
                      className={`flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 border ${
                        form.paymentPreference === "financing"
                          ? "bg-primary/15 border-primary/50"
                          : "bg-background border-border/50 hover:border-border/80"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        form.paymentPreference === "financing" ? "bg-primary/20" : "bg-card/50"
                      }`}>
                        <Landmark className={`w-5 h-5 ${form.paymentPreference === "financing" ? "text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <div className="text-left">
                        <span className="text-sm font-bold text-foreground block">Financing</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Monthly payments from 0% APR</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField("paymentPreference", "direct")}
                      className={`flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 border ${
                        form.paymentPreference === "direct"
                          ? "bg-primary/15 border-primary/50"
                          : "bg-background border-border/50 hover:border-border/80"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        form.paymentPreference === "direct" ? "bg-primary/20" : "bg-card/50"
                      }`}>
                        <CreditCard className={`w-5 h-5 ${form.paymentPreference === "direct" ? "text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <div className="text-left">
                        <span className="text-sm font-bold text-foreground block">Pay Directly</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Full payment upfront</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Message (Optional)</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    rows={3}
                    className="w-full px-5 py-3.5 rounded-xl border border-border/50 bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm resize-none"
                    placeholder="Any special requests or questions..."
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest glow-red hover:scale-[1.02] transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    Submit Quote Request
                    <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <p className="text-center text-[11px] text-muted-foreground">
                  No obligation · Our team responds within 24 hours
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Quote;
