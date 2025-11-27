import React, { useEffect, useState } from "react";
import Image from "next/image";
import SectionSkeleton from "@/common/Skeleton";
import { useStrapiInteriorStore } from "@/store/strapiInteriorsData";
export interface ITiredOfMultipleOptionsProps {
  heading: string;
  subHeading: string;
  listitems: Array<{
    iconUrl: string;
    title: string;
    description: string;
  }>;
}

function TiredOfMultipleOptions({
  heading,
  listitems,
  subHeading,
}: ITiredOfMultipleOptionsProps) {
  const { loading } = useStrapiInteriorStore();

  return (

    <div className="flex justify-center items-center py-8">
      <div className="max-w-[1140px] min-h-[486px] relative mx-auto px-4 ">
        <h1 className="md:font-Gordita-Bold  font-Gordita-Bold md:text-[24px] text-[#0E0E0E] md:leading-[35.62px] text-[18px] leading-[28.5pxpx] text-center mb-3 md:mb-2">
          {heading}
        </h1>
        <h2 className="font-Gordita-Regular text-[#7B7C83] md:text-[18px] md:leading-[28.5px] text-center mb-[64px] md:mb-[90px] text-[14px] leading-[22.8px]">
          {subHeading}
        </h2>
        {loading ? (<SectionSkeleton type="interiorMarket" />) : (
          <div className="grid grid-cols-2 gap-x-[30px] gap-y-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-x-16 md:max-w-[1140px] md:min-h-[347px]  text-center mx-auto  ">
            {listitems.map((item, index) => {
              return (
                <div
                  key={`item-${item.iconUrl}-${item.title}-${index}`}
                  className="  md:rounded-lg md:border md:border-[#DEE8F3] border-none shadow-custom   px-9  md:py-3  py-3 pb-4 md:px-[16px] md:max-w-[249px] md:min-h-[347px] max-w-[155px] min-h-[50px] flex flex-col items-center  mx-auto  md:gap-y-[12px] gap-y-[8px] rounded-[8px] bg-[#FFFFFF] "
                >
                  <div className=" hidden md:block relative w-[160px] min-h-[180px]">
                    <Image
                      src={item.iconUrl}
                      alt=""
                      fill
                      className="absolute object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className=" md:hidden bg-[#FFFFFF] w-[70px] flex items-center justify-center  mx-auto text-center h-[70px] border-[1px] border-[#EBEBEB] shadow-custom rounded-full transform  translate-y-[-40%] ">
                      <div className=" block md:hidden relative w-[55px] min-h-[43px] ">
                        <Image
                          src={item.iconUrl}
                          alt=""
                          fill
                          className="absolute object-contain"
                        />
                      </div>
                    </div>

                    <div className="font-Gordita-Medium text-base md:text-lg md:leading-[28.5px]   mx-auto  md:w-[176px] md:h-[23px] w-[152px] text-[12px] leading-[22.8px] text-[#0B100C]     whitespace-nowrap text-center  ">
                      {item.title}
                    </div>
                    <div className="hidden md:block font-Gordita-Regular text-sm md:text-base md:leading-[27px] md:max-w-[217px] md:min-h-[130px] max-w-[173px] min-h-[150px] text-center text-[10px] leading-[25px] md:text-[#6F6F6F] text-[#081221] ">
                      {item.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

export default TiredOfMultipleOptions;
