//src/components/FarmerSummaryCard.jsx
import { Icon } from '@iconify/react';

const FarmerSummaryCard = ({ title, count, icon }) => {
  return (
    <div className="bg-white rounded-xl max-w-[310px] h-[160px]  px-[100px] shadow p-4 text-center">
      <Icon icon={icon} className="text-2xl w-[30px] h-[30px] mx-auto mb-1" />
      {count !== undefined && (
        <div className="text-4xl  Nunito font-bold">{count}</div>
      )}
      <div className="text-2xl Nunito mt-1 font-medium">{title}</div>
    </div>
  );
};

export default FarmerSummaryCard;
 