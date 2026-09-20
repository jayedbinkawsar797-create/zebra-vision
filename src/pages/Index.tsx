import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import QuickQuoteForm from '@/components/QuickQuoteForm';
import ModelsShowcase from '@/components/ModelsShowcase';
import GalleryStrip from '@/components/GalleryStrip';
import BuyerQuestions from '@/components/BuyerQuestions';
import DealerInvite from '@/components/DealerInvite';
import Footer from '@/components/Footer';
import StickyReservationBar from '@/components/StickyReservationBar';
export default function Index(){return <div className="min-h-screen bg-background"><Navbar/><main><HeroSection/><QuickQuoteForm/><ModelsShowcase/><GalleryStrip/><BuyerQuestions/><DealerInvite/></main><Footer/><StickyReservationBar/></div>;}
