import React, { useEffect } from "react";
import OneStopSol from "../onestepsol";
import BuilderProcess from "../BuilderProcess";
import TestimonalBuilder from "../TestimonalHouse";
import CostEstimator from "../CostEstimator";
import BuilderHeroSection from "../HeroSection";
import OurProjects from "../ourProjects";
import FAQSComp from "../SubServices/Components/FAQSComp";
import TriedOptions from "../TriedOptions";

import { useHomepageStore } from "@/store/useHomepageStore";
import BlogCard from "@/components/BlogCard";
import MobileBlogCard from "@/components/MobileBlogCard";
const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We provide a comprehensive range of construction and interior services, including Residential Construction, Construction for Business, Interior Design, Vastu Consultation, and Furniture Manufacturing. Our services are tailored to meet your specific needs and ensure a seamless experience from start to finish.",
  },
  {
    question: "How can I estimate the cost of my construction project?",
    answer:
      "You can use our Construction Cost Estimator tool available on our website. Simply enter your project details, such as the type of building, location, and area, and our estimator will provide you with an accurate cost estimate instantly.",
  },
  {
    question: "What makes your construction services different from others?",
    answer:
      "We stand out by offering on-time delivery, no-cost overruns, and hassle-free project management. With us, you’ll have transparency throughout the process, from budgeting to the final handover, ensuring that there are no hidden charges or unexpected delays.",
  },
  {
    question: "Can I customize my interior design project?",
    answer:
      "Absolutely! We offer fully customizable interior design services to match your personal style and preferences. Our team of experienced designers works closely with you to create spaces that reflect your vision while ensuring functionality and aesthetics.",
  },
  {
    question: "What is CustomBuilder in TheImprovement?",
    answer:
      "CustomBuilder is TheImprovement's specialized service that allows you to design and build your dream home exactly the way you envision it. From architectural design and layout to material choices and interior finishes, CustomBuilder offers the flexibility and expertise to create a space that is uniquely yours.",
  },
];
type HomepageProps = {
  initialBlogs: any[];
};
const BuildHome = ({ initialBlogs }: HomepageProps) => {
  const { allBlogs, setAllBlogs } = useHomepageStore();
  useEffect(() => {
    if (initialBlogs?.length && allBlogs?.length === 0) {
      setAllBlogs(initialBlogs);
    }
  }, [initialBlogs, allBlogs?.length]);

  return (
    <div className="p-5 md:p-[40px] md:max-w-[90%] mx-auto">
      <div className="md:mb-[0px] mb-[40px]">
        <BuilderHeroSection />
      </div>
      <div className="md:mt-[0px] mt-[500px] ">
        <OneStopSol />
      </div>
      <TriedOptions />
      <CostEstimator />

      <BuilderProcess />
      <div className=" mb-[45px] md:mb-[64px]">
        <OurProjects />
      </div>
      <div className=" mb-[45px] md:mb-[64px]">
        <TestimonalBuilder />
      </div>

      <FAQSComp
        image={"/images/custombuilder/subservices/homedecor/faqs/faqsimage.png"}
        faqs={faqs}
      />
      <div className="mt-[70px] md:mb-[60px] mb-5">
        <h2
          style={{
            backgroundImage:
              "linear-gradient(90deg, #3586FF 30.48%, #212227 100%)",
            color: "transparent",
            backgroundClip: "text",
          }}
          className="md:text-[24px] text-[18px] leading-[44.17px] font-Gordita-Medium text-center mb-[25px] md:mb-[30px]"
        >
          Latest New Blogs
        </h2>
        <div className="hidden md:flex flex-row gap-7 justify-center items-center">
          {allBlogs.length > 0 ? (
            allBlogs.slice(0, 5).map((blog: any, index: any) => (
              <div
                className={`rounded-[12px] shadow-md md:max-w-[332px]`}
                key={index}
              >
                <BlogCard data={blog} />
              </div>
            ))
          ) : (
            <div className="font-Gordita-Medium md:text-[20px] leading-7 ">
              No blog found
            </div>
          )}
        </div>
        <div className="rounded-[12px] shadow-md flex flex-col gap-y-[8px] items-center md:hidden">
          {allBlogs.length > 0
            ? allBlogs.slice(0, 4).map((blog: any, index: any) => (
                <div
                  className={`rounded-[12px] shadow-md md:max-w-[332px]`}
                  key={index}
                >
                  <MobileBlogCard data={blog} />
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};
export default BuildHome;
