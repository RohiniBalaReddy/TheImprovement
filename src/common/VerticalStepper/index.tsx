import React from 'react';

const VerticalStepper = ({ steps, currentStep, scorePercentage, handleEdit }: any) => {
    return (
        <div className="flex flex-col  bg-white  shadow-lg ">
            <div className=' bg-blue-100  rounded-[6px] '>
                <ul className="p-6 min-h-[450px] mt-16">
                    {steps.map((step: any, index: number) => (
                        <li key={index} className="flex items-start ">
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${currentStep > index
                                        ? 'border-[#2872a1] bg-[#2872a1] text-white'
                                        : currentStep === index
                                            ? 'border-[#2872a1] bg-white text-[#2872a1]'
                                            : 'border-gray-300 bg-white text-gray-400'
                                        }`}
                                >
                                    {currentStep > index ? (
                                        <span>&#10003;</span>
                                    ) : (
                                        index + 1
                                    )}
                                </div>

                                {index !== steps.length - 1 && (
                                    <div
                                        className={`xl:h-[68px] md:h-10 border-l-2 ${currentStep > index ? 'border-[#2872a1]' : 'border-gray-300'
                                            }`}
                                    ></div>
                                )}
                            </div>
                            <div className="ml-4 flex flex-row justify-center gap-2 items-center ">
                                <div>
                                    <h4
                                        className={`font-Gordita-Medium text-[16px] ${currentStep >= index ? 'text-[#2872a1]' : 'text-gray-600'
                                            }`}
                                    >
                                        {step.label}
                                    </h4>
                                    {step.subtitle && (
                                        <p className="text-[12px] text-gray-500">{step.subtitle}</p>
                                    )}
                                </div>
                                <div className="cursor-pointer" onClick={() => handleEdit(index)}>
                                    {currentStep > index && (
                                        <p className="text-[#2872a1] text-sm">
                                            Edit
                                        </p>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-gray-100 rounded-md px-4 md:py-6  flex gap-4 items-center justify-between">
                <div className="relative">
                    <svg className="w-16 h-16 transform -rotate-90">
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="lightgray"
                            strokeWidth="4"
                            fill="none"
                        />
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="green"
                            strokeWidth="4"
                            strokeDasharray="176"
                            strokeDashoffset={`${176 - (scorePercentage / 100) * 176}`}
                            strokeLinecap="round"
                            fill="none"
                        />
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold">{currentStep / steps.length * 100}%</span>
                    </div>
                </div>

                <div>
                    <p className="text-[16px] text-nowrap font-Gordita-Medium">Property Score</p>
                    <p className="text-[12px] text-gray-500 ">
                        Better your property score, greater your visibility
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerticalStepper;
