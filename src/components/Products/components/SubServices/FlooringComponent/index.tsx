import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BreadCrumb from "../../BreadCrumb";
import ServiceHeroSection, {
  IServiceHeroSectionInterfaceProps,
} from "../Components/ServiceHeroSection";
import ServiceProcess, {
  ServiceProcessProps,
} from "../Components/ServiceProcess";
import { MdCheckCircle, MdStar } from "react-icons/md";
import apiClient from "@/utils/apiClient";
import WhyToChoose from "../DemolitionComponent/WhyToChoose";
import FAQSComp from "../Components/FAQSComp";
import Button from "@/common/Button";
import { MdConstruction, MdSecurity, MdElectricBolt } from "react-icons/md";
import TypesShowcase from "./TypesShowcase";
import Gallery from "./Gallery";
import BlogCard from "@/components/BlogCard";
import MobileBlogCard from "@/components/MobileBlogCard";

const FlooringComponent = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const fetchBlogs = async () => {
    try {
      const res = await apiClient.get(apiClient.URLS.blogs, {
        blogType: "Flooring",
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
  const router = useRouter();
  const flooringTypesData = [
    {
      name: "Hardwood Flooring",
      image: "/images/services/flooring/hardwood.png",
      description:
        "Elegant, durable, and timeless hardwood flooring for your home or office.",
      icon: <MdCheckCircle size={12} className="text-blue-600" />,
      badge: "Premium",
    },
    {
      name: "Laminate Flooring",
      image: "/images/services/flooring/laminate.jpg",
      description:
        "Cost-effective, stylish laminate flooring that mimics natural wood.",
      icon: <MdStar size={12} className="text-yellow-500" />,
      badge: "Popular",
    },
    {
      name: "Vinyl Flooring",
      image: "/images/services/flooring/vinyl.jpg",
      description:
        "Water-resistant and easy to maintain vinyl flooring options.",
      icon: <MdCheckCircle size={12} className="text-green-500" />,
      badge: "Eco-Friendly",
    },
    {
      name: "Tile Flooring",
      image: "/images/services/flooring/tile.jpg",
      description: "Modern and sleek tiles perfect for kitchens and bathrooms.",
      icon: <MdStar size={12} className="text-pink-500" />,
      badge: "Modern",
    },
    {
      name: "Bamboo Flooring",
      image: "/images/services/flooring/bamboo.jpg",
      description:
        "Eco-friendly and strong bamboo flooring for a natural look.",
      icon: <MdCheckCircle size={12} className="text-green-700" />,
      badge: "Sustainable",
    },
    {
      name: "Carpet Flooring",
      image: "/images/services/flooring/carpet.jpg",
      description:
        "Soft, cozy, and stylish carpets that add comfort to any room.",
      icon: <MdStar size={12} className="text-purple-500" />,
      badge: "Comfort",
    },
  ];

  const serviceProcessData = {
    title: "Our Flooring Process",
    subTitle: "Expert installation with precision and care",
    steps: [
      {
        step: "01",
        title: "Consultation & Selection",
        description:
          "Choose the best flooring material for your home or office with our expert guidance.",
        icon: "/images/custombuilder/subservices/plumbing/appointment.png",
      },
      {
        step: "02",
        title: "Site Preparation",
        description:
          "We prepare the floor surface to ensure a smooth and durable installation.",
        icon: "/icons/flooring/preparation.png",
      },
      {
        step: "03",
        title: "Installation",

        description:
          "Professional installation of selected flooring type with high-quality tools and techniques.",
        icon: "/icons/flooring/installation.png",
      },
      {
        step: "04",
        title: "Finishing & Cleaning",
        description:
          "Final finishing touches, polishing, and cleaning to deliver a ready-to-use floor.",
        icon: "/icons/flooring/finishing.png",
      },
    ],
  };

  const FlooringHeroSectionData = {
    heading: "Professional Flooring Services",
    subHeading: "Durable • Stylish • Expertly Installed",
    bgImageUrl: "/images/services/flooring.jpg",
    bookingCtaUrl: { label: "Discover More", url: "" },
   locationcta: [
  { label: "New York", url: "" },
  { label: "Los Angeles", url: "" },
  { label: "Chicago", url: "" },
  { label: "Houston", url: "" },
],

    selectedId: { id: 3, service: "Flooring" },
  };

  const completedProjectsData = [
    {
      image: "/images/services/flooring/modenlivingroom.jpg",
      title: "Modern Living Room Hardwood",
      category: "Hardwood",
      location: "New York",
      duration: "2 Weeks",
    },
    {
      image: "/images/services/flooring/luxurykitchen.jpg",
      title: "Luxury Kitchen Tiles",
      category: "Tiles",
      location: "Los Angeles",
      duration: "3 Weeks",
    },
    {
      image: "/images/services/flooring/CorporateOffice.jpg",
      title: "Corporate Office Laminate",
      category: "Laminate",
      location: "Chicago",
      duration: "4 Weeks",
    },
    {
      image: "/images/services/flooring/elegantbedroom.jpg",
      title: "Elegant Bedroom Vinyl",
      category: "Vinyl",
      location: "Houston",
      duration: "2 Weeks",
    },
    {
      image: "/images/services/flooring/CommercialSpace.jpg",
      title: "Commercial Space Hardwood",
      category: "Commercial",
      location: "San Francisco",
      duration: "6 Weeks",
    },
    {
      image: "/images/services/flooring/ApartmentComplex.jpg",
      title: "Apartment Complex Tiles",
      category: "Residential",
      location: "Seattle",
      duration: "8 Weeks",
    },
    {
      image: "/images/services/flooring/vinyl.jpg",
      title: "Showroom Luxury Vinyl",
      category: "Vinyl",
      location: "Miami",
      duration: "3 Weeks",
    },
    {
      image: "/images/newlylaunched/apartment6.png",
      title: "Villa Hardwood Flooring",
      category: "Hardwood",
      location: "Dallas",
      duration: "5 Weeks",
    },
  ];

  const faqs = [
    {
      question: "What types of flooring do you offer?",
      answer:
        "We provide wood, laminate, vinyl, tiles, and stone flooring options tailored to your space.",
    },
    {
      question: "Do you handle installation and finishing?",
      answer:
        "Yes, we manage the entire process from preparation to finishing and cleaning.",
    },
    {
      question: "How long does flooring installation take?",
      answer:
        "Installation depends on the area and flooring type but is completed efficiently by our experts.",
    },
    {
      question: "Can I customize flooring patterns?",
      answer:
        "Absolutely! We offer custom layouts, patterns, and finishes to match your design vision.",
    },
    {
      question: "Do you provide maintenance tips?",
      answer:
        "Yes, our team will guide you on care and maintenance to ensure long-lasting floors.",
    },
  ];

  return (
    <section className="w-full px-5">
      <BreadCrumb
        steps={[
          { label: "Our Services", link: "" },
          { label: "Flooring", link: "/services/flooring" },
        ]}
        currentStep="Flooring"
      />

      <ServiceHeroSection {...FlooringHeroSectionData} />

      <TypesShowcase types={flooringTypesData} />

      <ServiceProcess
        title={serviceProcessData.title}
        subTitle={serviceProcessData.subTitle}
        steps={serviceProcessData.steps}
      />

      <Gallery projects={completedProjectsData} />

      <FAQSComp image="/Interiors/InteriorsCalculatorBg.jpg" faqs={faqs} />
      <div className="flex flex-col items-center gap-y-[20px] mb-[45px] md:mb-[64px]">
        <div className="md:flex flex-col justify-center items-center gap-4  hidden">
          <h1 className="text-black font-Gordita-Medium md:font-Gordita-Bold text-[24px] md:text-[25px]  text-start">
            Our Blog
          </h1>
          <h2 className="text-[#7B7C83] leading-[28.5px] text-[20px]">
            Latest Blog & Articles
          </h2>
        </div>
        <div className="max-w-[368px] min-h-[29px] flex items-center gap-x-[195px] md:hidden px-5">
          <div className="max-w-[109px] min-h-[29px] ">
            <h1 className="text-[#000000] font-Gordita-Medium text-[20px] leading-[28.5px] text-nowrap">
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
          <div className="md:flex justify-center hidden mt-5">
            <button
              className="bg-[#5297ff] text-white px-4 py-2 rounded-lg"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "See Less" : "See More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FlooringComponent;
