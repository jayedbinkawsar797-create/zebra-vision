import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const StickyReservationBar = () => (
  <motion.div
    initial={{ y: 100 }}
    animate={{ y: 0 }}
    transition={{ delay: 2, duration: 0.5 }}
    className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/20 bg-background/80 backdrop-blur-xl"
  >
    <div className="container mx-auto px-6 py-3 flex items-center justify-between">
      <div className="hidden sm:flex items-center gap-3">
        <Shield className="w-4 h-4 text-primary" />
        <span className="text-sm text-muted-foreground">
          <span className="text-foreground font-bold">5-Year Warranty</span> · Street Legal · Solar Powered
        </span>
      </div>
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <Link
          to="/customize"
          className="flex-1 sm:flex-none text-center px-8 py-2.5 rounded-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
        >
          Build Your Cart
        </Link>
      </div>
    </div>
  </motion.div>
);

export default StickyReservationBar;
