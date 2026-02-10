import { useState, useEffect, useCallback } from "react";

const PHASE_DURATIONS = { in: 600, line: 500, out: 500 };
const MAX_TIMEOUT = 2000;

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"in" | "line" | "out" | "done">("in");

  const finish = useCallback(() => {
    setPhase("done");
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      finish();
      return;
    }

    // Phase 1 → Phase 2 (line draw)
    const t1 = setTimeout(() => setPhase("line"), PHASE_DURATIONS.in);
    // Phase 2 → Phase 3 (zoom-out reveal)
    const t2 = setTimeout(() => setPhase("out"), PHASE_DURATIONS.in + PHASE_DURATIONS.line);
    // Phase 3 → done
    const t3 = setTimeout(finish, PHASE_DURATIONS.in + PHASE_DURATIONS.line + PHASE_DURATIONS.out);
    // Fallback safety
    const fallback = setTimeout(finish, MAX_TIMEOUT);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(fallback); };
  }, [finish]);

  if (phase === "done") return null;

  const isOut = phase === "out";
  const isLineOrLater = phase === "line" || isOut;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-navy transition-all duration-500 ease-out ${
        isOut ? "opacity-0 scale-[0.88] blur-[2px]" : "opacity-100 scale-100 blur-0"
      }`}
      style={{ pointerEvents: isOut ? "none" : "auto" }}
      aria-hidden="true"
    >
      <div
        className={`text-center transition-all duration-500 ease-out ${
          phase === "in"
            ? "opacity-0 translate-y-4"
            : "opacity-100 translate-y-0"
        }`}
        style={phase === "in" ? { animation: "preloader-text-in 0.5s 0.05s ease-out forwards" } : undefined}
      >
        <p className="text-primary font-semibold text-sm tracking-[0.25em] uppercase mb-3">
          Alchiepoy Real Estate
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground tracking-tight">
          CARE MAKES THE{" "}
          <span className="text-primary">DIFFERENCE</span>
        </h1>
        {/* Underline draw */}
        <div className="mt-4 mx-auto h-0.5 w-48 rounded-full bg-primary/20 overflow-hidden">
          <div
            className={`h-full bg-primary rounded-full transition-transform duration-500 ease-out origin-left ${
              isLineOrLater ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
