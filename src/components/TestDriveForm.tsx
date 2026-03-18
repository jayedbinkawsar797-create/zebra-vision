import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Mail, User, Send, CheckCircle } from "lucide-react";

const TestDriveForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", date: "", location: "florida" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="testdrive" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Experience Zebra</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              Book a <span className="text-gradient-amber">Test Drive</span>
            </h2>
            <p className="text-muted-foreground mt-4">
              Visit our Florida or Arizona showroom and experience the Zebra difference firsthand.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-2xl p-8 md:p-10"
          >
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="font-display font-bold text-2xl text-foreground mb-2">You're All Set!</h3>
                <p className="text-muted-foreground">We'll reach out within 24 hours to confirm your test drive.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <User className="w-4 h-4" /> Full Name
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Mail className="w-4 h-4" /> Email
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="john@email.com"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" /> Preferred Date
                    </label>
                    <input
                      required
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4" /> Location
                    </label>
                    <select
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    >
                      <option value="florida">Florida Showroom</option>
                      <option value="arizona">Arizona Showroom</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-accent text-accent-foreground font-bold text-lg glow-amber hover:scale-[1.01] transition-transform duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
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
