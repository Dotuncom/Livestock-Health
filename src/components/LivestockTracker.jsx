import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function LivestockTracker() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = [
        { id: 1, name: "Cow A", status: "Healthy", lat: 37.7749, lng: -122.4194 },
        { id: 2, name: "Sheep B", status: "Sick", lat: 37.775, lng: -122.418 },
      ];
      setAnimals(data);
    };
    loadData();
  }, []);

  return (
    <div className="w-full h-full px-4 py-6">
      <MapContainer
        center={[37.7749, -122.4194]}
        zoom={13}
        className="h-[500px] w-full rounded-2xl shadow"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {animals.map((animal) => (
          <Marker key={animal.id} position={[animal.lat, animal.lng]}>
            <Popup>
              <strong>{animal.name}</strong>
              <br />
              Status: {animal.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
