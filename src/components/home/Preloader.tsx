import { useState, useEffect, useCallback } from "react";

const REVEAL_SPEED = 40; // ms per character
const PAUSE_AFTER_REVEAL = 400;
const EXIT_DURATION = 500;
const MAX_TIMEOUT = 3000;

const SUBTITLE = "Alchiepoy Real Estate";
const HEADLINE_PARTS = [
  { text: "CARE MAKES THE ", highlight: false },
  { text: "DIFFERENCE", highlight: true },
];
const FULL_HEADLINE = HEADLINE_PARTS.map((p) => p.text).join("");

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"subtitle" | "headline" | "line" | "out" | "done">("subtitle");
  const [subtitleCount, setSubtitleCount] = useState(0);
  const [headlineCount, setHeadlineCount] = useState(0);

  const finish = useCallback(() => {
    setPhase("done");
    onComplete();
  }, [onComplete]);

  // Reduced motion: skip everything
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
    }
  }, [finish]);

  // Fallback safety
  useEffect(() => {
    const t = setTimeout(finish, MAX_TIMEOUT);
    return () => clearTimeout(t);
  }, [finish]);

  // Subtitle typing
  useEffect(() => {
    if (phase !== "subtitle") return;
    if (subtitleCount < SUBTITLE.length) {
      const t = setTimeout(() => setSubtitleCount((c) => c + 1), REVEAL_SPEED);
      return () => clearTimeout(t);
    }
    // Done typing subtitle → start headline
    const t = setTimeout(() => setPhase("headline"), 150);
    return () => clearTimeout(t);
  }, [phase, subtitleCount]);

  // Headline typing
  useEffect(() => {
    if (phase !== "headline") return;
    if (headlineCount < FULL_HEADLINE.length) {
      const t = setTimeout(() => setHeadlineCount((c) => c + 1), REVEAL_SPEED);
      return () => clearTimeout(t);
    }
    // Done typing headline → show underline
    const t = setTimeout(() => setPhase("line"), 200);
    return () => clearTimeout(t);
  }, [phase, headlineCount]);

  // Line → out
  useEffect(() => {
    if (phase !== "line") return;
    const t = setTimeout(() => setPhase("out"), PAUSE_AFTER_REVEAL);
    return () => clearTimeout(t);
  }, [phase]);

  // Out → done
  useEffect(() => {
    if (phase !== "out") return;
    const t = setTimeout(finish, EXIT_DURATION);
    return () => clearTimeout(t);
  }, [phase, finish]);

  if (phase === "done") return null;

  const isOut = phase === "out";
  const showLine = phase === "line" || isOut;

  // Build headline with highlight
  const renderedHeadline = (() => {
    let charIndex = 0;
    return HEADLINE_PARTS.map((part, i) => {
      const start = charIndex;
      charIndex += part.text.length;
      const visible = FULL_HEADLINE.slice(start, Math.min(start + Math.max(0, headlineCount - start), charIndex)).length;
      const text = part.text.slice(0, visible);
      return (
        <span key={i} className={part.highlight ? "text-primary" : ""}>
          {text}
        </span>
      );
    });
  })();

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-navy transition-all duration-500 ease-out ${
        isOut ? "opacity-0 scale-[0.88] blur-[2px]" : "opacity-100 scale-100 blur-0"
      }`}
      style={{ pointerEvents: isOut ? "none" : "auto" }}
      aria-hidden="true"
    >
      <div className="text-center">
        <p className="text-primary font-semibold text-sm tracking-[0.25em] uppercase mb-3 h-5">
          {SUBTITLE.slice(0, subtitleCount)}
          {phase === "subtitle" && (
            <span className="inline-block w-[2px] h-[1em] bg-primary ml-0.5 animate-pulse align-middle" />
          )}
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground tracking-tight min-h-[1.2em]">
          {renderedHeadline}
          {phase === "headline" && (
            <span className="inline-block w-[3px] h-[0.8em] bg-primary-foreground ml-1 animate-pulse align-middle" />
          )}
        </h1>
        {/* Underline draw */}
        <div className="mt-4 mx-auto h-0.5 w-48 rounded-full bg-primary/20 overflow-hidden">
          <div
            className={`h-full bg-primary rounded-full transition-transform duration-500 ease-out origin-left ${
              showLine ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
