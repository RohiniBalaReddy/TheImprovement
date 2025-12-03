import Image from "next/image";
import React from "react";
import { ArrowRight, Building, Star } from "lucide-react";

export interface ITagsProps {
  heading: string;
  subheading?: string;
  tags: Array<{
    name: string;
    imageUrl: string;
    description?: string;
    projectCount?: number;
    icon?: React.ReactNode;
  }>;
}

export const Tags = ({ heading, subheading, tags }: ITagsProps) => {
  return (
    <div className="flex flex-col items-center md:px-6 px-3 md:py-12 py-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center md:mb-12 mb-6 max-w-3xl">
        <h2 className="font-Gordita-Bold text-[18px] md:text-[24px] lg:text-[26px] text-[#212227] md:mb-4 mb-2 leading-tight">
          {heading}
        </h2>
        {subheading && (
          <p className="text-[14px] font-Gordita-Medium md:text-[16px] text-gray-600 leading-relaxed px-4">
            {subheading}
          </p>
        )}
        <div className="w-20 h-1 bg-gradient-to-r from-[#2872a1] to-yellow-400 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8  gap-3 w-full max-w-7xl">
        {tags.map((tag, index) => (
          <div
            key={`${tag.name}-${index}`}
            className="group relative bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden cursor-pointer transform hover:-translate-y-2"
          >
            <div className="relative w-full md:h-[200px] h-[150px] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              <Image
                src={tag.imageUrl}
                alt={tag.name || "category image"}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                fill
                priority
                quality={100}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {tag.projectCount && (
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400" />
                  <span className="md:text-xs text-[12px] font-Gordita-Medium text-gray-700">
                    {tag.projectCount}+ Projects
                  </span>
                </div>
              )}
            </div>

            <div className="md:p-5 p-3">
              <div className="flex md:items-center items-start gap-2 mb-2">
                {tag.icon ? (
                  tag.icon
                ) : (
                  <Building className="w-4 h-4 text-blue-[#2872a1]" />
                )}
                <h3 className="text-[16px] lg:text-[18px] font-Gordita-Medium text-[#212227] leading-tight group-hover:text-[#2872a1] transition-colors duration-300">
                  {tag.name}
                </h3>
              </div>

              {tag.description && (
                <p className="md:text-[14px] text-[12px] font-Gordita-Regular text-gray-600 leading-relaxed mb-3">
                  {tag.description}
                </p>
              )}

              <div className="flex items-center text-[#2872a1] md:text-sm text-[10px] font-Gordita-Medium group-hover:text-blue-700 transition-colors gap-1">
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#2872a1]/10 to-purple-600/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
          </div>
        ))}
      </div>

      <div className="md:hidden grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
        {tags.map((tag, index) => (
          <div
            key={`${tag.name}-mobile-${index}`}
            className="group bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden"
          >
            <div className="flex flex-col items-center p-3">
              <div className="relative w-full h-[100px] rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <Image
                  src={tag.imageUrl}
                  alt={tag.name || "category image"}
                  className="object-cover"
                  fill
                  quality={100}
                />
              </div>

              <div className="flex flex-col items-center mt-2 text-center">
                <div className="flex items-center gap-1 mb-1">
                  {tag.icon ? (
                    tag.icon
                  ) : (
                    <Building className="w-4 h-4 text-[#2872a1]" />
                  )}
                  <h3 className="text-[12px] font-semibold text-[#212227] leading-tight">
                    {tag.name}
                  </h3>
                </div>
                {tag.projectCount && (
                  <p className="text-[10px] text-gray-600 flex items-center gap-1 mb-1">
                    <Star className="w-3 h-3 text-yellow-400" />
                    {tag.projectCount}+ Projects
                  </p>
                )}
                {tag.description && (
                  <p className="text-[10px] text-gray-500">{tag.description}</p>
                )}
                <div className="flex items-center text-[#2872a1] text-[10px] font-medium gap-1 mt-1">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
