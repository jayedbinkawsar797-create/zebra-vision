import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Mail, User, Send, CheckCircle, Phone } from "lucide-react";

const TestDriveForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", location: "florida" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="testdrive" className="relative py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,hsl(0_85%_55%/0.03),transparent)]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">Experience Zebra</p>
            <h2 className="text-4xl md:text-5xl font-display font-black text-foreground tracking-tight">
              Book a <span className="text-gradient-red">Test Drive</span>
            </h2>
            <p className="text-muted-foreground mt-4">
              Visit our Florida or Arizona showroom. Limited slots available!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-border/20 bg-card/20 backdrop-blur-sm p-8 md:p-10"
          >
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="font-display font-black text-2xl text-foreground mb-2">You're All Set!</h3>
                <p className="text-muted-foreground">We'll reach out within 24 hours to confirm your test drive.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2 uppercase tracking-widest font-bold">
                      <User className="w-3.5 h-3.5" /> Full Name
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-card/40 border border-border/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2 uppercase tracking-widest font-bold">
                      <Mail className="w-3.5 h-3.5" /> Email
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-card/40 border border-border/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="john@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2 uppercase tracking-widest font-bold">
                    <Phone className="w-3.5 h-3.5" /> Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-card/40 border border-border/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2 uppercase tracking-widest font-bold">
                      <Calendar className="w-3.5 h-3.5" /> Preferred Date
                    </label>
                    <input
                      required
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-card/40 border border-border/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2 uppercase tracking-widest font-bold">
                      <MapPin className="w-3.5 h-3.5" /> Location
                    </label>
                    <select
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-card/40 border border-border/20 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    >
                      <option value="florida">Florida Showroom</option>
                      <option value="arizona">Arizona Showroom</option>
                      <option value="atlanta">Atlanta Showroom</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest glow-red hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 mt-2"
                >
                  <Send className="w-4 h-4" />
                  Schedule My Test Drive
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestDriveForm;
