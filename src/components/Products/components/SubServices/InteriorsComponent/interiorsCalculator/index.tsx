import CustomInput from "@/common/FormElements/CustomInput";
import { useEffect, useState } from "react";
import { CostBreakdown } from "./CostBreakdown";
import apiClient from "@/utils/apiClient";
import Button from "@/common/Button";
import { budgetDetails } from "@/utils/interiorshelper";
import { CheckIcon } from "lucide-react";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import SingleSelect from "@/common/FormElements/SingleSelect";
// import { ServiceCategory } from "@/utils/solar/solar-data";
import {
  MdArrowBack,
  MdArrowForward,
  MdFormatPaint,
  MdBedroomParent,
  MdKitchen,
  MdAttachMoney,
  MdHomeWork,
  MdOutlineHouse,
  MdTimer,
  MdVerified,
  MdHome,
  MdLocationCity,
  MdOutlineCategory,
  MdContactMail,
} from "react-icons/md";
import {
  HiCheck,
  HiCheckCircle,
  HiOutlineLightBulb,
  HiOutlineClipboardList,
  HiOutlineHome,
} from "react-icons/hi";
import {
  FaCouch,
  FaLayerGroup,
  FaUtensils,
  FaRegLightbulb,
  FaStar,
  FaCrown,
} from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import ThemeLoader from "@/common/ThemeLoader";

export interface FormData {
  bhkType: string;
  rooms: {
    livingRoom: number;
    kitchen: number;
    bedroom: number;
    bathroom: number;
    dining: number;
  };
  package: string;
  name: string;
  phone: string;
  state: string;
  city: string;
  propertytype: string;
}

interface Package {
  name: string;
  price: string;
  features: string[];
  headerCls?: string;
  ringCls?: string;
  borderCls?: string;
}

interface RadioButtonProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  className?: string;
}
 enum ServiceCategory {
  RealEstate = "RealEstate",
  Interiors = "Interiors",
  CustomBuilder = "CustomBuilder",
  Solar = "Solar",
  PackersAndMovers = "PackersAndMovers",
  Painting = "Painting",
  Plumber = "Plumber",
  EarthMovers = "EarthMovers",
  HomeDecor = "HomeDecor",
  Furniture = "Furniture",
  CivilEngineeringDesign = "CivilEngineeringDesign",
  VaastuConsultation = "VaastuConsultation",
}

interface FormField {
  id: "name" | "city" | "phone" | "property";
  label: string;
  type: string;
}

const formFields: FormField[] = [
  { id: "name", label: "Name", type: "text" },
  { id: "phone", label: "Phone Number", type: "tel" },
  { id: "city", label: "City", type: "text" },
];

export const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  name,
  value,
  checked,
  onChange,
  className = "",
  children,
}) => (
  <label
    htmlFor={id}
    className={`flex items-center space-x-1 border p-2 rounded cursor-pointer 
            ${checked
        ? "bg-[#5297ff] text-slate-100"
        : "bg-white border-gray-300 hover:bg-blue-50"
      }
             ${className}`}
  >
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="hidden"
    />
    <span className={`${checked ? "text-white" : "text-gray-800"} text-sm`}>
      {children}
    </span>
  </label>
);

export const stateOptions = [
  { id: 1, name: "Telangana" },
  { id: 2, name: "Andhra Pradesh" },
  { id: 3, name: "Maharashtra" },
];

const InteriorsCostEstimator: React.FC = () => {
  const [showResults, setShowResults] = useState<boolean>(false);

  const [expandedPackages, setExpandedPackages] = useState<{
    [key: string]: boolean;
  }>({});

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const defaultBedroomsByBHK: Record<string, number> = {
    "1BHK": 1,
    "2BHK": 2,
    "3BHK": 3,
    "4BHK": 4,
    "5BHK": 5,
  };
  const [formData, setFormData] = useState<FormData>({
    bhkType: "1bhk",
    rooms: {
      livingRoom: 1,
      kitchen: 1,
      bedroom: 1,
      bathroom: 1,
      dining: 0,
    },
    package: "Basic",
    name: "",
    city: "",
    phone: "",
    propertytype: "Flat",
    state: "Telangana",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const toggleDetails = (pkgName: string) => {
    setExpandedPackages((prev) => ({
      ...prev,
      [pkgName]: !prev[pkgName],
    }));
  };

  useEffect(() => {
    const updatedBedrooms =
      defaultBedroomsByBHK[formData.bhkType.toUpperCase()];
    if (formData.rooms.bedroom !== updatedBedrooms) {
      setFormData((prev) => ({
        ...prev,
        rooms: {
          ...prev.rooms,
          bedroom: updatedBedrooms,
        },
      }));
    }
  }, [formData.bhkType]);

  function getFeaturesForPackage(
    bhkType: string,
    packageType: string
  ): string[] {
    const bhkEntry = budgetDetails.find((entry) =>
      entry.bhk.toLowerCase().startsWith(bhkType.toLowerCase())
    );

    const matchedPackage = bhkEntry?.packages.find(
      (pkg) => pkg.type.toLowerCase() === packageType.toLowerCase()
    );

    return matchedPackage?.features.map((f) => f.description) || [];
  }

  const PACKAGE_META = {
    Basic: "₹₹",
    Standard: "₹₹₹",
    Premium: "₹₹₹₹",
  };

  const packages: Package[] = Object.entries(PACKAGE_META).map(
    ([type, price]) => {
      let headerCls = "";
      let ringCls = "";
      let borderCls = "";

      if (type === "Basic") {
        headerCls = "from-yellow-200 to-blue-400";
        ringCls = "ring-yellow-400";
        borderCls = "border-yellow-400";
      } else if (type === "Premium") {
        headerCls = "from-yellow-600 to-blue-700";
        ringCls = "ring-sky-600";
        borderCls = "border-sky-600";
      } else if (type === "Standard") {
        headerCls = "from-gray-400 to-blue-600";
        ringCls = "ring-amber-500";
        borderCls = "border-amber-500";
      }

      return {
        name: type,
        price,
        features: getFeaturesForPackage(formData.bhkType, type),
        headerCls,
        ringCls,
        borderCls,
      };
    }
  );

  const stepLabels = [
    "BHK Info",
    "Property Details",
    "Package",
    "Contact Details",
  ];
  const stepIcons = [
    <MdHome />,
    <MdLocationCity />,
    <MdOutlineCategory />,
    <MdContactMail />,
  ];

  const [errors, setErrors] = useState("");

  const getMaxRooms = () => parseInt(formData.bhkType);

  const updateRoomCount = (
    room: keyof FormData["rooms"],
    increment: boolean
  ): void => {
    const maxRooms = getMaxRooms();
    const currentCount = formData.rooms[room];

    if (increment && currentCount < maxRooms) {
      setFormData((prev) => ({
        ...prev,
        rooms: {
          ...prev.rooms,
          [room]: currentCount + 1,
        },
      }));
    } else if (!increment && currentCount > 0) {
      setFormData((prev) => ({
        ...prev,
        rooms: {
          ...prev.rooms,
          [room]: currentCount - 1,
        },
      }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setErrors("");
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handlePropertyChange = (selectedOption: {
    id: number;
    propertytype: string;
  }) => {
    setFormData({ ...formData, propertytype: selectedOption.propertytype });
  };
  const propertytypedata = [
    { id: 1, propertytype: "Flat" },
    { id: 2, propertytype: "Villa" },
    { id: 3, propertytype: "Independent House" },
    { id: 4, propertytype: "Independent Floor" },
  ];
  const validateStep = (): boolean => {
    switch (currentStep) {
      case 1:
        if (formData.bhkType === "") {
          setErrors("Please select your BHK type.");
          return false;
        }
        return true;
      case 2:
        if (!Object.values(formData.rooms).some((count) => count > 0)) {
          setErrors("Please select at least one room.");
          return false;
        }
        return true;
      case 3:
        if (formData.package === "") {
          setErrors("Please select a package.");
          return false;
        }
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderStep1 = (): JSX.Element => (
    <div className="space-y-5 max-w-2xl mx-auto">
      <h2 className="md:text-[18px] text-[16px] font-Gordita-Bold text-gray-800">
        Select <span className="text-[#5297FF] font-Gordita-Bold">BHK</span>{" "}
        Type
      </h2>
      <div className="flex flex-col md:gap-3 gap-2">
        {["1", "2", "3", "4", "5"].map((bhk) => (
          <RadioButton
            key={bhk}
            id={`${bhk}bhk`}
            name="bhkType"
            value={`${bhk}bhk`}
            checked={formData.bhkType === `${bhk}bhk`}
            onChange={handleInputChange}
            className="md:px-3  p-2 md:text-sm text-[12px] font-Gordita-Medium rounded-lg border border-gray-200 hover:border-blue-400 transition-colors"
          >
            {bhk} BHK
          </RadioButton>
        ))}
      </div>
    </div>
  );

  const renderStep2 = (): JSX.Element => (
    <div className="md:space-y-5 space-y-3 max-w-2xl mx-auto">
      <h2 className="md:text-xl text-[14px] font-Gordita-Bold text-gray-800">
        Select Rooms to Design
      </h2>
      <div className="nd:space-y-3 space-y-2 md:text-[16px] text-[12px]">
        {(
          Object.entries(formData.rooms) as [keyof FormData["rooms"], number][]
        ).map(([room, count]) => (
          <div
            key={room}
            className="flex items-center justify-between md:px-[6px] md:py-[6px] px-2 py-1 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-400"
          >
            <span className="capitalize font-Gordita-Medium text-gray-700">
              {room.replace(/([A-Z])/g, " $1")}
            </span>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => updateRoomCount(room, false)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-[#5297ff] transition"
              >
                -
              </Button>
              <span className="w-6 text-center font-semibold text-gray-800">
                {count}
              </span>
              <Button
                onClick={() => updateRoomCount(room, true)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-[#5297ff] transition"
              >
                +
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep3 = (): JSX.Element => (
    <div className="space-y-5 max-w-full w-full mx-auto max-h-[400px] overflow-x-hidden overflow-auto">
      <h2 className="md:text-xl text-[14px] font-Gordita-Bold text-gray-800">
        Select a Package
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:px-2 px-4 w-full max-w-full mx-auto">
        {packages.map((pkg) => {
          const isSelected = formData.package === pkg.name;

          const isExpanded = !!expandedPackages[pkg.name];

          const featuresToShow = isExpanded
            ? pkg.features
            : pkg.features.slice(0, 2);

          return (
            <label
              key={pkg.name}
              className={`relative self-start cursor-pointer w-full flex flex-col justify-between md:gap-4 gap-2 md:p-3 p-1 md:rounded-[12px] rounded-[6px] text-center shadow-sm transition-all duration-300
        bg-gradient-to-b ${pkg.headerCls} 
        ${formData.package === pkg.name
                  ? `ring-2 ${pkg.ringCls} ${pkg.borderCls} scale-[1.01] shadow-md`
                  : "hover:shadow-md hover:scale-[1.01] focus:ring-2 focus:ring-gray-300"
                }`}
            >
              {formData.package === pkg.name && (
                <div className="absolute -top-2 -right-2 md:w-6 w-4 md:h-6 h-4 bg-[#5297ff] rounded-full flex items-center justify-center shadow-lg">
                  <HiCheck className="md:w-4 w-2 md:h-4 h-2 text-white" />
                </div>
              )}
              <div className="flex items-start">
                <input
                  type="radio"
                  name="package"
                  value={pkg.name}
                  checked={isSelected}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className="ml-4 flex-1">
                  <div className="flex justify-between md:text-sm text-[12px]">
                    <span className="font-Gordita-Bold text-white">
                      {pkg.name}
                    </span>
                    <span className="text-white font-Gordita-Medium">
                      {pkg.price}
                    </span>
                  </div>
                  <div className="rounded-xl mr-4 border md:mt-2 mt-1 border-gray-100 bg-white md:p-2 p-1 shadow-sm">
                    <ul className="md:space-y-2 space-y-1 flex items-start flex-col ">
                      {featuresToShow.map((feature, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <HiCheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                          <span className="text-[10px] md:text-[10px] font-Gordita-Medium text-gray-700">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {pkg.features.length > 2 && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDetails(pkg.name);
                      }}
                      className="mt-2 text-white text-xs font-Gordita-Medium underline focus:outline-none"
                    >
                      {isExpanded ? "Hide Details" : "More Details"}
                    </Button>
                  )}
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );

  const renderStep4 = (): JSX.Element => (
    <div className="space-y-5 max-w-2xl mx-auto">
      <h2 className="md:text-xl text-[14px] font-Gordita-Bold text-gray-800">
        Get Your Quote
      </h2>
      <div className=" space-y-2">
        {formFields.map((field) => (
          <div key={field.id} className="relative">
            <CustomInput
              type={field.type === "tel" ? "number" : "text"}
              name={field.id === "property" ? "propertyName" : field.id}
              labelCls="font-Gordita-Medium text-gray-700 md:text-[14px] text-[12px]"
              label={field.label}
              placeholder={`Enter the ${field.type}`}
              rootCls="w-full"
              outerInptCls="bg-white"
              className="md:py-[2px] py-[2px] px-2 border border-gray-200 rounded-md"
              value={formData[field.id as keyof FormData]}
              onChange={handleInputChange}
              required
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col  gap-y-[4px] w-full">
        <SingleSelect
          label=" State "
          type="single-select"
          name="state"
          required
          labelCls="font-Gordita-Medium md:mb-0 text-gray-700 md:text-[14px] text-[12px]"
          options={stateOptions}
          rootCls="border-b-[1px]  px-1 w-full border border-[#CFCFCF] rounded-[4px] bg-white"
          buttonCls="border-none"
          optionCls="md:text-[14px]  text-[12px] font-Gordita-Medium hover:bg-gray-300 text-gray-700 max-w-[300px]"
          selectedOption={
            stateOptions.find((item) => item.name === formData.state) ||
            stateOptions[0]
          }
          optionsInterface={{
            isObj: true,
            displayKey: "name",
          }}
          handleChange={(name, value) =>
            handleInputChange({
              target: { name, value: value.name },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        />
      </div>
      <div className="flex flex-col  gap-y-[4px] w-full ">
        <SingleSelect
          label="Property Type"
          required
          type="single-select"
          name="propertytype"
          labelCls="font-Gordita-Medium text-gray-700 md:text-[14px] text-[12px]"
          options={propertytypedata}
          rootCls="border-b-[1px]  px-1  w-full border w-full border-[#CFCFCF] w-full rounded-[4px] bg-white "
          buttonCls="border-none"
          optionCls="md:text-[14px] text-[12px] font-Gordita-Medium hover:bg-gray-300 text-gray-700 max-w-[300px]"
          selectedOption={
            propertytypedata.find(
              (item) => item.propertytype === formData.propertytype
            ) || { id: 1, propertytype: "Flat" }
          }
          optionsInterface={{
            isObj: true,
            displayKey: "propertytype",
          }}
          handleChange={(name, value) => handlePropertyChange(value)}
        />
      </div>
    </div>
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (hasSubmitted) {
      setShowResults(true);
      return;
    }
    if (currentStep === 4) {
      const nameIsValid = formData.name.trim() !== "";
      const cityIsValid = formData.city.trim() !== "";
      const phoneIsValid = /^\d{10}$/.test(formData.phone);

      if (!nameIsValid || !cityIsValid) {
        setErrors("Please enter all the required fields.");
        toast.error("Please fill in all required fields.");
        return;
      }

      if (!phoneIsValid) {
        setErrors("Please enter a valid phone number.");
        toast.error("Phone number must be 10 digits.");
        return;
      }
    }
    setLoading(true);
    const payload = {
      Fullname: formData.name,
      Phonenumber: formData.phone,
      bhk: formData.bhkType || "N/A",
      propertytype: formData.propertytype || "flat",
      package: formData.package,
      rooms: formData.rooms,
      city: formData.city,
      platform: "Website",
      serviceType: ServiceCategory.Interiors,
      leadstatus: "New",
      state: formData.state,
    };

    try {
      const response = await apiClient.post(apiClient.URLS.crmlead, payload);

      if (response?.status === 201) {
        setShowResults(true);
        setLoading(false);
        toast.success("Team will reach out to you soon 🤝");
      }
    } catch (error: any) {
      setLoading(false);

      if (error?.status === 409) {
        toast(
          "A lead with these details already exists. We'll reach out to you soon."
        );
        setShowResults(true);
        return;
      }
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const handleNextStep = () => {
    if (!validateStep()) return;
    setErrors("");
    setCurrentStep((prev) => prev + 1);
  };

  const renderCurrentStep = (): JSX.Element => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return <div>Invalid step</div>;
    }
  };
  interface StepSideContentProps {
    step: number;
  }
  const StepSideContent: React.FC<StepSideContentProps> = ({ step }) => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center justify-center w-full text-center space-y-3 md:space-y-6 md:px-4 px-2">
            <div className="relative">
              <div className="md:w-20 w-14 md:h-20 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500  shadow-xl transform hover:scale-105 transition-transform duration-300">
                <MdHomeWork className="md:w-10 w-7 md:h-10 h-7 text-white" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 blur-lg opacity-30 -z-10 animate-pulse"></div>
            </div>

            <h1 className="text-[16px] md:text-[20px] lg:text-[28px] font-Gordita-Bold text-white leading-tight tracking-tight">
              Interior Cost{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
                Estimator
              </span>
              <div className="w-20 h-1 bg-gradient-to-r mt-1 from-yellow-400 to-orange-500 rounded-full mx-auto shadow-lg"></div>
            </h1>

            <p className="text-gray-100 text-[12px] md:text-[16px] font-Gordita-Medium max-w-md leading-relaxed bg-white/10 backdrop-blur-sm md:p-4 p-2 rounded-xl border border-white/20">
              Quickly estimate your interior design cost. Get a transparent,
              realistic budget for your dream home in just a few steps.
            </p>

            <div className="flex flex-wrap justify-center md:gap-3 gap-1">
              {[
                "AI-Powered Estimates",
                "Real-Time Pricing",
                "No Hidden Costs",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm md:px-4 px-2 md:py-2 py-1 rounded-2xl border border-white/20 hover:scale-105 transition-transform duration-200"
                >
                  <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-yellow-400 via-orange-400 to-pink-400 animate-pulse-fast"></div>
                  <span className="text-gray-200 text-[10px] md:text-[13px] font-Gordita-Medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col items-center justify-center w-full text-center space-y-3 md:space-y-6 md:px-4 px-2">
            <div className="relative">
              <div className="flex items-center justify-center md:w-20 w-14 md:h-20 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500   shadow-2xl shadow-yellow-500/30 hover:shadow-yellow-500/40 transition-all duration-300 hover:scale-105">
                <FaCouch className="w-7 h-7 md:w-10 md:h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="md:text-[13px] text-[10px] font-Gordita-Bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  2
                </span>
              </div>
            </div>

            <div className="relative flex flex-col items-center md:space-y-3 space-y-1">
              <div className="space-y-1">
                <span className="md:text-[16px] text-[12px] font-Gordita-Medium text-yellow-500 uppercase tracking-wider">
                  Design Phase
                </span>
                <h2 className="text-[14px] md:text-[18px] font-Gordita-Bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                  Select Rooms
                </h2>
              </div>
            </div>

            <div className="max-w-md">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl md:p-6 p-3 border border-white/20 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300">
                <p className="text-gray-100 text-[12px] md:text-[14px] leading-relaxed font-Gordita-Medium">
                  Choose the rooms you want to design. This helps us estimate
                  the cost per space accurately.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-3 gap-1 max-w-2xl w-full">
              {[
                {
                  name: "Living Room",
                  icon: <FaCouch className="md:w-5 w-3 md:h-5 h-3" />,
                  color: "from-[#5297ff] to-cyan-500",
                },
                {
                  name: "Bedroom",
                  icon: <MdBedroomParent className="md:w-5 w-3 md:h-5 h-3" />,
                  color: "from-purple-500 to-pink-500",
                },
                {
                  name: "Kitchen",
                  icon: <MdKitchen className="md:w-5 w-3 md:h-5 h-3" />,
                  color: "from-orange-500 to-red-500",
                },
                {
                  name: "Bathroom",
                  icon: <FaLayerGroup className="md:w-5 w-3 md:h-5 h-3" />,
                  color: "from-teal-500 to-[#5297ff]",
                },
                {
                  name: "Dining Room",
                  icon: <FaUtensils className="md:w-5 w-3 md:h-5 h-3" />,
                  color: "from-green-500 to-emerald-500",
                },
              ].map(({ name, icon, color }) => (
                <div key={name} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 md:p-4 p-2 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>

                    <div
                      className={`relative z-10 md:w-12 w-8 md:h-12 h-8 mx-auto md:mb-3 mb-1 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                    >
                      <div className="text-white">{icon}</div>
                    </div>

                    <span className="relative z-10 text-[12px] md:text-[14px] font-Gordita-Medium text-white group-hover:text-purple-100 transition-colors duration-300">
                      {name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="relative flex flex-col items-center justify-center w-full text-center space-y-4 md:space-y-6 md:px-4 px-2 overflow-hidden">
            <div className="absolute -top-10 left-10 w-32 h-32 bg-yellow-400/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>

            <div className="relative flex items-center justify-center md:w-20 w-14 md:h-20 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 shadow-[0_0_25px_rgba(255,200,50,0.5)] hover:shadow-[0_0_40px_rgba(255,180,30,0.6)] transition-all duration-300 hover:scale-105">
              <MdAttachMoney className="md:w-10 w-7 md:h-10 h-7 text-white" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="md:text-[13px] text-[10px] font-Gordita-Bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  3
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-[14px] md:text-[18px] font-Gordita-Bold bg-gradient-to-r from-yellow-300 to-orange-100 bg-clip-text text-transparent drop-shadow-md">
                Choose Your Perfect Package
              </h2>
              <p className="text-gray-100 md:text-[16px] text-[12px] font-Gordita-Medium max-w-md mx-auto leading-relaxed">
                Select a package that aligns with your vision and budget. Each
                option offers unique design quality, finish levels, and
                customization flexibility.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:gap-3 gap-1 md:mt-4 mt-1 max-w-md">
              {[
                {
                  title: "Basic",
                  desc: "Affordable essentials with elegant design elements.",
                  color: "from-yellow-400/40 to-orange-400/30",
                  icon: (
                    <FaRegLightbulb className="md:w-6 w-3 md:h-6 h-3 text-yellow-300" />
                  ),
                },
                {
                  title: "Standard",
                  desc: "Balanced style with quality finishes and smart layouts.",
                  color: "from-yellow-500/40 to-orange-500/30",
                  icon: (
                    <FaStar className="md:w-6 w-3 md:h-6 h-3 text-yellow-200" />
                  ),
                },
                {
                  title: "Premium",
                  desc: "Luxurious detailing, top materials, and full customization.",
                  color: "from-yellow-600/40 to-orange-600/30",
                  icon: (
                    <FaCrown className="md:w-6 w-3 md:h-6 h-3 text-yellow-100" />
                  ),
                },
              ].map((pkg) => (
                <div
                  key={pkg.title}
                  className={`md:p-4 p-2 rounded-xl border border-yellow-400/40 bg-gradient-to-br ${pkg.color} text-white backdrop-blur-sm hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300`}
                >
                  <div className="flex items-center justify-center md:mb-3 mb-1">
                    {pkg.icon}
                  </div>
                  <h3 className="text-[12px] md:text-[16px] font-Gordita-Bold">
                    {pkg.title}
                  </h3>
                  <p className="text-[10px] md:text-[12px] text-yellow-100/90">
                    {pkg.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="md:mt-6 mt-3 max-w-sm flex items-center justify-center gap-2 bg-white/10 text-yellow-100 md:text-[13px] text-[10px] md:px-4 px-2 md:py-2 py-2 rounded-full border border-yellow-400/30 backdrop-blur-md shadow-sm">
              <BsChatDotsFill className="text-yellow-300 md:text-lg text-[12px]" />
              <p className="font-Gordita-Medium">
                Compare packages to see which best fits your home style and
                budget.
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="relative flex flex-col items-center justify-center w-full text-center space-y-4 md:space-y-6 md:px-4 px-2 overflow-hidden h-full">
            <div className="absolute -top-16 -left-10 w-56 h-56 bg-yellow-400/20 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]"></div>
            <div className="absolute -bottom-16 -right-10 w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 opacity-70 animate-pulse"></div>
              <div className="relative flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-2xl shadow-yellow-500/40 group-hover:shadow-yellow-500/60 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <MdAttachMoney className="w-7 h-7 md:w-10 md:h-10 text-white drop-shadow-lg" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="md:text-[13px] text-[10px] font-Gordita-Bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  4
                </span>
              </div>
            </div>

            <div className="md:space-y-4 space-y-2 max-w-2xl">
              <div className="md:space-y-3 space-y-1">
                <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md md:px-4 px-2 md:py-2 py-1 rounded-full border border-yellow-400/20 mb-2">
                  <span className="md:w-2 w-1 md:h-2 h-1 bg-yellow-400 rounded-full animate-ping"></span>
                  <span className="text-yellow-300 text-[10px] md:text-[12px] font-Gordita-Medium uppercase tracking-wider">
                    Instant Quote
                  </span>
                </div>
                <h2 className="text-[14px] md:text-[18px] font-Gordita-Bold">
                  <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
                    Get Your Personalized Estimate
                  </span>
                </h2>
              </div>
              <p className="text-gray-200/90 text-[12px] md:text-[14px] leading-relaxed font-light max-w-2xl mx-auto">
                Enter your details below to receive a tailored interior design
                cost estimate instantly. Our process is quick, transparent, and
                designed for your specific property and needs.
              </p>
            </div>

            <div className="flex flex-row md:flex-nowrap flex-wrap sm:flex-row items-center justify-center md:gap-4 gap-2 md:mt-6 mt-3 max-w-md mx-auto">
              {[
                {
                  icon: (
                    <MdOutlineHouse className="md:w-6 w-3 md:h-6 h-3 text-white" />
                  ),
                  title: "Property Details",
                  desc: "Enter your property info",
                },
                {
                  icon: (
                    <MdTimer className="md:w-6 w-3 md:h-6 h-3 text-white" />
                  ),
                  title: "Quick Estimate",
                  desc: "Instant calculation of costs",
                },
                {
                  icon: (
                    <MdVerified className="md:w-6 w-3 md:h-6 h-3 text-white" />
                  ),
                  title: "Reliable Data",
                  desc: "Professional & accurate ",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center md:p-4 p-2 rounded-2xl bg-white/10 backdrop-blur-md border border-yellow-400/20 shadow-md w-36 hover:scale-105 transition-all duration-300"
                >
                  <div className="mb-2">{item.icon}</div>
                  <h3 className="text-white font-Gordita-Medium text-[12px] md:text-[14px] text-nowrap">
                    {item.title}
                  </h3>
                  <p className="text-yellow-100 text-[10px] md:text-[12px] font-Gordita-Regular text-center">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  if (loading)
    return (
      <div className="w-full">
        <ThemeLoader progress={100} size={120} logoSrc={'/images/logobb.png'} />
      </div>
    );

  return (
    <div
      className={`flex flex-col items-center justify-center w-full bg-cover bg-center overflow-y-auto h-full `}
      style={{ backgroundImage: "url('/Interiors/InteriorsCalculatorBg.jpg')" }}
    >
      <div className="flex flex-col items-center justify-center w-full h-full container mx-auto md:px-4 px-1 top-20">
        <div className="relative w-full text-center md:mt-4 mt-2">
          {/* Decorative background circles */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-yellow-400/30 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-1/4 w-36 h-36 bg-blue-400/20 rounded-full filter blur-2xl animate-pulse delay-200"></div>
          <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-green-400/20 rounded-full filter blur-2xl animate-pulse delay-400"></div>

          <h1 className="relative text-[18px] md:text-[24px] font-Gordita-Bold text-white md:mb-4 mb-2">
            <span className="bg-gradient-to-r from-yellow-400 via-blue-400 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
              Design Your Dream Home
            </span>
          </h1>

          <p className="relative text-[14px] md:text-[18px] font-Gordita-Medium text-gray-200 mb-2 max-w-xl mx-auto">
            Get an instant, personalized cost estimate for your interior project
            in just a few simple steps.
          </p>

          <div className="relative flex justify-center md:gap-6 gap-2 mt-2 md:mt-4">
            <div className="flex items-center justify-center md:w-12 w-8 md:h-12 h-8 bg-yellow-500/20 rounded-full animate-bounce">
              <HiOutlineHome className="md:w-6 w-4 md:h-6 h-4 text-yellow-400" />
            </div>
            <div className="flex items-center justify-center md:w-12 w-8 md:h-12 h-8 bg-[#5297ff]/20 rounded-full animate-bounce delay-150">
              <HiOutlineClipboardList className="md:w-6 w-4 md:h-6 h-4 text-blue-400" />
            </div>
            <div className="flex items-center justify-center md:w-12 w-8 md:h-12 h-8 bg-green-500/20 rounded-full animate-bounce delay-300">
              <HiOutlineLightBulb className="md:w-6 w-4 md:h-6 h-4 text-green-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center lg:gap-8 gap-4 w-full h-full md:px-4 px-2">
          <div className="flex flex-col justify-center   items-center  bg-white/10 backdrop-blur-md md:px-4  md:py-4 px-2 py-5 md:mb-0 mb-3 rounded-[6px] md:rounded-[12px] border  border-white/20">
            <StepSideContent step={currentStep} />
          </div>

          <div className="w-full h-[calc(100vh-10px)] flex items-center max-md:-mt-[80px]">
            {!showResults ? (
              <div className="w-full bg-white/95 backdrop-blur-md rounded-lg shadow-2xl p-8 md:p-10 border border-white/20">
                <div className="relative md:mb-12 mb-6 w-full">
                  <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2">
                    <div
                      className="h-full bg-gradient-to-r from-blue-200 to-[#5297ff] transition-all duration-500 ease-out"
                      style={{
                        width: `${((currentStep - 1) / (stepLabels.length - 1)) * 100
                          }%`,
                      }}
                    />
                  </div>

                  <div className="flex justify-between relative">
                    {stepLabels.map((label, idx) => {
                      const step = idx + 1;
                      const isActive = currentStep === step;
                      const isCompleted = currentStep > step;
                      const isClickable = currentStep >= step;

                      return (
                        <div
                          key={step}
                          className="flex flex-col items-center flex-1 cursor-pointer"
                          onClick={() => isClickable && setCurrentStep(step)}
                        >
                          <div
                            className={`md:w-10 w-8 md:h-10 h-8 flex items-center justify-center rounded-full md:text-[14px] text-[10px] font-Gordita-Bold relative z-10 transition-all duration-300 transform
                  ${isActive
                                ? "bg-white-500 text-blue shadow-lg shadow-[#5297ff]/30 scale-110 ring-4 ring-blue-100"
                                : isCompleted
                                  ? "bg-[#5297ff] text-white shadow-lg shadow-green-500/30 scale-105"
                                  : "bg-gray-100 text-gray-400 shadow"
                              }`}
                          >
                            {isCompleted ? (
                              <HiCheck className="w-5 h-5" />
                            ) : (
                              stepIcons[idx]
                            )}
                          </div>

                          <p
                            className={`md:text-[14px] text-[10px] text-nowrap font-Gordita-Medium mt-2 transition-colors duration-300 ${isActive
                              ? "text-[#5297ff] font-Gordita-Bold"
                              : isCompleted
                                ? "text-[#5297ff]"
                                : "text-gray-500"
                              }`}
                          >
                            {label}
                          </p>

                          <span className="md:text-[12px] text-[10px] font-Gordita-Regular mt-1 text-gray-400">
                            {isCompleted
                              ? "Completed"
                              : isActive
                                ? "Active"
                                : "Pending"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="min-h-[290px]">{renderCurrentStep()}</div>
                {errors && (
                  <p className="mt-4 text-red-500 text-sm font-Gordita-Medium">
                    {errors}
                  </p>
                )}
                <div className="mt-6 text-xs text-gray-600 text-center ">
                  <p className="italic">
                    <span className="text-red-500">*Note</span>: This is an
                    average cost estimate based on standard area sizes and
                    pricing per sq.ft. Final costs may vary significantly
                    depending on exact room dimensions, materials, and design
                    choices.{" "}
                    <span className="underline text-[#5297FF] font-Gordita-Medium cursor-pointer">
                      Terms & Conditions apply
                    </span>
                    .
                  </p>
                </div>
                <div className="flex justify-between mt-4 border-t  border-gray-100">
                  {currentStep > 1 && (
                    <Button
                      onClick={() => {
                        setErrors("");
                        setCurrentStep((prev) => prev - 1);
                      }}
                      className="group flex items-center gap-2 px-6 md:py-2 py-[6px] text-gray-600 bg-gray-200 rounded-md border-gray-300 hover:bg-gray-100 hover:text-gray-700 transition-all duration-300"
                    >
                      <MdArrowBack />
                      <span className="font-Gordita-Medium md:text-[16px] text-[14px]">
                        Previous
                      </span>
                    </Button>
                  )}
                  <Button
                    onClick={currentStep < 4 ? handleNextStep : handleSubmit}
                    className="flex items-center gap-2 px-6  md:py-2 py-1 ml-auto rounded-md font-Gordita-Medium bg-gradient-to-r from-[#5297ff] to-[#5297ff] text-white
                hover:from-[#5297ff] hover:to-[#5297ff]
                transform hover:scale-105 transition-all duration-300
                focus:ring-2 focus:ring-blue-to-[#5297ff] focus:ring-offset-2"
                  >
                    {currentStep < 4 ? (
                      <div className="md:text-[16px] gap-1 text-[14px] font-Gordita-Medium flex flex-row  items-center">
                        Next
                        <MdArrowForward />
                      </div>
                    ) : (
                      <p className="text-nowrap md:text-[16px] text-[14px]">
                        Get My Estimate
                      </p>
                    )}
                  </Button>
                </div>
                <div></div>
              </div>
            ) : (
              <CostBreakdown
                formData={formData}
                setShowResults={setShowResults}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteriorsCostEstimator;
