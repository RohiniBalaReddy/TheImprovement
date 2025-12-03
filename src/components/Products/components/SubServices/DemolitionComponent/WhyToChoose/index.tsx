import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { IconType } from "react-icons";
import { MdConstruction, MdSecurity, MdElectricBolt } from "react-icons/md";
import Image from "next/image";

export const iconsMap = {
  MdConstruction,
  MdSecurity,
  MdElectricBolt,
} as const;

export type IconKey = keyof typeof iconsMap;

type FeatureItem = {
  id: number;
  title: string;
  description: string;
  icon: keyof typeof iconsMap;
  gradient: string;
  Icon?: IconType;
};

export type WhyToChooseDemolitionProps = {
  mainTitle: string;
  subTitle: string;
  highlightColor: string;
  experience: {
    years: string;
    label: string;
  };
  images: {
    main: string;
    side: string;
  };
  features: FeatureItem[];
};

const WhyToChoose = ({
  mainTitle,
  subTitle,
  highlightColor,
  features,
  images,
  experience,
}: WhyToChooseDemolitionProps) => {
  const mainImage = images.main;
  const sideImage = images.side;

  const experienceYears = experience.years;
  const experienceLabel = experience.label;

  const sliderRef = useRef<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderSettings = {
    dots: true,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 2000,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: "10px",
    customPaging: (i: number) => (
      <div
        style={{
          width: i === currentSlide ? "40px" : "12px",
          height: "10px",
          borderRadius: "9999px",
          backgroundColor: i === currentSlide ? highlightColor : "#CBD5E1",
          transition: "all 0.3s",
          margin: "0 4px",
        }}
      />
    ),
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 425, settings: { slidesToShow: 1, centerPadding: "0px" } },
    ],
  };

  return (
    <section className="bg-gradient-to-b from-[#F8FBFF] to-[#EAF1FF] py-8 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1
            className="text-[18px] lg:text-[24px] font-Gordita-Bold tracking-wide mb-2"
            style={{ color: highlightColor }}
          >
            {mainTitle}
          </h1>
          <h2 className="text-[#1C2436] font-Gordita-Regular text-[14px] md:text-[16px] opacity-80">
            {subTitle}
          </h2>
          <div
            className="w-20 h-[3px] mx-auto mt-3 rounded-full"
            style={{ backgroundColor: highlightColor }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 hidden md:block">
            {features.map((item: any) => (
              <div
                key={item.id}
                className="group bg-white/70 backdrop-blur-md border-t-4 border-blue-100 hover:border-[#2872a1] shadow-sm hover:shadow-lg transition-all duration-300 p-5 rounded-2xl"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <div
                      className={`p-4 bg-gradient-to-br ${item.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div>
                    <h3
                      className="md:text-lg font-Gordita-Bold text-gray-900 mb-1 transition-colors"
                      style={{ color: highlightColor }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-600 font-Gordita-Regular leading-snug">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE SLIDER */}
          <div className="block md:hidden w-full max-w-[350px] mx-auto">
            <Slider ref={sliderRef} {...sliderSettings}>
              {features.map((item: any) => (
                <div key={item.id}>
                  <div className="bg-white/70 backdrop-blur-md border border-blue-100 shadow-md p-6 rounded-xl mx-2">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-4 bg-gradient-to-br ${item.gradient} rounded-xl shadow-lg`}
                      >
                        <item.Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-[16px] font-Gordita-Bold text-gray-900 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-[13px] font-Gordita-Regular">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <div className="flex justify-end relative">
            <div className="relative w-[400px] h-[400px] hidden lg:block group">
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={mainImage!}
                  alt="Main visual"
                  fill
                  sizes="400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="absolute -left-24 top-10">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl w-[300px] h-[200px]">
                  <Image
                    src={sideImage!}
                    alt="Side"
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>

                <div
                  className="absolute -bottom-24 left-8 bg-white p-4 shadow-xl rounded-2xl border-l-4"
                  style={{ borderColor: highlightColor }}
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg text-white font-bold"
                        style={{
                          background: highlightColor,
                        }}
                      >
                        {experienceYears}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-Gordita-Bold text-gray-900">
                        {experienceLabel}
                      </h4>
                      <p className="text-xs text-gray-600 font-Gordita-Regular">
                        IN THIS SERVICE
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyToChoose;
