import React, { useEffect, useState } from "react";
import Modal from "@/common/Modal";
import Button from "@/common/Button";
import apiClient from "@/utils/apiClient";
import { Lead, status_options, GetDateshow } from "./types";
import {
  FaEdit,
  FaPhone,
  FaEnvelope,
  FaCity,
  FaHome,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";
import { BiLogoWhatsapp } from "react-icons/bi";

import { MdApartment, MdPin, MdOutlineCategory } from "react-icons/md";
import { HiOutlineHomeModern } from "react-icons/hi2";
import LeadTimelineStepper from "./LeadTimelineStepper";
import toast from "react-hot-toast";

interface LeadDetailsModalProps {
  lead: Lead;
  open: boolean;
  onClose: () => void;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
  onStatusChange: (id: number, status: string) => void;
}

export default function LeadDetailsModal({
  lead,
  open,
  onClose,
  onEdit,
  onDelete,
  onStatusChange,
}: LeadDetailsModalProps) {
  const [steps, setSteps] = useState<{ status: string; at: string }[]>([]);
  const [currentStatus, setCurrentStatus] = useState<string>("");

  useEffect(() => {
    if (lead?.id) {
      fetchTimeline();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lead?.id]);

  const fetchTimeline = async () => {
    try {
      const res = await apiClient.get(
        `${apiClient.URLS.crmlead}/${lead?.id}/timeline`,
        {},
        true
      );
      if (res.status === 200) {
        setSteps(res?.body?.steps || []);
        setCurrentStatus(res?.body?.currentStatus || lead.leadstatus);
      }
    } catch (error) {
      console.error("Error fetching timeline:", error);
    }
  };

  const handleWhatsappSend = async () => {
    try {
      const payload = {
        name: lead.Fullname,
        phone: lead.Phonenumber,
      };
      const res = await apiClient.post(
        `${apiClient.URLS.whatsappSend}/document`,
        payload,
        true
      );
      if (res.status === 201) {
        toast.success("WhatsApp message sent successfully");
      }
    } catch (error) {
      console.error("Error sending WhatsApp:", error);
    }
  };

  return (
    <Modal
      isOpen={open}
      closeModal={onClose}
      title="Lead Details"
      rootCls="z-[999]"
      titleCls="font-Gordita-Medium md:text-[18px] text-[12px] text-center text-[#5297FF]"
      isCloseRequired={true}
      className="md:max-w-[1100px] w-full max-w-[95vw]"
    >
      <div className="md:p-6 p-3 bg-white shadow-custom rounded-[12px] border border-gray-200 max-w-full mx-auto space-y-5">
        {/* Header */}
        <div className="flex flex-col gap-3 border-b pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E3EEFF] text-[#5297FF] font-Gordita-Bold uppercase">
                {lead.Fullname?.[0] || "L"}
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="md:text-[20px] text-[14px] font-Gordita-Bold text-gray-900 flex items-center gap-2">
                  {lead.Fullname}
                </h2>
                <p className="text-[11px] md:text-[12px] text-gray-500">
                  Lead ID:{" "}
                  <span className="font-Gordita-Medium">#{lead.id}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center md:gap-3 gap-2">
              <span className="hidden md:inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-[#2563eb] text-[11px] font-Gordita-Medium">
                Current Status: {lead.leadstatus}
              </span>

              <button
                type="button"
                onClick={() => onEdit(lead)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 hover:bg-blue-50 transition disabled:opacity-60"
              >
                <FaEdit className="text-[#5297FF] md:text-[18px] text-[14px]" />
              </button>

              {/* Delete */}

              <button
                type="button"
                onClick={() => onDelete(lead)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 hover:bg-red-50 transition disabled:opacity-60"
              >
                <LuTrash2 className="md:text-[18px] text-[14px] text-red-500" />
              </button>

              <Button
                className="md:px-3 px-2 md:py-2 py-1 md:text-[12px] text-[10px] bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center gap-1 shadow-sm"
                onClick={handleWhatsappSend}
              >
                <BiLogoWhatsapp className="text-white md:text-[18px] text-[14px]" />
                <span className="hidden md:inline">Send</span>
              </Button>
            </div>
          </div>

          <span className="md:hidden inline-flex self-start items-center px-2 py-1 rounded-full bg-blue-50 text-[#2563eb] text-[10px] font-Gordita-Medium">
            Status: {lead.leadstatus}
          </span>
        </div>

        <div className="w-full rounded-[10px] bg-[#F9FAFB] border border-gray-100 px-2 md:px-3 py-2">
          <p className="text-[11px] md:text-[12px] font-Gordita-Medium text-gray-600 mb-2">
            Timeline
          </p>
          <div className="w-full flex items-center justify-center md:overflow-x-auto">
            <LeadTimelineStepper
              steps={steps}
              currentStatus={currentStatus}
              showTimes
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[12px] md:text-[13px] font-Gordita-Medium text-gray-700">
              Lead Information
            </p>
          </div>

          <div className="grid md:grid-cols-4 grid-cols-2 gap-2 font-Gordita-Medium">
            {/* Contact */}
            <IconBlock
              icon={<FaPhone className="text-green-500" />}
              label="Phone"
              value={
                <a
                  href={`tel:${lead.Phonenumber}`}
                  className="text-blue-600 hover:underline break-all"
                >
                  {lead.Phonenumber}
                </a>
              }
            />

            <IconBlock
              icon={<FaEnvelope className="text-yellow-500" />}
              label="Email"
              value={lead.email || "N/A"}
            />

            <IconBlock
              icon={<FaHome className="text-orange-500" />}
              label="Property Type"
              value={lead.propertytype}
            />

            <IconBlock
              icon={<MdApartment className="text-indigo-500" />}
              label="BHK"
              value={lead?.bhk || "N/A"}
            />

            {/* Location */}
            <IconBlock
              icon={<FaCity className="text-pink-500" />}
              label="City"
              value={lead?.city}
            />

            <IconBlock
              icon={<FaMapMarkerAlt className="text-pink-500" />}
              label="State"
              value={lead?.state}
            />

            <IconBlock
              icon={<MdOutlineCategory className="text-green-500" />}
              label="Platform"
              value={lead?.platform || "N/A"}
            />

            <IconBlock
              icon={<FaUser className="text-gray-600" />}
              label="Service Type"
              value={lead?.serviceType || "N/A"}
            />

            {lead?.houseNo && (
              <IconBlock
                icon={<HiOutlineHomeModern className="text-blue-400" />}
                label="House No"
                value={lead.houseNo}
              />
            )}

            {lead?.apartmentName && (
              <IconBlock
                icon={<MdApartment className="text-blue-400" />}
                label="Apartment"
                value={lead.apartmentName}
              />
            )}

            {lead?.areaName && (
              <IconBlock
                icon={<FaMapMarkerAlt className="text-blue-400" />}
                label="Location"
                value={lead.areaName}
              />
            )}

            {lead?.pincode && (
              <IconBlock
                icon={<MdPin className="text-blue-400" />}
                label="Pin Code"
                value={lead.pincode}
              />
            )}

            <IconBlock
              icon={<FaCalendarAlt className="text-teal-500" />}
              label="Created At"
              value={new Date(lead.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            />

            <IconBlock
              icon={<FaCalendarAlt className="text-teal-500" />}
              label={GetDateshow(lead?.leadstatus)}
              value={new Date(
                lead?.[GetDateshow(lead?.leadstatus)] as string
              ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            />

            <div className="flex md:flex-row flex-col md:items-center items-start gap-2 text-gray-700">
              <span className="md:text-[12px] text-[11px]">Status:</span>
              <select
                value={lead.leadstatus}
                onChange={(e) => onStatusChange(lead.id, e.target.value)}
                className="md:px-3 px-2  rounded-md md:text-[13px] text-[11px] font-Gordita-Medium outline-none cursor-pointer bg-gray-700 text-white border border-gray-500"
              >
                {status_options.map((status) => (
                  <option
                    key={status}
                    value={status}
                    className="text-black bg-white"
                  >
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

const IconBlock = ({
  icon,
  label,
  value,
}: {
  icon: JSX.Element;
  label: string;
  value: any;
}) => (
  <div className="flex flex-col gap-1 min-w-0">
    <div className="flex items-center gap-2 md:text-[12px] text-[10px] text-gray-600">
      {icon}
      <span className="font-Gordita-Medium text-[10px] md:text-[13px]">
        {label}
      </span>
    </div>
    <p className="font-Gordita-Medium text-[10px] md:text-[13px] text-gray-800 break-words">
      {value}
    </p>
  </div>
);
