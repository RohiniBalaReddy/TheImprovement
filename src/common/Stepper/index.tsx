import { ReactNode } from "react";

type StepperProps = {
  currentStep: number;
  steps: string[];
  handleClick: (index: number) => () => void;
  iconMap?: Record<string, ReactNode>;
};

const Stepper = ({ currentStep, steps, handleClick, iconMap }: StepperProps) => {
  return (
    <div className="flex justify-between items-center w-full relative max-w-[400px] mx-auto">
      {steps?.map((step, index) => {
        const isActive = currentStep === index;
        const isCompleted = currentStep > index;
        const icon = iconMap?.[step];

        return (
          <div
            key={index}
            className={`flex flex-col items-center  flex- cursor-pointer  z-10 ${isActive ? "text-[#5297FF]" : "text-gray-500"}`}
            onClick={handleClick(index)}
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 mb-2  
              ${isCompleted || isActive ? "border-[#5297ff] bg-blue-100 z-10  font-Gordita-Medium" : "border-gray-300"}`}
            >
              {icon ? icon : <span className="text-xs font-Gordita-Medium">{index + 1}</span>}
            </div>
            <span className="text-center text-sm  font-Gordita-Medium">{step}</span>
            {index !== steps.length - 1 && (
              <div
                className={`absolute top-5 w-full max-w-[180px] h-1 
                  ${isCompleted ? "bg-blue-600" : "bg-gray-300"}
                `}
                style={{
                  transform: "translateX(50%)",
                  zIndex: -1,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
