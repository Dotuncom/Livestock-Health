export default function StatCard({ icon, value, title }) {
  return (
    <div className="flex flex-col justify-center items-center w-full  min-w-[256px]   min-h-[166px] bg-[#EFEEEE] shadow-md rounded-xl hover:shadow-lg transition-all duration-300">
     <img src={icon}/>
     <span className="block text- w-[180px] text-center">
     <h1 className="text-[32px] font-bold ">{value}</h1>
     <p className="text-2xl font-bold ">{title}</p>
     </span>
     
    </div>
  );
} 
 