import { useState, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FindProperties from "@/components/home/FindProperties";
import DedicatedSection from "@/components/home/DedicatedSection";
import GetInTouch from "@/components/home/GetInTouch";
import Preloader from "@/components/home/Preloader";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const handleComplete = useCallback(() => setLoaded(true), []);

  return (
    <div className="min-h-screen">
      {!loaded && <Preloader onComplete={handleComplete} />}
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
