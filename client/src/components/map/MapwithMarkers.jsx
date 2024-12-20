import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import PropTypes from "prop-types";
import { apiGetLongitudeAndLatitudeFromAddress } from "@/apis/external";
import L from "leaflet";
import { MessageSquareMore } from "lucide-react";
import { Pin } from "../pin";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const MapWithMarkers = ({ items, zoom = 10 }) => {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const fetchLocations = async () => {
      const fetchedLocations = await Promise.all(
        items?.map(async (item) => {
          try {
            const response = await apiGetLongitudeAndLatitudeFromAddress(
              item.address
            );
            if (response.status === 200 && response.data.features?.length > 0) {
              return {
                id: item.id,
                coordinates: [
                  response.data.features[0]?.geometry?.coordinates[1], // latitude
                  response.data.features[0]?.geometry?.coordinates[0], // longitude
                ],
                address: item.address,
                title: item.title,
                priority:item.rUser.rPricing.priority,
                image:item.images[0],
                size:item.size,
                price:item.price,
                priceUnit:item.priceUnit,
                
              };
            }
          } catch (error) {
            console.error("Error fetching location for:", item.address);
          }
          return null;
        })
      );
      setLocations(fetchedLocations.filter((location) => location !== null));
    };

    fetchLocations();
  }, [items]);
 // options
  const createCustomIcon = (priority) => {
    const color = priority >= 3 ? "red" : "blue"; // Chọn màu dựa vào `priority`
    return new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41], 
      iconAnchor: [12, 41], 
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };

  if (!locations.length) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer
      center={locations[0]?.coordinates || [0, 0]}
      zoom={zoom}
      scrollWheelZoom={false}
      className="w-full h-full"
    >
      <TileLayer attribution={attribution} url={url} />
      {locations?.map((location) => (
        <Marker
          key={location.id}
          position={location.coordinates}
          icon={createCustomIcon(location.priority)}
        >
         
           <Pin location={location}/>
        
        </Marker>
      ))}
    </MapContainer>
  );
};

MapWithMarkers.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    })
  ).isRequired,
  zoom: PropTypes.number,
};

export default MapWithMarkers;
