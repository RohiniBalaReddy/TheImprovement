import { create } from "zustand";
import apiClient from "@/utils/apiClient";
import toast from "react-hot-toast";

export enum CurrentStep {
  customerOnboarding = "customerOnboarding",
}

export interface CustomBuilderData {
  id: number;
  currentDay: number;
  currentStep: CurrentStep;
  onboardingSteps: number;
  costEstimation: string[];
  agreement: string[];
  paymentReports: string[];
  weeklyReports: string[];
  monthlyReports: string[];
  floorPlan: string[];
  bills: string[];
  warranty: string[];
  estimatedCost: number | null;
  estimatedDays: number | null;
  propertyInformation: any;
  servicesRequired: any;
  logs: any[];
  phases:any[];

  user: any;
  queries: any[];
  createdAt: Date;
  updatedAt: Date;
}

interface CustomBuilderState {
  data: CustomBuilderData | null | any;
  isLoading: boolean;
  error: string | null;
  fetchData: (custom_builder_id: string) => Promise<void>;
  setData: (data: CustomBuilderData) => void;
  clearData: () => void;
}

export const useCustomBuilderStore = create<CustomBuilderState>((set) => ({
  data: null,
  isLoading: false,
  error: null,

  fetchData: async (custom_builder_id) => {
    if (!custom_builder_id) return;

    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get(
        `${apiClient.URLS.customBuilder}/${custom_builder_id}`
      );
      if (response.status === 200) {
        set({ data: response.body, isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching custom builder data:", error);
      set({ error: "Error occurred while fetching details", isLoading: false });
    }
  },

  setData: (data) => set({ data }),

  clearData: () => set({ data: null }),
}));
