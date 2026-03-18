import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import zebraLogo from "@/assets/zebra-logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Customize", href: "/customize" },
  { label: "Book a Demo", href: "/book-demo" },
  { label: "Dealer Application", href: "/dealer" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border/20 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={zebraLogo} alt="Zebra Golf Cart" className="h-9 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`link-underline text-[12px] font-bold transition-colors duration-300 tracking-[0.15em] uppercase ${
                location.pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+19548204220" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            (954) 820-4220
          </a>
          <Link
            to="/customize"
            className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform duration-300"
          >
            Build Yours
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-foreground">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border/20"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`font-bold text-base tracking-wide ${
                    location.pathname === link.href ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/customize"
                className="mt-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-bold text-center text-sm uppercase tracking-widest"
              >
                Build Yours
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
