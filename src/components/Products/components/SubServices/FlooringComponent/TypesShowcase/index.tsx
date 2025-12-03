import React from "react";
import Image from 'next/image'
import Button from "@/common/Button"
interface Type {
  name: string;
  image: string;
  description: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface Props {
  types: Type[];
}

const TypesShowcase: React.FC<Props> = ({ types }) => {
  return (
    <section className="flex flex-col items-center md:px-6 px-3 md:py-12 py-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center md:mb-12 mb-6 max-w-3xl">
        <h2 className="font-Gordita-Bold text-[18px] md:text-[24px] lg:text-[26px] text-[#212227] md:mb-4 mb-2 leading-tight">
          Explore Our Flooring Types
        </h2>
        <p className="text-[14px] font-Gordita-Medium md:text-[16px] text-gray-600 leading-relaxed px-4">
          Discover our diverse range of premium flooring options, designed for style, durability, and comfort. Perfect for your home or office.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {types.map((type, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-500"
          >
            {/* Image */}
            <div className="relative md:h-60 h-40 w-full">
              <Image
                src={type.image}
                alt={type.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {type.badge && (
                <div className="absolute top-4 left-4 bg-[#2872a1] text-white px-3 py-1 rounded-full text-[10px] md:text-sm font-Gordita-Medium shadow">
                  {type.badge}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="md:p-6 p-2">
              <div className="flex items-center mb-3 md:space-x-3 space-x-2 text-black">
                {type.icon && <div className="text-[#2872a1] ">{type.icon}</div>}
                <h3 className="text-[10px] md:text-[14px] font-Gordita-Medium">{type.name}</h3>
              </div>
              <p className="text-black md:text-[14px] text-[10px] mb-4">{type.description}</p>
              <Button className="mt-2 inline-flex items-center md:text-[16px] text-[12px] text-nowrap  bg-[#2872a1] text-white md:px-5 px-3 md:py-2 py-1 rounded-xl font-Gordita-Medium shadow hover:bg-yellow-400 hover:text-black transition-colors duration-300">
                Learn More
              </Button>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default TypesShowcase;
