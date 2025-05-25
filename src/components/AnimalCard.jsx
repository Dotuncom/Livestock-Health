//src/components/AnimalCard.jsx
const statusColor = {
    Healthy: "bg-green-500",
    Sick: "bg-red-600",
    "": "bg-orange-400"
  };
  
  export default function AnimalCard({ id, breed, status, date, species = "Cow" }) {
    return (
      <div className="flex Nunito justify-center flex-col items-center md:px-[80px] md:py-[24px] md:h-[113px] md:w-[135]  shadow-[0px_0px_15px_-1px_rgba(0,0,0,0.25)] bg-white">
        <h3 className=" text-2xl font-semibold">{species}. {id}</h3>
        <p className="text-[20px]">{breed}</p>
        <div className="flex items-center">
          <span className="text-[20px]">{status}</span>
          <span className={`w-4 h-4 rounded-full ${statusColor[status]}`}></span>
        </div>
        <p className="text-[20px] text-gray-400">{date}</p>
      </div>
    );
  }
  