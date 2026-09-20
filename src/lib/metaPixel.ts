type PixelFunction = ((...args: unknown[]) => void) & {queue?: unknown[][]; loaded?: boolean; version?: string; callMethod?: (...args: unknown[]) => void; push?: PixelFunction};
declare global { interface Window {fbq?: PixelFunction; _fbq?: PixelFunction;} }
const consentKey='zebra-advertising-consent'; let initialized=false; let lastPage='';
export function advertisingAllowed(){try{return localStorage.getItem(consentKey)==='accepted' && !(navigator as Navigator & {globalPrivacyControl?: boolean}).globalPrivacyControl;}catch{return false;}}
export function consentChoice(){try{return localStorage.getItem(consentKey);}catch{return 'declined';}}
export function setAdvertisingConsent(allowed:boolean){
  try{localStorage.setItem(consentKey,allowed?'accepted':'declined');}catch{return;}
  if(!allowed){window.fbq?.('consent','revoke');try{sessionStorage.removeItem('zebra-attribution');}catch{/* storage disabled */}}
  window.dispatchEvent(new Event('zebra-consent-change'));
}
function initPixel(){
  if(!advertisingAllowed() || location.pathname.startsWith('/leads'))return;
  if(!window.fbq){
    const pixel:PixelFunction=(...args:unknown[])=>pixel.callMethod?pixel.callMethod(...args):pixel.queue?.push(args);
    pixel.queue=[];pixel.loaded=true;pixel.version='2.0';pixel.push=pixel;window.fbq=pixel;window._fbq=pixel;
    const script=document.createElement('script');script.src='https://connect.facebook.net/en_US/fbevents.js';script.async=true;document.head.appendChild(script);
  }
  window.fbq('consent','grant');if(!initialized){window.fbq('init','452282614546759');initialized=true;}
}
export function pageView(path:string){if(!advertisingAllowed()||path.startsWith('/leads')||path==='/thank-you')return;initPixel();if(lastPage!==path){lastPage=path;window.fbq?.('track','PageView');}}
export function trackPixelEvent(event:string,params?:Record<string,unknown>){if(!advertisingAllowed())return;initPixel();window.fbq?.('track',event,params||{});}
export function trackPixelCustom(event:string,params?:Record<string,unknown>){if(!advertisingAllowed())return;initPixel();window.fbq?.('trackCustom',event,params||{});}
export function trackConfirmedLead(event:string,eventId:string,type:string){
  if(!advertisingAllowed())return;initPixel();
  // Only event metadata: never contact details, messages, financing choices or cart price.
  window.fbq?.('track',event,{content_name:'Zebra Golf Cart inquiry',content_category:type},{eventID:eventId});
}
export function getAttribution():Record<string,string>{
  const result:Record<string,string>={path:location.pathname};if(!advertisingAllowed())return result;
  const params=new URLSearchParams(location.search);
  for(const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']){const v=params.get(key);if(v)result[key]=v.slice(0,150);}
  for(const name of ['fbp','fbc']){const raw=document.cookie.split(';').map(c=>c.trim()).find(c=>c.startsWith(`_${name}=`))?.split('=').slice(1).join('=');if(raw&&/^fb\.\d\.\d{10,13}\.[A-Za-z0-9_.-]+$/.test(raw))result[name]=raw.slice(0,250);}
  const fbclid=params.get('fbclid');if(!result.fbc&&fbclid&&/^[A-Za-z0-9_-]{1,200}$/.test(fbclid))result.fbc=`fb.1.${Date.now()}.${fbclid}`;
  try{const saved=JSON.parse(sessionStorage.getItem('zebra-attribution')||'{}');const merged={...saved,...result};sessionStorage.setItem('zebra-attribution',JSON.stringify(merged));return merged;}catch{return result;}
}
