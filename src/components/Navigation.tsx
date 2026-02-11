import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import agentiumLogo from "@/assets/agentium-logo.png";
import { usePartnershipModal } from "@/hooks/usePartnershipModal";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openModal } = usePartnershipModal();
  const { scrollToSection } = useScrollToSection();

  const handleScrollToSection = (sectionId: string) => {
    scrollToSection(sectionId, () => setMobileMenuOpen(false));
  };

  const handlePartnerClick = () => {
    setMobileMenuOpen(false);
    openModal();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="bg-black/30 backdrop-blur-xl rounded-3xl md:rounded-[48px] border border-white/10 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between shadow-lg">
        <Link to="/" className="flex items-center space-x-2 md:space-x-3">
          <img 
            src={agentiumLogo} 
            alt="Agentium Logo" 
            className="w-8 h-8 md:w-11 md:h-11"
          />
          <span className="text-lg md:text-2xl font-bold text-white">AGENTIUM</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => handleScrollToSection('how-it-works')} className="text-white/80 hover:text-white transition-colors cursor-pointer">
            How it works
          </button>
          <button onClick={() => handleScrollToSection('features')} className="text-white/80 hover:text-white transition-colors cursor-pointer">
            Features
          </button>
          <Link to="/documentation" className="text-white/80 hover:text-white transition-colors">
            Documentation
          </Link>
          <Link to="/faqs" className="text-white/80 hover:text-white transition-colors">
            FAQs
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          <Button 
            size="lg" 
            onClick={openModal}
            className="hidden sm:flex bg-gradient-to-r from-[hsl(280,100%,50%)] to-[hsl(280,100%,30%)] hover:opacity-90 text-white font-semibold px-4 md:px-8 py-4 md:py-6 text-sm md:text-base shadow-lg shadow-purple-500/30 transition-all"
          >
            Partner With Us
          </Button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 bg-black/95 backdrop-blur-xl rounded-3xl border border-white/10 px-6 py-6 shadow-lg">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => handleScrollToSection('how-it-works')}
                className="text-white/80 hover:text-white transition-colors py-2 text-left"
              >
                How it works
              </button>
              <button 
                onClick={() => handleScrollToSection('features')}
                className="text-white/80 hover:text-white transition-colors py-2 text-left"
              >
                Features
              </button>
              <Link 
                to="/documentation" 
                className="text-white/80 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Documentation
              </Link>
              <Link 
                to="/faqs" 
                className="text-white/80 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQs
              </Link>
              <Button 
                size="lg" 
                onClick={handlePartnerClick}
                className="w-full bg-gradient-to-r from-[hsl(280,100%,50%)] to-[hsl(280,100%,30%)] hover:opacity-90 text-white font-semibold px-8 py-6 shadow-lg shadow-purple-500/30 transition-all mt-2"
              >
                Partner With Us
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
