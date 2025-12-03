import Image from "next/image";
import React, { useState, useEffect } from "react";
import { MdArrowBack, MdConstruction } from "react-icons/md";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Info,
  ClipboardCheck,
  HelpCircle,
  Milestone,
} from "lucide-react";
import Button from "@/common/Button";
import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  CurrentDayInfo,
  findCurentDayInfo,
  getDatesBetween,
  getTheLastDate,
  MonthData,
} from "@/utils/customBuilder/date-functions";
import { FaUserAlt } from "react-icons/fa";
import { useCustomBuilderStore } from "@/store/useCustomBuilderStore ";
import { TourStep, useTour } from "@/common/FeatureTour";



const pieChartConfig = {
  progress: { label: "Progress" },
  completed: { label: "Completed", color: "#3586FF" },
  remain: { label: "Remain", color: "#E6F0FF" },
} satisfies ChartConfig;

const CustomBuilderDetailsView = () => {
  const router = useRouter();
  const custom_builder_id = Number(router?.query?.id);

  const { data: customBuilder, fetchData, isLoading } = useCustomBuilderStore();
  const { open } = useTour();

  const buildSteps = (): TourStep[] => ([
    {
      id: "hero",
      selector: "#cb-hero",
      title: "Welcome Panel",
      content: <>See project name, latest stage and quick photo collage.</>,
      placement: "bottom",
    },
    {
      id: "progress",
      selector: "#cb-progress",
      title: "Construction Progress",
      content: <>Blue shows completed work from your daily logs.</>,
      placement: "left",
    },
    {
      id: "quicklinks",
      selector: "#cb-quicklinks",
      title: "Quick Links",
      content: <>Jump to Overview, Documents, Gallery, Property Info, Services, Queries, and Phases.</>,
      placement: "top",
    },
    {
      id: "overview",
      selector: "#cb-overview",
      title: "Days Overview",
      content: <>Track Day/Week/Month bars with live counters.</>,
      placement: "top",
    },
    {
      id: "phases",
      selector: "#cb-phases",
      title: "Phases",
      content: <>Compare planned vs actual and browse phase-wise updates.</>,
      placement: "right",
    },
  ]);

  const startTour = () => open(buildSteps());


  const [pieChartData, setPieChartData] = useState([
    { work: "completed", progress: 0, fill: "#3586FF" },
    { work: "remain", progress: 100, fill: "#E6F0FF" },
  ]);
  const [lineChartData, setLineChartData] = useState<any>();

  const [timeframe, setTimeframe] = useState<MonthData>({});
  const [currentDayInfo, setCurrentDayInfo] = useState<CurrentDayInfo>();

  const weekPercentage =
    currentDayInfo &&
    (
      (currentDayInfo?.currentWeek / currentDayInfo?.totalWeeks) *
      100
    )?.toFixed();
  const dayPercentage =
    currentDayInfo && ((currentDayInfo?.today / 7) * 100)?.toFixed();
  const monthPercentage =
    currentDayInfo &&
    (
      (currentDayInfo?.currentMonth / currentDayInfo?.totalMonths) *
      100
    )?.toFixed();

  const extractLineChartData = () => {
    if (!customBuilder?.logs || !timeframe) return;
    const chartData: any = {};
    Object.values(timeframe)?.forEach((month: any) => {
      Object.entries(month)?.forEach((keyValue: any) => {
        const week = keyValue[1];
        const weekName = keyValue[0];
        if (!chartData[weekName]) chartData[weekName] = [];
        week?.forEach((day: any) => {
          const log = customBuilder?.logs?.find(
            (item: any) =>
              item?.date === day?.date && item?.status === "Completed"
          );
          if (log) chartData[weekName].push(log);
        });
      });
    });
    const data: any = [];
    Object.entries(chartData)?.forEach((kv: any) => {
      const weekLogs = kv[1];
      const weekNo = kv[0];
      const percentage =
        weekLogs?.length !== 0
          ? Math.ceil((weekLogs?.length / customBuilder?.estimatedDays) * 100)
          : 0;
      data.push({ week: `Week ${weekNo}`, progress: percentage });
    });
    setLineChartData(data);
  };

  useEffect(() => {
    if (custom_builder_id && !customBuilder) {
      fetchData(custom_builder_id.toString());
    }
  }, [custom_builder_id]); // eslint-disable-line
  const totalEstimatedDays = customBuilder?.phases?.reduce(
    (sum: any, phase: any) => sum + (phase.plannedDays || 0),
    0
  );

  useEffect(() => {
    if (!custom_builder_id || !customBuilder) return;
    const key = `cb_tour_shown_${custom_builder_id}`;
    if (typeof window !== "undefined" && !localStorage.getItem(key)) {
      setTimeout(() => {
        startTour();
        localStorage.setItem(key, "1");
      }, 400);
    }
  }, [custom_builder_id, customBuilder]);

  useEffect(() => {
    const totalProgress =
      (customBuilder?.logs?.length / totalEstimatedDays) * 100;
    setPieChartData([
      { work: "completed", progress: totalProgress || 0, fill: "#3586FF" },
      { work: "remain", progress: 100 - (totalProgress || 0), fill: "#E6F0FF" },
    ]);
  }, [customBuilder?.logs?.length, customBuilder?.estimatedDays]);

  useEffect(() => {
    if (customBuilder?.estimatedDays) {
      const dayOne = customBuilder?.logs?.find((i: any) => i?.day === 1);
      if (dayOne) {
        const startDate = dayOne?.date;
        const endDate = getTheLastDate(startDate, customBuilder?.estimatedDays);
        const dateRange = getDatesBetween(startDate, endDate);
        setTimeframe(dateRange);
      }
    }
  }, [customBuilder]);

  useEffect(() => {
    const data = findCurentDayInfo(timeframe);
    setCurrentDayInfo(data);
  }, [timeframe]);

  const images =
    customBuilder?.propertyInformation?.propertyImages?.length > 0
      ? customBuilder.propertyInformation.propertyImages
      : [
        "/custom-builder/property-image-5.jpg",
        "/custom-builder/property-image-6.jpg",
        "/custom-builder/propimage.png",
      ];
  const extraCount = images.length > 3 ? images.length - 3 : 0;

  useEffect(() => {
    extractLineChartData();
  }, [timeframe, customBuilder?.logs]); // eslint-disable-line

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  const ProjectData = [
    {
      label: "Project Overview",
      icon: LayoutDashboard,
      url: `/user/custom-builder/${custom_builder_id}/projectoverview`,
    },
    {
      label: "Property Documents",
      icon: FileText,
      url: `/user/custom-builder/${custom_builder_id}/propertydocuments`,
    },
    {
      label: "Gallery",
      icon: ImageIcon,
      url: `/user/custom-builder/${custom_builder_id}/progressimages`,
    },
    {
      label: "Property Information",
      icon: Info,
      url: `/user/custom-builder/${custom_builder_id}/propertyinformation`,
    },
    {
      label: "Services Selected",
      icon: ClipboardCheck,
      url: `/user/custom-builder/${custom_builder_id}/servicesselected`,
    },
    {
      label: "Queries",
      icon: HelpCircle,
      url: `/user/custom-builder/${custom_builder_id}/queries`,
    },
    {
      label: "Phases",
      icon: Milestone,
      url: `/user/custom-builder/${custom_builder_id}/phases`,
    },
  ];

  const totalPct = Math.min(
    100,
    Math.max(
      0,
      ((customBuilder?.currentDay || 0) / (customBuilder?.estimatedDays || 1)) *
      100
    )
  );

  return (
    <div className="w-full md:px-6 px-3 py-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <Button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-800 hover:text-black dark:text-gray-200"
        >
          <MdArrowBack className="md:w-5 md:h-5 w-4 h-4" />
          <span className="font-Gordita-Medium md:text-[14px] text-[12px]">
            Back
          </span>
        </Button>
        <div className="flex flex-row gap-2">
          <Button
            onClick={() =>
              router.push(`/user/custom-builder/user/${customBuilder?.id}`)
            }
            className="bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-lg p-2"
            aria-label="Open profile"
          >
            <FaUserAlt className="md:text-[20px] text-[16px]" />
          </Button>
          <Button
            onClick={startTour}
            className="inline-flex items-center  text-[12px] bg-[#2872a1]text-white rounded-lg px-2 md:py-1  hover:bg-blue-700"
            aria-label="Take a tour of this page"
          >
            <HelpCircle className="w-3 h-3" />
          </Button>

        </div>
      </div>

      {/* Hero */}
      <SectionCard className="p-3 md:p-5 mb-5">
        <div className="mb-3">
          <h2 className="text-[16px] md:text-[20px] uppercase font-Gordita-Bold text-gray-900">
            👋 Welcome back,{" "}
            <span className="text-yellow-500">
              {customBuilder?.propertyInformation?.propertyName || "Home"}
            </span>
            !
          </h2>
          <p className="text-[12px] md:text-[14px] text-gray-500">
            Here’s the latest update on your dream home journey.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_auto] max-w-[1000px] gap-4">
          <div className="max-w-[560px]">
            <div className="rounded-lg overflow-hidden">
              <div className="grid grid-cols-2 grid-rows-2 gap-[2px] h-[140px] md:h-[230px]">
                <div className="col-span-2 relative">
                  <Image
                    src={images[0]}
                    alt="Primary"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative">
                  <Image
                    src={images[1] || images[0]}
                    alt="Second"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative">
                  <Image
                    src={images[2] || images[0]}
                    alt="Third"
                    fill
                    className={`object-cover ${extraCount > 0 ? "brightness-75" : ""
                      }`}
                  />
                  {extraCount > 0 && (
                    <div className="absolute inset-0 bg-black/40 grid place-items-center text-white text-sm md:text-base font-Gordita-Medium">
                      +{extraCount} photos
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* stage strip */}
            <div className="mt-3 flex items-start gap-2 bg-blue-50 rounded-lg p-3">
              <span className="text-yellow-500 font-semibold text-sm">
                Current Stage:
              </span>
              <span className="text-gray-700 text-sm md:text-[14px] font-Gordita-Medium">
                {customBuilder?.currentStage ||
                  "Flooring, Final Miscellaneous works and cleaning"}
              </span>
            </div>
          </div>

          {/* progress compact (mobile already below) */}
          <div className="hidden md:flex flex-col gap-3 min-w-[320px]">
            <SectionTitle
              icon={<MdConstruction className="text-[#ebb042]" />}
              title="Construction Progress"
            />
            <div className="bg-white md:rounded-lg rounded-md border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-900">
                  {pieChartData[0]?.progress.toFixed(0)}% completed
                </p>
                <p className="text-xs text-gray-500">
                  in {customBuilder?.logs?.length || 0} days
                </p>
              </div>
              <ProgressBar pct={pieChartData[0]?.progress || 0} />
            </div>
          </div>
        </div>

        {/* mobile progress */}
        <div className="md:hidden mt-4">
          <SectionTitle
            icon={<MdConstruction className="text-[#ebb042]" />}
            title="Construction Progress"
          />
          <div className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[13px] font-semibold text-gray-900">
                {pieChartData[0]?.progress.toFixed(0)}% completed
              </p>
              <p className="text-[11px] text-gray-500">
                in {customBuilder?.logs?.length || 0} days
              </p>
            </div>
            <ProgressBar pct={pieChartData[0]?.progress || 0} />
          </div>
        </div>
      </SectionCard>

      {/* Quick links */}
      <SectionTitle title="Quick Links :" />
      <div className="flex flex-wrap gap-3 md:gap-4 mb-6">
        {ProjectData.map((it, i) => {
          const Icon = it.icon;
          return (
            <Button
              key={i}
              onClick={() => router.push(it.url)}
              className="w-[120px] max-md:w-[100px] bg-white border border-gray-200 md:rounded-xl rounded-md shadow-custom hover:shadow-md transition-all p-3 text-center group"
            >
              <div className="mx-auto mb-2 grid place-items-center w-10 h-10 rounded-full bg-gray-100 group-hover:bg-blue-50">
                <Icon className="w-5 h-5 text-gray-700 group-hover:text-[#2872a1]" />
              </div>
              <span className="text-[12px] md:text-[14px] font-Gordita-Medium text-gray-800">
                {it.label}
              </span>
            </Button>
          );
        })}
      </div>

      {/* Project days overview + donut */}
      <div className="flex md:flex-row flex-col items-start md:items-stretch gap-6 md:mb-8">
        {/* Donut card (desktop) */}
        <SectionCard className="hidden md:block w-full max-w-[420px]">
          <div className="px-5 py-6 flex items-center gap-5">
            <div className="relative w-[120px] h-[120px]">
              <ChartContainer
                config={pieChartConfig}
                className="w-full h-full mx-auto aspect-square"
              >
                <PieChart width={120} height={120}>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={pieChartData}
                    dataKey="progress"
                    nameKey="work"
                    innerRadius={45}
                    outerRadius={55}
                  />
                </PieChart>
              </ChartContainer>
              <div className="absolute inset-0 grid place-items-center">
                <span className="text-[16px] font-Gordita-Bold text-yellow-500">
                  {pieChartData[0]?.progress.toFixed(0)}%
                </span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-Gordita-Bold text-[16px] text-center mb-2">
                Construction Progress
              </h3>
              <p className="text-gray-600 text-sm text-center">
                <span className="inline-block w-3 h-3 bg-[#2872a1] rounded-full mr-2 align-middle" />
                {pieChartData[0]?.progress.toFixed(0)}% work ongoing
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Overview bars */}
        <SectionCard className="w-full md:p-6 p-4">
          <p className="md:hidden mb-3 font-Gordita-Bold text-[16px] text-[#2872a1]">
            Project Days Overview :
          </p>
          <div className="space-y-3">
            <StatRow
              label="Day -"
              valueLeft={currentDayInfo?.today}
              valueRight={7}
              barPct={dayPercentage}
            />
            <StatRow
              label="Week -"
              valueLeft={currentDayInfo?.currentWeek}
              valueRight={currentDayInfo?.totalWeeks}
              barPct={weekPercentage}
            />
            <StatRow
              label="Month -"
              valueLeft={currentDayInfo?.currentMonth}
              valueRight={currentDayInfo?.totalMonths}
              barPct={monthPercentage}
            />
          </div>
          <div className="text-[14px] md:text-[16px] mt-5 flex items-center">
            <span className="inline-block w-4 h-4 bg-[#2872a1] rounded-full mr-2" />
            <p className="text-gray-800">
              <span className="text-[#ebb042] font-Gordita-Bold">
                {customBuilder?.logs?.length} days
              </span>
              <span className="font-Gordita-Medium ml-2">
                done out of {totalEstimatedDays} days
              </span>
            </p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default CustomBuilderDetailsView;

//ui helpers

const SectionCard = ({ children, className = "" }: any) => (
  <div
    className={`bg-white/90 dark:bg-white/5 border border-gray-200/70 dark:border-white/10 md:rounded-xl rounded-[8px] shadow-custom  ${className}`}
  >
    {children}
  </div>
);

const SectionTitle = ({
  icon,
  title,
}: {
  icon?: React.ReactNode;
  title: string;
}) => (
  <div className="flex items-center gap-2 mb-3">
    {icon}
    <h2 className="text-[#2872a1] dark:text-[#1d547] font-Gordita-Bold text-[16px] md:text-[18px]">
      {title}
    </h2>
  </div>
);

const StatRow = ({
  label,
  valueLeft,
  valueRight,
  barPct,
}: {
  label: string;
  valueLeft: string | number | undefined;
  valueRight: string | number | undefined;
  barPct: number | string | undefined;
}) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center md:gap-4 gap-2">
    <span className="sm:w-20 font-Gordita-Medium text-[12px] md:text-[14px] text-gray-800 dark:text-gray-200">
      {label}
    </span>
    <div className="flex items-center gap-1">
      <p className="text-[12px] md:text-[14px] font-Gordita-Bold text-[#ebb042]">
        {valueLeft}
      </p>
      <p className="text-[12px] md:text-[14px] font-Gordita-Bold text-[#ebb042]">
        /
      </p>
      <p className="text-[12px] md:text-[14px] font-Gordita-Medium text-[#ebb042]">
        {valueRight}
      </p>
    </div>
    <div className="w-full sm:flex-1 h-[6px] bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-[#2872a1] rounded-full"
        style={{ width: `${barPct || 0}%` }}
      />
    </div>
  </div>
);

const ProgressBar = ({ pct }: { pct: number }) => (
  <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-sm">
    <div
      className="absolute h-4 bg-[#2872a1] rounded-full transition-all duration-700 min-w-[10px]"
      style={{ width: `${pct || 0}%` }}
    />
    <span className="absolute inset-0 grid place-items-center text-[10px] font-Gordita-Medium">
      {Math.round(pct)}%
    </span>
  </div>
);
