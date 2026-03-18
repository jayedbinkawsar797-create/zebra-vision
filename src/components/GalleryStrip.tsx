import { motion } from "framer-motion";
import z1 from "@/assets/z1.webp";
import zm1 from "@/assets/zm1.webp";
import zw1 from "@/assets/zw1.webp";
import zdash1 from "@/assets/zdash1.webp";

const images = [
  { src: z1, alt: "Zebra Golf Cart Front View" },
  { src: zdash1, alt: "Zebra Cart Dashboard" },
  { src: zm1, alt: "Zebra Cart Interior Detail" },
  { src: zw1, alt: "Zebra Cart Wheel Detail" },
];

const GalleryStrip = () => {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">Craftsmanship</p>
          <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight">
            Defined by <span className="text-gradient-red">Details</span>
          </h2>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-2">
        {images.map((img, i) => (
          <motion.div
            key={img.alt}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative aspect-square overflow-hidden rounded-2xl"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
              <p className="text-sm font-bold text-foreground">{img.alt}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GalleryStrip;
