import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Drawer from "@/common/Drawer";
import Button from "@/common/Button";
import CustomInput from "@/common/FormElements/CustomInput";
import SingleSelect from "@/common/FormElements/SingleSelect";
import apiClient from "@/utils/apiClient";
import {
  Lead,
  categoryData,
  propertytypedata,
  platformData,
  leaddata,
  statesOptions,
} from "./types";

interface LeadFormDrawerProps {
  open: boolean;
  onClose: () => void;
  leadId: number | null;
  onSuccess: (lead: Lead) => void;
  formData: any;
  setFormData: any;
}

interface FormData {
  Fullname: string;
  Phonenumber: string;
  email: string;
  propertytype: string;
  bhk: string;
  city: string;
  state: string;
  serviceType: string;
  platform: string;
  leadstatus: string;
  review: string;
  houseNo?: string;
  apartmentName?: string;
  areaName?: string;
  pincode?: string;
}

export default function LeadFormDrawer({
  open,
  onClose,
  leadId,
  onSuccess,
  setFormData,
  formData,
}: LeadFormDrawerProps) {
  const session = useSession();
  const user = session?.data?.user;

  // const [formData, setFormData] = useState<FormData>({
  //     Fullname: "",
  //     Phonenumber: "",
  //     email: "",
  //     propertytype: "Flat",
  //     bhk: "",
  //     city: "",
  //     state: "",
  //     serviceType: "RealEstate",
  //     platform: "Walkin",
  //     leadstatus: "New",
  //     review: "",
  //     houseNo: "",
  //     apartmentName: "",
  //     areaName: "",
  //     pincode: "",
  // });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Load lead data if editing
  useEffect(() => {
    if (leadId && open) {
      fetchLead(leadId);
    } else if (!leadId && open) {
      // Reset form for new lead
      resetForm();
    }
  }, [leadId, open]);

  const fetchLead = async (id: number) => {
    try {
      setLoading(true);
      const res = await apiClient.get(`${apiClient.URLS.crmlead}/${id}`);
      if (res.status === 200 && res.body) {
        setFormData({
          Fullname: res.body.Fullname || "",
          Phonenumber: res.body.Phonenumber || "",
          email: res.body.email || "",
          propertytype: res.body.propertytype || "Flat",
          bhk: res.body.bhk || "",
          city: res.body.city || "",
          state: res.body.state || "",
          serviceType: res.body.serviceType || "RealEstate",
          platform: res.body.platform || "Walkin",
          leadstatus: res.body.leadstatus || "New",
          review: res.body.review || "",
          houseNo: res.body.houseNo || "",
          apartmentName: res.body.apartmentName || "",
          areaName: res.body.areaName || "",
          pincode: res.body.pincode || "",
        });
      }
    } catch (error) {
      console.error("Error fetching lead:", error);
      toast.error("Failed to load lead data");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      Fullname: "",
      Phonenumber: "",
      email: "",
      propertytype: "Flat",
      bhk: "",
      city: "",
      state: "",
      serviceType: "RealEstate",
      platform: "Walkin",
      leadstatus: "New",
      review: "",
      houseNo: "",
      apartmentName: "",
      areaName: "",
      pincode: "",
    });
    setErrors({});
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.Fullname.trim()) {
      newErrors.Fullname = "Full name is required";
    }

    if (!formData.Phonenumber.trim()) {
      newErrors.Phonenumber = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.Phonenumber)) {
      newErrors.Phonenumber = "Phone must be 10 digits starting with 6-9";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        Fullname: formData.Fullname.trim(),
        Phonenumber: formData.Phonenumber.trim(),
        email: formData.email.trim() || undefined,
        propertytype: formData.propertytype || "Flat",
        bhk: formData.bhk || undefined,
        city: formData.city.trim(),
        state: formData.state.trim() || "Andhra Pradesh",
        serviceType: formData.serviceType || "RealEstate",
        platform: formData.platform || "MAGIC BRICKS",
        leadstatus: formData.leadstatus,
        review: formData.review.trim() || undefined,
        houseNo: formData.houseNo?.trim() || undefined,
        apartmentName: formData.apartmentName?.trim() || undefined,
        areaName: formData.areaName?.trim() || undefined,
        pincode: formData.pincode?.trim() || undefined,

        createdById: (user as any)?.id,
      };

      let res;
      if (leadId) {
        // Update existing lead
        res = await apiClient.patch(
          `${apiClient.URLS.crmlead}/${leadId}`,
          {
            ...payload,
            actorId: (user as any)?.id,
          },
          true
        );
      } else {
        // Create new lead
        res = await apiClient.post(apiClient.URLS.crmlead, payload, true);
      }

      if (res.status === 200 || res.status === 201) {
        toast.success(
          leadId ? "Lead updated successfully!" : "Lead created successfully!"
        );
        onSuccess(res.body);
        resetForm();
      }
    } catch (error: any) {
      console.error("Error saving lead:", error);
      const errorMessage =
        error?.response?.data?.message || "Failed to save lead";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Drawer
      open={open}
      handleDrawerToggle={handleClose}
      closeIconCls="text-black"
      openVariant="right"
      panelCls="w-[95%] md:w-[80%] lg:w-[calc(82%-190px)] shadow-2xl z-[9999999]"
      overLayCls="bg-gray-700 bg-opacity-40"
    >
      <div className="w-full flex flex-col md:gap-3 gap-2 pb-10">
        {/* Header */}
        <div className="border-b border-gray-200 md:p-5 p-3 bg-gray-50 rounded-tl-2xl">
          <h1 className="heading-text text-center text-blue-600">
            {leadId ? "Edit Lead" : "Add New Lead"}
          </h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-full md:px-4 px-2"
        >
          {/* Basic Information */}
          <div className="flex flex-col gap-3 border-2 shadow border-gray-200 md:p-3 px-2 py-1 rounded-md">
            <h2 className="font-Gordita-Medium md:text-[18px] text-[14px] text-[#5297FF]">
              Basic Information
            </h2>
            <div className="w-full grid grid-cols-2 md:grid-cols-2 gap-y-1 gap-x-3">
              <div className="w-full md:max-w-[480px] max-w-[280px]">
                <CustomInput
                  label="Full Name"
                  type="text"
                  name="Fullname"
                  value={formData.Fullname}
                  labelCls="font-Gordita-Medium label-text leading-[22.8px] text-[#000000]"
                  placeholder="Enter name here"
                  required
                  className="md:px-2 px-1 py-0 border border-[#CFCFCF] rounded-[4px] w-full"
                  rootCls="md:px-2 px-1 md:py-0 py-0"
                  onChange={handleInputChange}
                  errorMsg={errors.Fullname}
                />
              </div>

              <div className="w-full md:max-w-[480px] max-w-[280px]">
                <CustomInput
                  label="Phone Number"
                  type="number"
                  name="Phonenumber"
                  value={formData.Phonenumber}
                  labelCls="font-Gordita-Medium label-text leading-[22.8px] text-[#000000]"
                  placeholder="Enter 10-digit number"
                  required
                  className="md:px-2 px-1 py-0 border border-[#CFCFCF] rounded-[4px] w-full"
                  rootCls="md:px-2 px-1 md:py-0 py-0"
                  onChange={handleInputChange}
                  errorMsg={errors.Phonenumber}
                />
              </div>

              <div className="w-full md:max-w-[480px] max-w-[280px]">
                <CustomInput
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  labelCls="font-Gordita-Medium label-text leading-[22.8px] text-[#000000]"
                  placeholder="Enter email here"
                  className="md:px-2 px-1 py-0 border border-[#CFCFCF] rounded-[4px] w-full"
                  rootCls="md:px-2 px-1 md:py-0 py-0"
                  onChange={handleInputChange}
                  errorMsg={errors.email}
                />
              </div>

              <div className="flex flex-col md:gap-y-[8px] gap-y-[4px] w-full md:max-w-[480px] max-w-[280px] md:px-3 px-0 md:mt-0 mt-1">
                <SingleSelect
                  type="single-select"
                  label="Service Category"
                  labelCls="label-text"
                  name="serviceType"
                  options={categoryData}
                  rootCls="border-b-[1px] md:py-1 py-0 w-full border border-[#CFCFCF] rounded-[4px]"
                  buttonCls="border-none rounded-[4px]"
                  selectedOption={
                    categoryData.find(
                      (item: any) => item.role === formData.serviceType
                    ) || categoryData[0]
                  }
                  optionsInterface={{
                    isObj: true,
                    displayKey: "role",
                  }}
                  handleChange={(name, value) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      serviceType: value.role,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="flex flex-col gap-3 border-2 shadow border-gray-200 md:p-3 px-2 py-1 rounded-md">
            <h2 className="font-Gordita-Medium md:text-[18px] text-[14px] text-[#5297FF]">
              Property Details
            </h2>
            <div className="w-full grid grid-cols-2 md:grid-cols-2 gap-y-1 gap-x-3">
              <div className="w-full md:max-w-[480px] max-w-[280px]">
                <CustomInput
                  label="BHK"
                  type="text"
                  name="bhk"
                  value={formData.bhk}
                  labelCls="font-Gordita-Medium label-text leading-[22.8px] text-[#000000]"
                  placeholder="e.g., 2, 3, 4"
                  className="md:px-2 px-1 py-0 border border-[#CFCFCF] rounded-[4px] w-full"
                  rootCls="md:px-2 px-1 md:py-0 py-0"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col md:gap-y-[8px] gap-y-[4px] w-full md:max-w-[480px] max-w-[280px]">
                <SingleSelect
                  type="single-select"
                  label="Property Type"
                  labelCls="label-text"
                  name="propertytype"
                  options={propertytypedata}
                  rootCls="border-b-[1px] px-1 md:py-1 py-0 w-full border border-[#CFCFCF] rounded-[4px]"
                  buttonCls="border-none"
                  selectedOption={
                    propertytypedata.find(
                      (item: any) => item.propertytype === formData.propertytype
                    ) || propertytypedata[0]
                  }
                  required
                  optionsInterface={{
                    isObj: true,
                    displayKey: "propertytype",
                  }}
                  handleChange={(name, value) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      propertytype: value.propertytype,
                    }))
                  }
                />
              </div>

              <div className="flex flex-col md:gap-y-[8px] gap-y-[4px] w-full md:max-w-[480px] max-w-[280px] md:mt-0 mt-1">
                <CustomInput
                  label="City"
                  type="text"
                  name="city"
                  value={formData.city}
                  labelCls="font-Gordita-Medium label-text leading-[22.8px] text-[#000000]"
                  placeholder="Enter city"
                  className="md:px-2 px-1 py-0 border border-[#CFCFCF] rounded-[4px] w-full"
                  rootCls="md:px-2 px-1 md:py-0 py-0"
                  onChange={handleInputChange}
                  required
                  errorMsg={errors.city}
                />
              </div>

              <div className="flex flex-col md:gap-y-[8px] gap-y-[4px] w-full md:max-w-[480px] max-w-[280px] md:mt-0 mt-1">
                <SingleSelect
                  type="single-select"
                  label="State"
                  labelCls="label-text"
                  placeholder="Select State"
                  name="state"
                  options={statesOptions}
                  rootCls="border-b-[1px] px-1 md:py-1 py-0 w-full border border-[#CFCFCF] rounded-[4px]"
                  buttonCls="border-none"
                  selectedOption={
                    statesOptions.find((item) => item === formData.state) ||
                    statesOptions[0]
                  }
                  required
                  optionsInterface={{
                    isObj: false,
                  }}
                  handleChange={(name, value) =>
                    setFormData((prev: any) => ({ ...prev, state: value }))
                  }
                />
                {errors.state && (
                  <span className="text-red-500 text-[10px]">
                    {errors.state}
                  </span>
                )}
              </div>

              {/* Additional Address Fields */}
              <div className="w-full md:max-w-[480px] max-w-[280px]">
                <CustomInput
                  label="House No"
                  type="text"
                  name="houseNo"
                  value={formData.houseNo}
                  labelCls="font-Gordita-Medium label-text leading-[22.8px] text-[#000000]"
                  placeholder="House/Flat number"
                  className="md:px-2 px-1 py-0 border border-[#CFCFCF] rounded-[4px] w-full"
                  rootCls="md:px-2 px-1 md:py-0 py-0"
                  onChange={handleInputChange}
                />
              </div>

              <div className="w-full md:max-w-[480px] max-w-[280px]">
                <CustomInput
                  label="Apartment/Street"
                  type="text"
                  name="apartmentName"
                  value={formData.apartmentName}
                  labelCls="font-Gordita-Medium label-text leading-[22.8px] text-[#000000]"
                  placeholder="Building/Street name"
                  className="md:px-2 px-1 py-0 border border-[#CFCFCF] rounded-[4px] w-full"
                  rootCls="md:px-2 px-1 md:py-0 py-0"
                  onChange={handleInputChange}
                />
              </div>

              <div className="w-full md:max-w-[480px] max-w-[280px]">
                <CustomInput
                  label="Area/Locality"
                  type="text"
                  name="areaName"
                  value={formData.areaName}
                  labelCls="font-Gordita-Medium label-text leading-[22.8px] text-[#000000]"
                  placeholder="Area or locality"
                  className="md:px-2 px-1 py-0 border border-[#CFCFCF] rounded-[4px] w-full"
                  rootCls="md:px-2 px-1 md:py-0 py-0"
                  onChange={handleInputChange}
                />
              </div>

              <div className="w-full md:max-w-[480px] max-w-[280px]">
                <CustomInput
                  label="Pincode"
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  labelCls="font-Gordita-Medium label-text leading-[22.8px] text-[#000000]"
                  placeholder="6-digit pincode"
                  className="md:px-2 px-1 py-0 border border-[#CFCFCF] rounded-[4px] w-full"
                  rootCls="md:px-2 px-1 md:py-0 py-0"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Lead Details */}
          <div className="flex flex-col gap-3 border-2 shadow border-gray-200 md:p-3 px-2 py-1 rounded-md">
            <h2 className="font-Gordita-Medium md:text-[18px] text-[14px] text-[#5297FF]">
              Lead Details
            </h2>
            <div className="w-full grid grid-cols-2 md:grid-cols-2 gap-y-1 gap-x-2">
              <div className="flex flex-col md:gap-y-[8px] gap-y-[6px] w-full md:max-w-[480px] max-w-[280px] md:px-2 px-0 md:mt-0 mt-1">
                <SingleSelect
                  type="single-select"
                  name="leadstatus"
                  options={leaddata}
                  label="Lead Status"
                  labelCls="label-text"
                  rootCls="border-b-[1px] px-1 md:py-1 py-0 w-full border border-[#CFCFCF] rounded-[4px]"
                  buttonCls="border-none"
                  selectedOption={
                    leaddata.find(
                      (item: any) => item.leadstatus === formData.leadstatus
                    ) || leaddata[0]
                  }
                  optionsInterface={{
                    isObj: true,
                    displayKey: "leadstatus",
                  }}
                  handleChange={(name, value) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      leadstatus: value.leadstatus,
                    }))
                  }
                />
              </div>

              <div className="w-full md:max-w-[480px] max-w-[280px]">
                <CustomInput
                  label="Review / Notes"
                  type="textarea"
                  name="review"
                  value={formData.review}
                  labelCls="font-Gordita-Medium label-text leading-[22.8px] text-[#000000]"
                  placeholder="Add notes or review"
                  className="md:px-2 px-1 py-0 border border-[#CFCFCF] rounded-[4px] w-full"
                  rootCls="md:px-2 px-1 md:py-0 py-0"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Source Information */}
          <div className="flex flex-col gap-3 border-2 shadow border-gray-200 md:p-3 px-2 py-1 rounded-md">
            <h2 className="font-Gordita-Medium md:text-[18px] text-[14px] text-[#5297FF]">
              Source Information
            </h2>
            <div className="w-full grid grid-cols-2 md:grid-cols-2 gap-y-1 gap-x-3">
              <div className="flex flex-col md:gap-y-[8px] gap-y-[4px] w-full md:max-w-[480px] max-w-[280px] md:px-3 px-0 md:mt-0 mt-1">
                <SingleSelect
                  type="single-select"
                  label="Platform"
                  labelCls="label-text"
                  name="platform"
                  options={platformData}
                  rootCls="border-b-[1px] px-1 md:py-1 py-0 w-full border border-[#CFCFCF] rounded-[4px]"
                  buttonCls="border-none"
                  selectedOption={
                    platformData.find(
                      (item: any) => item.platform === formData.platform
                    ) ||
                    platformData.find((item: any) => item.platform === "Walkin")
                  }
                  optionsInterface={{
                    isObj: true,
                    displayKey: "platform",
                  }}
                  handleChange={(name, value) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      platform: value.platform,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 md:static bg-white flex flex-row justify-between mt-10 mb-5">
            <Button
              className="md:py-[6px] py-[4px] md:px-[18px] px-[16px] rounded-[4px] border-2 btn-text border-[#3B82F6]"
              type="button"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="md:py-[4px] py-[4px] md:px-[18px] px-[16px] rounded-[6px] border-2 btn-text bg-[#3B82F6] text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : leadId ? "Update Lead" : "Create Lead"}
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  );
}
