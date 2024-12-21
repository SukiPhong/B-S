import React, { useState, useEffect, memo } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { price, size } from "@/lib/contants";
import { pathnames } from "@/lib/pathname";

const FilterCard = () => {
  const [selectedPrice, setSelectedPrice] = useState("ALL");
  const [selectedSize, setSelectedSize] = useState("ALL");
  const location = useLocation();
  const navigate = useNavigate();

    // useEffect(() => {
    //   const params = new Object();

    //   if (selectedPrice !== "ALL") {
    //     params.size = selectedPrice;
    //   }

    //   if (selectedSize !== "ALL") {
    //     params.size = selectedSize;
    //   }
    //   navigate({
    //     pathname: `${
    //       location.pathname === pathnames.public.rentProperty
    //         ? pathnames.public.rentProperty
    //         : pathnames.public.soldProperty
    //     }`,
    //     search: createSearchParams(params).toString(),
    //   });
    // }, [selectedPrice, selectedSize]);

  const handlePriceClick = (value) => {
    setSelectedPrice(value === "ALL" ? "ALL" : JSON.parse(value));
  };

  const handleSizeClick = (value) => {
    setSelectedSize(value === "ALL" ? "ALL" : JSON.parse(value));
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
