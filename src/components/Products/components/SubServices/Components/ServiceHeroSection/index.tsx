import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/common/Button";
import { RightArrowWhite } from "@/components/Icons";
import ContactForm from "../ContactForm";

export interface IServiceHeroSectionInterfaceProps {
  heading: string;
  subHeading: string;
  bgImageUrl: string;
  bookingCtaUrl: { label: string; url: string };
  locationcta: Array<{
    label: string;
    url: string;
  }>;
  selectedId: {
    id: number;
    service: string;
    label?: string;
  };
}

function ServiceHeroSection({
  bookingCtaUrl,
  heading,
  locationcta,
  subHeading,
  bgImageUrl,
  selectedId,
}: IServiceHeroSectionInterfaceProps) {
  return (
    <div className="lg:h-[595px] relative p-6 bg-black h-[350px] bg-opacity-[0.32]">
      <Image
        src={`${bgImageUrl}`}
        alt=""
        fill={true}
        className="absolute -z-10"
      />
      <div className="flex flex-col md:flex-row w-full h-full">
        <div className="flex flex-col  w-full h-full justify-between  items-center py-5 md:py-3 px-5 ">
          <div className="mb-5 md:mb-8 w-full">
            <h1 className="text-[#FFFFFF] font-Gordita-Medium md:font-Gordita-Bold text-[20px] md:text-[27px]  lg:text-[40px] lg:leading-[44.17px] text-start mb-8 md:w-[50%] w-full">
              {heading}
            </h1>

            <h2 className="text-[#FFFFFF] md:font-Gordita-Medium md:text-[16px] text-[14px] lg:leading-[34.2px]  md:max-w-[500px] mb-[20px] md:mb-[0px]">
              {subHeading}
            </h2>
          </div>
          <div className="mb-6 md:mb-0 w-full">
            <Button
              className="rounded-lg bg-[#3b7ee4] hover:bg-[#2872a1]text-[13px] md:text-[16px] py-2 px-[12px] md:p-4 font-regular md:font-Gordita-Medium text-white  cursor-pointer"
              aria-label={`Go to this {bookingCtaUrl.label}`}
            >
              <Link
                href={bookingCtaUrl.url}
                aria-label={` Go to this {bookingCtaUrl.label}`}
              >
                <div className="flex flex-row gap-2 ">
                  <p> {bookingCtaUrl.label || 'Explore More'}</p>
                  <div className="hover:rotate-90 w-[20px] h-[20px]  transition-transform  duration-00 hover:ease-out ">
                    <RightArrowWhite />
                  </div>
                </div>
              </Link>
            </Button>
          </div>
        </div>
        <div className="md:block hidden md:w-[30%] w-full  md:mt-[0px]  h-fit self-center">
          <ContactForm selectedId={selectedId} />
        </div>
      </div>
    </div>
  );
}

export default ServiceHeroSection;
