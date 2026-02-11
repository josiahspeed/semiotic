import { Send } from "lucide-react";
import { Link } from "react-router-dom";
import semioticLogo from "@/assets/semiotic-logo.svg";
import agentiumLogo from "@/assets/agentium-logo.png";
import { useScrollToSection } from "@/hooks/useScrollToSection";

const Footer = () => {
  const { scrollToSection, handlePageNavigation } = useScrollToSection();

  return (
    <footer 
      className="relative min-h-[500px] md:min-h-[661px] flex flex-col"
      style={{ 
        backgroundImage: 'url(/images/footer_3.png)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      <div className="container mx-auto px-4 md:px-6 pt-10 md:pt-[50px] flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-8 mb-8 md:mb-16">
          {/* Left Column - Logo and Description */}
          <div className="sm:col-span-2 md:col-span-4">
            <div className="flex items-center space-x-2 mb-4">
              <img src={agentiumLogo} alt="Agentium Logo" className="w-8 h-8" />
              <span className="text-xl md:text-2xl font-bold text-white">Agentium</span>
            </div>
            <p className="text-white/70 mb-6 max-w-xs text-sm md:text-base">
              Agentium enables autonomous coordination between agents across any market or vertical.
            </p>
            <a href="https://www.semiotic.ai/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src={semioticLogo} alt="Semiotic Labs" className="w-5 h-5 object-contain" />
              <span className="text-white/70 text-sm md:text-base">Semiotic Labs</span>
            </a>
          </div>

          {/* Middle Columns - Navigation Links */}
          <div className="sm:col-span-2 md:col-span-6 grid grid-cols-2 gap-6 md:gap-8">
            <div>
              <ul className="space-y-3">
                <li>
                  <button onClick={() => scrollToSection('how-it-works')} className="text-white/90 hover:text-white transition-colors cursor-pointer text-sm md:text-base">
                    How it works
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('features')} className="text-white/90 hover:text-white transition-colors cursor-pointer text-sm md:text-base">
                    Features
                  </button>
                </li>
                <li>
                  <button onClick={() => handlePageNavigation('/documentation')} className="text-white/90 hover:text-white transition-colors cursor-pointer text-sm md:text-base">
                    Documentation
                  </button>
                </li>
                <li>
                  <button onClick={() => handlePageNavigation('/faqs')} className="text-white/90 hover:text-white transition-colors cursor-pointer text-sm md:text-base">
                    FAQs
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-3">
                <li>
                  <button onClick={() => handlePageNavigation('/terms')} className="text-white/90 hover:text-white transition-colors cursor-pointer text-sm md:text-base">
                    Terms of Use
                  </button>
                </li>
                <li>
                  <button onClick={() => handlePageNavigation('/privacy')} className="text-white/90 hover:text-white transition-colors cursor-pointer text-sm md:text-base">
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Social Icons */}
          <div className="sm:col-span-2 md:col-span-2 flex md:justify-end items-start gap-4">
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
            <a href="https://x.com/agentiumn10167?s=21&t=VKFD7oUZakh24ROrGwEf-A" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="mailto:contact@agentium.com" className="text-white/70 hover:text-white transition-colors">
              <Send className="w-5 h-5 md:w-6 md:h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright at bottom */}
      <div className="py-6 md:py-8 text-center">
        <p className="text-white/70 text-sm md:text-base">&copy; 2025 Agentium. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
