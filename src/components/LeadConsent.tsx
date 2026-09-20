import { Link } from 'react-router-dom';
export default function LeadConsent(){return <>
  <div className="absolute -left-[10000px] top-auto w-px h-px overflow-hidden" aria-hidden="true"><label>Leave this field empty<input name="companyWebsiteCheck" tabIndex={-1} autoComplete="off" /></label></div>
  <label className="flex gap-3 text-xs leading-relaxed text-muted-foreground"><input className="mt-1 accent-red-500" type="checkbox" name="contactConsent" value="yes" required /><span>Zebra Golf Cart may contact me by phone or email about this request. Read our <Link className="underline text-foreground" to="/privacy">Privacy Policy</Link>.</span></label>
</>;}
