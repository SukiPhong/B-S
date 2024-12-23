import React from "react";
import { ConditionRendering } from "../layouts";
import {
  DollarSign,
  Grid2x2,
  ImageIcon,
  LandPlot,
  MapPinHouseIcon,
  Megaphone,
} from "lucide-react";
import { formatPrice } from "@/lib/propertyUtils";
import { Popup } from "react-leaflet";
import PropTypes from "prop-types";
import { Badge } from "../ui/badge";
const Pin = ({ location }) => {
  const priority = location?.priority;

  return (
    <>
      <ConditionRendering show={priority >= 3}>
        <Popup>
          <div className=" flex-col justify-center space-y-2 items-center">
            <span className="flex items-center gap-1">
              <Megaphone size={16} color="red" />
              <span className="break-words"> {location.title}</span>
            </span>
            <span className="flex items-center gap-1">
              <Grid2x2 size={14} />
              {location.size}m²
            </span>
            <span className="flex items-center gap-1">
              <DollarSign size={14} />
              {formatPrice(location.price, location.priceUnits)}
            </span>
            <span className="flex items-center gap-1">
            <MapPinHouseIcon size={16} className="text-main" />
            <span className="break-words"> {location.address}</span>
          </span>
            <div className="relative overflow-hidden">
              <img
                src={location.images[0]}
                alt="image"
                className="w-full h-full object-cover rounded-md"
              />
              <Badge className="absolute bottom-1 right-0 bg-black/50 text-white border-none">
                <ImageIcon className="w-4 h-4 mr-1" />
                {location.images.length}
              </Badge>
            </div>
            
          </div>
        </Popup>
      </ConditionRendering>
      <ConditionRendering show={priority < 3}>
        <Popup>
          <span className="flex items-center gap-1">
            <Megaphone size={16} color="red" />
            <span className="break-words"> {location.title}</span>
          </span>
          <span className="flex items-center gap-1">
            <MapPinHouseIcon size={16} className="text-main" />
            <span className="break-words"> {location.address}</span>
          </span>
        </Popup>
      </ConditionRendering>
    </>
  );
};

export default Pin;
Pin.propTypes = {
  location: PropTypes.node,
};
