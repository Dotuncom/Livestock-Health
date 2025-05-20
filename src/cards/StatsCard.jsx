import { Icon } from '@iconify/react';

export default function StatCard({ icon, value, title }) {
  return (
    <div className="flex flex-col justify-center items-center w-[255px] h-[166px] shadow-md rounded-xl bg-white hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col  text-center items-center">
        <div className="p-2 rounded-full bg-green-100 mb-2">
          <Icon icon={icon} className="w-6 h-6 text-green-700" />
        </div>
        <h1 className="text-[24px] font-semibold">{value}</h1>
        <h3 className="text-[10px] font-bold text-gray-700 mt-2">{title}</h3>
      </div>
    </div>
  );
}
