import { Link } from "react-router-dom";

export default function AnimalCard({
  id,
  tagId,
  breed,
  gender,
  species = "Cow",
  status,
  deviceStatus,
  date,
  onDelete,
}) {
  const statusColor = {
    Healthy: "bg-green-500",
    Sick: "bg-red-600",
    "At Risk": "bg-yellow-400",
    Critical: "bg-orange-600",
    Dead: "bg-gray-700",
  };

  return (
    <div className="relative flex Nunito flex-col justify-between px-6 py-4 h-[200px] shadow-md bg-white rounded-xl">
      {/* Delete Button */}
      <button
        onClick={onDelete}
        className="absolute top-2 left-2 text-red-500 text-xl hover:text-red-700"
      >
        ×
      </button>

      {/* Main content and View Profile aligned horizontally */}
      <div className="flex justify-between items-end  h-full">
        {/* Card Content */}
        <div className="space-y-1">
          <h3 className="text-xl font-semibold">{species}. {id}</h3>
          <p className="text-[18px] text-gray-700">{breed}</p>
          <p className="text-[18px] text-gray-500">Tag ID: {tagId}</p>
          <p className="text-[18px] text-gray-500">Gender: {gender}</p>

          <div className="flex items-center gap-2">
            <span className="text-[16px]">{status}</span>
            <span className={`w-3 h-3 rounded-full ${statusColor[status] || "bg-gray-400"}`}></span>
          </div>

          <div className="text-[18px] text-gray-600">Device: {deviceStatus}</div>
          <p className="text-[14px] text-gray-400">{date}</p>
        </div>

        {/* View Profile Button */}
        <Link
          to={`/animal-profile/${id}`}
          className="text-[18px] text-right md:text-2xl p-3 mt-3 bg-[#1D4719] text-white rounded-[10px] w-fit"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
