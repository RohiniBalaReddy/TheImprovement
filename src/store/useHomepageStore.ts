import { create } from "zustand";
import apiClient from "@/utils/apiClient";
import {
  capitalizeFirstLetter,
  formatBHKTypes,
  formatCost,
  generateSlug,
} from "@/utils/helpers";
import toast from "react-hot-toast";

type ProjectType = {
  minPrice: number;
  maxPrice: number;
  MinSize: { size: number; unit: string };
  MaxSize: { size: number; unit: string };
  location: {
    locality: string;
    subLocality: string;
  };
};

interface HomePageStore {
  bannerData: any[];
  allBlogs: any[];
  newlyLaunchedProperties: any[];
  popularLocalities: any[];
  city: string;
  loading: boolean;

  fetchBannerData: () => Promise<void>;
  fetchBlogs: () => Promise<void>;
  
  setAllBlogs: (blogs: any[]) => void;
}

export const useHomepageStore = create<HomePageStore>((set, get) => ({
  bannerData: [],
  allBlogs: [],
  newlyLaunchedProperties: [],
  popularLocalities: [],
  city: "Hyderabad",
  loading: false,

  setAllBlogs: (blogs) => set({ allBlogs: blogs }),
  fetchBannerData: async () => {
    if (get().bannerData.length) return;
    set({ loading: true });
    try {
      const response = await apiClient.get(
        `${apiClient.URLS.strapiInteriors}home-page-banners?populate=*`
      );
      set({ bannerData: response.body, loading: false });
    } catch (error) {
      console.error("error is ", error);
      set({ loading: false });
    }
  },
  fetchBlogs: async () => {
    if (get().allBlogs.length) return;
    try {
      const response = await apiClient.get(`${apiClient.URLS.blogs}`);
      set({ allBlogs: response.body });
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Error fetching blogs");
    }
  },
  
}));
