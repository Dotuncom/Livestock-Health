export default function StatCard({ icon, value, title }) {
  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[300px] min-h-[166px] bg-[#EFEEEE] shadow-md rounded-xl hover:shadow-lg transition-all duration-300 mx-auto px-4 py-6">
      <img src={icon} alt={title} className="h-10 w-10 object-contain mb-4" />
      
      <h1 className="text-[28px] md:text-[32px] font-bold text-center">{value}</h1>
      <p className="text-lg md:text-2xl font-bold text-center">{title}</p>
    </div>
  );
}
