import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import zebraLogo from "@/assets/zebra-logo.png";

const Footer = () => (
  <footer className="border-t border-border/20 py-16 pb-24">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <img src={zebraLogo} alt="Zebra Golf Cart" className="h-9 w-auto" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Luxury street-legal electric golf carts with solar-powered innovation. Stripes of Power.
          </p>
        </div>
        <div>
          <h4 className="font-display font-bold text-foreground mb-4 text-xs uppercase tracking-widest">Quick Links</h4>
          <div className="space-y-2">
            {[
              { label: "Home", href: "/" },
              { label: "Customize Your Cart", href: "/customize" },
              { label: "Book a Demo", href: "/book-demo" },
              { label: "Dealer Application", href: "/dealer" },
              { label: "Contact Us", href: "/contact" },
            ].map((l) => (
              <Link key={l.label} to={l.href} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-bold text-foreground mb-4 text-xs uppercase tracking-widest">Contact</h4>
          <div className="space-y-3">
            <a href="tel:+19548204220" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="w-4 h-4" /> (954) 820-4220
            </a>
            <a href="mailto:info@zebragolfcart.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-4 h-4" /> info@zebragolfcart.com
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-display font-bold text-foreground mb-4 text-xs uppercase tracking-widest">Locations</h4>
          <div className="space-y-3">
            {["Florida Showroom", "Arizona Showroom"].map((loc) => (
              <div key={loc} className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" /> {loc}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border/20 mt-12 pt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Zebra Golf Cart. All rights reserved. Street Legal LSV vehicles with VIN.
      </div>
    </div>
  </footer>
);

export default Footer;
