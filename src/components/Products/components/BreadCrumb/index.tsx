import { RightArrow, RightViewArrow } from "@/components/Icons";
import React from "react";

interface BreadCrumbStep {
  label: string | React.ReactNode;
  link?: string;
  onClick?: () => void;
}

interface BreadCrumbProps {
  steps: BreadCrumbStep[];
  currentStep: string | React.ReactNode;
  className?: string;
}

const BreadCrumb = ({ steps, currentStep }: BreadCrumbProps) => {
  return (
    <div className="flex flex-row gap-2 justify-center items-center md:p-5 p-5 ">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-row items-center">
          <p
            className={`font-Gordita-Medium md:text-[20px] text-[12px] cursor-pointer hover:opacity-80 ${step.label === currentStep ? "text-[#2872a1]" : ""
              }`}
          >
            {step.onClick ? (
              <button
                type="button"
                onClick={step.onClick}
                className="text-left text-inherit bg-transparent border-none p-0 m-0"
              >
                {step.label}
              </button>
            ) : step.link ? (
              <a href={step.link}>{step.label}</a>
            ) : (
              step.label
            )}
          </p>
          {index < steps.length - 1 && <RightViewArrow />}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumb;
