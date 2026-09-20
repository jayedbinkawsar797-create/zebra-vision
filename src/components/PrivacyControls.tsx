import {useEffect,useState} from 'react';
import {Link,useLocation} from 'react-router-dom';
import {consentChoice,setAdvertisingConsent,pageView,getAttribution} from '@/lib/metaPixel';
export default function PrivacyControls(){
  const location=useLocation();const [open,setOpen]=useState(!consentChoice());
  useEffect(()=>{const update=()=>{pageView(location.pathname);getAttribution();};update();window.addEventListener('zebra-consent-change',update);const show=()=>setOpen(true);window.addEventListener('zebra-open-privacy',show);return()=>{window.removeEventListener('zebra-consent-change',update);window.removeEventListener('zebra-open-privacy',show);};},[location.pathname]);
  if(!open||location.pathname.startsWith('/leads'))return null;
  const choose=(allow:boolean)=>{setAdvertisingConsent(allow);setOpen(false);};
  return <aside aria-label="Privacy choices" className="fixed bottom-20 left-4 right-4 sm:right-auto sm:max-w-sm z-[60] bg-zinc-950 border border-zinc-700 rounded-2xl p-5 shadow-2xl">
    <p className="font-semibold text-white mb-2">Your privacy choices</p><p className="text-xs text-zinc-300 leading-relaxed">Allow Meta advertising cookies and matching data to help us measure which ads lead to inquiries? You can use every form either way. <Link className="underline" to="/privacy">Details</Link></p>
    <div className="grid grid-cols-2 gap-3 mt-4"><button className="border border-zinc-500 rounded-lg p-2 text-sm" onClick={()=>choose(false)}>Decline</button><button className="border border-zinc-500 rounded-lg p-2 text-sm" onClick={()=>choose(true)}>Allow</button></div>
  </aside>;
}
