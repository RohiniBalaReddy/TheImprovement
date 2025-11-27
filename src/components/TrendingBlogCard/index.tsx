import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineCalendar } from "react-icons/ai";
import { HiArrowNarrowRight } from "react-icons/hi";

const TrendingBlogCard = ({ data }: any) => {
  const updateAt = useMemo(() => {
    if (data.updatedAt) {
      const date = new Date(data.updatedAt).toLocaleDateString("en-GB");
      return date ?? "";
    } else {
      return "";
    }
  }, [data.updatedAt]);

  return (
    <Link href={`/blogs/${data.id}`}>
      <div className="w-full max-w-[600px] p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-6 group cursor-pointer border border-gray-100 hover:border-blue-100">
        <div className="relative h-[160px] md:w-[184px] md:min-w-[184px] overflow-hidden rounded-lg">
          <Image
            src={data?.CoverImageUrl || "/images/TopProperties/property3.png"}
            alt="blog_img1"
            fill
            className="rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white w-fit whitespace-nowrap text-center md:px-3 px-1 md:py-1.5 py-0.5 rounded-md font-Gordita-Medium md:text-[12px] text-[10px] leading-[22px]  shadow-md">
              {data?.blogType}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between py-1">
          <h3 className=" md:text-[16px] text-[12px] leading-[22px] font-Gordita-Medium flex-1 max-w-[400px] group-hover:text-[#5297ff] transition-colors duration-200">
            {data?.title}
          </h3>
          <div className="flex items-center justify-between mt-5">
            <span className="font-Gordita-Medium text-[16px] leading-[22px] text-[#7B7C83] flex items-center gap-1.5">
              <AiOutlineCalendar className="h-4 w-4 text-gray-500" />
              {updateAt}
            </span>
            <span className="text-[#5297ff] font-Gordita-Medium text-[14px] group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-1">
              Read more
              <HiArrowNarrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TrendingBlogCard;
