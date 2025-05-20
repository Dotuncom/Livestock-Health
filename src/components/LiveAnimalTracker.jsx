// src/components/LiveAnimalTracker.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icon
const animalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

// Mock animal location data
const mockAnimalLocations = [
  { id: 1, name: "Cow A", coords: [9.2182, 9.5175] },
  { id: 2, name: "Cow B", coords: [9.2200, 9.5100] },
];

const LiveAnimalTracker = () => {
  return (
    <div className="w-[721px] h-[272px] rounded-lg overflow-hidden shadow">
      <MapContainer
        center={[9.2182, 9.5175]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {mockAnimalLocations.map((animal) => (
          <Marker
            key={animal.id}
            position={animal.coords}
            icon={animalIcon}
          >
            <Popup>
              {animal.name}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LiveAnimalTracker;
