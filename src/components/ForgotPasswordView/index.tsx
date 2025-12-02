import React from "react";
import Image from "next/image";
import CustomInput from "@/common/FormElements/CustomInput";
import Button from "@/common/Button";
import { EditIcon } from "../Icons";

const ForgotPasswordView = () => {
  return (
    <div className="w-full min-h-[inherit] flex md:flex-row flex-col border-yellow-300">
      <div className="relative md:w-[50%]  flex justify-center">
        <div className="absolute inset-0">
          <div className="relative w-full md:h-full md:min-h-screen h-[500px]">
            <Image
              src="/images/background/login.png"
              fill
              className="absolute opacity-[2.5] object-cover "
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center py-[80px]">
          <div className="relative w-full max-w-[330px] h-[100px] mb-[150px] items-center gap-2 justify-center rounded-[10px]  flex flex-row  z-20 bg-gradient-to-b from-black/40 to-black/60">
            <div className="relative w-[82px] h-[82px]">
              <Image
                src="/images/newlogo2.png"
                alt="logo"
                className="absolute"
                layout="fill"
              />
            </div>
            <div className="flex flex-col relative">
              <p className="font-Gordita-Bold text-[32px] text-[#2173A2]">
                The
                <span className="text-white">Improvement</span>
              </p>
              <p className="text-[12px]  mt-[-10px] text-center text-white">
                Building Better. Every Day.
              </p>
            </div>
          </div>
          <p className="relative md:text-[32px] text-[24px] leading-[42px] text-center text-white font-Gordita-Bold">
            Quality Home Improvement Services You Can Trust
          </p>

          <p className="text-center">
            The Improvement LLC offers reliable and professional home
            improvement services, including construction, demolition, flooring,
            plumbing, HVAC, roofing, painting, and exterior works. We deliver
            high-quality craftsmanship to enhance, upgrade, and maintain your
            residential or commercial property.
          </p>
        </div>
      </div>
      <div className="p-10  md:w-[50%] flex flex-col justify-center items-center md:h-screen h-[350px] my-auto ">
        <div className="max-w-[490px] w-full mx-auto ">
          <div className="mb-[32px] w-full">
            <h1 className="font-Gordita-Medium text-[32px] leading-[34.5px] mb-2">
              Forgot Password
            </h1>
            <h2 className="leading-[22.8px]  font-Gordita-Regular">
              An OTP sent to your email
            </h2>
            <div className="flex flex-row gap-1 items-center ">
              <p className="text-[#3586FF] text-[13px] font-Gordita-Regular leading-5">
                (support@theimprovementllc.com)
              </p>
              <EditIcon />
            </div>
          </div>
          <form className="mb-10">
            <CustomInput
              name={"email"}
              label="Email"
              rootCls="mb-10"
              labelCls="text-base"
              type={"email"}
              required
              placeholder="Enter your email"
              outerInptCls="border-[#A8A9B0] bg-[#F3F3F3] focus-within:bg-white md:min-h-[45px]"
              className="text-base placeholder:text-[#959595] focus:placeholder:text-transparent placeholder:text-base placeholder:font-Gordita-Medium leading-[22.8px]"
              onChange={(e) => {
                return;
              }}
            />
            <Button
              type="submit"
              onClick={(e) => {
                return;
              }}
              className="flex w-full h-[45px] rounded-[8px] bg-[#3586FF]  items-center justify-center font-500 text-[16px] leading-[20.5px] text-[#FFFFFF]"
            >
              Send OTP
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordView;
