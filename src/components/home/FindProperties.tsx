import { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import farmLot from "@/assets/farm-lot.jpg";
import houseLot from "@/assets/house-lot.jpg";
import condo from "@/assets/condominium.jpg";

const categories = [
  { title: "Farm Lot", image: farmLot },
  { title: "House and Lot", image: houseLot },
  { title: "Condominium", image: condo },
];

const tabs = ["Categories", "Type of Properties"];

const FindProperties = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="properties" ref={ref} className="py-20 md:py-28 bg-surface">
      <div className="container">
        {/* Header */}
        <div className={`mb-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-0.5 bg-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Explore</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Find Properties</h2>
        </div>

        {/* Tabs */}
        <div className={`flex gap-1 bg-muted rounded-xl p-1 w-fit mb-10 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeTab === i
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              className={`group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: visible ? `${200 + i * 100}ms` : "0ms" }}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-primary-foreground mb-2">{cat.title}</h3>
                <span className="inline-flex items-center gap-1.5 text-gold text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                  View all <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FindProperties;
