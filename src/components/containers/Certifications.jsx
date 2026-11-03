import { useState } from "react";
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
  const [selectedImg, setSelectedImg] = useState(null);
  const { darkMode } = useDarkMode();

  const certifications = [
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

  return (
    <div
      className={`${
        darkMode
          ? "bg-[#17171a] border-gray-500/40 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          : "bg-white border-gray-500/40 shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
      } w-full flex-1 min-h-0 shadow-[0_0_6px_rgba(0,0,0,0.25)] border p-6 flex flex-col gap-4`}
    >
      <div className="flex items-center gap-2 shrink-0">
        <strong className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl  uppercase font-mono font-bold tracking-tight">Certifications</strong>
      </div>

      <div className="flex flex-col p-2 gap-3 max-h-[210px] overflow-y-auto ">
        {certifications.map((cert, index) => (
          <div
            onClick={() => setSelectedImg(cert.img)}
            key={index}
            className={`cursor-pointer p-4 pr-10 relative border ${
              darkMode
                ? "bg-gray-500/10 hover:bg-gray-500/20 border border-gray-600/30 text-gray-200"
                : "bg-gray-500/10 hover:bg-gray-500/20 border border-gray-600/30 text-gray-800"
            }`}
          >
            <strong className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-base">
              {cert.name}
            </strong>
            <p
              className={`text-[12px] font-mono ${darkMode ? "text-gray-400" : "text-gray-500"}`}
            >
              {cert.issuer}
            </p>
            {cert.img && (
              <button
                title="View Certificate"
                className="absolute top-3 right-3 text-gray-400 cursor-pointer text-lg"
              >
                <i className="bi bi-arrows-angle-expand" />
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedImg && (
        <div
          onClick={() => setSelectedImg(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Certificate preview"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 sm:p-6"
        >
          <img
            src={selectedImg}
            alt="Certificate preview"
            onClick={(event) => event.stopPropagation()}
            className="block max-h-[90dvh] max-w-[95vw] w-auto h-auto object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}

export default Certifications;
