import React, { useState, useMemo } from "react";
import { FaUsers, FaCalendarDay, FaPlus } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import apiClient from "@/utils/apiClient";
import { CSVLink } from "react-csv";
import { Bar } from "react-chartjs-2";
import toast from "react-hot-toast";
import CustomInput from "@/common/FormElements/CustomInput";
import SingleSelect from "@/common/FormElements/SingleSelect";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";

import Button from "@/common/Button";

import ReusableSearchFilter from "@/common/SearchFilter";
import Modal from "@/common/Modal";
import CustomDate from "@/common/FormElements/CustomDate";
import {FilterState} from "@/common/SearchFilter"

import {
  Lead,
  
  DateFilterType,
  status_Tabs,
  headers,
  platformData,
  categoryData,
  propertytypedata,
  leaddata,
  filtersdata,
  statusFieldConfig,
} from "./types";
import { FiSliders } from "react-icons/fi";
import LeadCard from "./Leadcard";
import PaginationControls from "../TestimonialsView/pagination";
import LeadDetailsModal from "./Leaddetailsmodal";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

interface LeadsOverviewProps {
  allLeads: Lead[];
  setAllLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
  user: any;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedFilters: FilterState;
  setSelectedFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  selectedDateFilter: DateFilterType;
  setSelectedDateFilter: React.Dispatch<React.SetStateAction<DateFilterType>>;
  customRange: { startDate: string; endDate: string };
  setCustomRange: React.Dispatch<
    React.SetStateAction<{ startDate: string; endDate: string }>
  >;
  activeStatus: string;
  setActiveStatus: React.Dispatch<React.SetStateAction<string>>;
  categorized: { total: number; states: Record<string, number> };
  statusData: { total: number; statuses: Record<string, number> };
  roleData: { total: number; roles: Record<string, number> };
  todayLeadsCount: number;
  selectedLeads: number[];
  setSelectedLeads: React.Dispatch<React.SetStateAction<number[]>>;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openFileModal: boolean;
  setOpenFileModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
  applyFilter: () => void;
  
  fileInputRef: React.RefObject<HTMLInputElement>;
  setFormData: any;
  formData: any;
  selectedLeadId: any;
  setSelectedLeadId: any;
}

export default function LeadsOverview({
  allLeads,
  setAllLeads,
  user,
  searchQuery,
  setSearchQuery,
  selectedFilters,
  setSelectedFilters,
  selectedDateFilter,
  setSelectedDateFilter,
  customRange,
  setCustomRange,
  activeStatus,
  setActiveStatus,
  categorized,
  statusData,
  roleData,
  todayLeadsCount,
  selectedLeads,
  setSelectedLeads,
  openModal,
  setOpenModal,
  openFileModal,
  setOpenFileModal,
  selectedFile,
  handleFileUpload,
  handleUpload,
  applyFilter,
  
  fileInputRef,
  setFormData,
  formData,
  setSelectedLeadId,
  selectedLeadId,
}: LeadsOverviewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);
  const [pendingStatus, setPendingStatus] = useState<string>("");
  const [pendingLeadId, setPendingLeadId] = useState<number | null>(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [dateValue, setDateValue] = useState<string>("");
  const [reviewValue, setReviewValue] = useState<string>("");
  const [dateErrors, setDateErrors] = useState<{ date?: string }>({});

  type LeadStatusPayload = {
    leadstatus: string;
    followUpDate?: string;
    visitScheduledAt?: string;
    visitDoneAt?: string;
    review?: string;
  };

  const handleChange = (value: string, id: number) => {
    const lead = allLeads.find((l: any) => l.id === id);
    if (
      ["Follow-up", "Visit Scheduled", "Visit Done", "completed"].includes(
        value
      )
    ) {
      setPendingStatus(value);
      setPendingLeadId(id);
      setStatusModalOpen(true);
    } else {
      handleStatusSelect({ leadstatus: value }, id, );
    }
  };

  const handleStatusSelect = async (
    payload: LeadStatusPayload,
    leadId: number,
   
  ) => {
    setAllLeads((prevLeads: any) =>
      prevLeads.map((lead: any) =>
        lead.id === leadId ? { ...lead, ...payload } : lead
      )
    );

    try {
      const res = await apiClient.patch(
        `${apiClient.URLS.crmlead}/${leadId}/leadstatus`,
        {
          ...payload,
          actorId: user?.id,
          
        },
        true
      );

      if (res.status === 200) {
        toast.success("Status updated successfully");
      }
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleModalSubmit = () => {
    const newErrors: { date?: string } = {};

    if (
      ["Follow-up", "Visit Scheduled", "Visit Done"].includes(pendingStatus)
    ) {
      if (!dateValue) {
        newErrors.date = "Please select a date";
      } else {
        const selectedDate = new Date(dateValue);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate <= today) {
          newErrors.date = "Date must be in the future";
        }
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setDateErrors(newErrors);
      return;
    }
    setDateErrors({});

    const payload: LeadStatusPayload = { leadstatus: pendingStatus };

    if (pendingStatus === "Follow-up") payload.followUpDate = dateValue;
    else if (pendingStatus === "Visit Scheduled")
      payload.visitScheduledAt = dateValue;
    else if (pendingStatus === "Visit Done") payload.visitDoneAt = dateValue;
    else if (pendingStatus === "completed" && reviewValue?.trim())
      payload.review = reviewValue.trim();

    if (pendingLeadId) {
      const lead = allLeads.find((l: any) => l.id === pendingLeadId);
      if (lead) {
        handleStatusSelect(payload, pendingLeadId);
      }
    }

    setStatusModalOpen(false);
    setDateValue("");
    setReviewValue("");
  };

  // State options from leads
  const stateOptions = useMemo(() => {
    const uniqueStates = Array.from(
      new Set(
        allLeads
          .map((lead) => lead.state?.trim().toLowerCase() || "")
          .filter(Boolean)
      )
    );

    return uniqueStates.map((state) => ({
      id: state,
      label: state
        .split(" ")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    }));
  }, [allLeads]);

  const isEmpty = (filters: Record<string, boolean>) =>
    Object.values(filters).every((val) => !val);

  const filteredData = useMemo(() => {
    return allLeads.filter((lead) => {
      const matchedSearch =
        lead.Fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.Phonenumber.includes(searchQuery) ||
        lead.city.toLowerCase().includes(searchQuery.toLowerCase());

      const propertyTypeFilters = selectedFilters.propertytypedata;
      const matchesPropertyType =
        isEmpty(propertyTypeFilters) || propertyTypeFilters[lead.propertytype];

      const categoryFilters = selectedFilters.categoryData;
      const matchesCategory =
        isEmpty(categoryFilters) || categoryFilters[lead.serviceType];

      const leadStatusFilters = selectedFilters.leaddata;
      const matchesLeadStatus =
        isEmpty(leadStatusFilters) || leadStatusFilters[lead.leadstatus];

      const stateFilters = selectedFilters.stateData;
      const matchesState =
        isEmpty(stateFilters) ||
        stateFilters[lead.state?.trim().toLowerCase() || ""];

      return (
        matchedSearch &&
        matchesPropertyType &&
        matchesCategory &&
        matchesLeadStatus &&
        matchesState
      );
    });
  }, [allLeads, searchQuery, selectedFilters]);

  const statusFilteredLeads = useMemo(() => {
    return activeStatus === "all"
      ? filteredData
      : filteredData.filter(
          (lead) =>
            lead.leadstatus?.trim().toLowerCase() ===
            activeStatus.trim().toLowerCase()
        );
  }, [filteredData, activeStatus]);

  const paginatedData = useMemo(() => {
    return statusFilteredLeads.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  }, [statusFilteredLeads, currentPage, pageSize]);

  const totalPages = Math.ceil(statusFilteredLeads.length / pageSize);

  // Drag and drop handlers
  const onDragStart = (lead: Lead) => {
    setDraggedLead(lead);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (status: string) => {
    if (draggedLead) {
      handleChange(status, draggedLead.id);
      setDraggedLead(null);
    }
  };
  const handleAssignUser = async (leadId: number, userId: number) => {
    try {
      const response = await apiClient.post(
        `${apiClient.URLS.crmlead}/assign/${leadId}/${userId}/3`,
        true
      );
      if (response.status === 201) {
        toast.success("Lead assigned successfully");
      }
    } catch (error) {
      console.error("Error assigning lead:", error);
    }
    // handleuserMenuClose();
  };
  const handleDelete = async (lead: any) => {
    try {
      const res = await apiClient.delete(
        `${apiClient.URLS.crmlead}/${lead.id}`,
        {},
        true
      );

      if (res.status === 200) {
        setAllLeads((prev) => prev.filter((l) => l.id !== lead?.id));
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleEdit = (lead: any) => {
    setFormData(lead);
    setSelectedLeadId(lead.id);
    setOpenModal(true);
  };

  // Platform chart data
  const platformCounts = platformData.map((p: any) => {
    const count = statusFilteredLeads.filter(
      (lead) =>
        lead.platform?.trim().toLowerCase() === p.platform.trim().toLowerCase()
    ).length;
    return { platform: p.platform, count };
  });

  const chartData = {
    labels: platformCounts.map((p) => p.platform),
    datasets: [
      {
        label: "Leads Per Platform",
        data: platformCounts.map((p) => p.count),
        backgroundColor: "#6B7280",
        borderColor: "#6B7280",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    indexAxis: "y" as const,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Leads Per Platform",
        color: "#000000",
        font: { size: 18, weight: 700 },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { color: "#000000", font: { weight: 500 } },
        grid: { drawBorder: false, color: "#e0e0e0" },
      },
      y: {
        ticks: { color: "#000000", font: { weight: 500 } },
      },
    },
  };

  return (
    <div className="space-y-4">
      {/* Saved Views - Already rendered in parent */}

      {/* Stats Cards */}
      <div className="flex md:flex-nowrap flex-wrap items-stretch max-md:justify-center md:gap-4 gap-3">
        {/* Total Leads by States */}
        <div className="relative md:max-w-[320px] w-full min-h-[250px] h-full rounded-xl bg-white border border-gray-200 shadow-sm px-3 py-2 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-Gordita-Medium text-gray-600 uppercase tracking-wide">
                Total Leads
              </p>
              <h2 className="text-xl font-Gordita-Bold text-gray-800">
                {categorized?.total}
              </h2>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <FaUsers className="text-blue-600 w-5 h-5" />
            </div>
          </div>

          <div className="space-y-2 max-h-[150px] overflow-y-auto custom-scrollbar pr-1">
            {Object.entries(categorized.states)
              .sort((a, b) => b[1] - a[1])
              .map(([state, count]) => (
                <div
                  key={state}
                  className="flex items-center justify-between px-2 py-1 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="h-2 w-2 rounded-full bg-[#5297ff] flex-shrink-0" />
                    <span className="text-[12px] font-Gordita-Medium text-gray-700 truncate capitalize">
                      {state.replace(/_/g, " ")}
                    </span>
                  </div>
                  <span className="text-[12px] font-Gordita-Bold text-blue-700 bg-blue-100 px-2 py-1 rounded-md">
                    {count}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Leads by Status */}
        <div className="relative md:max-w-[320px] w-full min-h-[250px] h-full rounded-xl bg-white border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-Gordita-Medium text-gray-600 uppercase tracking-wide">
                Leads by Status
              </p>
              <h2 className="text-xl font-Gordita-Bold text-gray-800">
                {statusData.total}
              </h2>
            </div>
          </div>

          <div className="space-y-2 max-h-[150px] overflow-y-auto custom-scrollbar pr-1">
            {leaddata
              .map((status: any) => ({
                status: status.leadstatus,
                count: statusData.statuses[status.leadstatus] || 0,
              }))
              .filter(({ count }) => count > 0)
              .sort((a, b) => b.count - a.count)
              .map(({ status, count }) => (
                <div
                  key={status}
                  className="flex items-center justify-between px-2 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-Gordita-Medium text-gray-700 capitalize">
                      {status}
                    </span>
                  </div>
                  <span className="text-[12px] font-Gordita-Bold text-gray-700">
                    {count}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Leads by Category */}
        <div className="relative md:max-w-[320px] w-full min-h-[250px] h-full rounded-xl bg-white border border-gray-200 shadow-sm p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-Gordita-Medium text-gray-600 uppercase tracking-wide">
                Leads By Roles
              </p>
              <h2 className="text-xl font-Gordita-Bold text-gray-800">
                {roleData.total}
              </h2>
            </div>
          </div>

          <div className="space-y-2 max-h-[150px] overflow-y-auto custom-scrollbar pr-1">
            {Object.entries(roleData.roles).map(([role, count]) => (
              <div
                key={role}
                className="flex items-center justify-between px-2 py-1 rounded-lg bg-gray-50 hover:bg-green-50 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="text-[12px] font-Gordita-Medium text-gray-700 truncate capitalize"
                    title={role.replace(/_/g, " ")}
                  >
                    {role.replace(/_/g, " ")}
                  </span>
                </div>
                <span className="text-[12px] font-Gordita-Bold text-gray-700 bg-gray-100 px-2 py-1 rounded-md">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Tabs - Mobile */}
      <div className="flex px-3 md:hidden w-full bg-white shadow-custom custom-scrollbar py-2 gap-1 md:mb-4 mb-2 overflow-x-auto">
        {status_Tabs.map((status, index) => (
          <Button
            key={index}
            onClick={() => {
              setActiveStatus(status.value);
              setCurrentPage(1);
            }}
            onDragOver={onDragOver}
            onDrop={() => onDrop(status.value)}
            className={`md:px-3 px-2 py-1 text-nowrap rounded-md text-[10px] md:text-[10px] font-Gordita-Bold flex items-center gap-2 ${
              activeStatus === status.value
                ? "bg-[#3586FF] text-white"
                : "bg-gray-100 border-[1px] border-gray-300 text-gray-600"
            }`}
          >
            <span className="md:text-[12px] text-[10px]">{status.icon}</span>
            {status.label}
          </Button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="space-y-2 flex md:flex-row flex-col items-start shadow-custom rounded-[8px] md:px-2 px-0 py-4 border-[3px] w-[100%]">
        {/* Left Sidebar - Leads List */}
        <div className="md:max-w-[30%] max-w-full w-full bg-white border-r border-gray-300 md:rounded-[8px] rounded-[4px] shadow-custom max-h-[670px] max-md:mb-6 custom-scrollbar overflow-x-hidden">
          <div className="sticky top-0 z-20 bg-white border-b border-gray-300 py-2 px-2">
            <div className="flex items-center justify-between">
              <p className="font-Gordita-Bold text-[#5297FF] md:text-[16px] text-[14px]">
                All Leads
              </p>
              <p className="font-Gordita-Medium md:text-[13px] text-[12px]">
                Total: {statusFilteredLeads.length}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 custom-scrollbar-y px-1 custom-scrollbar overflow-x-hidden">
            {paginatedData?.length > 0 ? (
              paginatedData.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onDragStart={() => onDragStart(lead)}
                  onClick={() => {
                    setSelectedLead(lead);
                    setOpenDetailsModal(true);
                  }}
                  onStatusChange={(id, status) => handleChange(status, id)}
                  
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onAssign={handleAssignUser}
                  roleUsers={[]}
                />
              ))
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500 text-[14px] font-Gordita-Medium">
                  No leads found
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="space-y-2 w-full md:max-w-[70%] max-w-full overflow-x-hidden overflow-y-hidden">
          {/* Status Tabs - Desktop */}
          <div className="hidden px-3 md:flex w-full bg-white shadow-custom custom-scrollbar py-2 gap-1 md:mb-4 mb-2">
            {status_Tabs.map((status, index) => (
              <Button
                key={index}
                onClick={() => {
                  setActiveStatus(status.value);
                  setCurrentPage(1);
                }}
                onDragOver={onDragOver}
                onDrop={() => onDrop(status.value)}
                className={`md:px-2 px-2 py-1 text-nowrap rounded-md text-[10px] md:text-[11px] font-Gordita-Bold flex items-center gap-1 ${
                  activeStatus === status.value
                    ? "bg-[#3586FF] text-white"
                    : "bg-gray-100 border-[1px] border-gray-300 text-gray-600"
                }`}
              >
                <span className="md:text-[12px] text-[10px]">
                  {status.icon}
                </span>
                {status.label}
              </Button>
            ))}
          </div>
          {statusModalOpen && (
            <Modal
              isOpen={statusModalOpen}
              closeModal={() => setStatusModalOpen(false)}
              title={pendingStatus}
              isCloseRequired={false}
              titleCls="font-Gordita-Medium uppercase md:text-[18px] text-[12px] text-center text-[#5297FF]"
              className="md:max-w-[400px] max-w-[300px] "
              rootCls="z-[99999] "
            >
              <div>
                <form className="flex flex-col md:px-4 px-2 justify-center">
                  {["Follow-up", "Visit Scheduled", "Visit Done"].includes(
                    pendingStatus
                  ) && (
                    <div>
                      <CustomDate
                        type="date"
                        label={
                          statusFieldConfig[pendingStatus]?.label ||
                          "Select Date"
                        }
                        labelCls="md:text-[16px] mt-2 text-[12px] font-Gordita-Medium"
                        value={dateValue}
                        onChange={(e) => setDateValue(e.target.value)}
                        placeholder="Date"
                        className="md:px-2 px-1 md:py-1 py-[0.5px]"
                        name={statusFieldConfig[pendingStatus]?.name || "date"}
                        errorMsg={dateErrors.date}
                      />
                    </div>
                  )}
                  {pendingStatus === "completed" && (
                    <div className="mt-2">
                      <CustomInput
                        // rows={3}
                        type="textarea"
                        label="Review"
                        labelCls=" font-Gordita-Medium label-text leading-[22.8px] text-[#000000]"
                        name="review"
                        className="w-full min-h-[100px] md:min-h-[120px] border border-[#CFCFCF] rounded-md px-3  text-sm md:text-[14px]"
                        value={reviewValue}
                        onChange={(e) => setReviewValue(e.target.value)}
                        placeholder="Write a short review / remark…"
                        required
                        // className="w-full rounded-md border border-gray-300 bg-white px-2 py-2 text-[12px] md:text-[14px] outline-none focus:ring-2 focus:ring-blue-300"
                        // maxLength={400}
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-10 md:px-10">
                    <Button
                      className="md:py-[6px] py-1 md:px-[14px] px-[10px] md:rounded-[8px] rounded-[4px] border-2 btn-text border-[#3B82F6]"
                      onClick={() => setStatusModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleModalSubmit}
                      className="md:py-[6px] py-1 md:px-[14px] px-[10px] md:rounded-[8px] rounded-[4px] border-2   btn-text bg-[#3B82F6] text-white"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </div>
            </Modal>
          )}

          {/* Filters & Actions */}
          <div className="md:flex hidden md:flex-row flex-col items-center md:gap-2 gap-1 max-w-full w-[100%] scrollbar-custom md:z-[99] z-[9]">
            <div className="flex-[2] px-2">
              <div className="flex items-center md:gap-2 gap-1">
                <ReusableSearchFilter
                  searchText={searchQuery}
                  placeholder="Search by name, phone, city"
                  className="!py-[0px] md:!py-[3px]"
                  onSearchChange={setSearchQuery}
                  filters={[
                    {
                      groupLabel: "Property Type",
                      key: "propertytypedata",
                      options: propertytypedata.map((item) => ({
                        id: String(item.propertytype),
                        label: String(item.propertytype)
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" "),
                      })),
                    },
                    {
                      groupLabel: "Category",
                      key: "categoryData",
                      options: categoryData.map((item) => ({
                        id: String(item.role),
                        label: item.role,
                      })),
                    },
                    {
                      groupLabel: "Lead Status",
                      key: "leaddata",
                      options: leaddata.map((item) => ({
                        id: String(item.leadstatus),
                        label: item.leadstatus,
                      })),
                    },
                    {
                      groupLabel: "State",
                      key: "stateData",
                      options: stateOptions,
                    },
                  ]}
                  selectedFilters={selectedFilters}
                  onFilterChange={setSelectedFilters}
                />

                {/* Date Filter */}
                <div className="relative">
                  <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center text-gray-600 gap-2 bg-white border font-Gordita-Medium border-gray-300 md:text-[14px] text-[10px] text-nowrap md:py-[4px] py-[3px] md:px-4 px-2 rounded-lg focus:outline-none md:mb-6 mb-3"
                  >
                    <FiSliders className="text-gray-500" />
                    Sort By
                  </Button>
                  {isOpen && (
                    <div className="absolute top-8 -right-2 md:w-[250px] w-[160px] mt-2 bg-white border border-gray-300 shadow-lg rounded-lg z-[9999] text-[12px] md:text-[14px]">
                      <ul className="py-2">
                        {filtersdata.map((filter) => (
                          <li
                            key={filter.id}
                            className="flex items-center md:gap-2 gap-2 px-3 py-2"
                          >
                            <input
                              type="radio"
                              id={filter.id}
                              name="dateFilter"
                              checked={selectedDateFilter === filter.id}
                              onChange={() => setSelectedDateFilter(filter.id)}
                            />
                            <label
                              htmlFor={filter.id}
                              className="font-Gordita-Medium"
                            >
                              {filter.label}
                            </label>
                          </li>
                        ))}
                        {selectedDateFilter === "custom" && (
                          <li className="px-3 py-2">
                            <CustomDate
                              type="date"
                              label="Start Date"
                              labelCls="md:text-[16px] mt-2 text-[12px] font-Gordita-Medium"
                              value={customRange.startDate}
                              onChange={(e) =>
                                setCustomRange({
                                  ...customRange,
                                  startDate: e.target.value,
                                })
                              }
                              placeholder="Date"
                              className="px-3 md:py-1 py-[2px]"
                              name="date"
                            />
                            <CustomDate
                              type="date"
                              label="End Date"
                              labelCls="md:text-[16px] mt-2 text-[12px] font-Gordita-Medium"
                              value={customRange.endDate}
                              onChange={(e) =>
                                setCustomRange({
                                  ...customRange,
                                  endDate: e.target.value,
                                })
                              }
                              placeholder="Date"
                              className="px-3 md:py-1 py-[2px]"
                              name="date"
                            />
                          </li>
                        )}
                      </ul>
                      <div className="flex justify-end px-3 py-2 gap-2">
                        <Button
                          className="md:py-2 py-1 md:px-3 px-1 rounded-md border-2 md:text-[12px] text-[10px] font-Gordita-Medium border-[#3B82F6]"
                          onClick={() => setIsOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="md:py-2 py-1 md:px-3 px-1 rounded-md border-2 md:text-[12px] text-[10px] font-Gordita-Medium bg-[#3B82F6] text-white"
                          onClick={applyFilter}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center md:gap-3 gap-1 lg:mb-6 mb-3">
              <Button
                className="bg-[#5297ff] md:text-[14px] text-nowrap text-[12px] font-Gordita-Medium text-white px-5 py-1 rounded-[4px] md:rounded-md"
                onClick={() => setOpenFileModal(true)}
              >
                CSV Uploader
              </Button>

              <CSVLink
                data={allLeads}
                headers={headers}
                filename={`onecasa-leads-${
                  new Date().toISOString().split("T")[0]
                }.csv`}
              >
                <Button className="px-2 py-1 bg-[#5297ff] text-white md:rounded-[6px] font-Gordita-Medium rounded-[4px] flex items-center gap-2 md:text-[14px] text-[12px] flex-nowrap">
                  <LuDownload className="text-white md:text-[14px] text-[12px]" />
                  Export
                </Button>
              </CSVLink>

              <Button
                // disabled={!hasPermission("crm", "create")}
                className="bg-[#5297ff] md:text-[14px] text-[12px] font-Gordita-Medium text-white md:px-[14px] px-[7px] py-0 md:py-1 rounded-[4px] md:rounded-md flex items-center gap-1"
                onClick={() => setOpenModal(true)}
              >
                <FaPlus />
                {/* Add Lead */}
              </Button>
            </div>
          </div>

          {/* Stats & Chart */}
          <div className="md:max-w-full max-w-full w-[100%] md:px-[5px] px-0 flex flex-col">
            <div className="flex items-stretch">
              <div className="flex-1 bg-gray-50 flex flex-col gap-6 items-center">
                <div className="flex items-center md:gap-4 gap-2 w-full md:px-8 px-2">
                  <div className="bg-gradient-to-r from-white to-gray-200 text-black md:p-4 px-2 py-1 md:rounded-[8px] rounded-[4px] shadow-custom flex items-center justify-between gap-3 transform hover:scale-105 transition-transform duration-200 md:w-full md:max-w-full w-[170px]">
                    <div className="bg-gray-500 md:p-3 p-1 rounded-full">
                      <FaUsers className="text-white md:text-[20px] text-[14px]" />
                    </div>
                    <div>
                      <span className="md:text-[18px] text-[16px] font-Gordita-Bold">
                        {statusFilteredLeads.length}
                      </span>
                      <p className="text-[10px] font-Gordita-Medium md:text-[14px] opacity-80">
                        Total Leads
                      </p>
                    </div>
                  </div>

                  <div className="md:max-w-full md:w-full max-w-[270px] bg-gradient-to-r from-white to-gray-200 text-black md:p-4 px-2 py-1 md:rounded-[8px] rounded-[4px] shadow-custom flex items-center justify-between gap-3 transform hover:scale-105 w-[170px] transition-transform duration-200">
                    <div className="bg-gray-500 md:p-3 p-1 rounded-full">
                      <FaCalendarDay className="text-white md:text-[20px] text-[14px]" />
                    </div>
                    <div>
                      <span className="md:text-[18px] text-[16px] font-Gordita-Bold">
                        {todayLeadsCount}
                      </span>
                      <p className="text-[10px] md:text-[14px] font-Gordita-Medium opacity-80">
                        Today's Leads
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full md:min-h-[80%] min-h-[50%] md:px-4 px-2">
                  <Bar
                    data={chartData}
                    options={{ ...chartOptions, maintainAspectRatio: false }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-end justify-end md:mt-0 mt-2 max-md:mb-5">
        {statusFilteredLeads.length > 10 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={(size: any) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
          />
        )}
      </div>

      {/* Lead Details Modal */}
      {selectedLead && openDetailsModal && (
        <LeadDetailsModal
          lead={selectedLead}
          open={openDetailsModal}
          onClose={() => {
            setOpenDetailsModal(false);
            setSelectedLead(null);
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={(id, status) => handleChange(status, id)}
         
        />
      )}
    </div>
  );
}
