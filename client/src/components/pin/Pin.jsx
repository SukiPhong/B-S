import React from "react";
import { ConditionRendering } from "../layouts";
import { DollarSign, Grid2x2, LandPlot } from "lucide-react";
import { formatPrice } from "@/lib/propertyUtils";
import { Popup } from "react-leaflet";
import PropTypes from 'prop-types'
const Pin = ({ location }) => {
  const priority = location.priority;

  return (
    <Popup className="w-full   max-w-lg shadow-md rounded-md ">
      {/* Hiển thị khi priority >= 3 */}
      <ConditionRendering show={priority >= 3}>
        {/* Hình ảnh */}
        <div className="row-span-1">
          <img
            src={location.image}
            alt="Địa chỉ hình ảnh"
            className="w-full h-24 object-cover border rounded-md"
          />
        </div>
        {/* Nội dung */}
        <div className="row-span-1 gap-1">
          {/* Tiêu đề */}
          <p className="text-sm font-semibold whitespace-normal max-w-full">
            {location.title}
          </p>
        </div>
        <div className="row-span-1">
          <span className="flex items-center gap-2 text-gray-700">
            <DollarSign size={18} className="text-green-500" />
            <span className="text-sm font-medium whitespace-nowrap">
              {formatPrice(location.price, location.priceUnits)}
            </span>
          </span>
          {/* Kích thước */}
          <div className="flex items-center gap-2 text-gray-700">
            <Grid2x2 size={18} className="text-blue-500" />
            <span className="text-sm font-medium whitespace-nowrap">
              {location.size}m²
            </span>
          </div>
        </div>
        {/* Giá */}
      </ConditionRendering>

      {/* Hiển thị khi priority < 3 */}
      <ConditionRendering show={priority < 3}>
        <strong className="block text-lg">
          {location.title.length > 30
            ? `${location.title.slice(0, 24)}...`
            : location.title}
        </strong>
        <span className="text-sm">{location.address}</span>
      </ConditionRendering>
    </Popup>
  );
};

export default Pin;
Pin.propTypes={
  location:PropTypes.node
}