//src/components/ReportHistoryCard.jsx
import React from 'react';
import ReportItem from './ReportItem';

const ReportHistoryCard = () => (
  <div className="bg-[#EFEEEE] p-[42px] Inter md:min-w-[675px]  md:h-[675px] shadow-[0px_0px_15px_-1px_rgba(0,0,0,0.25)] rounded-md">
    <h2 className="text-4xl  font-semibold mb-4">Report History</h2>
    <div className=' flex  flex-col gap-[30px]  mt-[40px]'>
    <ReportItem date="12/March/25" />
    <ReportItem date="11/March/25" />
    <ReportItem date="10/March/25" />
    </div> 
    <button className="text-sm w-[81px] h-[22px] outline outline-green-700 text-green-700 mt-2">View more</button>
  </div>
);

export default ReportHistoryCard;
