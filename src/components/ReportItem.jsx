import React from 'react';

const ReportItem = ({ date }) => (
  <div className=" Nunito text-[20px] bg-white  border rounded-md w-[597px] h-[121px] p-3 mb-3 text-sm">
    <p>Heart Rate: 70 beat per minute (bpm) <br/>
    Temperature: 38.0 C - 39.3 C (100.4 F - 102.7 F)<br/>
    Steps per day: 5000. Lying Time: 11 hours<br/>
    </p>
    <p className="text-right text-lg Inter mt-2 text-black">{date}</p>
  </div>
);

export default ReportItem;
