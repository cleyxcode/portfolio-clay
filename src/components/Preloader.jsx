import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "motion/react";

// ── Constants ─────────────────────────────────────────────────────────────────
const DEBUG_ALWAYS_SHOW  = true;   // set false to show once per session
const SESSION_KEY        = "clayxcode-preloader-seen";
const BRAND              = "CLAYXCODE";
const PROGRESS_DURATION  = 4.4;
const HOLD_DURATION      = 0.5;
const TEXT_EXIT_DURATION = 0.65;
const CURTAIN_DURATION   = 0.9;
const MAX_WAIT           = 8;
const EASE               = [0.22, 1, 0.36, 1];
const CURTAIN_EASE       = [0.76, 0, 0.18, 1];

// Boot log messages – appear as progress hits each threshold
const BOOT_LOG = [
  { at:  4, msg: "SYS_INIT......... OK" },
  { at: 18, msg: "ASSETS_LOADER..... RUNNING" },
  { at: 36, msg: "SHADER_COMPILE.... OK" },
  { at: 52, msg: "COMPONENT_MOUNT... ACTIVE" },
  { at: 68, msg: "STATE_HYDRATION... COMPLETE" },
  { at: 84, msg: "COMPOSITING....... RENDERING" },
  { at: 95, msg: "SYSTEM_STATUS..... READY" },
];

// Fixed particle positions (stable across renders)
const PARTICLES = [
  { id:0,  x:7,   y:18,  s:.22, d:.4,  t:2.8 },
  { id:1,  x:14,  y:72,  s:.18, d:1.1, t:3.5 },
  { id:2,  x:24,  y:34,  s:.14, d:.8,  t:2.2 },
  { id:3,  x:33,  y:85,  s:.20, d:2.0, t:3.1 },
  { id:4,  x:50,  y:11,  s:.16, d:.3,  t:2.6 },
  { id:5,  x:62,  y:60,  s:.24, d:1.6, t:3.8 },
  { id:6,  x:72,  y:27,  s:.18, d:.9,  t:2.4 },
  { id:7,  x:80,  y:78,  s:.14, d:1.4, t:3.2 },
  { id:8,  x:88,  y:44,  s:.22, d:.6,  t:2.9 },
  { id:9,  x:92,  y:14,  s:.16, d:1.8, t:3.6 },
  { id:10, x:44,  y:88,  s:.12, d:2.4, t:2.3 },
  { id:11, x:55,  y:50,  s:.26, d:1.0, t:4.0 },
  { id:12, x:18,  y:50,  s:.14, d:3.0, t:3.3 },
  { id:13, x:68,  y:92,  s:.18, d:0.2, t:2.7 },
];

// 4-panel curtain strips – alternating left / right slide-out
const PANELS = [
  { key:"p0", top:"0%",   h:"25%", dir:-1, delay:0     },
  { key:"p1", top:"25%",  h:"25%", dir: 1, delay:.055  },
  { key:"p2", top:"50%",  h:"25%", dir:-1, delay:.11   },
  { key:"p3", top:"75%",  h:"25%", dir: 1, delay:.165  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function sessionWasShown() {
  if (DEBUG_ALWAYS_SHOW) return false;
  try { return sessionStorage.getItem(SESSION_KEY) === "true"; } catch { return false; }
}
function markSessionShown() {
  try { sessionStorage.setItem(SESSION_KEY, "true"); } catch { /* private browsing */ }
}

// ── GlitchBrand ───────────────────────────────────────────────────────────────
// Renders CLAYXCODE with a periodic RGB-split glitch and fill-progress sync.
function GlitchBrand({ progress, isExiting, onExitDone }) {
  const [glitch, setGlitch] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    const schedule = () => {
      timer.current = setTimeout(() => {
        setGlitch(true);
        timer.current = setTimeout(() => { setGlitch(false); schedule(); }, 320);
      }, 1800 + Math.random() * 2200);
    };
    const boot = setTimeout(schedule, 900);
    return () => { clearTimeout(boot); clearTimeout(timer.current); };
  }, []);

  return (
    <Motion.div
      className="preloader-brand-layers"
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: isExiting ? "-120%" : 0, opacity: isExiting ? 0 : 1 }}
      transition={{ duration: TEXT_EXIT_DURATION, ease: EASE }}
      onAnimationComplete={isExiting ? onExitDone : undefined}
    >
      {glitch && (
        <>
          <span className="pl-glitch-r" aria-hidden="true">{BRAND}</span>
          <span className="pl-glitch-b" aria-hidden="true">{BRAND}</span>
        </>
      )}
      <span className="preloader-brand-text preloader-brand-outline" aria-hidden="true">{BRAND}</span>
      <Motion.span
        className="preloader-brand-fill-layer"
        animate={{
          clipPath:       `inset(0 ${100 - progress}% 0 0)`,
          WebkitClipPath: `inset(0 ${100 - progress}% 0 0)`,
        }}
        transition={{ duration: 0.14, ease: "linear" }}
      >
        <span className="preloader-brand-text preloader-brand-fill" aria-hidden="true">{BRAND}</span>
      </Motion.span>
    </Motion.div>
  );
}

// ── ProgressRing ──────────────────────────────────────────────────────────────
// SVG circular progress ring with quadrant tick marks.
function ProgressRing({ progress }) {
  const r    = 34;
  const circ = +(2 * Math.PI * r).toFixed(2);
  const off  = +(circ - (progress / 100) * circ).toFixed(2);
  return (
    <svg className="pl-ring" viewBox="0 0 88 88" aria-hidden="true">
      <circle cx="44" cy="44" r={r} className="pl-ring-track" />
      <circle
        cx="44" cy="44" r={r}
        className="pl-ring-fill"
        strokeDasharray={circ}
        strokeDashoffset={off}
        style={{ transition: "stroke-dashoffset 0.16s linear" }}
      />
      {[0, 90, 180, 270].map(a => (
        <line key={a} x1="44" y1="10" x2="44" y2="17"
          className="pl-ring-tick"
          transform={`rotate(${a} 44 44)`}
        />
      ))}
    </svg>
  );
}

// ── BootLog ───────────────────────────────────────────────────────────────────
// Terminal-style log that reveals messages as progress advances.
function BootLog({ progress }) {
  const lines = BOOT_LOG.filter(m => m.at <= progress);
  return (
    <div className="pl-boot-log" aria-hidden="true">
      {lines.map(m => (
        <Motion.p
          key={m.at}
          className="pl-boot-line"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <span className="pl-boot-caret">›</span>{m.msg}
        </Motion.p>
      ))}
    </div>
  );
}

// ── DataReadout ───────────────────────────────────────────────────────────────
// Right-side HUD panel with animated data-looking info.
function DataReadout({ progress }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 80);
    return () => clearInterval(id);
  }, []);

  const hex = tick.toString(16).toUpperCase().padStart(4, "0");
  const lat  = "−3.6954° S";
  const lon  = "128.1814° E";

  return (
    <Motion.div
      className="pl-data-readout"
      aria-hidden="true"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <div className="pl-data-row"><span className="pl-data-key">LAT</span><span>{lat}</span></div>
      <div className="pl-data-row"><span className="pl-data-key">LON</span><span>{lon}</span></div>
      <div className="pl-data-row"><span className="pl-data-key">MEM</span><span>0x{hex}</span></div>
      <div className="pl-data-row"><span className="pl-data-key">PCT</span><span>{String(progress).padStart(3,"0")}%</span></div>
      <div className="pl-data-sep" />
      <div className="pl-data-row pl-data-status">
        <span className={progress >= 100 ? "pl-data-ok" : "pl-data-run"}>
          {progress >= 100 ? "● READY" : "● RUN"}
        </span>
      </div>
    </Motion.div>
  );
}

// ── Preloader ─────────────────────────────────────────────────────────────────
function Preloader({ onComplete }) {
  const [active,   setActive]   = useState(() => !sessionWasShown());
  const [phase,    setPhase]    = useState("show"); // show → hold → exit → curtain
  const [progress, setProgress] = useState(0);
  const readyRef                = useRef(document.readyState === "complete");
  const reduced                 = useReducedMotion();

  const label =
    progress >= 100 ? "SYSTEM READY"   :
    progress >= 70  ? "COMPOSITING"    :
    progress >= 35  ? "LOADING ASSETS" : "INITIALIZING";

  useEffect(() => {
    document.getElementById("initial-preloader")?.remove();
  }, []);

  useEffect(() => {
    if (!active) { onComplete?.(); return; }
    document.documentElement.classList.add("preloader-active");
    document.body.classList.add("preloader-active");
    const rm    = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    const markReady = () => { readyRef.current = true; };
    const fp = document.fonts?.ready?.then(markReady);
    window.addEventListener("load", markReady, { once: true });
    let raf;

    const tick = (now) => {
      const el = (now - start) / 1000;
      const n  = Math.min(el / PROGRESS_DURATION, 1);
      const e  = n < 0.5 ? 2 * n * n : 1 - ((-2 * n + 2) ** 2) / 2;
      const done = readyRef.current && el >= PROGRESS_DURATION;
      setProgress(p => Math.max(p, done ? 100 : Math.min(90, Math.round(e * 90))));
      if (done || el >= MAX_WAIT) { setProgress(100); setPhase("hold"); return; }
      raf = requestAnimationFrame(tick);
    };

    if (rm) { raf = requestAnimationFrame(() => { setProgress(100); setPhase("hold"); }); }
    else     { raf = requestAnimationFrame(tick); }

    return () => {
      cancelAnimationFrame(raf);
      void fp;
      window.removeEventListener("load", markReady);
      document.documentElement.classList.remove("preloader-active");
      document.body.classList.remove("preloader-active");
    };
  }, [active, onComplete]);

  const finishHold    = () => setPhase("exit");
  const finishBrand   = () => setPhase("curtain");
  const finishCurtain = () => { markSessionShown(); setActive(false); };

  return (
    <AnimatePresence mode="wait">
      {active && (
        <Motion.div
          className="preloader fixed inset-0 z-[100] bg-[#080808] text-[#f0f0f0]"
          role="status"
          aria-label="Loading portfolio"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          {/* CRT horizontal-line overlay */}
          <div className="pl-crt" aria-hidden="true" />

          {/* Scan sweeps – one down, one up */}
          <Motion.div
            className="preloader-scanline"
            aria-hidden="true"
            initial={{ y: "-110%", opacity: 0 }}
            animate={reduced ? { opacity: 0 } : { y: "110vh", opacity: [0, 0.4, 0] }}
            transition={reduced ? {} : { duration: 4.8, repeat: Infinity, ease: "linear", delay: 0.8 }}
          />
          <Motion.div
            className="preloader-scanline pl-scanline-rev"
            aria-hidden="true"
            initial={{ y: "110vh", opacity: 0 }}
            animate={reduced ? { opacity: 0 } : { y: "-110%", opacity: [0, 0.25, 0] }}
            transition={reduced ? {} : { duration: 6.5, repeat: Infinity, ease: "linear", delay: 2.2 }}
          />

          {/* Grid */}
          <div className="preloader-grid" aria-hidden="true" />

          {/* Particle field */}
          {!reduced && PARTICLES.map(p => (
            <Motion.span
              key={p.id}
              className="pl-particle"
              aria-hidden="true"
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.s}rem`, height: `${p.s}rem` }}
              animate={{ opacity: [0, .7, 0], scale: [.4, 1.1, .4] }}
              transition={{ duration: p.t, delay: p.d, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          {/* Inner tick ring */}
          <Motion.div
            className="preloader-tick-ring"
            aria-hidden="true"
            animate={reduced ? { rotate: 0, opacity: 0 } : { rotate: 360 }}
            transition={reduced ? {} : { duration: 24, repeat: Infinity, ease: "linear" }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} style={{ "--tick-angle": `${i * 30}deg` }} />
            ))}
          </Motion.div>

          {/* Outer slow deco ring */}
          <Motion.div
            className="pl-deco-ring"
            aria-hidden="true"
            animate={reduced ? { rotate: 0, opacity: 0 } : { rotate: -360 }}
            transition={reduced ? {} : { duration: 42, repeat: Infinity, ease: "linear" }}
          />

          {/* Corner labels */}
          <div className="preloader-corner preloader-corner-tl" aria-hidden="true">CX / 01</div>
          <div className="preloader-corner preloader-corner-tr" aria-hidden="true">2026</div>
          <div className="preloader-corner preloader-corner-bl" aria-hidden="true">AMBON / ID</div>
          <div className="preloader-corner preloader-corner-br" aria-hidden="true">ONLINE</div>

          {/* HUD corner brackets */}
          <div className="pl-hud pl-hud-tl" aria-hidden="true" />
          <div className="pl-hud pl-hud-tr" aria-hidden="true" />
          <div className="pl-hud pl-hud-bl" aria-hidden="true" />
          <div className="pl-hud pl-hud-br" aria-hidden="true" />

          {/* Signal blinker – top-center */}
          <div className="pl-signal" aria-hidden="true">
            <span className="pl-signal-dot" />
            <span>SIG OK</span>
          </div>

          {/* Right-side data readout */}
          {!reduced && <DataReadout progress={progress} />}

          {/* ── Main inner content ── */}
          <div className="preloader-inner">
            <Motion.p
              className="preloader-kicker"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.08, duration: 0.45 }}
            >
              PORTFOLIO — 2026
            </Motion.p>
            <Motion.div
              className="preloader-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: EASE }}
            />

            {/* Brand area */}
            <div className="preloader-brand-wrap" aria-label={BRAND}>
              {/* Outer orbit */}
              <Motion.div
                className="preloader-orbit preloader-orbit-outer"
                aria-hidden="true"
                animate={reduced ? { rotate: 0, opacity: 0 } : { rotate: 360, opacity: [.2, .45, .2] }}
                transition={reduced ? {} : { rotate: { duration: 16, repeat: Infinity, ease: "linear" }, opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
              >
                <span className="preloader-orbit-dot preloader-orbit-dot-a" />
                <span className="preloader-orbit-dot preloader-orbit-dot-b" />
              </Motion.div>

              {/* Inner orbit */}
              <Motion.div
                className="preloader-orbit preloader-orbit-inner"
                aria-hidden="true"
                animate={reduced ? { rotate: 0, opacity: 0 } : { rotate: -360, opacity: [.12, .3, .12] }}
                transition={reduced ? {} : { rotate: { duration: 11, repeat: Infinity, ease: "linear" }, opacity: { duration: 3.2, repeat: Infinity, ease: "easeInOut" } }}
              >
                <span className="preloader-orbit-dot preloader-orbit-dot-c" />
              </Motion.div>

              {/* Third micro orbit (new) */}
              <Motion.div
                className="preloader-orbit pl-orbit-micro"
                aria-hidden="true"
                animate={reduced ? { rotate: 0, opacity: 0 } : { rotate: 360, opacity: [.08, .22, .08] }}
                transition={reduced ? {} : { rotate: { duration: 7.5, repeat: Infinity, ease: "linear" }, opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } }}
              >
                <span className="preloader-orbit-dot pl-orbit-dot-d" />
              </Motion.div>

              {/* Crosshair */}
              <Motion.div
                className="preloader-crosshair"
                aria-hidden="true"
                animate={reduced ? { opacity: 0 } : { opacity: [.2, .65, .2], scale: [.92, 1, .92] }}
                transition={reduced ? {} : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Aura glow */}
              <Motion.div
                className="preloader-brand-aura"
                aria-hidden="true"
                animate={reduced ? { opacity: 0 } : { opacity: [.08, .2, .08], scale: [.96, 1.03, .96] }}
                transition={reduced ? {} : { duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* CLAYXCODE with glitch + exit */}
              <GlitchBrand
                progress={progress}
                isExiting={phase === "exit"}
                onExitDone={finishBrand}
              />
            </div>

            {/* Boot log terminal */}
            <BootLog progress={progress} />

            {/* Progress row */}
            <div className="preloader-progress">
              <ProgressRing progress={progress} />
              <div className="preloader-progress-copy">
                <span className="preloader-counter">{String(progress).padStart(3, "0")}</span>
                <span className="preloader-progress-label">{label}</span>
              </div>
              <div className="preloader-progress-track">
                <Motion.div
                  className="preloader-progress-bar"
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.16, ease: "linear" }}
                />
              </div>
            </div>
          </div>

          {/* Hold timer bar */}
          {phase === "hold" && (
            <Motion.div
              className="preloader-hold-timer"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: HOLD_DURATION, ease: "linear" }}
              onAnimationComplete={finishHold}
            />
          )}

          {/* 4-panel curtain exit */}
          <AnimatePresence mode="wait" initial={false}>
            {phase === "curtain" && (
              <Motion.div key="curtain-stage" className="preloader-curtain-stage">
                {PANELS.map((p, i) => (
                  <Motion.div
                    key={p.key}
                    className="pl-curtain-panel"
                    style={{ top: p.top, height: p.h }}
                    initial={{ x: "0%" }}
                    animate={{ x: `${p.dir * 105}%` }}
                    transition={{ duration: CURTAIN_DURATION, delay: p.delay, ease: CURTAIN_EASE }}
                    onAnimationComplete={i === PANELS.length - 1 ? finishCurtain : undefined}
                  />
                ))}
              </Motion.div>
            )}
          </AnimatePresence>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
