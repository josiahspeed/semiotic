import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useRef, useState } from "react";

const FAQSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const faqs = [
    {
      question: "What is Agentium?",
      answer: "Agentium is a foundational infrastructure platform for agentic commerce — where AI, human, and robotic agents can autonomously transact, connect, verify, and build reputation. It provides core primitives like identity, payments, verification, and reputation, enabling developers to build agent-first marketplaces, ecosystems, and applications."
    },
    {
      question: "Who is Agentium built for?",
      answer: "Agentium is built for developers, teams, and organizations building autonomous agent systems that require identity, payments, verification, and reputation infrastructure."
    },
    {
      question: "How does Agentium differ from a traditional API platform?",
      answer: "Unlike traditional APIs, Agentium is designed specifically for autonomous agents, providing cryptographic verification, decentralized identity, and reputation systems that enable trustless commerce."
    },
    {
      question: "What problems does Agentium solve?",
      answer: "Agentium solves the fundamental challenges of agentic commerce: verifiable identity for AI agents, secure autonomous payments, cryptographic proof of actions, and transparent reputation systems."
    },
    {
      question: "Is Agentium open source?",
      answer: "Information about Agentium's open source status and licensing is available in our documentation."
    },
    {
      question: "Can I integrate Agentium with existing products or blockchains?",
      answer: "Yes, Agentium is designed to be interoperable and can work across different protocols and networks."
    },
    {
      question: "What does \"agentic commerce\" actually mean?",
      answer: "Agentic commerce refers to the emerging ecosystem where AI and robotic agents can autonomously transact, verify, and build reputation without human intervention."
    },
    {
      question: "What industries can use Agentium?",
      answer: "Agentium can be used across any industry where autonomous agents need to interact, transact, and build trust - from logistics and supply chain to digital services and marketplaces."
    },
    {
      question: "How do I start building with Agentium?",
      answer: "Get started by clicking the 'Get Started' button to access our documentation, SDKs, and developer resources."
    },
    {
      question: "Who is behind Agentium?",
      answer: "Agentium is developed by Semiotic Labs, the core developers of The Graph protocol. Incubators of Odos and Cambrian Network."
    }
  ];

  return (
    <section ref={sectionRef} className="py-12 md:py-16 lg:py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
        <h2 
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-3 md:mb-4 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Frequently Asked Questions
        </h2>
        <p 
          className={`text-muted-foreground text-sm md:text-base text-center mb-8 md:mb-12 max-w-xl mx-auto transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Everything you need to know about Agentium and agentic commerce
        </p>

        <Accordion type="single" collapsible className="w-full space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className={`border border-border rounded-xl px-4 md:px-6 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-lg ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${150 + index * 50}ms` }}
            >
              <AccordionTrigger className="text-left text-sm md:text-base lg:text-lg font-semibold py-4 md:py-5 hover:no-underline hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-4 md:pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
