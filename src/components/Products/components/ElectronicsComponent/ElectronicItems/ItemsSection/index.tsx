import React, { useEffect, useMemo, useState } from "react";
import Button from "@/common/Button";
// import Item from "../../../../components/SubServices/FurnitureComponent/furnitureItems/ItemsSection/item";

import Loader from "@/components/Loader";
import Modal from "@/common/Modal";
// import ItemsFilterBar from "@/components/ItemsFilterBar";
// import { AnalyticsItem } from "../../../SubServices/FurnitureComponent/furnitureItems/ItemsSection";

interface IItemsSectionProps {
  items: {
    id: number;
    name: string;
    price: number;
    image: string;
    dateAdded: string;
    material: string;
    discount: number;
    power: string;
    brand: string;
    images: string[];
    quantity: number;
    categories: string;
    otherProperties: {
      [key: string]: string;
    };
  }[];
  category: string;
  isLoading: boolean;
}

export default function ItemsSection({
  items,
  category,
  isLoading,
}: IItemsSectionProps) {
  const [filteredItems, setFilteredItems] = useState(items);

  const [analyticsData, setAnalyticsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/itemsclick");

      const data = await response.json();
      setAnalyticsData(data);
    };

    fetchData();
  }, []);

  const getEventCount = (id: number) => {
    const analyticsItem = analyticsData.filter(
      (item) => String(item.itemId) === String(id)
    );
    const totalEventCount = analyticsItem.reduce(
      (acc, curr) => Number(acc) + Number(curr.eventCount),
      0
    );
    // return analyticsItem ? analyticsItem.eventCount : 0; // Default to 0 if no eventCount
    return totalEventCount;
  };

  return (
    <>
      <div className="block md:flex gap-4 pt-8 mb-10">
        <div className="lg-[20%]">
          {/* <ItemsFilterBar
            items={items}
            category={category}
            path="electronics"
            isLoading={isLoading}
            onFilterChange={setFilteredItems}
          /> */}
        </div>

        {isLoading ? (
          <div className="w-full h-screen">
            <Loader />
          </div>
        ) : filteredItems.length === 0 ? (
          <p className="w-full h-auto flex justify-center items-center">
            No items found!
          </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full px-4">
            {filteredItems.map((item) => {
              const eventCount = getEventCount(item.id);
              return (
                <h1></h1>
                // <Item
                //   key={item.id}
                //   category={category}
                //   item={item}
                //   eventCount={eventCount}
                // />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
