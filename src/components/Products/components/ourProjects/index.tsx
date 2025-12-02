import React, { useRef } from "react";
import styles from "./index.module.scss";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Button from "@/common/Button";

const OurProjects = () => {
  const sliderRef = useRef<any>(null);
  const gotoNext = () => sliderRef.current?.slickNext();
  const gotoPrev = () => sliderRef.current?.slickPrev();

 const data = [
  {
    projectName: "Skyline Towers",
    imageLink: "/ourProjects/sample-image-1.jpg",
    location: "Manhattan, New York",
    link: "/projects/skylinetowers",
  },
  {
    projectName: "Urban Retreat",
    imageLink: "/ourProjects/sample-image-2.jpg",
    location: "Downtown, Los Angeles",
    link: "/projects/urbanretreat",
  },
  {
    projectName: "Harbor View Residency",
    imageLink: "/ourProjects/sample-image-3.jpg",
    location: "Navy Pier, Chicago",
    link: "/projects/harborview",
  },
  {
    projectName: "Green Meadows",
    imageLink: "/ourProjects/sample-image-4.jpg",
    location: "Bellevue, Seattle",
    link: "/projects/greenmeadows",
  },
  {
    projectName: "Sunset Villas",
    imageLink: "/ourProjects/sample-image-5.jpg",
    location: "Mission District, San Francisco",
    link: "/projects/sunsetvillas",
  },
  {
    projectName: "Lakefront Homes",
    imageLink: "/ourProjects/sample-image-6.jpg",
    location: "Lakeview, Chicago",
    link: "/projects/lakefronthomes",
  },
  {
    projectName: "Golden Gate Residency",
    imageLink: "/ourProjects/sample-image-7.jpg",
    location: "Marina District, San Francisco",
    link: "/projects/goldengateresidency",
  },
  {
    projectName: "Silver Creek",
    imageLink: "/ourProjects/sample-image-8.jpg",
    location: "Brooklyn Heights, New York",
    link: "/projects/silvercreek",
  },
  {
    projectName: "Palm Ridge",
    imageLink: "/ourProjects/sample-image-9.jpg",
    location: "South Beach, Miami",
    link: "/projects/palmridge",
  },
  {
    projectName: "Elite Estates",
    imageLink: "/ourProjects/sample-image-3.jpg",
    location: "Beverly Hills, Los Angeles",
    link: "/projects/eliteestates",
  },
  {
    projectName: "Royal Gardens",
    imageLink: "/ourProjects/sample-image-7.jpg",
    location: "Downtown, Houston",
    link: "/projects/royalgardens",
  },
  {
    projectName: "Emerald Hills",
    imageLink: "/ourProjects/sample-image-4.jpg",
    location: "Cambridge, Boston",
    link: "/projects/emeraldhills",
  },
];


  const sliderSettings = {
    cssEase: "ease-in-out",
    speed: 500,
    arrows: false,
    swipeToSlide: true,
    infinite: true,
    variableWidth: true,
    touchThreshold: 8000,
    responsive: [
      {
        breakpoint: 768,
        settings: { variableWidth: true },
      },
    ],
  };

  return (
    <div className="w-full flex flex-col gap-4 md:gap-12 my-4">
      <p className="text-center font-Gordita-Bold md:text-[28px] text-[20px] leading-[32px] text-[#081221]">
        Our <span className="text-[#5297FF]">Projects</span>
      </p>

      <div className="relative">
        <div className={styles.sliderClassName}>
          <Slider ref={sliderRef} {...sliderSettings}>
            {data?.map((item, index: number) => (
              <div key={`project-${index}`} className="px-2 md:px-3">
                <div
                  className="
                    group relative overflow-hidden
                    border border-[#E6EEFF] bg-white
                    rounded-[14px] md:rounded-[20px]
                    shadow-sm hover:shadow-xl
                    transition-all duration-300
                    w-[220px] md:w-[320px]
                  "
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-[14px] md:rounded-t-[20px]">
                    <Image
                      src={item.imageLink}
                      alt={`${item.projectName} - ${item.location}`}
                      fill
                      sizes="(max-width: 768px) 320px, (min-width: 768px) 440px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority={index < 2}
                    />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/30 to-transparent" />
                    <div className="absolute left-3 top-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] md:text-[12px] font-Gordita-Medium bg-white/90 text-gray-800 shadow-sm">
                        📍 {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="p-2 md:p-5 flex items-center justify-between md:gap-3 gap-1">
                    <div className="text-[#081221]">
                      <p className="font-Gordita-Bold text-[14px] md:text-[18px] leading-tight mb-1">
                        {item.projectName}
                      </p>
                      <p className="text-[12px] md:text-[13px] text-gray-600 leading-snug line-clamp-1 md:hidden">
                        {item.location}
                      </p>
                    </div>
                    <Link
                      href={item.link}
                      className="
                        px-3 md:px-4 py-1.5
                        text-[12px] md:text-[13px]
                        rounded-md text-white
                        bg-gradient-to-r from-[#5297FF] to-[#5B8BFF]
                        shadow-sm hover:shadow-md
                        transition-all duration-300
                        hover:scale-[1.03] active:scale-[0.98]
                        whitespace-nowrap
                      "
                      aria-label={`See more details about ${item.projectName}`}
                    >
                      See more
                      <span className="sr-only"> about {item.projectName}</span>
                    </Link>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#D1E3FF] via-[#A9C9FF] to-transparent" />
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <Button
          aria-label="Previous projects"
          onClick={gotoPrev}
          className="
            hidden md:flex items-center justify-center
            w-10 h-10 rounded-full
            bg-white shadow-md border border-[#E6EEFF]
            absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2
            hover:scale-110 transition-transform
          "
        >
          ‹
        </Button>
        <Button
          aria-label="Next projects"
          onClick={gotoNext}
          className="
            hidden md:flex items-center justify-center
            w-10 h-10 rounded-full
            bg-white shadow-md border border-[#E6EEFF]
            absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2
            hover:scale-110 transition-transform
          "
        >
          ›
        </Button>
      </div>
    </div>
  );
};

export default OurProjects;
