import React, { useState, useEffect } from "react";
import BreadCrumb from "../../BreadCrumb";
import { useRouter } from "next/router";
import apiClient from "@/utils/apiClient";
import toast from "react-hot-toast";
// import HomeSection from "../../../components/SubServices/FurnitureComponent/furnitureItems/HomeSection";
{
  /*import ItemsSection from "../../FurnitureComponent/furnitureItems/ItemsSection";*/
}
import ItemsSection from "./ItemsSection";

export default function ElectronicItems() {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState({
    id: 1,
    name: "New Arrivals",
    category: "new-arrivals",
  });

  const categoryParam = router.query.category as string;

  useEffect(() => {
    if (router.isReady) {
      const category = categories.find((cat) => cat.category === categoryParam);
      if (category) {
        setSelectedCategory(category);
      }
      fetchItems(categoryParam || "");
    }
  }, [categoryParam, router.isReady]);

  const fetchItems = async (category: string) => {
    try {
      const res = await apiClient.get(apiClient.URLS.furniture, {
        category,
      });
      setItems(res?.body || []);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { id: 1, name: "New Arrivals", category: "new arrivals" },
    { id: 2, name: "Kitchen appliances", category: "Kitchen appliances" },
    { id: 3, name: "Professional Lighting", category: "Professional Lighting" },
    { id: 4, name: "Cables & chargers", category: "Cables and chargers" },
    { id: 5, name: "TV", category: "TV" },
    { id: 6, name: "Mobile & tablet accessories", category: "Mobile and tablet accessories" },
    { id: 7, name: "Fans", category: "Fans" },
    { id: 8, name: "Water Heater", category: "Water Heater" },
    { id: 9, name: "Switch Gear", category: "Switch Gear" },
    { id: 10, name: "Relay", category: "Relay" },
    {
      id: 11,
      name: "Air Coolers",
      category: "Air Coolers",
    },
    { id: 12, name: "Meter", category: "Meter" },
    { id: 13, name: "PC & Laptop Peripherals", category: "PC & Laptop Peripherals" },

  ];

  return (
    <>
      <div>
        <ul className="flex items-center md:flex-nowrap flex-wrap  justify-around px-8 py-4 mt-4 cursor-pointer md:text-gray-600 font-Gordita-Regular text-[16px] border-b-[1px] border-slate-200 gap-y-[16px] md:max-w-[1492px] md:min-h-[27px] sm:max-w-[398px] sm:min-h-[149px]">
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={() =>
                router.push(
                  `/services/custom-builder/electronics/electronics-shop?category=${category.category}`
                )
              }
              className={` md:border-none border-[1px] border-[#5F5F5F] md:px-[0px] md:py-[0px] md:rounded-[0px] rounded-[4px] py-[4px] px-[16px] md:ml-[0] ml-[8px] md:bg-transparent  ${category.id === selectedCategory.id
                ? "text-[#5297FF] bg-[#FFFFFF]"
                : "text-[#5F5F5F] bg-[#ECECEC]"
                }
               hover:text-[#5297FF] `}
            >
              {category.name}
            </li>
          ))}
        </ul>

        <div className="absolute hidden h-auto text-sm lg:block">
          <BreadCrumb
            steps={[
              { label: "Our Services", link: "/services/custom-builder" },
              {
                label: "Electronics",
                link: "/services/custom-builder/electronics",
              },
              {
                label: "Electronics-shop",
                link: "/services/custom-builder/electronics/electronics-shop",
              },
              ...(selectedCategory
                ? [
                  {
                    label: selectedCategory.name,
                    link: `/services/custom-builder/electronics/electronics-shop?category=${selectedCategory.category}`,
                  },
                ]
                : []),
            ]}
            currentStep={selectedCategory.name || "Electronics Shop"}
          />
        </div>

        {/* <HomeSection category={selectedCategory.name} itemsArray={items} /> */}
        <ItemsSection
          category={selectedCategory.name}
          items={items}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
