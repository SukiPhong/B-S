import React, { useState, useEffect, memo } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { price, size } from "@/lib/contants";
import { pathnames } from "@/lib/pathname";
import useSearchStore from "@/zustand/useSearchStore";

const FilterCard = () => {
  const [selectedPrice, setSelectedPrice] = useState("ALL");
  const [selectedSize, setSelectedSize] = useState("ALL");
  const {setSearchData} = useSearchStore()
  
  const handlePriceClick = (value) => {
    setSelectedPrice(value);
    const params = {};

    if (value === "ALL") {
      params["price"] = ["gte", 0]; // Key should be "price"
    } else {
      params["price"] = JSON.parse(value); // Assign the value directly
    }

    setSearchData(params);
  };

  const handleSizeClick = (value) => {
    setSelectedSize(value);
    const params = {};

    if (value === "ALL") {
      params["size"] = ["gte", 0]; // Key should be "size"
    } else {
      params["size"] = JSON.parse(value); // Assign the value directly
    }

    setSearchData(params)

  };

  return (
    <div className="col-span-3 flex-col gap-4 space-y-4 mt-2">
      <div className="flex-col bg-slate-100 border rounded-sm px-4 pb-2">
        <h3 className="font-normal font-roboto mt-2">Lọc theo khoảng giá</h3>
        <div>
          {price.map((item) => (
            <div
              key={item.id}
              onClick={() => handlePriceClick(item.value)}
              className={`cursor-pointer ${
                selectedPrice === item.value ||
                (item.value === "ALL" && selectedPrice === "ALL")
                  ? "text-main"
                  : ""
              }`}
            >
              <span className="text-xs hover:underline hover:text-main">
                ● {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-col bg-slate-100 border rounded-sm px-4 pb-2">
        <h3 className="font-normal font-roboto mt-2">Lọc theo diện tích</h3>
        <div>
          {size.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSizeClick(item.value)}
              className={`cursor-pointer ${
                selectedSize === item.value ||
                (item.value === "ALL" && selectedSize === "ALL")
                  ? "text-main"
                  : ""
              }`}
            >
              <span className="text-xs hover:underline hover:text-main">
                ● {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(FilterCard);
