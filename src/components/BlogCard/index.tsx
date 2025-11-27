import React, { useMemo, useRef, useState } from "react";
import Image from "next/legacy/image";
import Link from "next/link";

const BlogCard = ({ data }: any) => {
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
      {title && previewDescription && (
        <div className=" hidden relative md:flex flex-col items-center justify-between  p-3  max-h-[500px] min-h-[450px] md:max-w-[290px] max-w-[280px]  rounded-[8px] h-full">
          <div className="relative h-[180px] w-full md:max-w-[550px] mx-auto ">
            {thumbnailImageUrl && (
              <Image
                src={
                  thumbnailImageUrl
                    ? thumbnailImageUrl
                    : "https://via.placeholder.com/300x200"
                }
                alt="blog_img1"
                layout="fill"
                objectFit="cover"
                className="rounded-md w-full h-full"
              />
            )}
          </div>
          <div className=" md:flex flex-col h-full items-center justify-between w-full ">
            <div className="flex flex-1 flex-col gap-2 mt-3 h-full">
              <h1 className="md:text-[16px] text-[14px] font-[600] font-Gordita-Medium md:leading-[29px]  text-center leading-[22.8px]">
                {title}
              </h1>
              <h2 className="text-[#7B7C83] flex-1 md:leading-[23px] md:text-[12px] text-center text-[12px] leading-[18.52px] font-Gordita-Medium">
                {previewDescription?.slice(0, 100)}
              </h2>
            </div>
            <div className="w-full flex flex-col items-end relative">
              <Link
                href={`/blogs/${id}`}
                aria-label={`Read more about ${title}`}
                className=" px-5 py-[4px] rounded-[6px] max-w-[150px]  font-Gordita-Medium text-nowrap md:text-[14px] text-[12px] text-white mt-3 bg-[#5297ff]"
              >
                Read More <span className="sr-only">about {title}</span>
              </Link>
              <p className="w-full h-[1px] text-[#7B7C83] font-normal bg-gray-200 my-3 text"></p>
              <p className="text-[#7B7C83] text-[12px] font-Gordita-Medium">
                Published on :{updateAt}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogCard;
