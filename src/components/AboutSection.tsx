import { motion } from "framer-motion";
import { MapPin, Award, Leaf } from "lucide-react";

const AboutSection = () => (
  <section id="about" className="relative py-24">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest">Our Mission</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Harmonizing Power, Elegance & <span className="text-gradient-cyan">Innovation</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Zebra Golf Cart is becoming the premier US brand for street-legal luxury electric vehicles. 
            We blend cutting-edge lithium technology with solar integration and automotive-grade 
            craftsmanship — delivering an unparalleled ownership experience.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            From our advanced rust-proof aluminum chassis to diamond-stitched leather interiors, 
            every Zebra cart is engineered for those who refuse to compromise on quality, 
            performance, or sustainability.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          {[
            {
              icon: MapPin,
              title: "Showroom Locations",
              desc: "Visit us in Florida and Arizona. More locations coming soon across the US.",
            },
            {
              icon: Award,
              title: "Industry-Leading Warranty",
              desc: "5-year lithium battery warranty and 1-year coverage on frame and major components.",
            },
            {
              icon: Leaf,
              title: "Eco-Conscious Innovation",
              desc: "Solar-integrated roofs and zero-emission electric powertrains for a greener future.",
            },
          ].map((item) => (
            <div key={item.title} className="glass-strong rounded-2xl p-6 flex gap-5 hover:-translate-y-1 transition-all duration-500">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
