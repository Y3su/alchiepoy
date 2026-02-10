import { useState, useEffect } from "react";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setPhase("done");
      onComplete();
      return;
    }

    const showTimer = setTimeout(() => setPhase("out"), 1400);
    const hideTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-navy transition-opacity duration-500 ${
        phase === "out" ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div
        className={`text-center transition-all duration-700 ${
          phase === "in"
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4"
        }`}
      >
        <p className="text-primary font-semibold text-sm tracking-[0.25em] uppercase mb-3">
          Alchiepoy Real Estate
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground tracking-tight">
          CARE MAKES THE{" "}
          <span className="text-primary">DIFFERENCE</span>
        </h1>
      </div>
    </div>
  );
};

export default Preloader;
