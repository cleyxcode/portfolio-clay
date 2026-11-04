import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion as Motion } from "motion/react";

const DEBUG_ALWAYS_SHOW = true; // Set to false to show once per session.
const SESSION_KEY = "clayxcode-preloader-seen";
const BRAND = "CLAYXCODE";
const INTRO_DURATION = 0.8;
const LETTER_STAGGER = 0.09;
const LETTER_DURATION = 0.9;
const PROGRESS_DURATION = 4.4;
const HOLD_DURATION = 0.6;
const TEXT_EXIT_DURATION = 0.7;
const CURTAIN_DURATION = 1.1;
const MAX_WAIT = 8;
const EASE = [0.22, 1, 0.36, 1];
const CURTAIN_EASE = [0.77, 0, 0.18, 1];

function sessionWasShown() {
  if (DEBUG_ALWAYS_SHOW) return false;
  try {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function markSessionShown() {
  try {
    sessionStorage.setItem(SESSION_KEY, "true");
  } catch {
    // Continue normally when storage is blocked.
  }
}

function Preloader({ onComplete }) {
  const [active, setActive] = useState(() => !sessionWasShown());
  const [phase, setPhase] = useState("show");
  const [progress, setProgress] = useState(0);
  const readyRef = useRef(document.readyState === "complete");

  useEffect(() => {
    const initial = document.getElementById("initial-preloader");
    initial?.remove();
  }, []);

  useEffect(() => {
    if (!active) {
      onComplete?.();
      return undefined;
    }

    document.body.classList.add("preloader-active");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startedAt = performance.now();
    const markReady = () => { readyRef.current = true; };
    const fontReady = document.fonts?.ready?.then(markReady);
    window.addEventListener("load", markReady, { once: true });

    let frame;
    const tick = (now) => {
      const elapsed = (now - startedAt) / 1000;
      const normalized = Math.min(elapsed / PROGRESS_DURATION, 1);
      const eased = normalized < 0.5
        ? 2 * normalized * normalized
        : 1 - ((-2 * normalized + 2) ** 2) / 2;
      const canFinish = readyRef.current && elapsed >= PROGRESS_DURATION;
      const next = canFinish ? 100 : Math.min(90, Math.round(eased * 90));
      setProgress((current) => Math.max(current, next));

      if (canFinish) {
        setPhase("hold");
        return;
      }
      if (elapsed >= MAX_WAIT) {
        setProgress(100);
        setPhase("hold");
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    if (reducedMotion) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setProgress(100);
        setPhase("hold");
      });
    }

    return () => {
      cancelAnimationFrame(frame);
      void fontReady;
      window.removeEventListener("load", markReady);
      document.body.classList.remove("preloader-active");
    };
  }, [active, onComplete]);

  const finishHold = () => setPhase("exit");
  const finishTextExit = () => setPhase("curtain");
  const finishCurtain = () => {
    markSessionShown();
    setActive(false);
  };

  return (
    <AnimatePresence mode="wait">
      {active && (
        <Motion.div
          className="preloader fixed inset-0 z-[100] bg-[#0a0a0a] text-[#f5f5f5]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: CURTAIN_DURATION, ease: CURTAIN_EASE }}
          role="status"
          aria-label="Loading portfolio"
        >
          <AnimatePresence mode="wait" initial={false}>
            {phase === "show" && (
              <Motion.div key="show" className="absolute inset-0" exit={{ opacity: 1 }}>
                <Motion.div
                  className="preloader-line"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: INTRO_DURATION, ease: EASE }}
                />
                <Motion.p
                  className="preloader-kicker"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.12, duration: 0.5 }}
                >
                  PORTFOLIO - 2026
                </Motion.p>

                <div className="preloader-center">
                  <Motion.div
                    className="preloader-brand"
                    animate={{ letterSpacing: progress >= 100 ? "0.08em" : "0.02em" }}
                    transition={{ duration: 2.2, ease: "easeInOut" }}
                  >
                    {BRAND.split("").map((letter, index) => (
                      <span className="preloader-letter-mask" key={`${letter}-${index}`}>
                        <Motion.span
                          className="preloader-letter"
                          initial={{ y: "110%" }}
                          animate={{ y: 0 }}
                          transition={{ delay: index * LETTER_STAGGER, duration: LETTER_DURATION, ease: EASE }}
                        >
                          {letter}
                        </Motion.span>
                      </span>
                    ))}
                  </Motion.div>
                  <Motion.div
                    className="preloader-fill-brand"
                    animate={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
                    transition={{ duration: 0.14, ease: "linear" }}
                    aria-hidden="true"
                  >
                    {BRAND}
                  </Motion.div>
                </div>

                <div className="preloader-progress">
                  <span className="preloader-counter">{String(progress).padStart(3, "0")}</span>
                  <div className="preloader-progress-track">
                    <Motion.div className="preloader-progress-bar" animate={{ scaleX: progress / 100 }} transition={{ duration: 0.16, ease: "linear" }} />
                  </div>
                </div>
              </Motion.div>
            )}
            {phase === "hold" && (
              <Motion.div key="hold" className="absolute inset-0">
                <div className="preloader-hold-brand">{BRAND}</div>
                <div className="preloader-progress preloader-progress-hold"><span className="preloader-counter">100</span><div className="preloader-progress-track"><div className="preloader-progress-bar preloader-progress-bar-full" /></div></div>
                <Motion.div className="preloader-hold-timer" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} onAnimationComplete={finishHold} transition={{ duration: HOLD_DURATION, ease: "linear" }} />
              </Motion.div>
            )}
            {phase === "exit" && (
              <Motion.div key="exit" className="absolute inset-0" onAnimationComplete={finishTextExit} initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: TEXT_EXIT_DURATION, ease: EASE }}>
                <div className="preloader-exit-brand">
                  {BRAND.split("").map((letter, index) => (
                    <span className="preloader-letter-mask" key={`${letter}-${index}`}>
                      <Motion.span
                        className="preloader-letter"
                        initial={{ y: 0 }}
                        animate={{ y: "-115%" }}
                        transition={{ delay: (BRAND.length - index - 1) * 0.055, duration: 0.48, ease: EASE }}
                      >
                        {letter}
                      </Motion.span>
                    </span>
                  ))}
                </div>
                <Motion.div className="preloader-progress preloader-progress-hold" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}><span className="preloader-counter">100</span><div className="preloader-progress-track"><div className="preloader-progress-bar preloader-progress-bar-full" /></div></Motion.div>
              </Motion.div>
            )}
            {phase === "curtain" && (
              <Motion.div key="curtain" className="absolute inset-0" onAnimationComplete={finishCurtain} initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ duration: CURTAIN_DURATION }}>
                <Motion.div className="preloader-curtain preloader-curtain-top" initial={{ y: 0 }} animate={{ y: "-100%" }} transition={{ duration: CURTAIN_DURATION, ease: CURTAIN_EASE }} />
                <Motion.div className="preloader-curtain preloader-curtain-bottom" initial={{ y: 0 }} animate={{ y: "100%" }} onAnimationComplete={finishCurtain} transition={{ duration: CURTAIN_DURATION, ease: CURTAIN_EASE }} />
                <div className="preloader-curtain-seam" />
              </Motion.div>
            )}
          </AnimatePresence>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
