import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "motion/react";

// Tuning panel: change these values to adjust the cinematic sequence.
const DEBUG_ALWAYS_SHOW = true; // Set false to show once per browser session.
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
    // Storage can be blocked by private browsing; the loader still works.
  }
}

function BrandText({ layer }) {
  return (
    <span className={`preloader-brand-text preloader-brand-${layer}`} aria-hidden="true">
      {BRAND}
    </span>
  );
}

function Preloader({ onComplete }) {
  const [active, setActive] = useState(() => !sessionWasShown());
  const [phase, setPhase] = useState("show");
  const [progress, setProgress] = useState(0);
  const readyRef = useRef(document.readyState === "complete");
  const prefersReducedMotion = useReducedMotion();
  const progressLabel = progress >= 100 ? "SYSTEM READY" : progress >= 70 ? "COMPOSITING" : "LOADING ASSETS";

  useEffect(() => {
    document.getElementById("initial-preloader")?.remove();
  }, []);

  useEffect(() => {
    if (!active) {
      onComplete?.();
      return undefined;
    }

    document.documentElement.classList.add("preloader-active");
    document.body.classList.add("preloader-active");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startedAt = performance.now();
    const markReady = () => { readyRef.current = true; };
    const fontPromise = document.fonts?.ready?.then(markReady);
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

      if (canFinish || elapsed >= MAX_WAIT) {
        setProgress(100);
        setPhase("hold");
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    if (reducedMotion) {
      frame = requestAnimationFrame(() => {
        setProgress(100);
        setPhase("hold");
      });
    } else {
      frame = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frame);
      void fontPromise;
      window.removeEventListener("load", markReady);
      document.documentElement.classList.remove("preloader-active");
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
          role="status"
          aria-label="Loading portfolio"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          <Motion.div
            className="preloader-scanline"
            aria-hidden="true"
            initial={{ y: "-110%", opacity: 0 }}
            animate={prefersReducedMotion ? { y: "0%", opacity: 0 } : { y: "110vh", opacity: [0, 0.45, 0] }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 4.8, repeat: Infinity, ease: "linear", delay: 0.8 }}
          />
          <div className="preloader-grid" aria-hidden="true" />
          <Motion.div
            className="preloader-tick-ring"
            aria-hidden="true"
            animate={prefersReducedMotion ? { rotate: 0, opacity: 0 } : { rotate: 360 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 24, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: 12 }, (_, index) => (
              <span key={index} style={{ "--tick-angle": `${index * 30}deg` }} />
            ))}
          </Motion.div>
          <div className="preloader-corner preloader-corner-tl" aria-hidden="true">CX / 01</div>
          <div className="preloader-corner preloader-corner-tr" aria-hidden="true">2026</div>
          <div className="preloader-corner preloader-corner-bl" aria-hidden="true">AMBON / ID</div>
          <div className="preloader-corner preloader-corner-br" aria-hidden="true">ONLINE</div>
          <div className="preloader-inner">
            <Motion.p
              className="preloader-kicker"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.08, duration: 0.45 }}
            >
              PORTFOLIO - 2026
            </Motion.p>
            <Motion.div
              className="preloader-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: INTRO_DURATION, ease: EASE }}
            />

            <div className="preloader-brand-wrap" aria-label={BRAND}>
              <Motion.div
                className="preloader-orbit preloader-orbit-outer"
                aria-hidden="true"
                animate={prefersReducedMotion ? { rotate: 0, opacity: 0 } : { rotate: 360, opacity: [0.2, 0.45, 0.2] }}
                transition={prefersReducedMotion ? { duration: 0 } : { rotate: { duration: 16, repeat: Infinity, ease: "linear" }, opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
              >
                <span className="preloader-orbit-dot preloader-orbit-dot-a" />
                <span className="preloader-orbit-dot preloader-orbit-dot-b" />
              </Motion.div>
              <Motion.div
                className="preloader-orbit preloader-orbit-inner"
                aria-hidden="true"
                animate={prefersReducedMotion ? { rotate: 0, opacity: 0 } : { rotate: -360, opacity: [0.12, 0.3, 0.12] }}
                transition={prefersReducedMotion ? { duration: 0 } : { rotate: { duration: 11, repeat: Infinity, ease: "linear" }, opacity: { duration: 3.2, repeat: Infinity, ease: "easeInOut" } }}
              >
                <span className="preloader-orbit-dot preloader-orbit-dot-c" />
              </Motion.div>
              <Motion.div
                className="preloader-crosshair"
                aria-hidden="true"
                animate={prefersReducedMotion ? { opacity: 0 } : { opacity: [0.2, 0.65, 0.2], scale: [0.92, 1, 0.92] }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <Motion.div
                className="preloader-brand-aura"
                aria-hidden="true"
                animate={prefersReducedMotion ? { opacity: 0 } : { opacity: [0.08, 0.2, 0.08], scale: [0.96, 1.03, 0.96] }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <Motion.div
                className="preloader-brand-layers"
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: phase === "exit" ? "-115%" : 0, opacity: phase === "exit" ? 0 : 1 }}
                transition={{ duration: TEXT_EXIT_DURATION, ease: EASE }}
                onAnimationComplete={phase === "exit" ? finishTextExit : undefined}
              >
                <BrandText layer="outline" />
                <Motion.span
                  className="preloader-brand-fill-layer"
                  animate={{ clipPath: `inset(0 ${100 - progress}% 0 0)`, WebkitClipPath: `inset(0 ${100 - progress}% 0 0)` }}
                  transition={{ duration: 0.14, ease: "linear" }}
                >
                  <BrandText layer="fill" />
                </Motion.span>
              </Motion.div>
            </div>

            <div className="preloader-progress">
              <div className="preloader-progress-copy">
                <span className="preloader-counter">{String(progress).padStart(3, "0")}</span>
                <span className="preloader-progress-label">{progressLabel}</span>
              </div>
              <div className="preloader-progress-track">
                <Motion.div className="preloader-progress-bar" animate={{ scaleX: progress / 100 }} transition={{ duration: 0.16, ease: "linear" }} />
              </div>
            </div>
          </div>

          {phase === "hold" && (
            <Motion.div
              className="preloader-hold-timer"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: HOLD_DURATION, ease: "linear" }}
              onAnimationComplete={finishHold}
            />
          )}

          <AnimatePresence mode="wait" initial={false}>
            {phase === "curtain" && (
              <Motion.div key="curtain" className="preloader-curtain-stage">
                <Motion.div className="preloader-curtain preloader-curtain-top" initial={{ y: 0 }} animate={{ y: "-100%" }} transition={{ duration: CURTAIN_DURATION, ease: CURTAIN_EASE }} />
                <Motion.div className="preloader-curtain preloader-curtain-bottom" initial={{ y: 0 }} animate={{ y: "100%" }} transition={{ duration: CURTAIN_DURATION, ease: CURTAIN_EASE }} onAnimationComplete={finishCurtain} />
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
