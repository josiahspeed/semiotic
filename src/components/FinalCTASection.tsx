import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import backgroundImage from "@/assets/cicle_item.png";
import { useEffect, useRef, useState } from "react";
import { usePartnershipModal } from "@/hooks/usePartnershipModal";

const FinalCTASection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { openModal } = usePartnershipModal();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative overflow-hidden px-4 md:px-6">
      <div 
        className="absolute inset-4 md:inset-6 bg-center bg-cover rounded-3xl md:rounded-[40px]" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-4 md:inset-6 bg-gradient-to-br from-black/20 to-transparent rounded-3xl md:rounded-[40px]" />
      
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10 py-8 md:py-12">
        <h2 
          className={`text-2xl md:text-3xl lg:text-5xl font-extrabold text-white mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Ready to build the future?
        </h2>
        <p 
          className={`text-white/80 text-base md:text-lg mb-8 max-w-md mx-auto transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Join the next generation of agentic commerce
        </p>
        <div 
          className={`transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Button 
            size="lg" 
            onClick={openModal}
            className="text-base md:text-lg px-8 md:px-10 py-6 md:py-7 h-auto group font-semibold bg-gradient-to-r from-[#015C50] to-[#23A797] hover:from-[#014740] hover:to-[#1d8f82] shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Partner With Us
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
