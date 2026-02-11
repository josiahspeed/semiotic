import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AgentiumSection from "@/components/AgentiumSection";
import PortfolioSection from "@/components/PortfolioSection";
import TheGraphSection from "@/components/TheGraphSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <AgentiumSection />
      <PortfolioSection />
      <TheGraphSection />
      <Footer />
    </div>
  );
};

export default Index;
