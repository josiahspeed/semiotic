import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePartnershipModal } from "@/hooks/usePartnershipModal";

const WhyAgentiumSection = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const reasons = [
    {
      title: "Verifiable Identity (DID + VC + ERC-8004)",
      description: "Secure identity and role-based permissions for humans, robots, and AI agents using verifiable digital identities (DIDs) and Verifiable Credentials (VCs) compatible with ERC-8004."
    },
    {
      title: "Provenance & Verification",
      description: "Record tamper-proof evidence of each action and evaluate outcomes through trusted human or AI evaluators — producing standardized verification receipts for any workflow."
    },
    {
      title: "Programmable Settlement (Escrow + x402)",
      description: "Automate payout flows using escrow or x402-based settlement, ensuring payments are released only after verified results."
    },
    {
      title: "Cross-Ecosystem Reputation",
      description: "Generate durable, portable reputation based on verified actions, VCs, and ERC-8004 compatibility — improving trust, routing, and performance across hubs and ecosystems."
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 
          className={`text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Why teams build on Agentium
        </h2>
        <p 
          className={`text-muted-foreground text-center mb-12 md:mb-16 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Enterprise-grade infrastructure for the next generation of autonomous systems
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
          {reasons.map((reason, index) => (
            <Card 
              key={index} 
              className={`p-6 md:p-8 bg-card border-border transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-6 group-hover:w-16 transition-all duration-300" />
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {reason.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </Card>
          ))}
        </div>

        <div 
          className={`flex justify-center px-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <Button 
            size="lg" 
            onClick={openModal}
            className="text-base md:text-lg px-8 md:px-10 py-6 md:py-7 h-auto group font-semibold bg-gradient-to-r from-cta-gradient-from to-cta-gradient-to hover:from-cta-gradient-from-hover hover:to-cta-gradient-to-hover shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
          >
            Partner With Us 
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyAgentiumSection;
