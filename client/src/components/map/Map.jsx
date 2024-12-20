import { apiGetLongitudeAndLatitudeFromAddress } from "@/apis/external";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import PropTypes from "prop-types";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const Map = ({ address, zoom = 10 }) => {
  const [center, setCenter] = useState(null);
  useEffect(() => {
    const fetchCenter = async () => {
      if (address) {
        const response = await apiGetLongitudeAndLatitudeFromAddress(address);
        if (response.status === 200 && response.data.features?.length > 0) {
          setCenter([
            response.data.features[0]?.geometry?.coordinates[1], // latitude
            response.data.features[0]?.geometry?.coordinates[0], // longitude
          ]);
        } else {
          getGeolocation();
        }
      } else {
        getGeolocation();
      }
    };
    const getGeolocation = () => {
      window.navigator.geolocation.getCurrentPosition((position) => {
        setCenter([position.coords.latitude, position.coords.longitude]);
      });
    };
    fetchCenter();
  }, [address]);

  if (!center) {
    return <div>Loading map...</div>; 
  }
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      className="w-full h-full"
    >
      <TileLayer attribution={attribution} url={url} />
      <Marker position={center}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
Map.propTypes = {
  address: PropTypes.string,
  zoom: PropTypes.number,
};
