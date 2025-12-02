export interface OutdoorSpace {
  title: string;
  description: string;
  image: string;
  features: string[];
  href: string;
}

export default function OutdoorSpacesShowcase({
  spaces,
}: {
  spaces: OutdoorSpace[];
}) {
  return (
    <section className="py-8 md:py-16 md:px-8 px-2">
      <div className="text-center mb-10">
        <h2 className="font-Gordita-Bold text-[18px] md:text-[24px] lg:text-[26px] text-[#212227] md:mb-4 mb-2 leading-tight  text-center mx-auto">
          Outdoor Spaces We Transform
        </h2>
        <p className="text-[14px] font-Gordita-Medium md:text-[16px] text-gray-600 leading-relaxed px-4">
          Enhance your property's exterior appeal
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-yellow-400 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-3">
        {spaces.map((space, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={space.image}
              alt={space.title}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-0 md:p-6 p-3 text-white">
              <h3 className="md:text-2xl text-[14px] font-Gordita-Bold mb-2">
                {space.title}
              </h3>
              <p className="mb-3 text-gray-200 font-Gordita-Medium md:text-[16px] text-[12px]">
                {space.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {space.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full md:text-sm text-[10px]"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
