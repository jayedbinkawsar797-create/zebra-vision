import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Phone, Mail, MapPin, ArrowRight, Sparkles, Clock, ShieldCheck, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trackPixelEvent } from "@/lib/metaPixel";

interface ThankYouState {
  title?: string;
  message?: string;
  type?: "demo" | "quote" | "dealer" | "contact" | "testdrive";
  details?: Record<string, string | number | undefined>;
}

const ThankYou = () => {
  const location = useLocation();
  const state = (location.state as ThankYouState) || {};

  const title = state.title || "Thank You! Your Request Has Been Received";
  const message =
    state.message ||
    "We have received your details. A Zebra concierge specialist will review your request and reach out to you within 24 hours.";

  useEffect(() => {
    trackPixelEvent("Lead", {
      content_name: state.title || "Lead Submission",
      content_category: state.type || "general",
      ...state.details,
    });
    if (state.type === "demo" || state.type === "testdrive") {
      trackPixelEvent("Schedule", {
        content_name: state.title || "Test Drive Booking",
        ...state.details,
      });
    }
  }, [state.type, state.title, state.details]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          {/* Header & Success Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 mb-6 relative">
              <CheckCircle2 className="w-12 h-12 text-primary animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-25" />
            </div>

            <p className="text-primary text-xs font-bold uppercase tracking-[0.35em] mb-3 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" /> Request Confirmed
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-foreground mb-4">
              {title.includes("!") ? (
                <>
                  {title.split("!")[0]}!<span className="text-gradient-red">{title.split("!")[1] || ""}</span>
                </>
              ) : (
                <span className="text-gradient-red">{title}</span>
              )}
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {message}
            </p>
          </motion.div>

          {/* Details Pill (if provided) */}
          {state.details && Object.keys(state.details).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl border border-primary/20 bg-card/30 backdrop-blur-md p-6 mb-10"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" /> Request Summary
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(state.details)
                  .filter(([_, val]) => val !== undefined && val !== "")
                  .map(([key, val]) => (
                    <div key={key} className="bg-card/40 rounded-xl p-3 border border-border/20">
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </p>
                      <p className="text-sm font-bold text-foreground mt-0.5 truncate">{String(val)}</p>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}

          {/* Next Steps 3-Step Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-3xl border border-border/20 bg-card/20 backdrop-blur-md p-8 md:p-10 mb-10"
          >
            <h2 className="text-xl font-display font-black text-foreground mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> What Happens Next?
            </h2>

            <div className="grid md:grid-cols-3 gap-6 relative">
              <div className="rounded-2xl bg-card/40 border border-border/20 p-6 relative">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-black text-sm flex items-center justify-center mb-4">
                  1
                </div>
                <h4 className="font-display font-bold text-base text-foreground mb-1">Lead Assigned</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your specifications have been routed directly to our specialist team for rapid review.
                </p>
              </div>

              <div className="rounded-2xl bg-card/40 border border-border/20 p-6 relative">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-black text-sm flex items-center justify-center mb-4">
                  2
                </div>
                <h4 className="font-display font-bold text-base text-foreground mb-1">Direct Consultation</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A dedicated concierge will contact you by phone or email to answer questions or confirm appointments.
                </p>
              </div>

              <div className="rounded-2xl bg-card/40 border border-border/20 p-6 relative">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-black text-sm flex items-center justify-center mb-4">
                  3
                </div>
                <h4 className="font-display font-bold text-base text-foreground mb-1">Delivery & Drive</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Experience your luxury street-legal golf cart with nationwide door-to-door delivery.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Need Immediate Assistance / Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="grid sm:grid-cols-2 gap-6 mb-12"
          >
            <div className="rounded-2xl border border-border/20 bg-card/30 p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-foreground">Need Immediate Help?</h4>
                <p className="text-xs text-muted-foreground mt-1 mb-2">Speak directly with our concierge desk:</p>
                <a
                  href="tel:+19548204220"
                  className="font-display font-black text-lg text-primary hover:underline"
                >
                  (954) 820-4220
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-border/20 bg-card/30 p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-foreground">Email Support</h4>
                <p className="text-xs text-muted-foreground mt-1 mb-2">Direct email to our sales & booking team:</p>
                <a
                  href="mailto:info@zebragolfcart.com"
                  className="font-bold text-sm text-primary hover:underline"
                >
                  info@zebragolfcart.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Showroom Locations */}
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center justify-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-primary" /> Authorized Showroom Hubs
            </p>
            <div className="inline-flex flex-wrap items-center justify-center gap-3">
              <span className="px-4 py-1.5 rounded-full bg-card/40 border border-border/30 text-xs font-bold text-foreground">
                Florida Showroom
              </span>
              <span className="px-4 py-1.5 rounded-full bg-card/40 border border-border/30 text-xs font-bold text-foreground">
                Arizona Showroom
              </span>
              <span className="px-4 py-1.5 rounded-full bg-card/40 border border-border/30 text-xs font-bold text-foreground">
                Atlanta Showroom
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/customize"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest glow-red hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Build Your Custom Cart <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-card/60 border border-border/30 hover:border-primary/50 text-foreground font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" /> Return to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;
