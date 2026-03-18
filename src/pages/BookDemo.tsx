import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarIcon, MapPin, Send, Check, Clock, Car } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bookingSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Phone is required").max(20),
  location: z.enum(["florida", "arizona"]),
  date: z.date({ required_error: "Please select a date" }),
  timeSlot: z.string().min(1, "Please select a time"),
  model: z.enum(["any", "breeze-4l", "terrain-6", "terrain-6-pro"]),
  message: z.string().trim().max(500).optional(),
});

type BookingForm = z.infer<typeof bookingSchema>;

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

const models = [
  { id: "any", label: "Any Model" },
  { id: "breeze-4l", label: "Breeze 4L (4-Seater)" },
  { id: "terrain-6", label: "Terrain 6 (6-Seater)" },
  { id: "terrain-6-pro", label: "Terrain 6 Pro (6-Seater)" },
];

const BookDemo = () => {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<Omit<BookingForm, "date"> & { date?: Date }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "florida",
    date: undefined,
    timeSlot: "",
    model: "any",
    message: "",
  });

  const updateField = (field: string, value: string | Date | undefined) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = bookingSchema.safeParse(form);
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

  const inputClasses = "w-full px-5 py-3.5 rounded-xl border border-border/30 bg-card/30 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm";

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-lg mx-auto px-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-black text-foreground mb-4">
              Demo <span className="text-gradient-red">Booked!</span>
            </h1>
            <p className="text-muted-foreground mb-2">
              Your test drive is scheduled for <span className="text-foreground font-bold">{form.date ? format(form.date, "MMMM d, yyyy") : ""}</span> at <span className="text-foreground font-bold">{form.timeSlot}</span>.
            </p>
            <p className="text-muted-foreground mb-8">We'll send a confirmation email with directions to our {form.location === "florida" ? "Florida" : "Arizona"} showroom.</p>
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
            <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">Experience the Difference</p>
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight mb-4">
              Book a <span className="text-gradient-red">Test Drive</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Feel the luxury, performance, and innovation of a Zebra Golf Cart firsthand. Pick a date and time that works for you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Calendar + Time - Left */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 space-y-6">
              {/* Location */}
              <div className="rounded-3xl border border-border/20 bg-card/30 backdrop-blur-sm p-6">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" /> Select Location
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {["florida", "arizona"].map((loc) => (
                    <button key={loc} type="button" onClick={() => updateField("location", loc)}
                      className={`py-3 rounded-xl text-sm font-bold transition-all duration-300 border ${
                        form.location === loc ? "bg-primary/10 border-primary/40 text-foreground" : "bg-card/30 border-border/20 text-muted-foreground hover:border-border/50"
                      }`}>
                      {loc === "florida" ? "Florida" : "Arizona"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calendar */}
              <div className="rounded-3xl border border-border/20 bg-card/30 backdrop-blur-sm p-6">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-primary" /> Select Date
                </h3>
                <Calendar
                  mode="single"
                  selected={form.date}
                  onSelect={(date) => updateField("date", date)}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  className={cn("p-3 pointer-events-auto rounded-xl border border-border/20 bg-card/20")}
                />
                {errors.date && <p className="text-xs text-primary mt-2">{errors.date}</p>}
              </div>

              {/* Time slots */}
              <div className="rounded-3xl border border-border/20 bg-card/30 backdrop-blur-sm p-6">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" /> Select Time
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button key={slot} type="button" onClick={() => updateField("timeSlot", slot)}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all duration-300 border ${
                        form.timeSlot === slot ? "bg-primary/10 border-primary/40 text-foreground" : "bg-card/30 border-border/20 text-muted-foreground hover:border-border/50"
                      }`}>
                      {slot}
                    </button>
                  ))}
                </div>
                {errors.timeSlot && <p className="text-xs text-primary mt-2">{errors.timeSlot}</p>}
              </div>
            </motion.div>

            {/* Contact form - Right */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-3">
              <div className="rounded-3xl border border-border/20 bg-card/30 backdrop-blur-sm p-8 lg:sticky lg:top-28">
                <h2 className="font-display font-black text-2xl text-foreground mb-2">Your Details</h2>
                <p className="text-sm text-muted-foreground mb-6">We'll confirm your booking via email.</p>

                {/* Summary strip */}
                {form.date && form.timeSlot && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-6 p-4 rounded-2xl border border-primary/20 bg-primary/5">
                    <p className="text-sm text-foreground font-bold">
                      📅 {format(form.date, "EEEE, MMMM d, yyyy")} at {form.timeSlot}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {form.location === "florida" ? "Florida" : "Arizona"} Showroom
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">First Name *</label>
                      <input type="text" value={form.firstName} onChange={(e) => updateField("firstName", e.target.value)} className={inputClasses} placeholder="John" />
                      {errors.firstName && <p className="text-xs text-primary mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Last Name *</label>
                      <input type="text" value={form.lastName} onChange={(e) => updateField("lastName", e.target.value)} className={inputClasses} placeholder="Doe" />
                      {errors.lastName && <p className="text-xs text-primary mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Email *</label>
                      <input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} className={inputClasses} placeholder="john@example.com" />
                      {errors.email && <p className="text-xs text-primary mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Phone *</label>
                      <input type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className={inputClasses} placeholder="(555) 123-4567" />
                      {errors.phone && <p className="text-xs text-primary mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block flex items-center gap-2">
                      <Car className="w-3 h-3 text-primary" /> Preferred Model
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {models.map((m) => (
                        <button key={m.id} type="button" onClick={() => updateField("model", m.id)}
                          className={`py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 border ${
                            form.model === m.id ? "bg-primary/10 border-primary/40 text-foreground" : "bg-card/30 border-border/20 text-muted-foreground hover:border-border/50"
                          }`}>{m.label}</button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Notes (Optional)</label>
                    <textarea value={form.message} onChange={(e) => updateField("message", e.target.value)} rows={3}
                      className={`${inputClasses} resize-none`} placeholder="Any special requests..." />
                  </div>

                  <button type="submit" className="group w-full py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest glow-red hover:scale-[1.02] transition-all duration-300">
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" /> Confirm Booking
                    </span>
                  </button>
                  <p className="text-center text-[11px] text-muted-foreground">Free · No obligation · Cancel anytime</p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookDemo;
