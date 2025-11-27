import React, { useState, useRef } from "react";
import Image from "next/image";
import Button from "@/common/Button";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Modal from "@/common/Modal";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import CustomInput from "@/common/FormElements/CustomInput";
import { useStrapiInteriorStore } from "@/store/strapiInteriorsData";
import SectionSkeleton from "@/common/Skeleton";
import { packages, budgetDetails } from "@/utils/interiorshelper";

interface Package {
  image: string;
  title: string;
  description: string;
  price: string;
  buttonText: string;
  buttonLink: string;
}

const PackageCard: React.FC<Package> = ({
  image,
  title,
  description,
  price,
  buttonText,
  buttonLink,
}) => {
  const [OpenModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Package | undefined>(
    undefined
  );
  const [OpenQuoteModal, setQuoteModal] = useState(false);
  const handleModal = (item: Package) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const { interiorsStrapiData } = useStrapiInteriorStore();

  return (
    <>
      <div className="relative xl:max-w-[451px] lg:max-w-[450px] md:max-w-[380px]   md:h-[240px]   xl:ml-0 lg:ml-[19px] md:ml-[17px] ml-0 mx-auto md:m-0 m-1">
        <Image
          src={image}
          alt="package_bg"
          fill
          className="-z-10 md:rounded-[16px] rounded-[6px] object-cover"
        />
        <div className="flex flex-col  md:gap-y-[70px] gap-y-[60px]">
          <div className="flex items-center justify-between">
            <div className="md:w-[255px] w-[190px] md:min-h-[84px] min-h-[70px]  bg-[#2A2C2780] rounded-tl-[16px] rounded-tr-[4px] rounded-bl-[4px] rounded-br-[4px] flex flex-col items-center justify-center md:mb-0 mb-4 ">
              <p className="md:text-[24px] text-[18px] text-[#B9D5FF]  font-Gordita-Bold md:leading-11 leading-8 ">
                {title}
              </p>
              <p className="md:text-[13px] text-[10px] text-[#FFFFFF] md:leading-[28.5px] leading-[22.5px] md:font-Gordita-Medium font-Gordita-Regular  ">
                {description}
              </p>
            </div>
            <div className="md:w-[90px]  min-h-[78px] bg-blue-500 md:rounded-tr-[16px] rounded-tr-[6px] mb-2 md:py-2  py-1 px-1 flex flex-col items-center ">
              <p className="text-white font-Gordita-Medium md:text-[13px] text-[10px] leading-[18.52px] tracking-6percent">
                Price
              </p>
              <p className="md:text-[16px] text-white font-Gordita-Medium text-[12px] md:leading-7 leading-5 md:mb-0 mb-1">
                {price}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start  max-w-[116px] h-[39px] mt-[5%] relative cursor-pointer ml-4 mb-4 ">
            <Button
              className="w-[112px] min-h-[35px] px-[24px] py-[12px] bg-[#FFFFFF] text-[#3687FF] font-Gordita-Medium text-[13px]  leading-[18.52px]  z-10 relative"
              aria-hidden="true"
              onClick={() => {
                const matchedBhk = budgetDetails.find(
                  (detail) => detail.bhk === description.split(" ").pop()
                );

                if (matchedBhk) {
                  handleModal({
                    title,
                    description,
                    price,
                    image,
                    buttonText,
                    buttonLink: "#",
                  });
                }
              }}
            >
              {buttonText}
            </Button>
            <div className="w-[116px] h-[35px] border border-solid border-[#FFFFFF]  absolute top-2 left-0  "></div>
          </div>
        </div>

        {OpenModal && selectedItem && (
          <Modal
            isOpen={OpenModal}
            closeModal={() => setOpenModal(false)}
            className="max-w-[780px] md:min-h-[660px] min-h-[600px]"
            rootCls="z-[9999]"
          >
            <div className="flex flex-col gap-4 py-4">
              <div className="flex items-center justify-center mx-auto md:font-Gordita-Bold leading-[18.52px] md:text-[25px] text-[20px] font-Gordita-Medium ">
                Select Package For{" "}
                <span className="text-yellow-300 ml-2">
                  {selectedItem.description.split(" ").pop()}
                </span>
              </div>

              <Tab.Group>
                <Tab.List className="flex  space-x-4 md:mb-4 mb-2 mt-[10px]">
                  {budgetDetails
                    .find(
                      (item) =>
                        item.bhk === selectedItem.description.split(" ").pop()
                    )
                    ?.packages.map((budget, index) => (
                      <Tab
                        key={index}
                        className={({ selected }) =>
                          clsx({
                            "md:text-base text-sm rounded-lg text-nowrap md:px-[20px] md:mb-1  px-[12px] py-[6px]":
                              true,
                            "font-Gordita-Medium bg-[#F4F4F4] text-[#212227] md:mb-1":
                              !selected,
                            "font-Gordita-Medium bg-[#5297FF] text-[#FDFDFD] focus:outline-none md:mb-1":
                              selected,
                          })
                        }
                      >
                        {budget.type}
                      </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="md:mt-2 mt-1">
                  {budgetDetails
                    .find(
                      (item) =>
                        item.bhk === selectedItem?.description.split(" ").pop()
                    )
                    ?.packages.map((budget, index) => (
                      <Tab.Panel
                        key={index}
                        className="md:p-6 p-3 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
                      >
                        <div className="relative md:h-64 h-48 md:rounded-[10px] rounded-[4px] md:mb-6 mb-3 group">
                          <Image
                            src={budget.image.url}
                            alt={budget.type}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4">
                            <span className="inline-block bg-white text-gray-900 md:px-4 px-2 py-1 md:py-2 md:rounded-[10px] rounded-[4px] md:text-lg text-[12px] font-Gordita-Bold">
                              {budget.type} Package
                            </span>
                            <p className="mt-2 text-white font-Gordita-Medium md:text-[16px] text-[12px]">
                              Starting at{" "}
                              <span className="text-yellow-300">
                                {budget.startingPrice}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className=" grid grid-cols-2 md:grid-cols-2 md:gap-4 gap-2">
                          {budget.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className=" md:p-4 p-1 bg-gray-50 md:rounded-[10px] rounded-[4px] border border-gray-200 hover:border-blue-300 transition-all"
                            >
                              <div className="flex flex-col md:flex-row items-start gap-2 md:gap-3">
                                <div className="flex-1">
                                  <h4 className="text-[14px] md:text-[18px] font-Gordita-Bold text-gray-900 mb-1 flex flex-wrap items-center gap-2">
                                    {feature.title}
                                    <span className="text-[10px] md:text-[12px] font-Gordita-Medium bg-blue-100 text-[#5297FF] px-2 py-0.5 rounded-[4px] md:rounded-[8px]">
                                      INCLUDED
                                    </span>
                                  </h4>
                                  <p className="text-gray-600 text-[12px] md:text-sm font-Gordita-Regular leading-relaxed">
                                    {feature.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Tab.Panel>
                    ))}
                </Tab.Panels>
              </Tab.Group>
              <div className="flex flex-col md:gap-4 gap-2 md:mt-[20px] mt-[10px]">
                <div>
                  <h1 className="md:text-[20px] text-[12px] font-Gordita-Bold">
                    Terms & Conditions Apply
                  </h1>
                  <p className="md:text-sm text-[10px] text-gray-600">
                    * Prices are indicative and may vary based on material
                    selection and customization.
                  </p>
                </div>

                <div className="flex justify-center w-full">
                  <Button
                    className=" bg-[#3586FF] md:px-10 px-3 md:py-3 font-Gordita-Medium py-2 md:text-[16px] text-[12px] rounded-[6px] text-white"
                    onClick={() => setQuoteModal(true)}
                  >
                    Get A Qoute
                  </Button>
                </div>
              </div>
            </div>
            {OpenQuoteModal && (
              <Modal
                isOpen={OpenQuoteModal}
                closeModal={() => setQuoteModal(false)}
                className="max-w-[400px] md:min-h-[630px] min-h-[500px] "
                rootCls="z-[99999]"
              >
                <div className="flex flex-col items-center md:gap-4 gap-2 py-4">
                  <h1 className="font-Gordita-Medium md:text-[20px] text-[16px] leading-[18.52px]">
                    Design for Every Budget
                  </h1>
                  <form action="">
                    <div className="flex flex-col md:gap-y-[20px] gap-y-[12px] p-5">
                      <div className="grid grid-cols-1 md:gap-2 gap-2 ">
                        <div className="w-full max-w-[368px]">
                          <CustomInput
                            type="text"
                            name=""
                            label="Name"
                            placeholder="enter your Name"
                            labelCls=" font-Gordita-Medium md:text-[14px] text-[12px] leading-[22.8px] text-[#000000]"
                            className="md:h-[25px] h-[20px] px-2 py-1 border w-[368px]  border-[#A1A0A0] rounded-[4px] "
                            rootCls="px-2 py-1"
                          />
                        </div>
                        <div className="w-full max-w-[368px]">
                          <CustomInput
                            type="email"
                            name=""
                            label="Email"
                            placeholder="Enter your Email"
                            labelCls=" font-Gordita-Medium md:text-[14px] text-[12px] leading-[22.8px] text-[#000000]"
                            className="md:h-[25px] h-[20px] px-2 py-1 border w-[368px]  border-[#A1A0A0] rounded-[4px] "
                            rootCls="px-2 py-1"
                          />
                        </div>
                        <div className="w-full max-w-[368px]">
                          <CustomInput
                            type="number"
                            name=""
                            label="Phone Number"
                            placeholder="enter your Phone Number"
                            labelCls=" font-Gordita-Medium md:text-[14px] text-[12px] leading-[22.8px] text-[#000000]"
                            className="md:h-[25px] h-[20px] px-2 py-1 border w-[368px]  border-[#A1A0A0] rounded-[4px] "
                            rootCls="px-2 py-1"
                          />
                        </div>
                        <div className="flex items-center gap-2 md:pl-[15px] pl-[10px]">
                          <input type="checkbox" className="w-4 h-4" />
                          <label
                            htmlFor="whatsappUpdates"
                            className="text-gray-800 md:text-[16px] text-[12px]"
                          >
                            Send me updates on WhatsApp
                          </label>
                        </div>
                        <div className="w-full max-w-[368px]">
                          <CustomInput
                            type="text"
                            name=""
                            label="Property Name"
                            placeholder="enter your Property Name"
                            labelCls=" font-Gordita-Medium md:text-[14px] text-[12px] leading-[22.8px] text-[#000000]"
                            className="md:h-[25px] h-[20px] px-2 py-1 border w-[368px]  border-[#A1A0A0] rounded-[4px] "
                            rootCls="px-2 py-1"
                          />
                        </div>
                      </div>

                      <Button className=" bg-[#3586FF] md:px-5 px-3 md:py-4 py-3 md:text-[16px] text-[12px] rounded-md text-white">
                        Get A Qoute
                      </Button>
                    </div>
                  </form>
                  <h1 className="text-center font-Gordita-Regular md:text-[16px] text-[10px] ">
                    By submitting this form, you agree to the{" "}
                    <span className="text-red-500">privacy policy</span> &{" "}
                    <span className="text-red-500">terms and conditions</span>
                  </h1>
                </div>
              </Modal>
            )}
          </Modal>
        )}
      </div>
    </>
  );
};
type PackagesProps = {
  heading: string;
  subHeading?: string;
  headingStyle?: React.CSSProperties;
};

const Packages: React.FC<PackagesProps> = ({
  heading,
  subHeading,
  headingStyle,
}) => {
  const sliderRef = useRef<any>(null);
  const gotoNext = () => {
    sliderRef.current?.slickNext();
  };
  const gotoPrev = () => {
    sliderRef.current?.slickPrev();
  };
  const [currentSlide, setCurrentSlide] = useState(0);

  const packagesData: Package[] = packages.map((item) => ({
    image: item.imageUrl?.url || "",
    title: item.offerTitle || "",
    description: item.highlightOfProperty || "",
    price: item.price || "*",
    buttonText: "Visit Now",
    buttonLink: "#",
  }));

  const sliderSettings = {
    dots: true,
    appendDots: (dots: any) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "60px",
        }}
      >
        {dots}
      </div>
    ),
    beforeChange: (current: number, next: number) => {
      setCurrentSlide(next);
    },
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    customPaging: (i: number) => (
      <div
        style={{
          width: i === currentSlide ? "39px" : "12px",
          height: "12px",
          borderRadius: i === currentSlide ? "20px" : "50%",
          backgroundColor: i === currentSlide ? "#3586FF" : "#ccc",
          transition: "all 0.3s ease-in-out",
          margin: "-10px 14px",
          display: "inline-block",
        }}
      />
    ),

    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="px-6  mb-20">
      <h1
        className="heading-text leading-9 md:mb-8 text-center  mb-1"
        style={headingStyle}
      >
        {heading}
      </h1>

      {
        packagesData.length === 0 ? (
          <SectionSkeleton type={"specialOffers"} />
        ) : (
          <div className="md:max-w-[1392px] w-full relative   max-w-[410px] mx-auto  ">
            <Slider ref={sliderRef} {...sliderSettings}>
              {packagesData.map((pkg, index) => (
                <div key={index} className="md:px-0 px-1">
                  <PackageCard key={index} {...pkg} />
                </div>
              ))}
            </Slider>
            <Image
              src="/testimonials/icons/left-slide.svg"
              alt="Previous"
              width={42}
              height={42}
              onClick={gotoPrev}
              className="absolute md:left-0  -left-7 top-1/2 transform -translate-y-1/2 md:-translate-x-1/2 translate-x-1/1 cursor-pointer"
            />
            <Image
              src="/testimonials/icons/right-slide.svg"
              alt="Next"
              width={42}
              height={42}
              onClick={gotoNext}
              className="absolute md:-right-1 -right-5  top-1/2 transform -translate-y-1/2 cursor-pointer"
            />
          </div>
        )
      }
    </div>
  );
};

export default Packages;
