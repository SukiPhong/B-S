import React from "react";
import PropTypes from "prop-types";
import Map from "./Map";


export const MapComponent = ({ items }) => {
  return (
    <div className="map-container">
      {items?.map((item, index) => (
        <div key={index} className="map-item">
          <Map address={item.address} />
        </div>
      ))}
    </div>
  );
};

MapComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string,
    })
  ).isRequired,
};
