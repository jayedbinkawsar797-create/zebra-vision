import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ArrowRight,Loader2} from 'lucide-react';
import {sendLeadEmail} from '@/lib/brevo';
import LeadConsent from './LeadConsent';
export default function QuickQuoteForm(){
  const navigate=useNavigate();const [busy,setBusy]=useState(false);const [error,setError]=useState('');
  const submit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();const form=e.currentTarget;const f=new FormData(form);setBusy(true);setError('');
    try{await sendLeadEmail({type:'quote',subject:'Website pricing and availability request',senderName:String(f.get('name')),senderEmail:String(f.get('email')),senderPhone:String(f.get('phone')),data:{seats:String(f.get('seats')),zip:String(f.get('zip')),timing:String(f.get('timing')),budget:String(f.get('budget'))}},form);navigate('/thank-you',{state:{type:'quote',title:'Request received!',message:'Our team will contact you with model options, current availability, and an itemized quote for your ZIP code.'}});}catch(err){setError(err instanceof Error?err.message:'Please try again.');}finally{setBusy(false);}
  };
  const input='mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3.5 text-white focus:outline-none focus:ring-2 focus:ring-primary';
  return <section id="get-quote" className="scroll-mt-24 py-16 bg-zinc-900/50 border-y border-zinc-800"><div className="container mx-auto px-6 grid lg:grid-cols-[.8fr_1.2fr] gap-10 lg:gap-20">
    <div><p className="uppercase text-primary text-xs tracking-[.25em] font-bold mb-4">Find your Zebra</p><h2 className="text-3xl sm:text-4xl font-black leading-tight">Your cart.<br/>Your color.<br/>Your next adventure.</h2><p className="text-zinc-400 leading-relaxed mt-5">Tell us what you have in mind. We will confirm availability, help you compare models, and price delivery to your location.</p><p className="text-sm mt-6 text-zinc-300">No deposit required to request a quote.</p></div>
    <form onSubmit={submit} className="space-y-5 relative">
      <div className="grid sm:grid-cols-2 gap-4"><label className="text-sm">Full name<input name="name" autoComplete="name" required maxLength={100} className={input}/></label><label className="text-sm">Email<input name="email" type="email" autoComplete="email" required maxLength={254} className={input}/></label><label className="text-sm">Phone<input name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={30} className={input}/></label><label className="text-sm">Delivery ZIP<input name="zip" autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{5}" title="Enter a five-digit ZIP code" required maxLength={5} className={input}/></label></div>
      <div className="grid sm:grid-cols-3 gap-4"><label className="text-sm">Seats<select name="seats" className={input}><option>4 seats</option><option>6 seats</option><option>Help me choose</option></select></label><label className="text-sm">Buying timeline<select name="timing" className={input}><option>Just exploring</option><option>Within 30 days</option><option>1–3 months</option><option>3+ months</option></select></label><label className="text-sm">Budget<select name="budget" className={input}><option>Help me compare</option><option>$15,000–$18,000</option><option>$18,000–$22,000</option><option>$22,000+</option></select></label></div>
      <LeadConsent/>{error&&<p role="alert" className="text-red-300 text-sm">{error}</p>}
      <button disabled={busy} className="flex w-full justify-center items-center gap-3 rounded-full bg-primary p-4 font-bold disabled:opacity-60">{busy?<><Loader2 className="animate-spin" size={18}/>Sending your request</>:<>Get my quote<ArrowRight size={18}/></>}</button>
    </form>
  </div></section>;
}
