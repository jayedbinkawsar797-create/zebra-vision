import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, Building2, Users, Globe, TrendingUp, Loader2 } from "lucide-react";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sendLeadEmail } from "@/lib/brevo";

const dealerSchema = z.object({
  businessName: z.string().trim().min(1, "Business name is required").max(100),
  contactName: z.string().trim().min(1, "Contact name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Phone is required").max(20),
  website: z.string().trim().max(255).optional(),
  state: z.string().trim().min(1, "State is required").max(50),
  city: z.string().trim().min(1, "City is required").max(100),
  businessType: z.enum(["dealership", "rental", "resort", "community", "other"]),
  yearsInBusiness: z.enum(["startup", "1-3", "3-5", "5-10", "10+"]),
  message: z.string().trim().max(1000).optional(),
});

type DealerForm = z.infer<typeof dealerSchema>;

const benefits = [
  { icon: TrendingUp, title: "High Margins", desc: "Industry-leading dealer margins on every unit sold" },
  { icon: Building2, title: "Territory Protection", desc: "Exclusive territory rights for qualified dealers" },
  { icon: Users, title: "Marketing Support", desc: "Co-op advertising, leads, and digital assets provided" },
  { icon: Globe, title: "Growing Demand", desc: "LSV market growing 15%+ annually across the USA" },
];

const businessTypes = [
  { id: "dealership", label: "Auto/Cart Dealership" },
  { id: "rental", label: "Rental Company" },
  { id: "resort", label: "Resort / Golf Course" },
  { id: "community", label: "Planned Community" },
  { id: "other", label: "Other" },
];

const yearOptions = [
  { id: "startup", label: "Startup" },
  { id: "1-3", label: "1–3 Years" },
  { id: "3-5", label: "3–5 Years" },
  { id: "5-10", label: "5–10 Years" },
  { id: "10+", label: "10+ Years" },
];

const DealerApplication = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<DealerForm>({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    state: "",
    city: "",
    businessType: "dealership",
    yearsInBusiness: "1-3",
    message: "",
  });

  const updateField = (field: keyof DealerForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = dealerSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    const businessTypeLabel = businessTypes.find((b) => b.id === form.businessType)?.label || form.businessType;
    const yearsLabel = yearOptions.find((y) => y.id === form.yearsInBusiness)?.label || form.yearsInBusiness;

    await sendLeadEmail({
      type: "dealer",
      subject: `Dealer Application from ${form.businessName}`,
      senderName: form.contactName,
      senderEmail: form.email,
      senderPhone: form.phone,
      data: {
        businessName: form.businessName,
        contactName: form.contactName,
        website: form.website || "N/A",
        location: `${form.city}, ${form.state}`,
        businessType: businessTypeLabel,
        yearsInBusiness: yearsLabel,
        additionalInfo: form.message || "N/A",
      },
    });

    setIsSubmitting(false);
    navigate("/thank-you", {
      state: {
        type: "dealer",
        title: "Application Submitted!",
        message: `Thank you for your interest in joining the Zebra Dealer Network! Our executive partnership team is reviewing ${form.businessName}'s credentials and will connect with you within 24 hours.`,
        details: {
          businessName: form.businessName,
          contact: form.contactName,
          territory: `${form.city}, ${form.state}`,
          businessType: businessTypeLabel,
          experience: yearsLabel,
          phone: form.phone,
        },
      },
    });
  };

  const inputClasses = "w-full px-5 py-3.5 rounded-xl border border-border/30 bg-card/30 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-sm";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">Partner With Us</p>
            <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight mb-4">
              Become a <span className="text-gradient-red">Zebra Dealer</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join the fastest-growing luxury LSV brand in America. Exclusive territories, 
              premium margins, and a product that sells itself.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border/20 bg-card/30 hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <b.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-1">{b.title}</h3>
                <p className="text-xs text-muted-foreground">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-border/20 bg-card/30 backdrop-blur-sm p-8 md:p-10">
              <h2 className="font-display font-black text-2xl text-foreground mb-2">Dealer Application</h2>
              <p className="text-sm text-muted-foreground mb-8">Fill out the form below and our partnerships team will be in touch.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Business Name *</label>
                    <input type="text" value={form.businessName} onChange={(e) => updateField("businessName", e.target.value)} className={inputClasses} placeholder="ABC Motors" />
                    {errors.businessName && <p className="text-xs text-primary mt-1">{errors.businessName}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Contact Name *</label>
                    <input type="text" value={form.contactName} onChange={(e) => updateField("contactName", e.target.value)} className={inputClasses} placeholder="John Doe" />
                    {errors.contactName && <p className="text-xs text-primary mt-1">{errors.contactName}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Email *</label>
                    <input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} className={inputClasses} placeholder="john@business.com" />
                    {errors.email && <p className="text-xs text-primary mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Phone *</label>
                    <input type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className={inputClasses} placeholder="(555) 123-4567" />
                    {errors.phone && <p className="text-xs text-primary mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Website (Optional)</label>
                  <input type="text" value={form.website} onChange={(e) => updateField("website", e.target.value)} className={inputClasses} placeholder="https://yourbusiness.com" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">State *</label>
                    <input type="text" value={form.state} onChange={(e) => updateField("state", e.target.value)} className={inputClasses} placeholder="Florida" />
                    {errors.state && <p className="text-xs text-primary mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">City *</label>
                    <input type="text" value={form.city} onChange={(e) => updateField("city", e.target.value)} className={inputClasses} placeholder="Miami" />
                    {errors.city && <p className="text-xs text-primary mt-1">{errors.city}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">Business Type *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {businessTypes.map((bt) => (
                      <button key={bt.id} type="button" onClick={() => updateField("businessType", bt.id)}
                        className={`py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 border ${
                          form.businessType === bt.id ? "bg-primary/10 border-primary/40 text-foreground" : "bg-card/30 border-border/20 text-muted-foreground hover:border-border/50"
                        }`}>{bt.label}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">Years in Business</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {yearOptions.map((y) => (
                      <button key={y.id} type="button" onClick={() => updateField("yearsInBusiness", y.id)}
                        className={`py-3 rounded-xl text-xs font-bold transition-all duration-300 border text-center ${
                          form.yearsInBusiness === y.id ? "bg-primary/10 border-primary/40 text-foreground" : "bg-card/30 border-border/20 text-muted-foreground hover:border-border/50"
                        }`}>{y.label}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Additional Information (Optional)</label>
                  <textarea value={form.message} onChange={(e) => updateField("message", e.target.value)} rows={4}
                    className={`${inputClasses} resize-none`} placeholder="Tell us about your business and why you'd like to partner with Zebra..." />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest glow-red hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:pointer-events-none"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting Application...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Submit Application
                      </>
                    )}
                  </span>
                </button>
                <p className="text-center text-[11px] text-muted-foreground">Our team reviews applications within 48 business hours</p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DealerApplication;
