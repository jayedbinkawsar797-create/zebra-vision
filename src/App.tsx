import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "@/components/ScrollToTop";

const Index = lazy(() => import("./pages/Index.tsx"));
const CustomizePage = lazy(() => import("./pages/Customize.tsx"));
const Quote = lazy(() => import("./pages/Quote.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const DealerApplication = lazy(() => import("./pages/DealerApplication.tsx"));
const BookDemo = lazy(() => import("./pages/BookDemo.tsx"));
const ThankYou = lazy(() => import("./pages/ThankYou.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center">
    <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/customize" element={<CustomizePage />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dealer" element={<DealerApplication />} />
            <Route path="/book-demo" element={<BookDemo />} />
            <Route path="/thank-you" element={<ThankYou />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
