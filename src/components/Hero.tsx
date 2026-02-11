import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import semioticLogo from "@/assets/semiotic-logo.svg";
import { usePartnershipModal } from "@/hooks/usePartnershipModal";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const { openModal } = usePartnershipModal();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Lazy load video when component mounts
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image fallback - always visible until video loads */}
      <div 
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundImage: 'url(/images/hero-bg.png)' }}
      />
      
      {/* Video background with lazy loading */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <source src="/videos/hero-bg-video.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      <div className="container mx-auto px-4 md:px-6 py-20 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Semiotic Labs badge */}
          <a 
            href="https://www.semiotic.ai/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 md:gap-3 mb-6 px-4 py-2 hover:opacity-80 transition-all duration-300 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            <img src={semioticLogo} alt="Semiotic Labs" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
            <span className="text-xs md:text-sm font-medium text-white/90">Built by Semiotic Labs</span>
          </a>

          {/* Main headline */}
          <h1 
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-4 md:mb-6 leading-tight tracking-tight opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Agentium
          </h1>
          
          {/* Subheadline with gradient text effect */}
          <h2 
            className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            The Operating System for
            <br />
            <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              Agentic Commerce
            </span>
          </h2>

          {/* Description */}
          <p 
            className="text-base sm:text-lg md:text-xl text-white/80 mb-8 md:mb-10 max-w-2xl mx-auto px-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            Identity, payments, verification, and reputation for autonomous agents.
          </p>

          {/* CTA Button */}
          <div 
            className="flex items-center justify-center px-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.8s' }}
          >
            <Button 
              size="lg" 
              onClick={openModal}
              className="text-base md:text-lg px-8 md:px-10 py-6 md:py-7 h-auto group font-semibold shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
            >
              Partner With Us
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '1.2s' }}>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
