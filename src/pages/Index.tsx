import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FindProperties from "@/components/home/FindProperties";
import DedicatedSection from "@/components/home/DedicatedSection";
import GetInTouch from "@/components/home/GetInTouch";

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
