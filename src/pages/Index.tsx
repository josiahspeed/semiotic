import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import WhyAgentiumSection from "@/components/WhyAgentiumSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <StatsSection />
      <FeaturesSection />
      <WhyAgentiumSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default Index;
