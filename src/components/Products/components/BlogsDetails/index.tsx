import React, { useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { RightViewArrow } from "@/components/Icons";
import { AiOutlineCalendar } from "react-icons/ai";

const BlogDetails = ({ blog }: { blog: any }) => {
  const router = useRouter();

  const updateAt = useMemo(() => {
    if (blog && blog.updatedAt) {
      return new Date(blog.updatedAt).toLocaleDateString("en-GB");
    }
    return "";
  }, [blog]);

  return (
    <div className="mt-[20px]">
      <div className="flex flex-row items-center justify-center">
        <div
          className="md:text-[20px] text-[14px] font-Gordita-Medium"
          onClick={() => router.back()}
        >
          Blogs
        </div>
        <RightViewArrow />
        <div className="text-[#3586FF] md:text-[20px] text-[12px]">
          {blog?.title || ""}
        </div>
      </div>

      <div className="md:px-11 md:py-16 md:w-[85%] w-full mx-auto bg-white shadow-custom px-4 py-8">
        <div className="relative md:h-[400px] h-[200px] mb-6">
          <Image
            className="absolute rounded-[10px]"
            src={blog?.CoverImageUrl || "/images/blogs/blog1.jpg"}
            alt="blog image"
            fill
            objectFit="cover"
          />
          <div className="absolute top-4 left-4 flex items-center md:gap-2 gap-1 z-10">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white md:px-4 px-2 md:py-2 py-1 rounded-full font-Gordita-Medium md:text-[12px] text-[10px] shadow-md">
              {blog?.blogType}
            </span>
            <span className="bg-white md:px-4 px-2 md:py-2 py-1  rounded-full font-Gordita-Medium md:text-[12px] text-[10px] shadow-md border border-gray-200">
              {blog?.blogStatus}
            </span>
          </div>
        </div>
        <h2 className="mb-8 font-Gordita-Medium md:text-[30px] text-[18px] text-center text-[#5297FF]">
          {blog?.title || ""}
        </h2>
        <div className="flex justify-end items-end mb-6">
          <p className="text-[#444446] md:text-[16px] text-[12px] flex items-center md:gap-2 gap-1 font-Gordita-Medium">
            <AiOutlineCalendar className="h-4 w-4 text-gray-500" />
            {updateAt}
          </p>
        </div>
        <div
          className="rich-text-container w-full text-gray-700 font-Gordita-Regular md:text-[16px] text-[14px] md:leading-7 leading-5"
          dangerouslySetInnerHTML={{ __html: blog?.content }}
        />
      </div>
    </div>
  );
};

export default BlogDetails;
