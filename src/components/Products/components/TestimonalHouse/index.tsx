import React, { useRef } from "react";
import styles from "./index.module.scss";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonalBuilder = () => {
  const sliderRef = useRef<any>(null);
  const gotoNext = () => sliderRef.current?.slickNext();
  const gotoPrev = () => sliderRef.current?.slickPrev();

  const data = [
    {
      desc: "TheImprovement Pvt Limited helped us find a home that truly feels like a dream. Their dedication, professionalism, and attention to detail made the entire experience easy and stress-free.",
      author: "Michael",
      location: "Manhattan, New York",
    },
    {
      author: "Jessica",
      desc: "Outstanding service! TheImprovement Pvt Limited understood exactly what we were looking for. Their expertise and commitment made our home-search journey smooth and enjoyable.",
      location: "Santa Monica, Los Angeles",
    },
    {
      author: "Robert",
      desc: "I’m extremely satisfied with the level of service provided. They guided me through every step and helped me secure a beautiful property in a great neighborhood.",
      location: "Downtown, Chicago",
    },
    {
      author: "Emily",
      desc: "Professional, friendly, and highly knowledgeable! TheImprovement Pvt Limited made the entire home-buying process effortless. I couldn't have asked for a better team.",
      location: "Brooklyn, New York",
    },
    {
      author: "Daniel",
      desc: "From start to finish, they delivered exceptional support. Their understanding of the market and quick response times really stood out.",
      location: "Austin, Texas",
    },
    {
      author: "Sophia",
      desc: "Amazing experience! They helped us find the perfect home near the waterfront. Highly recommend their services to anyone looking for a reliable real estate partner.",
      location: "Miami Beach, Florida",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-5 md:gap-y-10">
      <p className="text-center font-Gordita-Bold md:text-[24px] text-[18px] leading-[30px] text-[#081221]">
        Here’s what our customers say
      </p>

      <div className="bg-gradient-to-r py-4 md:py-8 relative rounded-[16px] from-[#CEE1FF4D] via-[#CCE0FF33] to-[#CEE1FF4D]">
        <div className={styles.sliderClassName}>
          <Slider
            ref={sliderRef}
            cssEase="linear"
            speed={300}
            touchThreshold={10000}
            arrows={false}
            swipeToSlide
            variableWidth
          >
            {data?.map((item, index: number) => (
              <div
                key={`testimonial-${index}`}
                className="
                  md:min-w-[340px] md:max-w-[340px] 
                  min-w-[280px] max-w-[280px] 
                  p-3 flex flex-col 
                  bg-white shadow rounded-[16px] 
                  text-[#081221] 
                  min-h-[200px] max-h-[240px]
                  transition-all duration-300
                "
              >
                <div className="bg-[#AFCEFF] flex gap-4 rounded-[32px] min-h-[56px] px-3 py-2">
                  <div className="h-[50px] w-[50px] relative rounded-full border-r-2 border-white overflow-hidden">
                    <Image
                      src={`/testimonials/sample-icon.svg`}
                      alt={`${item.author}`}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div className="flex flex-col justify-center text-[#081221]">
                    <p className="text-sm md:text-base font-Gordita-Bold">
                      {item.author}
                    </p>
                    <p className="text-xs text-gray-600">{item.location}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-3 px-1 text-[12px]  font-Gordita-Regular text-gray-700 leading-relaxed line-clamp-4 text-left">
                  {item.desc}
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Arrows */}
        <Image
          src={"/testimonials/icons/left-slide.svg"}
          alt="previous"
          onClick={gotoPrev}
          width={32}
          height={32}
          className="absolute left-0 top-[50%] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        />
        <Image
          src={"/testimonials/icons/right-slide.svg"}
          alt="next"
          onClick={gotoNext}
          width={32}
          height={32}
          className="absolute right-0 top-[50%] translate-x-1/2 -translate-y-1/2 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default TestimonalBuilder;
