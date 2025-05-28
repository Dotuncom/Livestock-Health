import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const mockAnimals = [
  {
    id: "A-001",
    tagId: "T-123",
    image: "/cow.png",
    species: "Cow",
    age: "6 Years Old",
    breed: "Red Bororo",
    gender: "Male",
    deviceStatus: "Charged",
    reportHistory: [
      {
        heartRate: 70,
        temperature: "38.0 C - 39.3 C (100.4 F - 102.7 F)",
        health: "Good",
        date: "12/March/25",
      },
      {
        heartRate: 70,
        temperature: "38.0 C - 39.3 C (100.4 F - 102.7 F)",
        health: "Good",
        date: "11/March/25",
      },
      {
        heartRate: 70,
        temperature: "38.0 C - 39.3 C (100.4 F - 102.7 F)",
        health: "Good",
        date: "10/March/25",
      },
    ],
  },
];

export default function AnimalProfile() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);

  useEffect(() => {
    const found = mockAnimals.find((a) => a.id === id);
    setAnimal(found);
  }, [id]);

  if (!animal) {
    return <div className="p-4">Animal not found.</div>;
  }

  return (
    <div className="p-4 md:px-12 flex flex-col md:flex-row justify-center md:h-[675px] gap-8 bg-white">
      {/* Left Column */}
      <div className="w-full md:w-[452px] flex flex-col items-center md:items-start text-center md:text-left">
        <img
          src={animal.image}
          alt={animal.breed}
          className="w-50 h-50 object-cover rounded-full mb-4"
        />
        <div className="space-y-5 text-2xl">
          <p><strong>Tag ID:</strong> {animal.tagId}</p>
          <p><strong>Species:</strong> {animal.species}</p>
          <p><strong>Age:</strong> {animal.age}</p>
          <p><strong>Breed:</strong> {animal.breed}</p>
          <p><strong>Gender:</strong> {animal.gender}</p>
          <p><strong>Device Status:</strong> {animal.deviceStatus}</p>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-[675px] bg-[#EFEEEE] p-7 space-y-4">
        <h2 className="text-4xl font-semibold mb-9">Report History</h2>
        {animal.reportHistory.map((report, index) => (
          <div key={index} className="border rounded-md p-4 shadow-sm text-2xl">
            <p>Heart Rate: {report.heartRate} bpm</p>
            <p>Temperature: {report.temperature}</p>
            <p>Health Status: {report.health}</p>
            <p className="text-right text-gray-500 mt-2 text-xs">{report.date}</p>
          </div>
        ))}
        <div className="flex flex-col md:flex-row justify-between gap-4 mt-6">
          <button className="bg-green-800 text-white px-4 py-2 rounded-full w-full md:w-auto">
            See a doctor
          </button>
          <button className="border border-gray-400 px-4 py-2 rounded-full w-full md:w-auto">
            Book appointment
          </button>
        </div>
      </div>
    </div>
  );
}
