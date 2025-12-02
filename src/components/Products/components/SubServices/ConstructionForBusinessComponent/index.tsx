import React, { useEffect, useState, useRef } from "react";
import CommonTheWayWeWork, {
  ICommonTheWayWeWorkProps,
} from "../Components/CommonTheWayWeWork";
import { IOurProjectsProps, OurProjects } from "../Components/OurProjects";
import { ITagsProps, Tags } from "../Components/Tags";
import TestimonialsSection, {
  ITestimonialsSectionProps,
} from "../Components/TestimonialsSection";
import ServiceProcess, {
  ServiceProcessProps,
} from "../Components/ServiceProcess";
import { RoutebreadCrumbs } from "@/components/RouteBreadCrumbs";
import BlogCard from "@/components/BlogCard";
import apiClient from "@/utils/apiClient";
import BreadCrumb from "../../BreadCrumb";
import Button from "@/common/Button";
import MobileBlogCard from "@/components/MobileBlogCard";
import HeroSection, { IHerosectionprops } from "./Herosection";

const testimonialsData: ITestimonialsSectionProps = {
  words: [
    {
      name: "Emily",
      desc: "Amazing service! The team was professional, responsive, and made the entire process smooth and stress-free.",
      rating: 5,
    },
    {
      name: "Michael",
      desc: "Great experience overall. They understood my requirements perfectly and delivered exactly what I needed.",
      rating: 4,
    },
    {
      name: "Sophia",
      desc: "Highly recommended! The staff was friendly, knowledgeable, and easy to work with from start to finish.",
      rating: 5,
    },
    {
      name: "Daniel",
      desc: "Wonderful support and excellent attention to detail. I would definitely work with them again.",
      rating: 4,
    },
  ],
};


export const serviceProcessData: ServiceProcessProps = {
  title: "The Way We Work",
  subTitle:
    "We guide you through every step of your house construction journey, ensuring quality, transparency, and timely delivery.",
  steps: [
    {
      step: "01",
      title: "Explain Your Need",
      description:
        "Share your vision and requirements with our experts so we can understand your dream home in detail.",
      icon: "/icons/custom-builder/subservices/expand.svg",
    },
    {
      step: "02",
      title: "Cost & Planning",
      description:
        "We provide a detailed plan and transparent cost estimate, helping you make informed decisions with no hidden charges.",
      icon: "/icons/custom-builder/subservices/house-cost.svg",
    },
    {
      step: "03",
      title: "Work Execution",
      description:
        "Our skilled team brings your project to life with precise execution, regular updates, and strict quality control.",
      icon: "/icons/custom-builder/subservices/execution.svg",
    },
    {
      step: "04",
      title: "Delivery",
      description:
        "We hand over your completed home on time, ensuring everything matches your expectations and standards.",
      icon: "/icons/custom-builder/subservices/delivery-service.svg",
    },
  ],
};

const ourProjects: IOurProjectsProps = {
  heading: "Featured Projects",
  subheading:
    "Explore our portfolio of exceptional construction projects that showcase our commitment to quality, innovation, and client satisfaction",
  projects: [
    {
      imageUrl: "/images/newlylaunched/apartments3.png",
      title: "Luxury Residential Complex",
      descriptionPoints: [
        "A premium residential complex in CBD, Bengaluru with modern layouts and city views.",
      ],
      category: "Residential",
      area: "25,000 sq.ft",
    },
    {
      imageUrl: "/images/custombuilder/subservices/civilengineering/packages/modal.jpg",
      title: "Modern Corporate Office",
      descriptionPoints: [
        "State-of-the-art corporate office in Whitefield, Bengaluru designed for productivity and innovation.",
      ],
      category: "Commercial",
      area: "45,000 sq.ft",
    },
    {
      imageUrl: "/ourProjects/sample-image-3.jpg",
      title: "Boutique Hotel & Spa",
      descriptionPoints: [
        "Luxury boutique hotel in Electronic City, Bengaluru with spa and rooftop views.",
      ],
      category: "Hospitality",
      area: "35,000 sq.ft",
    },
  ],
};

const categoriesdata: ITagsProps = {
  heading: "Our Construction Expertise",
  subheading:
    "Specialized building solutions tailored to your unique needs. With over 15 years of experience, we deliver exceptional quality across all project types.",
  tags: [
    {
      imageUrl: "/images/custombuilder/subservices/category-image.png",
      name: "Retail & Commercial Building",
      description:
        "Modern commercial spaces designed for business growth, customer engagement, and long-term value with innovative architectural solutions.",
      projectCount: 45,
    },
    {
      imageUrl: "/images/services/business-residential.png",
      name: "Showroom/Retail Outlet",
      description:
        "Strategic retail environments that enhance brand presence, drive foot traffic, and create memorable shopping experiences for customers.",
      projectCount: 38,
    },
    {
      imageUrl: "/images/custombuilder/tried/sub-contract.png",
      name: "Corporate Office",
      description:
        "Productive workspace solutions that foster collaboration, innovation, and employee well-being with smart office design principles.",
      projectCount: 52,
    },
    {
      imageUrl: "/images/custombuilder/subservices/civilengineering/herosection.png",
      name: "Hotel/Resort",
      description:
        "Luxury hospitality spaces that combine comfort, functionality, and aesthetic appeal to create unforgettable guest experiences.",
      projectCount: 28,
    },
    {
      imageUrl: "/images/custombuilder/subservices/civilengineering/services/concrete.png",
      name: "Hospital Building",
      description:
        "Healthcare facilities built with precision, incorporating advanced medical technologies and patient-centered design principles.",
      projectCount: 15,
    },
    {
      imageUrl: "/images/custombuilder/subservices/civilengineering/services/analysis.png",
      name: "Farm/Guest House",
      description:
        "Serene retreats and functional farm structures that harmonize with natural surroundings while providing modern comfort and utility.",
      projectCount: 22,
    },
  ],
};

const ConstructionForBusinessComponent = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const fetchBlogs = async () => {
    try {
      const res = await apiClient.get(apiClient.URLS.blogs, {
        blogType: "Residential construction",
      });
      console.log("lohhh", res);
      setBlogs(res?.body);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };
  const blogsToShow = showMore ? blogs : blogs.slice(0, 4);

  useEffect(() => {
    fetchBlogs();
  }, []);
  const [showAll, setShowAll] = useState(false);
  const blogsToShowall = showAll ? blogs : blogs.slice(0, 3);

  const handleshowall = () => {
    setShowAll(!showAll);
  };
  const Ref = useRef<HTMLDivElement>(null);

  const handleScrollToDown = () => {
    if (Ref.current) {
      Ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const HeroSectionData: IHerosectionprops = {
    bgimage:
      "https://cdn.pixabay.com/photo/2016/11/29/03/53/building-1867187_1280.jpg",
    heading: "Construction",
    heading2: "Services",
    subheading: "Building Strong Foundations for Your Future",

    descriptions:
      "From residential projects to large-scale commercial developments, we deliver high-quality construction solutions with precision, safety, and reliability.",

    btntext: "Explore Services",
    overlaystyle: "bg-yellow-800/40",
    overlaycolor: {},
  };

  return (
    <div>
      <HeroSection
        {...HeroSectionData}
        onScrollToPackages={handleScrollToDown}
      />
      <div className="mb-[35px] md:mb-[64px]">
        <Tags {...categoriesdata} />
      </div>
      <div className="mb-[35px] md:mb-[64px]">
        <OurProjects {...ourProjects} />
      </div>

      <div className="mb-[35px] md:mb-[64px]">
        <ServiceProcess {...serviceProcessData} />{" "}
      </div>
      <div className="mb-[35px] md:mb-[64px]">
        <TestimonialsSection {...testimonialsData} />
      </div>
      <div className="flex flex-col items-center gap-y-[20px] mb-[45px] md:mb-[64px]">
        <div className="md:flex flex-col justify-center items-center gap-4  hidden">
          <h1 className="text-black font-Gordita-Medium md:font-Gordita-Bold text-[24px] md:text-[25px]  text-start">
            Our Blog
          </h1>
          <h2 className="text-[#7B7C83] leading-[28.5px] text-[20px]">
            Latest Blog & Articles
          </h2>
        </div>
        <div className="max-w-[398px] min-h-[29px] flex items-center gap-x-[231px] md:hidden">
          <div className="max-w-[109px] min-h-[29px] ">
            <h1 className="text-[#000000] font-Gordita-Medium text-[20px] leading-[28.5px]">
              Our Blogs
            </h1>
          </div>
          {blogs.length > 3 && (
            <div className="max-w-[69px] min-h-[23px] ">
              <Button
                className="text-[#3586FF] text-[16px] leading-[22.8px] text-nowrap font-Gordita-Medium"
                onClick={() => handleshowall()}
              >
                {showAll ? "View Less" : "View All"}
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-wrap md:flex-row flex-col justify-center items-center gap-5 ">
          {blogs.length > 0 ? (
            blogsToShow.map((blog, index) => (
              <>
                <div
                  key={index}
                  className={`rounded-[12px] shadow-md md:max-w-[332px] hidden md:block`}
                >
                  <BlogCard data={blog} />
                </div>
              </>
            ))
          ) : loading ? (
            <p>Loading blogs...</p>
          ) : (
            <p>No blogs found.</p>
          )}
          {blogsToShowall.map((blog, index) => (
            <div
              key={index}
              className="rounded-[12px] shadow-md flex flex-col gap-y-[8px] items-center md:hidden"
            >
              <MobileBlogCard data={blog} />
            </div>
          ))}
        </div>

        {blogs.length > 4 && (
          <div className="md:flex justify-center mt-5 hidden">
            <button
              className="bg-[#5297ff] text-white px-4 py-2 rounded-lg"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "See Less" : "See More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConstructionForBusinessComponent;
