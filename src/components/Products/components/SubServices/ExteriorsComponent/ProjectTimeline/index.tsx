import { Check } from "lucide-react";

const projectPhases = [
  {
    phase: "Consultation & Design",
    duration: "1-2 days",
    tasks: [
      "Site assessment",
      "Material selection",
      "Budget planning",
      "Design approval",
    ],
  },
  {
    phase: "Site Preparation",
    duration: "2-3 days",
    tasks: ["Excavation", "Grading", "Base installation", "Utility marking"],
  },
  {
    phase: "Installation",
    duration: "3-7 days",
    tasks: ["Material laying", "Edging installation", "Leveling", "Compaction"],
  },
  {
    phase: "Finishing & Sealing",
    duration: "1-2 days",
    tasks: ["Joint filling", "Surface sealing", "Final grading", "Cleanup"],
  },
  {
    phase: "Curing & Handover",
    duration: "3-7 days",
    tasks: [
      "Material curing",
      "Final inspection",
      "Maintenance guidelines",
      "Warranty activation",
    ],
  },
];

export default function ProjectTimeline() {
  return (
    <section className="py-7 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center md:mb-4 mb-2">
          <h2 className="font-Gordita-Bold text-[18px] md:text-[24px] lg:text-[26px] text-[#212227] md:mb-4 mb-2 leading-tight">
            Project Timeline
          </h2>
          <p className="text-[14px] font-Gordita-Medium md:text-[16px] text-gray-600 leading-relaxed px-4">
            Step-by-step process for a smooth installation
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2872a1] to-yellow-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:hidden gap-2">
          {projectPhases.map((phase, index) => (
            <div
              key={index}
              className="bg-white p-2 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100"
            >
              <h3 className="text-[14px] font-Gordita-Bold mb-1">
                {phase.phase}
              </h3>
              <span className="text-[12px] font-Gordita-Medium text-[#2872a1] bg-blue-100 px-2 py-1 rounded-full">
                {phase.duration}
              </span>
            </div>
          ))}
        </div>

        <div className="hidden md:block relative mt-10">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>

          {projectPhases.map((phase, index) => (
            <div
              key={index}
              className={`relative mb-14 flex ${index % 2 === 0
                ? "justify-end pr-[55%]"
                : "justify-start pl-[55%]"
                }`}
            >
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#2872a1] border-4 border-white rounded-full shadow-lg"></div>

              <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-Gordita-Bold">{phase.phase}</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {phase.duration}
                  </span>
                </div>

                <ul className="space-y-2">
                  {phase.tasks.map((task, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-gray-600 font-Gordita-Regular"
                    >
                      <Check className="w-4 h-4 text-[#2872a1]" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
