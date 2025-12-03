import { useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import CustomInput from "@/common/FormElements/CustomInput";
import Button from "@/common/Button";
import { twMerge } from "tailwind-merge";

interface FilterOption {
  id: string | number;
  label: string;
}

interface GroupedFilter {
  groupLabel: string;
  key: string;
  options: FilterOption[];
}

type FilterConfig = (FilterOption | GroupedFilter)[];

export interface FilterState {
  [group: string]: any;
}

interface ReusableSearchFilterProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  filters?: FilterConfig;
  selectedFilters?: FilterState;
  onFilterChange?: React.Dispatch<React.SetStateAction<FilterState>>;
  placeholder?: string;
  className?: string;
  rootCls?: string;
}

const ReusableSearchFilter = ({
  searchText,
  onSearchChange,
  placeholder,
  filters,
  selectedFilters,
  onFilterChange,
  className,
  rootCls,
}: ReusableSearchFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const isGrouped =
    Array.isArray(filters) && filters.length > 0 && "groupLabel" in filters[0];

  const toggleGroup = (key: string) => {
    setExpandedGroup((prev) => (prev === key ? null : key));
  };

  const handleCheckboxChange = (
    groupOrId: string,
    optionIdOrChecked: string | number | boolean,
    checked?: boolean
  ) => {
    if (isGrouped) {
      // Handle grouped filters
      const groupKey = groupOrId;
      const optionId = optionIdOrChecked as string | number;
      const isChecked = checked as boolean;

      onFilterChange?.((prev) => ({
        ...prev,
        [groupKey]: {
          ...prev[groupKey],
          [optionId]: isChecked,
        },
      }));
    } else {
      const filterId = groupOrId;
      const isChecked = optionIdOrChecked as boolean;

      onFilterChange?.((prev) => ({
        ...prev,
        [filterId]: isChecked,
      }));
    }
  };

  return (
    <div
      className={twMerge(
        "flex items-center justify-center md:gap-4 gap-2 md:mb-6 mb-3 w-full",
        rootCls
      )}
    >
      <div className="relative w-full ">
        <CustomInput
          name="search"
          labelCls="md:text-[1p4x] text-[12px] font-Gordita-Medium"
          className={twMerge(
            "md:px-[4px] px-[3px] text-[12px]  md:rounded-[8px] rounded-[4px]",
            className
          )}
          outerInptCls={twMerge(className, "py-[0px] md:py-[4px]")}
          onChange={(e) => onSearchChange(e.target.value)}
          type="text"
          value={searchText}
          placeholder={placeholder}
          rightIcon={<FiSearch className="md:text-[16px] text-[14px]" />}
        />
      </div>
      <div className="relative">
        <Button
          className="flex items-center gap-2 bg-white border font-Gordita-Medium border-gray-300 md:text-[16px] text-[12px] md:py-[6px] py-[5px] md:px-4 px-2 rounded-lg focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiFilter className="text-gray-500" size={14} />
          <span className="text-gray-700 font-Gordita-Medium md:text-[13px] text-[10px]">
            Filters
          </span>
        </Button>

        {isOpen && (
          <div className="absolute right-0 md:w-[250px] w-[160px] mt-1 bg-white border border-gray-300 shadow-lg rounded-lg z-10 text-[12px] md:text-[14px] max-h-[300px] overflow-auto">
            <ul className="py-2">
              {isGrouped ? (
                // Render grouped filters
                (filters as GroupedFilter[]).map((group) => (
                  <li key={group.key} className="border-b px-3 py-2">
                    <div
                      className="font-Gordita-Bold cursor-pointer text-[#2872a1]"
                      onClick={() => toggleGroup(group.key)}
                    >
                      {group.groupLabel}
                    </div>
                    {expandedGroup === group.key && (
                      <ul className="mt-2 space-y-1">
                        {group?.options?.map((option) => (
                          <li
                            key={option.id}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              checked={
                                selectedFilters?.[group.key]?.[
                                String(option.id)
                                ] ?? false
                              }
                              onChange={(e) =>
                                handleCheckboxChange(
                                  group.key,
                                  String(option.id),
                                  e.target.checked
                                )
                              }
                            />
                            {option?.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))
              ) : Array.isArray(filters) && filters.length > 0 ? (
                (filters as FilterOption[]).map((filter) => (
                  <li
                    key={filter?.id}
                    className="flex items-center gap-2 px-3 py-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters?.[String(filter.id)] ?? false}
                      onChange={(e) =>
                        handleCheckboxChange(
                          String(filter?.id),
                          e.target.checked
                        )
                      }
                    />
                    {filter?.label}
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-gray-400 italic text-[12px]">
                  No filters available
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReusableSearchFilter;
