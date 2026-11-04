import Container1 from "./components/Dividers/Container1";
import Container2 from "./components/Dividers/Container2";
import Container3 from "./components/Dividers/Container3";
import Container4 from "./components/Dividers/Container4";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useDarkMode } from "./context/DarkmodeProvider";
import ChatBot from "./components/ChatBot";
import StackMarquee from "./components/StackMarquee";
import StickyHeader from "./components/StickyHeader";
import { useRef } from "react";
import BlobCursor from "./components/BlobCursor";
import Preloader from "./components/Preloader";
import { motion as Motion } from "motion/react";

function App() {
  const { darkMode } = useDarkMode();
  const heroRef = useRef(null);
  const [pageReady, setPageReady] = useState(false);
  const handlePreloaderComplete = useCallback(() => setPageReady(true), []);

  useLayoutEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const revealItems = document.querySelectorAll("[data-scroll-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <div className="fixed inset-0 z-[60] hidden pointer-events-none md:block">
        <BlobCursor
          material="ink"
          color="#c5c8cc"
          size={25}
          trail={8}
          lag={0.45}
          goo={0.8}
          splash={false}
          shine={0.35}
          hideCursor
        />
      </div>
      <StickyHeader sentinelRef={heroRef} />
      <Motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: pageReady ? 1 : 0, y: pageReady ? 0 : 18 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        className={`${darkMode ? "bg-[#0e0e11] text-gray-200" : "bg-white"} app-shell w-full flex flex-col
        gap-5 px-1 md:px-[100px] lg:px-[200px] xl:px-[300px] 2xl:px-[450px] py-6 md:py-8 lg:py-10`}
      >
        <div ref={heroRef}>
          <Container1 />
        </div>
        <div data-scroll-reveal className="scroll-reveal">
          <StackMarquee />
        </div>
        <div data-scroll-reveal className="scroll-reveal">
          <Container2 />
        </div>
        <div className="flex items-center w-full opacity-80">
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gray-500/70" />
          <span className="px-4 text-[8px] lg:text-[10px] font-mono tracking-[0.4em] uppercase whitespace-nowrap text-gray-400">
            BUILD. DEPLOY.
          </span>
          <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gray-500/70" />
        </div>
        <div data-scroll-reveal className="scroll-reveal">
          <Container3 />
        </div>
        <div className="flex items-center w-full opacity-80">
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gray-500/70" />
          <span className="px-4 text-[8px] lg:text-[10px] font-mono tracking-[0.4em] uppercase whitespace-nowrap text-gray-400">
            RECOGNITION | SOCIALS
          </span>
          <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gray-500/70" />
        </div>
        <div data-scroll-reveal className="scroll-reveal">
          <Container4 />
        </div>
        <ChatBot />

        <footer
          className={`mt-10 pt-6 border-t text-center text-[11px] font-mono 
            ${darkMode ? "border-[#333333] text-gray-300" : "border-gray-200 text-gray-900"}`}
        >
          © Bredley Tuhuleruw | cleyxcode Portfolio
        </footer>
      </Motion.div>
    </>
  );
}

export default App;
