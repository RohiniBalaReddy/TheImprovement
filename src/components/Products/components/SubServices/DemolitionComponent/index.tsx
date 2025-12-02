import React from "react";
import Image from "next/image";
import ServiceProcess, {
  ServiceProcessProps,
} from "../Components/ServiceProcess";
import AboutUs from "./AboutUs";
import { MdConstruction, MdSecurity, MdElectricBolt } from "react-icons/md";
import WhyToChoose, { WhyToChooseDemolitionProps } from "./WhyToChoose";
import Button from "@/common/Button";
import { useRouter } from "next/router";
import FAQSComp from "../Components/FAQSComp";
import ServiceHeroSection, {
  IServiceHeroSectionInterfaceProps,
} from "../Components/ServiceHeroSection";
import BreadCrumb from "../../BreadCrumb";

const DemolitionComponent = () => {
  const router = useRouter();
  const serviceProcessData: ServiceProcessProps = {
    title: "Our Demolition Process",
    subTitle: "Safe, structured and efficient execution",
    steps: [
      {
        step: "01",
        title: "Inspection & Planning",
        description:
          "We inspect the site, identify risk areas, and create a safe demolition plan.",
        icon: "/icons/demolition/inspection.png",
      },
      {
        step: "02",
        title: "Safety Setup",
        description:
          "Barricading, equipment setup, and safety measures are deployed before demolition.",
        icon: "/icons/demolition/safety.png",
      },
      {
        step: "03",
        title: "Demolition Execution",
        description:
          "Using advanced tools and machinery, we demolish structures efficiently.",
        icon: "/icons/demolition/execution.png",
      },
      {
        step: "04",
        title: "Debris Removal",
        description:
          "All waste is removed and the site is cleaned for the next construction phase.",
        icon: "/icons/demolition/cleanup.png",
      },
    ],
  };
  const DemolitionHeroSectionData: IServiceHeroSectionInterfaceProps = {
    heading: "Professional Demolition Services",
    subHeading: "Safe • Efficient • Fully Managed Demolition",
    bgImageUrl: "/images/earthmoves/herosection/herosectionimage.png",
    bookingCtaUrl: { label: "Discover More", url: "" },
    locationcta: [
  { label: "New York", url: "" },
  { label: "Los Angeles", url: "" },
  { label: "Chicago", url: "" },
  { label: "Houston", url: "" },
],

    selectedId: { id: 2, service: "Demolition" },
  };

  const whyToChooseDemolitionData: WhyToChooseDemolitionProps = {
    mainTitle: "WHY CHOOSE OUR DEMOLITION SERVICES?",
    subTitle: "Safe. Fast. Professional Demolition Experts.",
    highlightColor: "#0047AB",

    experience: {
      years: "10+",
      label: "DEMOLITION EXPERIENCE",
    },

    images: {
      main: "/images/earthmoves/whychooseus/image2.png",
      side: "/images/earthmoves/whychooseus/image4.png",
    },

    features: [
      {
        id: 1,
        title: "Safety-Focused Demolition",
        description: "Strict safety compliance with trained professionals.",
        icon: "MdSecurity",
        gradient: "from-blue-600 to-blue-400",
      },
      {
        id: 2,
        title: "Modern Demolition Equipment",
        description: "Advanced machinery ensures clean & fast demolition.",
        icon: "MdConstruction",
        gradient: "from-yellow-500 to-amber-500",
      },
      {
        id: 3,
        title: "Eco-Friendly Waste Handling",
        description: "We recycle debris & follow green disposal standards.",
        icon: "MdElectricBolt",
        gradient: "from-black to-gray-700",
      },
    ],
  };
  const iconsMap = {
    MdConstruction,
    MdSecurity,
    MdElectricBolt,
  } as const;
  const faqs = [
    {
      question: "What types of demolition services do you provide?",
      answer:
        "We offer complete and partial demolition services for residential, commercial, and industrial properties, including interior strip-outs, wall removal, and structural demolition.",
    },
    {
      question: "Is demolition safe and how do you ensure it?",
      answer:
        "Our demolition projects follow strict safety protocols with trained professionals, protective equipment, and risk assessments to ensure a completely safe process.",
    },
    {
      question: "Do you handle debris removal after demolition?",
      answer:
        "Yes, we manage debris removal and disposal responsibly, including recycling reusable materials to minimize environmental impact.",
    },

    {
      question: "Do I need permits for demolition?",
      answer:
        "Certain demolition projects require local permits. Our team assists you in obtaining approvals and ensures your project meets all legal requirements.",
    },
    {
      question: "What equipment do you use for demolition?",
      answer:
        "We use modern machinery such as hydraulic breakers, excavators, concrete cutters, and dust-control systems for safe, efficient, and precise demolition.",
    },
  ];

  return (
    <section className="w-full px-5">
      <BreadCrumb
        steps={[
          { label: "Our Services", link: "" },
          { label: "Demolition", link: "/services/demolition" },
        ]}
        currentStep="Demolition"
      />
      <ServiceHeroSection {...DemolitionHeroSectionData} />

      <AboutUs />

      <ServiceProcess
        title="Our Demolition Process"
        subTitle="We follow a structured, safe and efficient workflow"
        steps={serviceProcessData.steps}
      />

      <WhyToChoose
        {...whyToChooseDemolitionData}
        features={whyToChooseDemolitionData.features.map((f) => ({
          ...f,
          Icon: iconsMap[f.icon],
        }))}
      />
      <FAQSComp
        image="/images/earthmoves/herosection/herosectionimage.png"
        faqs={faqs}
      />

      <div className="md:py-16 py-8 bg-[#0052CC] text-white text-center">
        <h2 className="text-[16px] md:text-[20px] font-Gordita-Bold">
          Ready to Start Your Demolition Project?
        </h2>
        <p className="md:mt-3 mt-1 md:mb-6 mb-3 font-Gordita-Regular">
          Contact us today for a free site inspection and quotation.
        </p>
        <Button
          onClick={() => router.push("/contact-us")}
          className="bg-white text-[#0052CC] md:text-[16px] py-2 text-[12px] btn-text md:px-6 px-3 md:py-3 rounded-xl font-Gordita-Medium shadow-md"
        >
          Get a Free Estimate
        </Button>
      </div>
    </section>
  );
};

export default DemolitionComponent;
