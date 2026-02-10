import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import about1 from "@/assets/about-1.jpg";
import about2 from "@/assets/about-2.jpg";
import about3 from "@/assets/about-3.jpg";

const images = [about1, about2, about3];

const DedicatedSection = () => {
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
    <section id="about" ref={ref} className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-0.5 bg-primary" />
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Explore</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground italic mb-6 leading-tight">
              Dedicated to the<br />joy of home
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg">
              At Alchiepoy Real Estate, we believe that finding the perfect home is more than a transaction — it's a journey. Our dedicated team works tirelessly to match you with properties that fit your lifestyle, needs, and dreams.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              About us <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Image grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`rounded-2xl overflow-hidden row-span-2 transition-all duration-700 delay-200 group ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <img src={images[0]} alt="Family moving in" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className={`rounded-2xl overflow-hidden transition-all duration-700 delay-300 group ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <img src={images[1]} alt="Modern interior" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className={`rounded-2xl overflow-hidden transition-all duration-700 delay-[400ms] group ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <img src={images[2]} alt="Community aerial" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DedicatedSection;
