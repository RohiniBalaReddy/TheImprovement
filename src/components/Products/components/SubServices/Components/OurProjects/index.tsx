import Image from "next/image";
import React from "react";
import { FaRulerCombined } from "react-icons/fa";

export interface IOurProjectsProps {
  heading: string;
  subheading?: string;
  projects: Array<{
    imageUrl: string;
    title: string;
    descriptionPoints: Array<string>;
    category?: string;
    area?: string;
  }>;
}

export const OurProjects = ({
  heading,
  subheading,
  projects,
}: IOurProjectsProps) => {
  return (
    <div className="px-3 md:px-6 md:py-10 py-5 bg-gradient-to-b from-white to-gray-50">
      <div className="text-center max-w-3xl mx-auto md:mb-10 mb-5">
        <h1 className="font-Gordita-Bold text-[18px] md:text-[24px] lg:text-[26px] text-[#212227] md:mb-4 mb-2 leading-tight">
          {heading}
        </h1>
        {subheading && (
          <p className="text-[14px] font-Gordita-Medium md:text-[16px] text-gray-600 leading-relaxed px-4">
            {subheading}
          </p>
        )}
        <div className="w-24 h-1 bg-gradient-to-r from-[#2872a1] to-yellow-400 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={`${project.imageUrl}-${index}-${project.title}`}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col p-2 border border-gray-200"
          >
            <div className="relative w-full rounded-[4px] md:rounded-[10px] h-[140px] md:h-[150px] overflow-hidden bg-gray-100">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {project.category && (
                <div className="absolute top-2 left-2 z-10">
                  <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full md:text-xs text-[12px] font-Godriat-Medium text-gray-700 shadow">
                    {project.category}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-3 flex-1 flex flex-col">
              <h2 className="font-Gordita-Medium text-[14px] md:text-[16px] text-[#212227] mb-1 group-hover:text-[#2872a1] transition-colors duration-300">
                {project.title}
              </h2>

              <div className="flex flex-col font-Gordita-Regular gap-1 mb-2 text-[12px] md:text-[14px] text-gray-700 leading-relaxed">
                {project.descriptionPoints.map((desc, idx) => (
                  <p key={`desc-${idx}`}>{desc}</p>
                ))}
              </div>

              {project.area && (
                <div className="mt-auto flex items-center gap-2 text-gray-800 font-Gordita-Medium">
                  <FaRulerCombined className="text-[#2872a1] w-4 h-4 flex-shrink-0" />
                  <span className="text-[12px] md:text-[13px]">
                    {project.area}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
