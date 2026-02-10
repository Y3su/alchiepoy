import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FindProperties from "@/components/FindProperties";
import DedicatedSection from "@/components/DedicatedSection";
import GetInTouch from "@/components/GetInTouch";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FindProperties />
      <DedicatedSection />
      <GetInTouch />
      <Footer />
    </div>
  );
};

export default Index;
