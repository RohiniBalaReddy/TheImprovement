import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "@/common/Button";

const AboutUs = () => {
  const router = useRouter();

  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-0 left-0 md:w-72 w-60 md:h-72 h-60 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
      <div className="absolute bottom-0 right-0 md:w-96 w-70 md:h-96 h-70 bg-yellow-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-40"></div>

      <div className="relative flex flex-col lg:flex-row gap-12 lg:gap-16 justify-between items-center px-6 sm:px-4 lg:px-12 py-16 lg:py-20 mt-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:gap-8 gap-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full w-fit">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <span className="font-Gordita-Medium tracking-wide">
              WHO WE ARE
            </span>
          </div>

          <h1 className="font-Gordita-Bold text-[18px] lg:text-[24px] leading-11 lg:leading-[52px] text-[#1D4ED8]">
            About Our Demolition Services
          </h1>

          <div className="md:space-y-6 space-y-3">
            <h2 className="font-Gordita-Bold text-[14px] lg:text-[18px] text-black">
              Safe, Expert & Precision-Driven Demolition Specialists.
            </h2>

            <div className="md:space-y-4 space-y-2">
              <p className="font-Gordita-Regular text-[13px] lg:text-[16px] text-gray-600 leading-7">
                We provide professional demolition services for all types of
                properties—residential, commercial, and industrial. With
                advanced machinery and certified safety procedures, we ensure
                fast, clean, and environmentally responsible demolition
                execution.
              </p>

              <div className="flex flex-row gap-4 sm:gap-2 md:pt-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="font-Gordita-Regular text-gray-700 md:text-[16px] text-[12px]">
                    Safety Certified Experts
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  </div>
                  <span className="font-Gordita-Regular text-gray-700 md:text-[16px] text-[12px]">
                    Modern Machinery
                  </span>
                </div>
              </div>

              <p className="font-Gordita-Regular text-[10px] lg:text-[14px] text-gray-600 leading-5 md:leading-7 pt-4">
                From controlled dismantling to complete structural demolition,
                our team ensures accuracy, safety, and full compliance with
                local regulations. Every project is executed with
                professionalism and precision.
              </p>
            </div>
          </div>

          <div className="flex gap-4 md:pt-4 pt-2">
            <Button
              onClick={() => router.push("/about-us")}
              className="bg-blue-600 text-white md:px-8 px-3 md:py-3 py-1 md:text-[16px] text-[12px] rounded-lg font-Gordita-Medium hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Learn More
            </Button>

            <Button
              onClick={() => router.push("/contact-us")}
              className="border border-gray-300 text-gray-700 md:px-8 px-3 md:py-3 py-1 md:text-[16px] text-[12px] rounded-lg font-Gordita-Medium hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
            >
              Contact Us
            </Button>
          </div>
        </div>

        <div className="relative aspect-[16/9] md:w-[700px] w-full h-[380px] lg:h-[500px]">
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400 rounded-full animate-bounce z-20"></div>
          <div className="absolute -bottom-2 -left-4 w-6 h-6 bg-yellow-400 rounded-full animate-bounce z-20 delay-300"></div>

          <div className="absolute -inset-6 bg-gradient-to-r from-blue-200/50 via-yellow-200/40 to-white/30 rounded-3xl transform rotate-3 blur-sm"></div>
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-yellow-100 rounded-2xl transform rotate-2"></div>

          <div className="relative w-full md:h-full h-[340px] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/images/earthmoves/whychooseus/bgimage.png"
              alt="Demolition team working on-site"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />

            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg md:p-4 p-2 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="md:w-12 w-8 md:h-12 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="md:w-6 w-3 md:h-6 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div>
                  <p className="font-Gordita-Bold md:text-[16px] text-[12px] text-gray-900">
                    10+ Years
                  </p>
                  <p className="font-Gordita-Regular md:text-[14px] text-[10px] text-gray-600">
                    Demolition Experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
