import { Search, MapPin, Home, DollarSign } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Luxury residential entrance"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex items-center justify-center pt-20">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <p className="text-gold font-semibold text-sm tracking-widest uppercase mb-4 animate-fade-up">
            Est. 2024
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up-delay-1 text-balance">
            <span className="block">CARE MAKES THE{" "}
            <span className="text-primary">DIFFERENCE</span></span>
          </h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mb-10 animate-fade-up-delay-2">
            Find your dream property with Alchiepoy Real Estate — where every detail matters.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up-delay-3">
            <a
              href="#properties"
              className="px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              Search Properties
            </a>
            <a
              href="#properties"
              className="px-8 py-3.5 border border-primary-foreground/20 text-primary-foreground font-semibold rounded-xl bg-primary-foreground/10 backdrop-blur-md hover:bg-primary-foreground/20 hover:border-primary-foreground/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-foreground/10 transition-all duration-300 supports-[not(backdrop-filter)]:bg-navy/60"
            >
              Browse Categories
            </a>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-4xl animate-fade-up-delay-3">
            <div className="bg-surface/95 backdrop-blur-md rounded-2xl p-3 shadow-2xl flex flex-col md:flex-row items-stretch gap-3">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-background">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm outline-none"
                />
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-background">
                <Home className="w-5 h-5 text-primary shrink-0" />
                <select className="w-full bg-transparent text-foreground text-sm outline-none cursor-pointer">
                  <option>Property Type</option>
                  <option>House and Lot</option>
                  <option>Condominium</option>
                  <option>Farm Lot</option>
                </select>
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-background">
                <DollarSign className="w-5 h-5 text-primary shrink-0" />
                <select className="w-full bg-transparent text-foreground text-sm outline-none cursor-pointer">
                  <option>Price Range</option>
                  <option>Under ₱1M</option>
                  <option>₱1M – ₱3M</option>
                  <option>₱3M – ₱5M</option>
                  <option>₱5M+</option>
                </select>
              </div>
              <button className="flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
