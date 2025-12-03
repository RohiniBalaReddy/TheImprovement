import React, { useMemo } from "react";
import Image from "next/image";
import Button from "@/common/Button";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { useRouter } from "next/router";
interface blogitems {
  id: number;
  title: string;
  previewDescription: string;
  thumbnailImageUrl: string;
}

export default function MobileBlogCard({ data }: any) {
  const { id, title, previewDescription, thumbnailImageUrl, updatedAt } = data;
  const updateAt = useMemo(() => {
    if (data.updatedAt) {
      const date = new Date(data.updatedAt).toLocaleDateString("en-GB");
      return date ?? "";
    } else {
      return "";
    }
  }, [data.updatedAt]);

  return (
    <>
      <div className="max-w-[390px] min-h-[90px] rounded-[8px] bg-[#FFFFFF] border px-[16px] py-[8px] flex items-center gap-x-[22px] shadow-custom">
        <div className="relative w-[108px] h-[74px] rounded-[8px]">
          {thumbnailImageUrl && (
            <Image
              src={
                thumbnailImageUrl
                  ? thumbnailImageUrl
                  : "https://via.placeholder.com/300x200"
              }
              alt="blog_img1"
              fill
              className="rounded-md w-full h-full object-cover"
            />
          )}
        </div>
        <div className="max-w-[257px] min-h-[73px] flex flex-col items-start gap-y-[4px]">
          <div className="flex items-center gap-x-[51px] max-w-[245px] w-full min-h-[31px] ">
            <div className="max-w-[164px] min-h-[29px]">
              <h1 className="text-[#3D3F33] font-Gordita-Medium md:text-[18px] text-[16px] leading-[28.5px] text-nowrap">
                {title?.slice(0, 20)}
              </h1>
            </div>

            <Link
              href={`/blogs/${id}`}
              className="w-[30px] h-[30px] bg-[#F9F9F9] rounded-full shadow-custom border-[1px] border-[#DEDEDE] flex items-center justify-center cursor-pointer transform hover:scale-125"
              aria-label={`Read more about ${title}`}
            >
              <LuArrowRight className="-rotate-45 w-[20px] h-[20px] text-[#2872a1]" />
            </Link>
          </div>
          <div className="max-w-[197px] min-h-[38px]">
            <h2 className="text-[#3D3F33] font-Gordita-Regular text-[13px] leading-[18.52px]">
              {previewDescription?.slice(0, 50)}
            </h2>
          </div>
          <p className="text-[#7B7C83] font-Gordita-Medium text-[10px] mt-1">
            Published on :{updateAt}
          </p>
        </div>
      </div>
    </>
  );
}
