//src/components/VetSummaryCard.jsx
// SummaryCard.jsx
import React from 'react';
import { Icon } from '@iconify/react';

const VetSummaryCard = ({ label, value, icon }) => (
  <div className="bg-white p-4 rounded-xl shadow flex items-center space-x-4 overflow-hidden">
    <div className="text-3xl text-green-700 min-w-[40px]">
      <Icon icon={icon} />
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-gray-500 text-sm truncate">{label}</div>
      <div className="text-xl font-semibold truncate">{value}</div>
    </div>
  </div>
);

export default VetSummaryCard;
