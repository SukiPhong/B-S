import React from "react";
import { Search } from "@/components/searchs";
import useSearchStore from "@/zustand/useSearchStore";
import PropTypes from "prop-types";
const PropertyLayout = ({ children, title }) => {
  const { search } = useSearchStore();

  return (
    <div className="w-[945px] mx-auto">
      <div className="relative h-[180px]">
        <Search check={true} noShowSearchProven={true} />
      </div>
      <div className="w-[850px] mx-auto">
        <div className="flex flex-col gap-2 py-4 border-b border-slate-400">
          <div className="flex items-center gap-2 text-gray-600">
            <span>{title} /{search.properType || "Tất cả trên toàn quốc"}</span>
          </div>
          <h1 className="text-2xl font-roboto">
            {search.properType || "Tất cả trên toàn quốc"}
          </h1>
          <span className="text-gray-600">
            Hiện có {search.rows || 0} bất động sản
          </span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PropertyLayout;
PropertyLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};
