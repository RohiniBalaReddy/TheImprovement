import React from "react";
import Image from "next/image";
export interface IConsultExpertWhyProps {
  heading: string;
  subheading: string;
  image: string;
  listItems: Array<{
    id: number;
    title: string;
    description: string;
    image: string;
  }>;
}

export default function ConsultLegalExpert({
  heading,
  image,
  subheading,
  listItems,
}: IConsultExpertWhyProps) {
  console.log(image);
  return (
    <>
      <div className="max-w-[1392px] min-h-[616px] mx-auto flex flex-col items-center ">
        <div className="mb-12 text-center">
          <div className="relative ">
            <h1 className="font-Gordita-Bold text-[18px] md:text-[24px] lg:text-[26px] text-[#212227] md:mb-4 mb-2 leading-tight">
              {heading}
            </h1>

          </div>
          <h2 className="text-[14px] font-Gordita-Medium md:text-[16px] text-gray-600 leading-relaxed px-4">
            {subheading}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2872a1] to-yellow-400 mx-auto mt-4 rounded-full"></div>

        </div>

        <div className="flex items-center max-w-[1392px] min-h-[428px] gap-x-[91px] flex-wrap">
          <div className="flex flex-col items-center justify-center max-w-[733px] min-h-[428px] gap-y-[32px]">
            {listItems.map((item, index) => {
              return (
                <div
                  className={`flex items-center max-w-[697px] min-h-[83px] gap-x-[16px] ${index % 2 != 0 ? "pl-[18px]" : "pr-[18px]"
                    }`}
                  key={index}
                >
                  <div>
                    <Image
                      src={item.image}
                      objectFit="cover"
                      alt=""
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="flex flex-col gap-y-[8px]">
                    <h1 className="max-w-[291px] min-h-[29px] text-[#000000] text-left font-Gordita-Medium text-[20px] leading-[28.5px]">
                      {item.title}
                    </h1>
                    <h1 className="max-w-[637px] min-h-[46px] text-left text-[#4B4C4F] text-[16px] font-Gordita-Regular leading-[22.8px]">
                      {item.description}
                    </h1>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="relative md:w-[390px] w-[360px] h-[280px]">
            <Image
              src={image}
              alt="consultexpertwhy"
              fill
              className="absolute object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
