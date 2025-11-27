import { create } from "zustand";
export type PropertyTab = "buy" | "rent" | "plot" | "flatshare";

interface FilterOptions {
  propertyType: string[];
  bhkType: string[];
  priceRange: string[];
  saleType: string[];
  furnishingType:string[];
  constructionStatus: string[];
  amenities: string[];
  propertyAge: string[];
  facing: string[];
  builtUpArea?: [number, number];
  genderPreference?: string[];
  sharingType?: string[];
  purpose?: string[];
}

interface PropertyFilterState {
  filters: FilterOptions;
  activeTab: PropertyTab;
  selectedCities: string[];

  setFilters: (filters: Partial<FilterOptions>) => void;
  setActiveTab: (tab: PropertyTab) => void;
  setSelectedCities: (cities: string[]) => void;

  resetFilters: () => void;
}
const defaultFilters: FilterOptions = {
  propertyType: [],
  bhkType: [],
  priceRange: [],
  saleType: [],
  furnishingType:[],
  constructionStatus: [],
  amenities: [],
  propertyAge: [],
  facing: [],
  builtUpArea: [0, 5000],
  genderPreference: [],
  sharingType: [],
};
export const usePropertyFilterStore = create<PropertyFilterState>((set) => ({
  filters: defaultFilters,
  activeTab: "buy",
  selectedCities: [],
  setFilters: (newFilters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    })),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedCities: (cities) => set({ selectedCities: cities }),

  resetFilters: () => set({ filters: defaultFilters }),
}));
