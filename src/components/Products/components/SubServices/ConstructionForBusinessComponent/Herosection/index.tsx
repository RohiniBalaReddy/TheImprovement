import React, { useState } from "react";
import Button from "@/common/Button";
import {
  BsArrowUpRight,
  BsClock,
  BsBriefcase,
  BsHeadset,
} from "react-icons/bs";
import ContactForm from "@/components/Products/components/SubServices/Components/ContactForm";
export interface IHerosectionprops {
  bgimage: string;
  heading: string;
  heading2: string;
  subheading: string;
  descriptions: string;
  btntext: string;
  overlaystyle: string;
  overlaycolor?: React.CSSProperties;
  onScrollToPackages?: () => void;
}

const HeroSection = ({
  heading,
  bgimage,
  heading2,
  subheading,
  descriptions,
  btntext,
  overlaycolor,
  overlaystyle,
  onScrollToPackages,
}: IHerosectionprops) => {
  return (
    <div>
      <div className="relative h-full md:max-h-[550px] max-h-[380px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat "
          style={{
            backgroundImage: `url('${bgimage}')`,
          }}
        >
          <div
            className={`absolute inset-0  ${overlaystyle}`}
            style={overlaycolor}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-2 lg:grid-cols-3 lg:gap-16  md:pt-[0px] pt-[8%]">
            <div className="flex flex-col justify-center lg:col-span-2 md:mb-0 mb-6">
              <div className="tracking-wide  text-white  ">
                <h1 className=" font-Gordita-Medium md:text-[34px] text-[28px]">
                  <span className="font-Gordita-Bold">{heading}</span>{" "}
                  {heading2}
                </h1>
                <h2 className="md:block hidden  mt-3 font-Gordita-Medium text-[34px] lg:leading-normal ">
                  {subheading}
                </h2>
              </div>
              <p className="mt-6  text-[16px] md:block hidden font-Gordita-Medium leading-7 text-white/90 max-w-[706px]">
                {descriptions}
              </p>
              <div className="md:mt-8 mt-1">
                <Button
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-Gordita-Medium text-black transition-colors rounded-full  focus:outline-none focus:ring-2  focus:ring-offset-2 bg-white"
                  onClick={() => {
                    if (onScrollToPackages) {
                      onScrollToPackages();
                    }
                  }}
                >
                  {btntext}
                  <span className="text-white bg-[#5297ff] hover:bg-[#5297FF] w-[40px] h-[40px] rounded-full flex justify-center items-center ml-2">
                    <BsArrowUpRight className="w-4 h-4" />
                  </span>
                </Button>
                <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
                  <div className="group relative flex-1 min-w-[80px] max-w-[140px] bg-gradient-to-br from-[#5297ff]/15 to-blue-600/10 backdrop-blur-xl rounded-2xl md:p-3 p-1 flex flex-col items-center shadow-lg hover:shadow-[#5297ff]/30 border border-white/20 hover:border-blue-400/40 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#5297ff]/0 via-blue-400/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 bg-gradient-to-br from-[#5297ff] to-blue-600 w-10 h-10 rounded-2xl flex items-center justify-center shadow-md shadow-[#5297ff]/25 mb-2 group-hover:scale-110 transition-transform duration-300">
                      <BsClock className="text-white w-4 h-4" />
                    </div>
                    <div className="text-xl font-Gordita-Bold text-white">
                      10+
                    </div>{" "}
                    <div className="text-xs font-Gordita-Medium text-white/80 mt-0.5">
                      Years
                    </div>
                  </div>

                  <div className="group relative flex-1 min-w-[80px] max-w-[140px] bg-gradient-to-br from-blue-400/15 to-[#5297ff]/10 backdrop-blur-xl rounded-2xl md:p-3 p-1 flex flex-col items-center shadow-lg hover:shadow-blue-400/30 border border-white/20 hover:border-blue-300/40 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-blue-300/5 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 bg-gradient-to-br from-blue-400 to-[#5297ff] w-10 h-10 rounded-2xl flex items-center justify-center shadow-md shadow-blue-400/25 mb-2 group-hover:scale-110 transition-transform duration-300">
                      <BsBriefcase className="text-white w-4 h-4" />
                    </div>
                    <div className="text-xl font-Gordita-Bold text-white">
                      500+
                    </div>{" "}
                    <div className="text-xs font-Gordita-Medium text-white/80 mt-0.5">
                      Projects
                    </div>
                  </div>

                  <div className="group relative flex-1 min-w-[80px] max-w-[140px] bg-gradient-to-br from-blue-300/15 to-blue-400/10 backdrop-blur-xl rounded-2xl md:p-3 p-1 flex flex-col items-center shadow-lg hover:shadow-blue-300/30 border border-white/20 hover:border-cyan-400/40 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-400/5 to-blue-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 bg-gradient-to-br from-cyan-500 to-blue-400 w-10 h-10 rounded-2xl flex items-center justify-center shadow-md shadow-cyan-500/25 mb-2 group-hover:scale-110 transition-transform duration-300">
                      <BsHeadset className="text-white w-4 h-4" />
                    </div>
                    <div className="text-xl font-Gordita-Bold text-white">
                      24/7
                    </div>{" "}
                    <div className="text-xs font-Gordita-Medium text-white/80 mt-0.5">
                      Support
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ContactForm
              selectedId={{
                id: 1,
                service: "Construction",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
