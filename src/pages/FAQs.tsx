import Navigation from "@/components/Navigation";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const FAQs = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-24">
        <FAQSection />
      </div>
      <Footer />
    </div>
  );
};

export default FAQs;
