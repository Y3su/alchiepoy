import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Properties", href: "#properties" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/90 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo + Brand */}
        <a href="#home" className="flex items-center gap-2.5">
          <img
            src={logo}
            alt="AlchiepoY Real Estate logo"
            className="h-9 md:h-10 w-auto object-contain"
          />
          <span
            className={`font-bold text-lg tracking-tight transition-colors ${
              scrolled ? "text-foreground" : "text-primary-foreground"
            }`}
          >
            ALCHIEPOY
          </span>
        </a>

        {/* Desktop nav — centered */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative text-sm font-medium transition-colors after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${
                scrolled
                  ? "text-foreground hover:text-primary"
                  : "text-primary-foreground/90 hover:text-primary-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              scrolled
                ? "bg-primary text-primary-foreground"
                : "bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
            }`}
            aria-label="Account"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Mobile toggle */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className={`w-5 h-5 ${scrolled ? "text-foreground" : "text-primary-foreground"}`} />
            ) : (
              <Menu className={`w-5 h-5 ${scrolled ? "text-foreground" : "text-primary-foreground"}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-border animate-fade-in">
          <nav className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-foreground font-medium py-2.5 px-3 rounded-lg hover:bg-muted transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
