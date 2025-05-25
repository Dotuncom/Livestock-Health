//src/components/LivestockTracker.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Dummy API simulation
const fetchAnimalData = async () => {
  // Replace this with your real API call
  return [
    {
      id: 1,
      name: "Cow A",
      status: "Healthy",
      lat: 37.7749,
      lng: -122.4194,
    },
    {
      id: 2,
      name: "Sheep B",
      status: "Sick",
      lat: 37.775,
      lng: -122.418,
    },
  ];
};

export default function LivestockTracker() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAnimalData();
      setAnimals(data);
    };
    loadData();

    const interval = setInterval(loadData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2">
        <MapContainer center={[37.7749, -122.4194]} zoom={13} className="h-[500px] w-full rounded-2xl shadow">
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
      <div className="space-y-4">
        {animals.map((animal) => (
          <div key={animal.id} className="bg-white shadow p-4 rounded-2xl">
            <h2 className="text-xl font-semibold">{animal.name}</h2>
            <p>
              Status: <span className={animal.status === "Healthy" ? "text-green-600" : "text-red-600"}>{animal.status}</span>
            </p>
            <p>Location: {animal.lat}, {animal.lng}</p>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
