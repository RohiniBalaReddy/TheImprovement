import React from "react";
import BreadCrumb from "../../BreadCrumb";
import ServiceHeroSection, {
  IServiceHeroSectionInterfaceProps,
} from "../Components/ServiceHeroSection";

import FAQSComp from "../Components/FAQSComp";
import { Hammer, Wrench, Layers, Droplet, Search, Waves } from "lucide-react";
import PaintServices from "../PaintingComponent/OurServices";
import ServiceProcess from "../Components/ServiceProcess";
import TestimonialsSection, { ITestimonialsSectionProps } from "../Components/TestimonialsSection";

export default function RoofingComponent() {
  const roofingHeroData = {
    heading: "Premium Roofing Services",
    subHeading:
      "Delivering dependable roofing solutions built for long-term protection, maximum durability, and enhanced safety for your home.",

    bgImageUrl:
      "/images/custombuilder/subservices/civilengineering/herosection.png",

    bookingCtaUrl: { label: "Book Roofing Service", url: "" },

    locationcta: [
      { label: "New York", url: "" },
      { label: "California", url: "" },
      { label: "Texas", url: "" },
    ],

    selectedId: { id: 6, service: "Roofing" },

    description:
      "Reliable and long-lasting roofing services including installation, repairs, replacements, and waterproofing for residential and commercial buildings.",
  };
  const roofingServices = [
    {
      title: "Roof Installation",
      description:
        "Professional roof installation using high-quality, durable materials built to last and withstand all weather conditions.",
      icon: Hammer,
      imageUrl:
        "/images/custombuilder/subservices/painting/services/commercial.png",
    },
    {
      title: "Roof Repairs",
      description:
        "Quick and reliable repair services for leaks, cracks, broken shingles, and other roofing damages to restore protection.",
      icon: Wrench,
      imageUrl:
        "/images/custombuilder/subservices/painting/services/residential.png",
    },
    {
      title: "Roof Replacement",
      description:
        "Full roof replacement with modern, energy-efficient materials—ideal for old, damaged, or unsafe roofing structures.",
      icon: Layers,
      imageUrl:
        "/images/custombuilder/subservices/painting/services/drywall.png",
    },
    {
      title: "Waterproofing",
      description:
        "Advanced waterproofing solutions that protect your roof from leaks, moisture, and long-term water damage.",
      icon: Droplet,
      imageUrl:
        "/images/custombuilder/subservices/painting/services/interior.png",
    },
    {
      title: "Roof Inspection",
      description:
        "Thorough inspection service to detect early signs of damage, leakage, or structural issues, ensuring long-term safety.",
      icon: Search,
      imageUrl:
        "/images/custombuilder/subservices/painting/services/industrial.png",
    },
    {
      title: "Gutter Cleaning & Maintenance",
      description:
        "Keep your roof safe with regular gutter cleaning to prevent clogging, water backup, and structural damage.",
      icon: Waves,
      imageUrl:
        "/images/custombuilder/subservices/painting/services/wallpaper.png",
    },
  ];
  const roofingProcessSteps = {
    heading: "Our Roofing Service Process",
    steps: [
      {
        id: 1,
        title: "Roof Inspection",
        description:
          "We conduct a thorough inspection of your roof to identify leaks, damages, and structural issues.",
        image:
          "/images/custombuilder/subservices/painting/howitworks/SiteInspectionQuotation.jpg",
      },
      {
        id: 2,
        title: "Material Selection",
        description:
          "We help you choose the best roofing materials suited for durability, aesthetics, and climate.",
        image: "/images/custombuilder/subservices/plumbing/solve-prob.png",
      },
      {
        id: 3,
        title: "Installation / Repair",
        description:
          "Our certified roofers perform installation, repairs, or replacements with precision and safety.",
        image:
          "/images/custombuilder/subservices/plumbing/chooseservices/fanacinstallation.png",
      },
      {
        id: 4,
        title: "Final Inspection & Handover",
        description:
          "We perform a final quality check, ensure waterproofing, and hand over your new or repaired roof.",
        image: "/images/custombuilder/subservices/vaastu/process/report.png",
      },
    ],
  };
  const roofingTestimonialsData: ITestimonialsSectionProps = {
    words: [
      {
        name: "James",
        desc: "The roof installation was flawless. The team was professional, and my house is now well-protected against all weather conditions.",
        rating: 5,
      },
      {
        name: "Emily",
        desc: "Quick and reliable roof repairs. The team fixed leaks and replaced damaged shingles efficiently. Highly satisfied with the service!",
        rating: 5,
      },
      {
        name: "Michael",
        desc: "Their roof inspection service caught issues I hadn’t noticed. The team explained everything clearly and recommended the best solution.",
        rating: 4,
      },
      {
        name: "Olivia",
        desc: "Excellent waterproofing and maintenance service. My roof has never looked better, and I feel safe during heavy rains.",
        rating: 5,
      },
    ],
  };

  return (
    <div className="w-full px-5 ">
      <BreadCrumb
        steps={[
          { label: "Our Services", link: "" },
          { label: "Roofing", link: "/services/roofing" },
        ]}
        currentStep="Roofing"
      />
      <div className=" mb-[45px] md:mb-[64px]">
        <ServiceHeroSection {...roofingHeroData} />
      </div>
      <div className=" mb-[45px] md:mb-[64px]">
        <PaintServices services={roofingServices} />
      </div>
      <div className=" mb-[45px] md:mb-[64px]">
        <ServiceProcess
          steps={roofingProcessSteps.steps.map((s, i) => ({
            step: `${i + 1}`,
            title: s.title,
            description: s.description,
            icon: s.image,
          }))}
          title={roofingProcessSteps.heading}
          subTitle="We follow a structured, safe, and efficient workflow"
        />
      </div>
      <div className=" mb-[45px] md:mb-[64px]">
        <TestimonialsSection {...roofingTestimonialsData} />
      </div>
    </div>
  );
}
