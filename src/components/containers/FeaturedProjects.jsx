import { useDarkMode } from "../../context/DarkmodeProvider";
import { useState } from "react";
import PisangImg from "../../assets/img/pisang.png";
import SchoolImg from "../../assets/img/carisekolah.png";
import GameIdImg from "../../assets/img/gameid.png";
import EportalImg from "../../assets/img/E-Portal.png";
import TwitbirdImg from "../../assets/img/TwitbirdImage.png";
import CodeMilitiaImg from "../../assets/img/CodeMilitia.png";
import ChillChatImg from "../../assets/img/ChillChat.png";
import BrocodeImg from "../../assets/img/BROCODE.png";
import SdNegeriPassoImg from "../../assets/img/SDNegeri1Passo.png";
import PnielChurchEvotingImg from "../../assets/img/PnielChurchEvoting.png";
import GpmMasohiImg from "../../assets/img/GPMMasohi.png";
import ElementaryLearningGameImg from "../../assets/img/ElementaryLearningGame.png";
import AmRazerImg from "../../assets/img/AMRazer.png";
import SdNegeriWarialauImg from "../../assets/img/SDNegeriWarialau.png";
import TabaosTrackingAdminImg from "../../assets/img/TabaosTrackingAdmin.png";
import KknUkimMonitoringImg from "../../assets/img/KKNUKIMMonitoring.png";
import Sma17MalukuTengahImg from "../../assets/img/SMA17MalukuTengah.png";
import OcimalaleoVillageImg from "../../assets/img/OcimalaleoVillage.png";
import SinaraAdminPanelImg from "../../assets/img/SinaraAdminPanel.png";
import TvriMalukuArchiveImg from "../../assets/img/TVRIMalukuArchive.png";
import SmartPlantWateringImg from "../../assets/img/SmartPlantWateringApp.png";
import SkinCancerScreeningImg from "../../assets/img/SkinCancerScreeningApp.png";
import MovieWatchlistImg from "../../assets/img/MovieWatchlist.png";

function FeaturedProjects() {
  const { darkMode } = useDarkMode();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const projects = [
    { name: "SD Negeri 1 Passo", description: "A school information system for SD Negeri 1 Passo, Ambon.", link: "sdnegeri1passo.site", code: "github.com/cleyxcode", image: SdNegeriPassoImg, tech: ["Web Application", "Laravel"] },
    { name: "Pniel Church Online E-Voting", description: "An online voting system designed for Pniel Church elections.", code: "github.com/cleyxcode/web-suara", image: PnielChurchEvotingImg, tech: ["Web Application"] },
    { name: "GPM Masohi Information System", description: "A digital information system for GPM Masohi.", link: "lightsteelblue-hornet-451399.hostingersite.com", code: "github.com/cleyxcode", image: GpmMasohiImg, tech: ["Web Application"] },
    { name: "Elementary Learning Game", description: "An interactive learning game platform for elementary school students.", link: "gasipas.site/siswa/login", code: "github.com/cleyxcode", image: ElementaryLearningGameImg, tech: ["Interactive Web Game"] },
    { name: "SD Negeri Warialau", description: "A school information system with administrative services.", link: "maroon-quail-402648.hostingersite.com", code: "github.com/cleyxcode", image: SdNegeriWarialauImg, tech: ["Web Application"] },
    { name: "Tabaos Tracking Admin", description: "An administration panel for Tabaos tracking and monitoring.", link: "lightcyan-mule-612352.hostingersite.com", code: "github.com/cleyxcode", image: TabaosTrackingAdminImg, tech: ["Admin Panel"] },
    { name: "KKN Tematik UKIM Monitoring", description: "A monitoring platform for the UKIM Thematic Community Service Program.", link: "kkntematikukim.site", code: "github.com/cleyxcode", image: KknUkimMonitoringImg, tech: ["Web Application"] },
    { name: "SMA 17 Maluku Tengah", description: "A school information system for SMA 17 Maluku Tengah.", link: "slategrey-eland-996868.hostingersite.com", code: "github.com/cleyxcode", image: Sma17MalukuTengahImg, tech: ["Web Application"] },
    { name: "Ocimalaleo Village Information System", description: "A digital information system for Ocimalaleo Village.", link: "desaocimalaleo.space", code: "github.com/cleyxcode", image: OcimalaleoVillageImg, tech: ["Web Application"] },
    { name: "Sinara Integrated Admin Panel", description: "An integrated administration panel for the Sinara platform.", code: "github.com/cleyxcode", image: SinaraAdminPanelImg, tech: ["Admin Panel"] },
    { name: "TVRI Maluku Letter Archive", description: "A letter archiving system for TVRI Maluku staff.", link: "cyan-tarsier-946301.hostingersite.com/karyawan/login", code: "github.com/cleyxcode/Web-Surat-Masuk", image: TvriMalukuArchiveImg, tech: ["PHP", "MySQL"] },
    { name: "AM Razer", description: "A web platform developed for the AM Razer project.", link: "amrazer.space", code: "github.com/cleyxcode", image: AmRazerImg, tech: ["Web Application"] },
    { name: "YOLO Plant Watering API", description: "A KNN-powered backend API for automated plant watering.", code: "github.com/cleyxcode/yolo-BE", image: CodeMilitiaImg, tech: ["API", "Machine Learning"] },
    { name: "Smart Plant Watering App", description: "A mobile application for monitoring and controlling plant watering.", code: "github.com/cleyxcode/mobile-apps-air-", image: SmartPlantWateringImg, tech: ["Flutter", "IoT"] },
    { name: "e-commerce Website", description: "E-commerce website built with Laravel Blade.", code: "github.com/cleyxcode/website-pisang", image: PisangImg, tech: ["Blade", "Laravel"] },
    { name: "School Finder Indonesia", description: "A web application for finding schools across Indonesia.", link: "cari-sekolah.vercel.app", code: "github.com/cleyxcode/cari-sekolah", image: SchoolImg, tech: ["TypeScript"] },
    { name: "Online Game ID Finder", description: "A tool for searching and identifying online game accounts.", link: "gameid-wizard.vercel.app", code: "github.com/cleyxcode/gameid-wizard", image: GameIdImg, tech: ["TypeScript"] },
    { name: "Skin Cancer Screening App", description: "A Flutter mobile application for preliminary skin cancer screening.", code: "github.com/cleyxcode/skin-cancer-flutter", image: SkinCancerScreeningImg, tech: ["Flutter"] },
    { name: "Movie Watchlist", description: "A web application for organizing and managing favorite movies.", code: "github.com/cleyxcode/WatchListMovie", image: MovieWatchlistImg, tech: ["Laravel"] },
    { name: "Online Banana Store", description: "An online sales website for a local banana-based UMKM business.", code: "github.com/cleyxcode/website-pisang", image: PisangImg, tech: ["Laravel Blade"] },
    // {
    //   name: "NavSumaro",
    //   description:
    //     "NavSumaro is the all-in-one student platform that replaces multiple fragmented campus tools. Access a verified academic Q&A forum, secure peer-to-peer marketplace for textbooks and supplies, and built-in collaboration tools all powered by institutional email verification for trust and safety. Connect with real classmates, buy and sell with confidence, and get academic help from verified students in your university community.",
    //   link: "navsumaro.vercel.app",
    //   code: "github.com/ehrvayn/navSumaro",
    //   image: NavsumaroImg,
    //   tech: [
    //     "TypeScript",
    //     "React",
    //     "Tailwind",
    //     "Node.js",
    //     "ExpressJS",
    //     "Postgres",
    //   ],
    // },
  ];

  return (
    <section
      className={`w-full backdrop-blur-sm border flex flex-col gap-6 px-2 sm:px-6 py-6 ${
        darkMode
          ? "bg-[#17171a] border-gray-500/40 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          : "bg-white border-gray-500/40 shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
      }`}
    >
      <header>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h2
              className={`text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl  uppercase font-mono font-bold tracking-tight ${darkMode ? "text-gray-200" : "text-gray-900"}`}
            >
              Featured Projects
            </h2>
          </div>
        </div>
      </header>

      <div className="space-y-4 h-[60vh] lg:h-[800px] max-h-[800px] overflow-y-auto custom-scroll">
        {projects.map((project, index) => (
          <article
            key={index}
            className={` border p-5 transition-all duration-200 ${
              darkMode
                ? "bg-[#212124] border-gray-700 hover:border-gray-500"
                : "bg-gray-50 border-gray-200 hover:border-gray-400"
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div
                className={`w-full sm:w-1/2 lg:w-2/5 h-56 sm:h-64 lg:h-70 p-3 rounded flex-shrink-0 overflow-hidden ${
                  darkMode ? "bg-black/40" : "bg-gray-100"
                } flex items-center justify-center`}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className={`w-full h-full object-cover scale-[1.02] transition-transform duration-500 ${
                    hoveredIndex === index ? "scale-[1.08]" : "scale-[1.02]"
                  }`}
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>

              <div className="flex flex-col gap-3 flex-1 min-w-0">
                <div>
                  <h3
                    className={`text-base sm:text-lg md:text-lg lg:text-lg xl:text-xl  font-bold mb-2 ${darkMode ? "text-gray-200" : "text-gray-900"}`}
                  >
                    {project.name}
                  </h3>
                  <p
                    className={`text-sm text-justify leading-relaxed ${
                      expandedIndex === index
                        ? ""
                        : "line-clamp-3 sm:line-clamp-none"
                    } ${darkMode ? "text-gray-200" : "text-gray-900"}`}
                  >
                    {project.description}
                  </p>

                  {/* toggle only where the text is actually clamped */}
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedIndex(expandedIndex === index ? null : index)
                    }
                    aria-expanded={expandedIndex === index}
                    className={`mt-2 sm:hidden inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-[0.15em] transition-colors ${
                      darkMode
                        ? "text-gray-300 hover:text-gray-100"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    {expandedIndex === index ? "View Less" : "View Details"}
                    <i
                      className={`bi bi-chevron-${
                        expandedIndex === index ? "up" : "down"
                      } transition-transform`}
                    />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech?.map((tech, i) => (
                    <span
                      key={i}
                      className={`text-xs px-2.5 py-1 font-medium ${
                        darkMode
                          ? "bg-gray-500/10 hover:bg-gray-500/20 border border-gray-600/30 text-gray-200"
                          : "bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 items-center pt-2 text-sm">
                  {project.link && (
                    <a
                      href={`https://${project.link}`}
                      target="_blank"
                      rel="noreferrer"
                      className={`font-semibold transition-colors ${
                        darkMode
                          ? "text-gray-200 hover:text-gray-100"
                          : "text-gray-900 hover:text-gray-700"
                      }`}
                    >
                      View Project <i className="bi bi-arrow-up-right ml-1" />
                    </a>
                  )}
                  {project.code && (
                    <>
                      <span
                        className={darkMode ? "text-gray-500" : "text-gray-400"}
                      >
                        |
                      </span>
                      <a
                        href={`https://${project.code}`}
                        target="_blank"
                        rel="noreferrer"
                        className={`font-semibold transition-colors ${
                          darkMode
                            ? "text-gray-200 hover:text-gray-100"
                            : "text-gray-900 hover:text-gray-700"
                        }`}
                      >
                        View Code <i className="bi bi-arrow-up-right ml-1" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProjects;
