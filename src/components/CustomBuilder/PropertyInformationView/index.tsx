import { LuInfo } from "react-icons/lu";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import { RiBuilding2Line } from "react-icons/ri";
import Button from "@/common/Button";
import { useCustomBuilderStore } from "@/store/useCustomBuilderStore ";

import { FaBuilding, FaRoad } from "react-icons/fa";
import { BiDoorOpen } from "react-icons/bi";

import { FiPlusCircle } from "react-icons/fi";
import Loader from "@/components/Loader";
import { MdPermMedia } from "react-icons/md";
import RouterBack from "../RouterBack";
import Image from "next/image";
import {
  Hammer,
  Ruler,
  Compass,
  DoorOpen,
  Wallet,
  Building2,
  LayoutGrid,
  Home,
  Layers,
  ClipboardList,
  BedDouble,
  Bath,
  Flower2,
  Palette,
  Star,
  Info,
} from "lucide-react";

export default function PropertyInformationView() {
  const router = useRouter();
  const custom_builder_id = Number(router?.query?.id);
  const [loading, setLoading] = useState(false);
  const { data: customBuilder, isLoading, fetchData } = useCustomBuilderStore();

  useEffect(() => {
    if (custom_builder_id) {
      fetchData(custom_builder_id.toString());
    }
  }, [custom_builder_id, fetchData]);
  console.log(customBuilder);
  const calculateTotal = (data: any) => {
    const result = data?.reduce(
      (total: any, portion: any) => {
        total.bedrooms += portion?.bedrooms;
        total.bathrooms += portion?.bathrooms;
        total.balconies += portion?.balconies;
        return total;
      },
      { bedrooms: 0, bathrooms: 0, balconies: 0 }
    );
    return result;
  };

  const scope = customBuilder?.propertyInformation?.construction_scope;

  const propertyInfo =
    scope === "interior"
      ? customBuilder?.propertyInformation?.interior_info || {}
      : customBuilder?.propertyInformation?.house_construction_info || {};

  const constructionDetails =
    scope === "interior"
      ? [
        {
          label: "Project Scope",
          value: propertyInfo?.project_scope || "N/A",
          icon: <Hammer className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />,
        },
        {
          label: "Total Area",
          value: `${propertyInfo?.total_area?.size || "0"} ${propertyInfo?.total_area?.unit
            }`,
          icon: <Ruler className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />,
        },
        {
          label: "Total floors",
          value: propertyInfo?.totalFloors || "N/A",
          icon: (
            <FaBuilding className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />
          ),
        },
        {
          label: "Style Preference",
          value: propertyInfo?.style_preference || "N/A",
          icon: <Palette className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />,
        },
        {
          label: "Budget",
          value: propertyInfo?.budget
            ? `₹ ${Number(propertyInfo.budget).toLocaleString()}`
            : "₹ 0",
          icon: <Wallet className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />,
        },
        {
          label: "Special Requirements",
          value: propertyInfo?.special_requirements || "N/A",
          icon: <Star className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />,
        },
        {
          label: "Additional Details",
          value: propertyInfo?.additional_details || "N/A",
          icon: <Info className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />,
        },
        {
          label: "Color Scheme",
          value: propertyInfo?.color_scheme || [],
          icon: <Palette className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />,
          isColorScheme: true,
        },
      ]
      : [
        {
          label: "Construction Scope",
          value: scope || "N/A",
          icon: <Hammer className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />,
        },
        {
          label: "Total Area",
          value: `${propertyInfo?.total_area?.size || "0"} ${propertyInfo?.total_area?.unit || ""
            }`,
          icon: <Ruler className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />,
        },
        {
          label: "Length",
          value: `${propertyInfo?.length?.size || "0"} ${propertyInfo?.length?.unit || ""
            }`,
          icon: <Ruler className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />,
        },
        {
          label: "Width",
          value: `${propertyInfo?.width?.size || "0"} ${propertyInfo?.width?.unit || ""
            }`,
          icon: <Ruler className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />,
        },
        {
          label: "Total Floors",
          value: propertyInfo?.total_floors || "0",
          icon: <Layers className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />,
        },
        {
          label: "Land Facing",
          value: propertyInfo?.land_facing || "N/A",
          icon: <Compass className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />,
        },
        {
          label: "Gate Side",
          value: propertyInfo?.gate_side || "N/A",
          icon: <DoorOpen className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />,
        },
        {
          label: "Adjacent Roads",
          value: propertyInfo?.adjacent_roads || "0",
          icon: <FaRoad className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />,
        },
        {
          label: "Staircase Gate",
          value: propertyInfo?.staircase_gate || "N/A",
          icon: (
            <BiDoorOpen className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />
          ),
        },
        {
          label: "Project Budget",
          value: customBuilder?.estimatedCost
            ? `₹ ${Number(customBuilder.estimatedCost).toLocaleString()}`
            : "₹ 0",
          icon: <Wallet className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />,
        },
      ];

  const floors =
    customBuilder?.propertyInformation?.construction_scope === "interior"
      ? customBuilder?.propertyInformation?.interior_info?.floors || []
      : customBuilder?.propertyInformation?.house_construction_info?.floors;
  const [activeFloor, setActiveFloor] = useState(0);

  const generateFloorDetails = (floors: any[]) => {
    return floors.map((floor, index) => {
      const firstPortion = Array.isArray(floor.portionDetails)
        ? floor.portionDetails[0]
        : null;

      const floorDetails = [
        floor.portionDetails && {
          label: "Portions",
          value: floor.portions || "N/A",
          icon: <LayoutGrid className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />,
        },
        firstPortion && {
          label: "Bed Rooms",
          value: firstPortion.bedrooms || "N/A",
          icon: <BedDouble className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />,
        },
        firstPortion && {
          label: "Balconies",
          value: firstPortion.balconies || "N/A",
          icon: <Flower2 className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />,
        },
        firstPortion && {
          label: "Bath Rooms",
          value: firstPortion.bathrooms || "N/A",
          icon: <Bath className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />,
        },
        {
          label: "Type of Portions",
          value: floor.type_of_portions || "N/A",
          icon: <Layers className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />,
        },
        {
          label: "Ground Floor",
          value: floor.ground_floor_details?.length
            ? floor.ground_floor_details
            : [],
          icon: (
            <ClipboardList className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />
          ),
        },

        firstPortion &&
        firstPortion.additional_rooms &&
        firstPortion.additional_rooms.length > 0 && {
          label: "Additional Rooms",
          value: firstPortion.additional_rooms,
          icon: (
            <ClipboardList className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />
          ),
        },

        firstPortion && {
          label: "Indian Bathroom",
          value: firstPortion.indian_bathroom_required ? "Yes" : "No",
          icon: <Bath className="md:w-5 w-3 md:h-5 h-3 text-[#2872a1]" />,
        },
      ].filter(Boolean);

      return floorDetails;
    });
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        <div className="px-2 py-4">
          <RouterBack />
        </div>
        <div className="md:space-y-6 space-y-3 md:p-5 p-3 mx-auto md:max-w-full w-full max-w-none">
          <div className="w-full flex items-center md:gap-2 gap-1 md:mb-6 mb-3">
            <LuInfo className="text-[#2872a1] md:w-6 w-3 md:h-6 h-3" />
            <h1 className="font-Gordita-Bold md:text-[24px] text-[16px]">
              Property Information
            </h1>
          </div>

          <div className="bg-white md:rounded-[8px] rounded-[4px] w-full mx-auto  md:p-6 p-3 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="md:text-2xl text-[18px] font-Gordita-Bold text-gray-800">
                  {customBuilder?.propertyInformation?.propertyName ||
                    "Property Details"}
                </h2>
                <div className="flex items-center md:gap-2 gap-1 md:mt-2 mt-1">
                  <span className="md:px-3 px-2 py-2 bg-blue-100 text-blue-800 md:rounded-[10px] rounded-[4px] md:text-sm text-[12px] font-Gordita-Medium capitalize">
                    {customBuilder?.propertyInformation?.property_type || "N/A"}
                  </span>
                  <span className="md:px-3 px-2 py-2 bg-green-100 text-green-800 md:rounded-[10px] rounded-[4px] md:text-sm text-[12px] font-Gordita-Medium capitalize">
                    {customBuilder?.propertyInformation?.construction_type ||
                      "N/A"}
                  </span>
                  <span className="md:px-3 px-2 py-2 bg-purple-100 text-purple-800 md:rounded-[10px] rounded-[4px] md:text-sm text-[12px] font-Gordita-Medium capitalize">
                    {customBuilder?.propertyInformation?.construction_scope ||
                      "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:space-y-4 space-y-2 mx-auto w-full ">
            <div className="bg-white md:rounded-[10px] rounded-[4px]  border border-gray-100 w-full max-w-full md:p-6 p-3">
              <h3 className="  text-gray-800 md:mb-4 mb-2 flex items-center md:gap-2 gap-1">
                <RiBuilding2Line className="text-[#2872a1] md:w-[16px] w-[8px] h-[8px] md:h-[16px]" />
                <span className="text-[#2872a1] md:text-[20px] text-[14px] font-Gordita-Medium">
                  Basic Information
                </span>
              </h3>

              <div className="grid md:grid-cols-5 grid-cols-2 md:gap-3 gap-2">
                {constructionDetails.map((item, index) => (
                  <div key={index} className="flex flex-col md:gap-2 gap-1 ">
                    <div className="flex items-center md:gap-2 gap-1">
                      {item.icon}
                      <span className="text-gray-400 md:text-[18px] text-[12px] text-nowrap font-Gordita-Medium">
                        {item.label}
                      </span>
                    </div>

                    {item.isColorScheme ? (
                      <div className="flex flex-wrap md:gap-2 gap-1 mt-1">
                        {item.value.length > 0 ? (
                          item.value.map((cs: any, i: number) => (
                            <div
                              key={i}
                              className="flex items-center md:gap-2 gap-1 border rounded-md md:px-2 px-1 py-1"
                            >
                              <div
                                className="md:w-5 w-3 md:h-5 h-3 rounded"
                                style={{ backgroundColor: cs.color }}
                              />
                              <span className="text-gray-700 md:text-[12px] text-[10px] font-Gordita-Medium capitalize">
                                {cs.label}
                              </span>
                            </div>
                          ))
                        ) : (
                          <span className="text-gray-500 text-sm">
                            No color scheme
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="capitalize md:text-[12px] text-[10px] font-Gordita-Medium">
                        {item.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white w-full md:rounded-[10px] rounded-[4px] border border-gray-100 md:p-6 p-3">
              <h3 className="text-gray-800 md:mb-4 mb-2 flex items-center md:gap-2 gap-1">
                <FaBuilding className="text-[#2872a1] md:w-[16px] w-[8px] h-[8px] md:h-[16px]" />
                <span className="text-[#2872a1] md:text-[20px] text-[14px] font-Gordita-Medium">
                  Floors Information
                </span>
              </h3>

              {floors?.length > 0 ? (
                <>
                  <div className="flex gap-2 mb-4 overflow-x-auto">
                    {floors.map((floor: any, index: number) => (
                      <Button
                        key={floor.id}
                        onClick={() => setActiveFloor(index)}
                        className={`md:px-4 px-2 md:py-2 py-1 rounded-md md:text-[14px] text-[10px] font-Gordita-Medium  ${activeFloor === index
                          ? "bg-[#2872a1] text-white "
                          : "bg-gray-200 text-gray-800 "
                          }`}
                      >
                        Floor {floor?.floor}
                      </Button>
                    ))}
                  </div>

                  <div className="md:space-y-4 space-y-2">
                    {generateFloorDetails([floors[activeFloor]]).map(
                      (detailsGroup, groupIndex) => (
                        <div
                          key={groupIndex}
                          className="grid md:grid-cols-5 grid-cols-2 md:gap-3 gap-2"
                        >
                          {detailsGroup.map((item, itemIndex) => {
                            const hasValue =
                              (Array.isArray(item.value) &&
                                item.value.length > 0) ||
                              (!Array.isArray(item.value) &&
                                item.value !== null &&
                                item.value !== undefined &&
                                item.value !== "");

                            if (!hasValue) return null;

                            return (
                              <div
                                key={itemIndex}
                                className="flex flex-col md:gap-2 gap-1 font-Gordita-Regular"
                              >
                                <div className="flex items-center md:gap-2 gap-1">
                                  {item?.icon}
                                  <span className="text-gray-400 md:text-[18px] text-[12px] font-Gordita-Medium">
                                    {item?.label}
                                  </span>
                                </div>


                                {Array.isArray(item.value) ? (
                                  <div className="flex w-full overflow-auto gap-1 md:gap-2 md:mt-2 mt-1 ">
                                    {item.value.map(
                                      (detail: string, i: number) => (
                                        <span
                                          key={i}
                                          className="md:px-2 px-2 md:py-1 py-1 bg-blue-100 border-[#2872a1] text-[#2872a1] md:rounded-[10px] rounded-[4px] md:text-[14px] text-[10px] capitalize"
                                        >
                                          {detail}
                                        </span>
                                      )
                                    )}
                                  </div>
                                ) : (
                                  <span className="capitalize md:text-[16px] text-[10px] font-Gordita-Medium">
                                    {item?.value}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )
                    )}
                  </div>
                </>
              ) : (
                <p className="text-gray-500">No floor information available</p>
              )}
            </div>

            <div className="bg-white md:rounded-[10px] w-full rounded-[4px]  border border-gray-100 p-3 md:p-6">
              <h3 className="text-gray-800 md:mb-4 mb-2 flex items-center md:gap-2 gap-1">
                <FiPlusCircle className="text-[#2872a1] md:w-[16px] w-[8px] h-[8px] md:h-[16px]" />
                <span className="text-[#2872a1] md:text-[20px] text-[14px] font-Gordita-Medium">
                  Additional Features
                </span>
              </h3>
              {customBuilder?.propertyInformation?.house_construction_info ? (
                <div className="grid md:grid-cols-5 grid-cols-2 gap-5">
                  <div className="flex flex-col  gap-2  md:text-[18px] text-[12px] font-Gordita-Regular">
                    <span className="text-gray-400 md:text-[18px] text-[12px] font-Gordita-Medium">
                      Additional Specifications
                    </span>
                    {customBuilder?.propertyInformation?.house_construction_info
                      ?.additionOptions?.length > 0 ? (
                      <div className="flex overflow-auto md:gap-2 gap-1">
                        {customBuilder?.propertyInformation?.house_construction_info?.additionOptions?.map(
                          (option: string, index: number) => (
                            <span
                              key={index}
                              className="md:px-3 px-2 md:py-2 py-1 font-Gordita-Regular bg-blue-100 text-[#2872a1] md:rounded-[10px] rounded-[4px] md:text-xs text-[10px] capitalize"
                            >
                              {option}
                            </span>
                          )
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500">
                        No additional features specified
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 md:text-[18px] text-[12px] font-Gordita-Regular">
                    <h4 className="text-gray-400 md:text-[18px] text-[12px] font-Gordita-Medium">
                      Additional Notes
                    </h4>

                    {customBuilder?.propertyInformation?.house_construction_info
                      ?.additional_details && (
                        <p className=" capitalize md:text-[16px] text-[10px] font-Gordita-Medium">
                          {
                            customBuilder.propertyInformation
                              .house_construction_info.additional_details
                          }
                        </p>
                      )}
                  </div>
                  <div className="flex flex-col gap-2 md:text-[18px] text-[12px] font-Gordita-Regular">
                    <span className="text-gray-400 md:text-[18px] text-[12px] font-Gordita-Medium">
                      Additional Rooms
                    </span>
                    {customBuilder?.propertyInformation?.house_construction_info
                      ?.floors?.[0]?.portionDetails?.length > 0 && (
                        <div className="flex md:gap-2 gap-1  ">
                          {customBuilder?.propertyInformation.house_construction_info.floors[0].portionDetails.map(
                            (portion: any, pIndex: number) =>
                              (portion.additional_rooms as any[])?.map(
                                (option: string, index: number) => (
                                  <span
                                    key={`${pIndex}-${index}`}
                                    className="md:px-3 px-2 md:py-2 py-1 font-Gordita-Regular bg-blue-100 text-[#2872a1] md:rounded-[10px] rounded-[4px] md:text-xs text-[10px] capitalize"
                                  >
                                    {option}
                                  </span>
                                )
                              )
                          )}
                        </div>
                      )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2 md:text-[18px] text-[12px] font-Gordita-Regular">
                  <h4 className="text-gray-400 md:text-[18px] text-[12px] font-Gordita-Medium">
                    Additional Details
                  </h4>

                  {customBuilder?.propertyInformation?.interior_info
                    ?.additional_details && (
                      <p className=" capitalize md:text-[16px] text-[10px] font-Gordita-Medium">
                        {
                          customBuilder?.propertyInformation?.interior_info
                            ?.additional_details
                        }
                      </p>
                    )}
                </div>
              )}
            </div>

            <div className="bg-white md:rounded-[10px] rounded-[4px] border border-gray-100 md:p-6  p-3 md:col-span-2 lg:col-span-3">
              <h3 className="text-gray-800 md:mb-4 mb-2 flex items-center md:gap-2 gap-1">
                <MdPermMedia className="text-[#2872a1] md:w-[16px] w-[8px] h-[8px] md:h-[16px]" />
                <span className="text-[#2872a1] md:text-[20px] text-[14px] font-Gordita-Medium">
                  {" "}
                  Property Images
                </span>
              </h3>
              {(customBuilder?.propertyInformation?.construction_scope ===
                "interior"
                ? customBuilder?.propertyInformation?.interior_info
                  ?.reference_images
                : customBuilder?.propertyInformation?.propertyImages
              )?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4 gap-2">
                  {(customBuilder?.propertyInformation?.construction_scope ===
                    "interior"
                    ? customBuilder?.propertyInformation?.interior_info
                      ?.reference_images
                    : customBuilder?.propertyInformation?.propertyImages
                  )?.map((image: string, index: number) => (
                    <div
                      key={index}
                      className="relative aspect-square h-[80px] md:h-[160px] rounded-lg overflow-hidden border border-gray-200"
                    >
                      <Image
                        src={image}
                        alt={`Property image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 md:p-8 p-4 text-center">
                  <MdPermMedia className="mx-auto text-gray-400 w-12 h-12" />
                  <p className="md:mt-2 mt-1 text-gray-500">
                    No images available
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
