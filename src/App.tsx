import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Quote from "./pages/Quote.tsx";
import Contact from "./pages/Contact.tsx";
import DealerApplication from "./pages/DealerApplication.tsx";
import BookDemo from "./pages/BookDemo.tsx";
import CustomizePage from "./pages/Customize.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/customize" element={<CustomizePage />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dealer" element={<DealerApplication />} />
          <Route path="/book-demo" element={<BookDemo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
