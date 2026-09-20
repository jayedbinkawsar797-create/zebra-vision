import {ArrowUpRight, Phone} from 'lucide-react';
import {Link} from 'react-router-dom';
import cart from '@/assets/zebra-new-grille.webp';
export default function HeroSection(){return <section id="hero" className="relative pt-28 pb-12 lg:pt-32 lg:pb-20 overflow-hidden">
  <div className="container mx-auto px-6 grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-14 items-center">
    <div className="max-w-xl">
      <p className="text-primary uppercase tracking-[.25em] text-xs font-bold mb-6">Zebra Golf Cart · Plantation, Florida</p>
      <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[1.04] tracking-tight">Make every<br/>day a <span className="text-primary">joyride.</span></h1>
      <p className="text-lg text-zinc-300 leading-relaxed mt-6">Electric golf carts with a bold new grille, forward-facing comfort, and a look that is yours.</p>
      <p className="mt-6 text-2xl font-bold">Starting at $14,999 <span className="text-xs font-normal text-zinc-400">before tax & delivery</span></p>
      <div className="flex flex-col sm:flex-row gap-3 mt-7">
        <a href="#get-quote" className="inline-flex items-center justify-center gap-3 bg-primary rounded-full px-7 py-4 font-bold">Get pricing & availability <ArrowUpRight size={18}/></a>
        <Link to="/customize" className="inline-flex justify-center border border-zinc-600 rounded-full px-7 py-4 font-semibold hover:border-white">Build your cart</Link>
      </div>
      <a href="tel:+19548204220" className="mt-5 inline-flex gap-2 items-center text-sm text-zinc-300"><Phone size={15}/> Questions? (954) 820-4220</a>
      <div className="grid grid-cols-3 gap-3 mt-9 pt-6 border-t border-zinc-800">
        <div><p className="font-bold text-xl">4 & 6</p><p className="text-xs text-zinc-400 mt-1">Seat options</p></div>
        <div><p className="font-bold text-xl">80 miles*</p><p className="text-xs text-zinc-400 mt-1">Breeze 4L range</p></div>
        <div><p className="font-bold text-xl">52.1V</p><p className="text-xs text-zinc-400 mt-1">Breeze 4L battery</p></div>
      </div>
      <p className="text-[11px] text-zinc-500 mt-4">*Range varies with model, load, terrain, speed, and conditions. Ask us to confirm your exact configuration.</p>
    </div>
    <figure className="relative rounded-[2rem] overflow-hidden bg-zinc-900 border border-zinc-800">
      <img src={cart} width="1152" height="1536" fetchPriority="high" alt="Blue Zebra four-seat golf cart with the new dotted illuminated grille" className="w-full max-h-[690px] object-cover object-center"/>
      <figcaption className="absolute bottom-5 left-5 right-5 rounded-xl bg-black/85 backdrop-blur px-5 py-4"><span className="text-xs uppercase tracking-widest text-zinc-300">The details make the difference</span><p className="font-bold mt-1">New grille. Unmistakably Zebra.</p></figcaption>
    </figure>
  </div>
</section>;}
