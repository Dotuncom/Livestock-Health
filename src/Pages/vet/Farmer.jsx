import FarmerRequestCard from "../../components/FarmerRequestCard";

const dummyFarmers = [
  {
    name: "JA Cattle",
    avatar: "/images/ja.jpg",
    time: "May 8, 10:50 AM",
    selected: false,
  },
  {
    name: "Debby Farms",
    avatar: "/images/debby.jpg",
    time: "May 8, 10:50 AM",
    selected: true,
  },
  {
    name: "Sadri Livestock",
    avatar: "/images/sadri.jpg",
    time: "May 8, 10:50 AM",
    selected: false,
  },
];

export default function FarmerPage() {
  return (
    <div>
      <h3 className="font-bold text-4xl"> Assigned Farmers</h3>
      <div className="w-full px-4 py-6 flex justify-center">
        <div className="w-full max-w-[1000px] space-y-4">
          {dummyFarmers.map((farmer, idx) => (
            <FarmerRequestCard key={idx} farmer={farmer} />
          ))}
        </div>
      </div>
    </div>
  );
}
