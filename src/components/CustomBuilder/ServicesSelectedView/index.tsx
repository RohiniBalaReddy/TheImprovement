import React, { useState, useEffect } from "react";
import { ClipboardCheck } from "lucide-react";
import { useRouter } from "next/router";

import Button from "@/common/Button";

import { useCustomBuilderStore } from "@/store/useCustomBuilderStore ";
import RouterBack from "../RouterBack";
import Loader from "@/components/Loader";
import { iconMap } from "./helper";

const snakeToCamel = (str: string) =>
  str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", "")
  );

const ServicesSelectedView = () => {
  const router = useRouter();
  const custom_builder_id = Number(router?.query?.id);

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const { data: customBuilder, isLoading, fetchData } = useCustomBuilderStore();

  useEffect(() => {
    if (custom_builder_id) {
      fetchData(custom_builder_id.toString());
    }
  }, [custom_builder_id, fetchData]);

  useEffect(() => {
    if (customBuilder?.servicesRequired?.selectedServices?.length) {
      setActiveTab(customBuilder.servicesRequired.selectedServices[0]);
    }
  }, [customBuilder]);
  const getServiceData = (activeTab: string) => {
    if (!customBuilder?.servicesRequired) return null;

    const normalized = activeTab.replace(/_/g, "").toLowerCase();

    const matchedKey = Object.keys(customBuilder.servicesRequired).find(
      (key) => {
        return key.replace(/_/g, "").toLowerCase() === normalized;
      }
    );

    return matchedKey ? customBuilder.servicesRequired[matchedKey] : null;
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-5 w-full ">
      <div className="px-2 py-4">
        <RouterBack />
      </div>
      <div className="bg-white p-2">
        <div className="flex items-center justify-between mb-[32px]">
          <div className="w-full flex items-center gap-2 md:mb-4 mb-2">
            <ClipboardCheck size={24} className="text-[#5297ff] w-6 h-6" />
            <h1 className="font-Gordita-Bold md:text-[18px] text-[14px]">
              Services Selected
            </h1>
          </div>
        </div>
        <div className="md:space-y-4 space-y-2">
          <div className="flex items-center md:gap-3 gap-2  md:overflow-hidden overflow-x-auto">
            {customBuilder?.servicesRequired?.selectedServices?.map(
              (item: string, index: number) => (
                <Button
                  key={index}
                  onClick={() => setActiveTab(item)}
                  className={`capitalize  md:px-4 px-2  md:py-2 py-2 font-Gordita-Medium md:text-[16px] text-[10px] text-nowrap md:rounded-[8px] rounded-[4px] ${activeTab === item
                    ? "bg-[#5297ff] text-white"
                    : "bg-gray-200 text-gray-800"
                    }`}
                >
                  {item.replace(/_/g, " ")}
                </Button>
              )
            )}
          </div>

          <div className=" mt-5 md:mt-3">
            <h2 className="md:text-2xl text-[14px] font-Gordita-Bold md:mb-4 mb-2">
              Selected Service Details:
            </h2>

            {activeTab ? (
              (() => {
                const camelKey = snakeToCamel(activeTab);
                const serviceData = getServiceData(activeTab);
                if (serviceData) {
                  return renderServiceDetails(serviceData);
                }
                return <p>No data found for this service.</p>;
              })()
            ) : (
              <p>Please select a service to view its details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const renderServiceDetails = (serviceData: any) => {
  const mainData =
    Object.keys(serviceData).length === 1 &&
      typeof serviceData[Object.keys(serviceData)[0]] === "object"
      ? serviceData[Object.keys(serviceData)[0]]
      : serviceData;

  return (
    <div
      key={mainData?.serviceType || "service"}
      className="mb-4 md:p-8 p-4 border border-gray-300 bg-white md:rounded-[10px] rounded-[4px]"
    >
      <div className="grid md:grid-cols-4 grid-cols-2 md:gap-3 gap-2">
        {Object.entries(mainData).map(([key, value]) => {
          if (["serviceType", "id", "updatedAt", "createdAt"].includes(key))
            return null;

          return (
            <div key={key} className="flex flex-col md:gap-1 gap-1 md:mb-1">
              <div className="flex items-center gap-1">
                <span>{iconMap[key]}</span>
                <span className="text-gray-400 md:text-[18px] text-[10px] font-Gordita-Medium">
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())
                    .replace(/\b\w/g, (str) => str.toUpperCase())}
                </span>
              </div>

              {Array.isArray(value) ? (
                <div className="flex flex-col gap-2">
                  {key === "featureBreakDown" ? (
                    <div className="overflow-x-auto mt-1">
                      <table className="min-w-full border border-gray-200 text-[8px] md:text-[10px]">
                        <thead className="bg-gray-100">
                          <tr>
                            {Object.keys(value[0]).map((col) => (
                              <th
                                key={col}
                                className="border md:px-2 px-1 md:py-1 py-0 text-left font-Gordita-Medium "
                              >
                                {col.replace(/_/g, " ").toUpperCase()}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {value.map((item: any, idx: number) => (
                            <tr key={idx} className="even:bg-gray-50">
                              {Object.values(item).map((val: any, i) => (
                                <td
                                  key={i}
                                  className="border md:px-2 px-1 md:py-1 py-0 text-center text-gray-700"
                                >
                                  {val}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {value.map((item: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-nowrap bg-blue-100 text-[#5297FF] rounded text-xs capitalize"
                        >
                          {item.replace(/_/g, " ")}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : typeof value === "object" && value !== null ? (
                key === "rooms" ? (
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(value).map(([room, count]) => (
                      <span
                        key={room}
                        className="bg-gray-100 text-gray-700 md:px-3 px-1 md:py-1 py-0 rounded text-[10px] md:text-[12px]"
                      >
                        {room.replace(/([A-Z])/g, " $1")}: {count}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500 text-xs">
                    {JSON.stringify(value)}
                  </span>
                )
              ) : (
                <span className="capitalize md:text-[16px] text-[10px] font-Gordita-Medium">
                  {value === true
                    ? "Yes"
                    : value === false
                      ? "No"
                      : value?.toString() || "N/A"}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesSelectedView;
