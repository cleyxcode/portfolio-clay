import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import googleDeveloper from "../../assets/img/certificates/google-developer.png";
import freeCodeCampResponsive from "../../assets/img/certificates/freecodecamp-responsive-web-design.png";
import freeCodeCampJavascript from "../../assets/img/certificates/freecodecamp-javascript.png";
import dicodingAi from "../../assets/img/certificates/dicoding-belajar-dasar-ai.png";
import udemyCssJavascript from "../../assets/img/certificates/udemy-css-javascript-crash-course.png";
import udemyEthicalHacking from "../../assets/img/certificates/udemy-ethically-hack-planet.png";
import dicodingDataScience from "../../assets/img/certificates/dicoding-dasar-data-science.png";
import dicodingFinancialLiteracy from "../../assets/img/certificates/dicoding-literasi-finansial.png";
import ideaGenerativeAi from "../../assets/img/certificates/idea-kecerdasan-buatan-generatif.png";
import dicodingSolid from "../../assets/img/certificates/dicoding-pemrograman-solid.png";
import { useDarkMode } from "../../context/DarkmodeProvider";

function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);
  const { darkMode } = useDarkMode();

  const certifications = [
    { name: "Google Developer — Community Member", issuer: "Google Developer Groups on Campus (GDGoC UB)", img: googleDeveloper },
    { name: "Responsive Web Design", issuer: "freeCodeCamp", img: freeCodeCampResponsive },
    { name: "JavaScript Developer Certification", issuer: "freeCodeCamp", img: freeCodeCampJavascript },
    { name: "Belajar Dasar AI", issuer: "Dicoding", img: dicodingAi },
    { name: "CSS and Javascript Crash Course", issuer: "Udemy — Prosper Institute", img: udemyCssJavascript },
    { name: "Ethically Hack the Planet Part 2", issuer: "Udemy — Cyber Talents", img: udemyEthicalHacking },
    { name: "Belajar Dasar Data Science", issuer: "Dicoding", img: dicodingDataScience },
    { name: "Introduction to Financial Literacy", issuer: "Dicoding", img: dicodingFinancialLiteracy },
    { name: "Kecerdasan Buatan Generatif", issuer: "IDEA", img: ideaGenerativeAi },
    { name: "Belajar Pemrograman SOLID", issuer: "Dicoding", img: dicodingSolid },
  ];

  // Lock body scroll and listen for Escape key when preview modal is open
  useEffect(() => {
    if (!selectedCert) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCert]);

  return (
    <div
      className={`${
        darkMode
          ? "bg-[#17171a] border-gray-500/40 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          : "bg-white border-gray-500/40 shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
      } w-full flex-1 min-h-0 shadow-[0_0_6px_rgba(0,0,0,0.25)] border p-6 flex flex-col gap-4`}
    >
      <div className="flex items-center gap-2 shrink-0">
        <strong className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl uppercase font-mono font-bold tracking-tight">
          Certifications
        </strong>
      </div>

      <div className="flex flex-col p-2 gap-3 max-h-[300px] lg:max-h-[340px] overflow-y-auto custom-scroll">
        {certifications.map((cert, index) => (
          <div
            onClick={() => setSelectedCert(cert)}
            key={index}
            className={`cursor-pointer p-4 pr-10 relative border transition-colors ${
              darkMode
                ? "bg-gray-500/10 hover:bg-gray-500/20 border-gray-600/30 text-gray-200"
                : "bg-gray-500/10 hover:bg-gray-500/20 border-gray-600/30 text-gray-800"
            }`}
          >
            <strong className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-base block pr-2">
              {cert.name}
            </strong>
            <p
              className={`text-[12px] font-mono mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
            >
              {cert.issuer}
            </p>
            {cert.img && (
              <button
                type="button"
                title="View Certificate"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCert(cert);
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-white cursor-pointer text-base transition-colors"
              >
                <i className="bi bi-arrows-angle-expand" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Render modal directly in document.body to avoid stacking/transform clipping */}
      {selectedCert &&
        createPortal(
          <div
            onClick={() => setSelectedCert(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Certificate preview: ${selectedCert.name}`}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 md:p-8 animate-in fade-in duration-200"
          >
            {/* Modal Card */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col items-center max-w-5xl w-full max-h-[92vh] bg-[#121215] border border-gray-700/60 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              {/* Top Header Bar */}
              <div className="w-full flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-800 bg-[#18181c]">
                <div className="flex flex-col min-w-0 pr-4">
                  <h3 className="text-xs sm:text-sm md:text-base font-mono font-bold text-gray-100 truncate">
                    {selectedCert.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs font-mono text-gray-400 truncate">
                    {selectedCert.issuer}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={selectedCert.img}
                    target="_blank"
                    rel="noreferrer"
                    title="Open full image in new tab"
                    className="p-1.5 sm:px-3 sm:py-1 rounded bg-gray-700/50 hover:bg-gray-600/60 text-gray-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
                  >
                    <i className="bi bi-box-arrow-up-right text-xs" />
                    <span className="hidden sm:inline">Open Original</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedCert(null)}
                    title="Close (Esc)"
                    aria-label="Close certificate preview"
                    className="p-1.5 sm:p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors cursor-pointer text-sm"
                  >
                    <i className="bi bi-x-lg" />
                  </button>
                </div>
              </div>

              {/* Image Canvas Container */}
              <div className="w-full flex-1 min-h-0 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/40 overflow-hidden">
                <img
                  src={selectedCert.img}
                  alt={selectedCert.name}
                  className="max-h-[72vh] sm:max-h-[76vh] max-w-full w-auto h-auto object-contain rounded shadow-lg select-none"
                />
              </div>

              {/* Bottom Hint */}
              <div className="w-full py-2 px-4 bg-[#141418] border-t border-gray-800/80 flex items-center justify-between text-[11px] font-mono text-gray-500">
                <span>ESC or click outside to close</span>
                <span className="hidden sm:inline">Press &apos;Open Original&apos; to download</span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export default Certifications;
