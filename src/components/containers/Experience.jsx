import { useDarkMode } from "../../context/DarkmodeProvider";

function Experience() {
  const { darkMode } = useDarkMode();

  const experiences = [
    {
      title: "Baba Farid School of Entrepreneurship",
      sub: "Startup ecosystem, event management, website updates, and design thinking",
      year: "Experience",
      active: true,
    },
    {
      title: "CodeSoft",
      sub: "Developed dynamic websites, responsive UI/UX, testing, and debugging",
      year: "Remote",
      active: false,
    },
    {
      title: "Freelance Developer",
      sub: "Developing web, mobile, backend, and digital solutions for different projects",
      year: "2023—2026",
      active: false,
    },
    {
      title: "IT Support Intern — Bank Maluku Kantor Pusat",
      sub: "Information technology support and workplace technical assistance",
      year: "2025",
      active: false,
    },
    {
      title: "VR Simulation Developer — Unity",
      sub: "Developing a virtual-reality simulation in collaboration between Universitas Indonesia and Universitas Kristen Indonesia Maluku",
      year: "2025",
      active: false,
    },
    {
      title: "Tabaos Application Developer",
      sub: "Developing a Tabaos application with Flutter and Laravel for a lecturer research project at Universitas Kristen Indonesia Maluku",
      year: "2026",
      active: true,
    },
    {
      title: "Full-Stack Development",
      sub: "Next.js, React.js, TypeScript, Node.js, and scalable web applications",
      year: "2+ years",
      active: false,
    },
    {
      title: "Creative Technology",
      sub: "Chess, portrait sketching, and practical digital product development",
      year: "Ongoing",
      active: false,
    },
  ];

  return (
    <div
      className={`flex flex-col p-6 flex-1 backdrop-blur-sm border ${
        darkMode
          ? "bg-[#17171a] border-gray-500/40 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          : "bg-white border-gray-500/40 shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
      }`}
    >
      <div className="flex flex-col gap-4 flex-1 min-h-0">
        <div className="flex items-start justify-between shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2
                className={`text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl  uppercase font-bold tracking-tight ${
                  darkMode ? "text-gray-200" : "text-gray-900"
                }`}
              >
                Experience
              </h2>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-1 overflow-y-auto flex-1 min-h-0 custom-scroll">
          <div className="relative">
            {experiences.map((item, index) => (
              <div key={index} className={`relative pl-6 py-3 `}>
                <div className="absolute -left-1 top-0 bottom-0 w-6 flex flex-col items-center">
                  {item.title && (
                    <>
                      <div
                        className={`w-3 h-3 rounded-full mt-4 shrink-0 ring-2 ${
                          item.active
                            ? darkMode
                              ? "bg-gray-300 ring-gray-500/30"
                              : "bg-gray-400 ring-gray-400/80"
                            : darkMode
                              ? " ring-gray-700/90"
                              : " ring-gray-600/30"
                        }`}
                      />
                      {index !== experiences.length - 1 && (
                        <div
                          className={`w-0.5 flex-1 -mb-4 ${
                            darkMode ? "bg-gray-700" : "bg-gray-300"
                          }`}
                        />
                      )}
                    </>
                  )}
                </div>

                {item.title && (
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-bold text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-base mb-0.5 ${
                          darkMode ? "text-gray-200" : "text-gray-900"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`text-xs font-mono leading-tight ${
                          darkMode ? "text-gray-200" : "text-gray-900"
                        }`}
                      >
                        {item.sub}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`text-xs font-mono ${
                          item.year === "Ongoing"
                            ? darkMode
                              ? "text-gray-500"
                              : "text-gray-500"
                            : darkMode
                              ? "text-gray-300"
                              : "text-gray-600"
                        }`}
                      >
                        {item.year}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experience;
