import { motion } from "framer-motion";
import { DollarSign, Clock, ShieldCheck, ArrowRight } from "lucide-react";

const plans = [
  {
    term: "36 Months",
    rate: "0.00%",
    description: "with 36 Equal Monthly Principal Payments",
    highlight: true,
    badge: "Best Rate",
  },
  {
    term: "60 Months",
    rate: "2.99%",
    description: "with 60 Equal Monthly Principal Payments",
    highlight: false,
    badge: "Popular",
  },
];

const benefits = [
  { icon: DollarSign, title: "Competitive Rates", desc: "Starting at 0% APR for qualified buyers" },
  { icon: Clock, title: "Flexible Terms", desc: "Choose from 36 to 72-month payment plans" },
  { icon: ShieldCheck, title: "Quick Approval", desc: "Get pre-approved in minutes with no impact to credit" },
];

const FinancingSection = () => {
  return (
    <section id="financing" className="relative py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_30%,hsl(0_85%_55%/0.04),transparent)]" />
      
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">Effortless Luxury Financing</p>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight">
            Ready to <span className="text-gradient-red">Finance?</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Flexible financing options to help you purchase the perfect cart for your lifestyle. 
            Contact us today to learn about our competitive rates.
          </p>
        </motion.div>

        {/* Financing Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.term}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-3xl border p-8 text-center transition-all duration-500 hover:-translate-y-1 ${
                plan.highlight
                  ? "border-primary/40 bg-primary/5 shadow-[0_0_50px_-15px_hsl(var(--primary)/0.2)]"
                  : "border-border/30 bg-card/30"
              }`}
            >
              {plan.badge && (
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  plan.highlight 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-card border border-border/50 text-muted-foreground"
                }`}>
                  {plan.badge}
                </span>
              )}
              
              <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-2">{plan.term}</p>
              <p className="text-6xl font-display font-black text-foreground mb-2">
                {plan.rate}
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Interest Rate</p>
              <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
              
              <a
                href="https://dealerdirect.apptraker.com/myaccount/loan"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105 ${
                  plan.highlight
                    ? "bg-primary text-primary-foreground glow-red"
                    : "border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                Get Financing <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-5">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 p-5 rounded-2xl border border-border/20 bg-card/20 hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <benefit.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm">{benefit.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{benefit.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinancingSection;
