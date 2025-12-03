import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { MdUpdate } from "react-icons/md";
import {
  Lead,
  propertyTypeIcons,
  roleColors,
  roleIcons,
  GetDateshow,
  status_options,
} from "./types";
import { LeadActionsMenu } from "./Leadactionsmenu";

interface LeadCardProps {
  lead: Lead;
  onDragStart: (lead: Lead) => void;
  onClick: () => void;
  onStatusChange: (id: number, status: string) => void;

  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
  onAssign: (leadId: number, userId: number) => void;
  roleUsers: Array<{ id: number; name: string }>;
}

export default function LeadCard({
  lead,
  onDragStart,
  onClick,
  onStatusChange,

  onEdit,
  onDelete,
  onAssign,
  roleUsers,
}: LeadCardProps) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(lead)}
      onClick={onClick}
      className="relative flex items-center md:gap-3 gap-1 md:px-3 md:py-1 px-1 py-1 border-b border-gray-200 shadow-custom hover:bg-gray-100 cursor-pointer transition-colors"
    >
      {/* Actions Menu */}
      <div
        className="absolute top-[2px] -right-1"
        onClick={(e) => e.stopPropagation()}
      >
        <LeadActionsMenu
          lead={lead}
          roleUsers={roleUsers}
          onAssign={onAssign}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>

      {/* Avatar */}
      <div className="md:w-10 w-8 md:h-10 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-Gordita-Bold md:text-[12px] text-[10px] flex-shrink-0">
        {lead?.Fullname?.charAt(0).toUpperCase()}
      </div>

      {/* Lead Info */}
      <div className="flex-1 flex flex-col md:gap-[2px] gap-[2px] min-w-0">
        <h3 className="font-Gordita-Medium text-gray-900 text-[12px] truncate">
          {lead?.Fullname}, {lead?.city}
        </h3>

        <p className="text-[12px] font-Gordita-Medium">
          <a
            href={`tel:${lead.Phonenumber}`}
            className="text-[#2872a1] hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {lead?.Phonenumber}
          </a>
        </p>

        <div className="capitalize md:text-[11px] text-[10px] font-Gordita-Medium md:rounded-[6px] rounded-[4px] text-nowrap text-center flex items-center gap-1">
          {propertyTypeIcons[lead?.propertytype]}
          {lead?.propertytype}, {lead?.bhk}
        </div>

        <span className="flex items-center gap-1 font-Gordita-Medium mt-1">
          <FaCalendarAlt className="text-gray-500 text-[10px]" />
          <span className="md:text-[10px] text-[10px]">
            {new Date(
              lead?.[GetDateshow(lead?.leadstatus)] as string
            ).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </span>
      </div>

      {/* Status & Meta */}
      <div className="flex justify-between flex-col items-center gap-2 font-Gordita-Medium">
        <div
          className={`md:text-[10px] text-[10px] md:rounded-[6px] rounded-[4px] text-center px-1.5 py-1 flex items-center justify-center gap-1 ${roleColors[lead.serviceType] || "text-gray-700"
            }`}
        >
          {roleIcons[lead.serviceType]}
          {lead.serviceType}
        </div>

        <span className="text-[10px] flex items-center gap-1">
          <MdUpdate className="text-gray-500 text-[12px]" />
          {new Date(lead.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>

        <select
          value={lead.leadstatus}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            e.stopPropagation();
            onStatusChange(lead.id, e.target.value);
          }}
          className="px-1 py-[2px] -pr-2 md:rounded-md rounded-[4px] md:text-[10px] text-[10px] font-Gordita-Medium outline-none cursor-pointer bg-gray-500 text-white"
        >
          {status_options?.length > 0 &&
            status_options.map((status) => (
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
  );
}
