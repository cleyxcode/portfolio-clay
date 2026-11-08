import { useEffect, useRef, useState } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";

/**
 * PageReveal — cinematic entrance animation that fires once after the
 * preloader hands control to the page.  It layers three FX passes:
 *   1. Full-screen white FLASH (instant, then fades out)
 *   2. SCAN SWEEP — a bright horizontal bar races top→bottom
 *   3. Corner HUD brackets wipe into the four screen corners then fade
 * The whole sequence completes in ~1.4 s.
 */
function PageReveal({ trigger }) {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState("idle"); // idle → flash → scan → hud → done
  const fired = useRef(false);

  useEffect(() => {
    if (!trigger || fired.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    fired.current = true;
    setVisible(true);
    setPhase("flash");

    const t1 = setTimeout(() => setPhase("scan"),  120);
    const t2 = setTimeout(() => setPhase("hud"),   480);
    const t3 = setTimeout(() => setPhase("done"),  1350);
    const t4 = setTimeout(() => setVisible(false), 1500);

    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [trigger]);

  return (
    <AnimatePresence>
      {visible && (
        <Motion.div
          key="page-reveal"
          className="page-reveal-root"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.18 } }}
        >
          {/* ── 1. FLASH ── */}
          <Motion.div
            className="page-reveal-flash"
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === "flash" ? [1, 0.6, 0] : 0 }}
            transition={{ duration: 0.38, ease: "easeOut" }}
          />

          {/* ── 2. SCAN SWEEP ── */}
          {(phase === "scan" || phase === "hud") && (
            <Motion.div
              className="page-reveal-scan"
              initial={{ top: "-4%" }}
              animate={{ top: "104%" }}
              transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
            />
          )}

          {/* ── 3. HUD corner brackets ── */}
          {(phase === "hud" || phase === "done") && (
            <>
              {["tl", "tr", "bl", "br"].map((pos, i) => (
                <Motion.div
                  key={pos}
                  className={`page-reveal-bracket page-reveal-bracket-${pos}`}
                  initial={{ opacity: 0, scale: 0.72 }}
                  animate={{
                    opacity: phase === "done" ? 0 : 1,
                    scale:   phase === "done" ? 1.08 : 1,
                  }}
                  transition={{
                    delay:    i * 0.055,
                    duration: phase === "done" ? 0.35 : 0.22,
                    ease:     "easeOut",
                  }}
                />
              ))}
              {/* centre crosshair pulse */}
              <Motion.div
                className="page-reveal-crosshair"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: phase === "done" ? 0 : [0, 0.7, 0.5],
                  scale:   phase === "done" ? 1.4 : [0.5, 1, 0.9],
                }}
                transition={{ duration: phase === "done" ? 0.4 : 0.35, ease: "easeOut" }}
              />
            </>
          )}
        </Motion.div>
      )}
    </AnimatePresence>
  );
}

export default PageReveal;
