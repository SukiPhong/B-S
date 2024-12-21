import React from "react";
import { Search } from "@/components/searchs";
import useSearchStore from "@/zustand/useSearchStore";
import PropTypes from "prop-types";
import { Map, MapWithMarkers } from "../map";
import useMapStore from "@/zustand/useMapStore";
import { MapComponent } from "../map/MapComponent ";
import { Footer } from "../footer";

const PropertyLayout = ({ children, title }) => {
  const { search } = useSearchStore();
  const { showMap,dataMapsForList  } = useMapStore();
  return (
   <>
    <div className="container mx-auto px-4 pb-4">
      <div className="grid grid-cols-10 gap-4">
        {!showMap && (
          <div className="col-span-2  min-h-screen">
          </div>
        )}
        <div className={`${showMap ? 'col-span-6' : 'col-span-6'}`}>
          <div className="w-full top-0  z-10 py-4 mx-auto">
            <Search check={true} noShowSearchProven={true} />
            <div className="mt-4">
              <div className="flex items-center gap-2 text-gray-600">
                <span>{title} / {search.properType || "Tất cả trên toàn quốc"}</span>
              </div>
              <h1 className="text-2xl font-roboto mt-2">
                {search.properType || "Tất cả trên toàn quốc"}
              </h1>
              <span className="text-gray-600 block mt-2">
                Hiện có bất động sản
              </span>
            </div>
          </div>
          <div className="mt-4">
            {children}
          </div>
        </div>
        {!showMap ? (
          <div className="col-span-2  min-h-screen">
            {/* Right screen content */}
          </div>
        ) : (
          <div className="col-span-4 sticky top-0 h-screen">
          <MapWithMarkers items={dataMapsForList} zoom={10} />
          </div>
        )}
      </div>
      
    </div>
    <Footer /></>
  );
};

PropertyLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

export default PropertyLayout;

