import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, MessageSquare, Clock } from "lucide-react";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Phone is required").max(20),
  subject: z.enum(["general", "sales", "support", "parts", "other"]),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

type ContactForm = z.infer<typeof contactSchema>;

const subjects = [
  { id: "general", label: "General Inquiry" },
  { id: "sales", label: "Sales" },
  { id: "support", label: "Support" },
  { id: "parts", label: "Parts & Accessories" },
  { id: "other", label: "Other" },
];

const locations = [
  {
    name: "Florida Showroom",
    address: "South Florida",
    phone: "(954) 820-4220",
    email: "info@zebragolfcart.com",
    hours: "Mon–Sat: 9AM – 6PM",
  },
  {
    name: "Arizona Showroom",
    address: "Phoenix Metro Area",
    phone: "(954) 820-4220",
    email: "info@zebragolfcart.com",
    hours: "Mon–Sat: 9AM – 6PM",
  },
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });

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
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-lg mx-auto px-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-black text-foreground mb-4">
              Message <span className="text-gradient-red">Sent!</span>
            </h1>
            <p className="text-muted-foreground mb-8">Thank you for reaching out. Our team will respond within 24 hours.</p>
            <a href="/" className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform inline-block">
              Back to Home
            </a>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">Get in Touch</p>
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight mb-4">
              Contact <span className="text-gradient-red">Us</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Have questions about our luxury golf carts? We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-3">
            <div className="rounded-3xl border border-border/20 bg-card/30 backdrop-blur-sm p-8">
              <h2 className="font-display font-black text-2xl text-foreground mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Full Name</label>
                    <input type="text" value={form.name} onChange={(e) => updateField("name", e.target.value)}
                      className="w-full px-5 py-3.5 rounded-xl border border-border/30 bg-card/30 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm" placeholder="John Doe" />
                    {errors.name && <p className="text-xs text-primary mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Email</label>
                    <input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)}
                      className="w-full px-5 py-3.5 rounded-xl border border-border/30 bg-card/30 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm" placeholder="john@example.com" />
                    {errors.email && <p className="text-xs text-primary mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Phone</label>
                    <input type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)}
                      className="w-full px-5 py-3.5 rounded-xl border border-border/30 bg-card/30 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm" placeholder="(555) 123-4567" />
                    {errors.phone && <p className="text-xs text-primary mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Subject</label>
                    <select value={form.subject} onChange={(e) => updateField("subject", e.target.value)}
                      className="w-full px-5 py-3.5 rounded-xl border border-border/30 bg-card/30 text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm">
                      {subjects.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Message</label>
                  <textarea value={form.message} onChange={(e) => updateField("message", e.target.value)} rows={5}
                    className="w-full px-5 py-3.5 rounded-xl border border-border/30 bg-card/30 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm resize-none" placeholder="Tell us how we can help..." />
                  {errors.message && <p className="text-xs text-primary mt-1">{errors.message}</p>}
                </div>

                <button type="submit" className="group w-full py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest glow-red hover:scale-[1.02] transition-all duration-300">
                  <span className="flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> Send Message
                  </span>
                </button>
              </form>
            </div>
          </motion.div>

          {/* Locations sidebar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 space-y-6">
            {locations.map((loc) => (
              <div key={loc.name} className="rounded-3xl border border-border/20 bg-card/30 backdrop-blur-sm p-6">
                <h3 className="font-display font-black text-lg text-foreground mb-4">{loc.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3"><MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" /><span className="text-sm text-muted-foreground">{loc.address}</span></div>
                  <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary shrink-0" /><a href={`tel:${loc.phone.replace(/\D/g, '')}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{loc.phone}</a></div>
                  <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary shrink-0" /><a href={`mailto:${loc.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{loc.email}</a></div>
                  <div className="flex items-center gap-3"><Clock className="w-4 h-4 text-primary shrink-0" /><span className="text-sm text-muted-foreground">{loc.hours}</span></div>
                </div>
              </div>
            ))}

            {/* Quick contact card */}
            <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 text-center">
              <p className="font-display font-black text-lg text-foreground mb-2">Need Immediate Help?</p>
              <p className="text-sm text-muted-foreground mb-4">Call us directly for fastest response</p>
              <a href="tel:+19548204220" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform">
                <Phone className="w-4 h-4" /> (954) 820-4220
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
