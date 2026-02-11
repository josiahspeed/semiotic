import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FAQs from "./pages/FAQs";
import Documentation from "./pages/Documentation";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { PartnershipModalProvider } from "./hooks/usePartnershipModal";
import PartnershipModal from "./components/PartnershipModal";
import { usePartnershipModal } from "./hooks/usePartnershipModal";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isOpen, setIsOpen } = usePartnershipModal();
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <PartnershipModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PartnershipModalProvider>
            <AppContent />
          </PartnershipModalProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
