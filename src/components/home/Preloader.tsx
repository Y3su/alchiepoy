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

    // Phase 1: show for 1.2s, then start fade-out
    const showTimer = setTimeout(() => setPhase("out"), 1200);
    // Phase 2: fade-out takes 0.5s, then remove
    const hideTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 1700);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-navy transition-all duration-500 ease-out ${
        phase === "out" ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
      }`}
      style={{ pointerEvents: phase === "out" ? "none" : "auto" }}
      aria-hidden="true"
    >
      <div
        className={`text-center transition-all duration-600 ease-out ${
          phase === "in"
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-3"
        }`}
      >
        <p className="text-primary font-semibold text-sm tracking-[0.25em] uppercase mb-3">
          Alchiepoy Real Estate
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground tracking-tight">
          CARE MAKES THE{" "}
          <span className="text-primary">DIFFERENCE</span>
        </h1>
        {/* Shimmer underline */}
        <div className="mt-4 mx-auto h-0.5 w-48 overflow-hidden rounded-full bg-primary/20">
          <div className="h-full w-full animate-shimmer bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
