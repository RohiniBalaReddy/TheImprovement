const maintenanceTips = [
  {
    season: "Spring",
    icon: "🌸",
    gradient: "from-green-100 to-green-50",
    tips: [
      "Pressure wash to remove winter debris",
      "Inspect for cracks or damage",
      "Reseal if needed",
      "Clear drainage systems"
    ]
  },
  {
    season: "Summer",
    icon: "☀️",
    gradient: "from-yellow-100 to-yellow-50",
    tips: [
      "Check for weed growth in joints",
      "Clean oil stains promptly",
      "Inspect for surface degradation",
      "Ensure proper drainage during rains"
    ]
  },
  {
    season: "Fall",
    icon: "🍂",
    gradient: "from-orange-100 to-orange-50",
    tips: [
      "Remove leaves and organic debris",
      "Fill any new cracks",
      "Apply pre-winter sealant",
      "Check edge restraints"
    ]
  },
  {
    season: "Winter",
    icon: "❄️",
    gradient: "from-blue-100 to-blue-50",
    tips: [
      "Use calcium chloride (not rock salt)",
      "Shovel snow promptly",
      "Avoid metal shovels on pavers",
      "Monitor for ice damage"
    ]
  }
];

export default function MaintenanceTips() {
  return (
    <section className="py-8 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto md:px-5 px-1">


        <div className="text-center mb-12">
          <h2 className="font-Gordita-Bold text-[18px] md:text-[24px] lg:text-[26px] text-[#212227] md:mb-4 mb-2 leading-tight">
            Seasonal Maintenance Guide
          </h2>
          <p className="text-[14px] font-Gordita-Medium md:text-[16px] text-gray-600 leading-relaxed px-4">
            Keep your exterior surfaces looking great year-round
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2872a1] to-yellow-400 mx-auto mt-4 rounded-full"></div>
        </div>


        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-2">
          {maintenanceTips.map((season, index) => (
            <div
              key={index}
              className="rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >

              <div
                className={`md:p-6 p-1 text-center bg-gradient-to-b ${season.gradient}`}
              >
                <div className="md:text-[28px] text-[20px] mb-2">{season.icon}</div>
                <h3 className="md:text-xl text-[14px] font-Gordita-Bold">{season.season}</h3>
              </div>


              <div className="md:p-6 p-3">
                <ul className="md:space-y-3 space-y-1">
                  {season.tips.map((tip, idx) => (
                    <li
                      key={idx}
                      className="flex items-start md:gap-2 gap-1 text-gray-700 md:text-sm text-[12px] font-Gordita-Regular"
                    >
                      <span className="text-[#2872a1] text-lg leading-none">•</span>
                      <span>{tip}</span>
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
