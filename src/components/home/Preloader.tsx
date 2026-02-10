import { useState, useEffect, useCallback, useMemo } from "react";

const WORD_IN_DELAY = 250;   // ms between each word appearing
const WORD_IN_DURATION = 600; // ms for each word's fade-in
const HOLD = 600;             // pause after all words visible
const WORD_OUT_DELAY = 180;   // ms between each word exiting
const WORD_OUT_DURATION = 500;
const EXIT_DURATION = 700;
const MAX_TIMEOUT = 6000;

const SUBTITLE = "Alchiepoy Real Estate";
const HEADLINE: Array<{ text: string; highlight?: boolean }> = [
  { text: "CARE" },
  { text: "MAKES" },
  { text: "THE" },
  { text: "DIFFERENCE", highlight: true },
];

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"wordsIn" | "hold" | "wordsOut" | "exit" | "done">("wordsIn");
  const [visibleWords, setVisibleWords] = useState(0);
  const [exitingWords, setExitingWords] = useState(0);

  const totalWords = HEADLINE.length;

  const finish = useCallback(() => {
    setPhase("done");
    onComplete();
  }, [onComplete]);

  // Reduced motion
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) finish();
  }, [finish]);

  // Safety fallback
  useEffect(() => {
    const t = setTimeout(finish, MAX_TIMEOUT);
    return () => clearTimeout(t);
  }, [finish]);

  // Phase: words in (one by one)
  useEffect(() => {
    if (phase !== "wordsIn") return;
    if (visibleWords < totalWords) {
      const t = setTimeout(() => setVisibleWords((v) => v + 1), visibleWords === 0 ? 200 : WORD_IN_DELAY);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase("hold"), 50);
    return () => clearTimeout(t);
  }, [phase, visibleWords, totalWords]);

  // Phase: hold
  useEffect(() => {
    if (phase !== "hold") return;
    const t = setTimeout(() => setPhase("wordsOut"), HOLD);
    return () => clearTimeout(t);
  }, [phase]);

  // Phase: words out (reverse order, right → left)
  useEffect(() => {
    if (phase !== "wordsOut") return;
    if (exitingWords < totalWords) {
      const t = setTimeout(() => setExitingWords((e) => e + 1), WORD_OUT_DELAY);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase("exit"), 100);
    return () => clearTimeout(t);
  }, [phase, exitingWords, totalWords]);

  // Phase: exit overlay
  useEffect(() => {
    if (phase !== "exit") return;
    const t = setTimeout(finish, EXIT_DURATION);
    return () => clearTimeout(t);
  }, [phase, finish]);

  if (phase === "done") return null;

  const isExit = phase === "exit";

  // Determine word states
  const getWordState = (index: number): "hidden" | "visible" | "exiting" | "exited" => {
    if (phase === "wordsIn") return index < visibleWords ? "visible" : "hidden";
    if (phase === "hold") return "visible";
    // wordsOut: exit from last to first
    const reverseIndex = totalWords - 1 - index;
    if (reverseIndex < exitingWords) return "exited";
    return "visible";
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-navy transition-all ease-out ${
        isExit
          ? "opacity-0 scale-[0.88] blur-[2px] duration-500"
          : "opacity-100 scale-100 blur-0 duration-300"
      }`}
      style={{ pointerEvents: isExit ? "none" : "auto" }}
      aria-hidden="true"
    >
      <div className="text-center px-6">
        {/* Subtitle */}
        <p
          className="text-primary font-semibold text-sm tracking-[0.25em] uppercase mb-4 transition-all duration-400 ease-out"
          style={{
            opacity: phase === "wordsIn" && visibleWords === 0 ? 0 : isExit || phase === "wordsOut" && exitingWords >= totalWords ? 0 : 1,
            transform:
              phase === "wordsIn" && visibleWords === 0
                ? "translateY(12px)"
                : isExit || (phase === "wordsOut" && exitingWords >= totalWords)
                ? "translateY(-12px)"
                : "translateY(0)",
          }}
        >
          {SUBTITLE}
        </p>

        {/* Headline — word by word */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight flex flex-wrap items-center justify-center gap-x-[0.3em]">
          {HEADLINE.map((word, i) => {
            const state = getWordState(i);
            const isVisible = state === "visible";
            const isExited = state === "exited";
            const isHidden = state === "hidden";

            return (
              <span
                key={i}
                className={`inline-block transition-all ease-out ${
                  word.highlight ? "text-primary" : "text-primary-foreground"
                }`}
                style={{
                  transitionDuration: isHidden ? "0ms" : isExited ? `${WORD_OUT_DURATION}ms` : `${WORD_IN_DURATION}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isHidden
                    ? "translateY(20px)"
                    : isExited
                    ? "translateY(-20px)"
                    : "translateY(0)",
                }}
              >
                {word.text}
              </span>
            );
          })}
        </h1>

        {/* Underline */}
        <div className="mt-5 mx-auto h-0.5 w-48 rounded-full bg-primary/20 overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-transform ease-out origin-left"
            style={{
              transitionDuration: "500ms",
              transform:
                (phase === "hold" || phase === "wordsOut") && exitingWords < totalWords
                  ? "scaleX(1)"
                  : "scaleX(0)",
              transformOrigin: phase === "wordsOut" ? "right" : "left",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
