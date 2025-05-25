//src/components/ActionButtons.jsx
import React from 'react';

const ActionButtons = () => (
  <div className="flex flex-col md:flex-row gap-3 mt-6">
    <button className="bg-green-900 w-80 h-14 inline-flex justify-center items-center text-2xl Inter  font-medium text-white px-6 py-2 rounded-[20px]">
      See a doctor
    </button>
    <button className= "bg-white/60 w-80 h-14 inline-flex justify-center items-center text-2xl Inter outline-1 outline-offset-[-1px] outline-black  font-medium rounded-[20px] px-6 py-2 ">
      Book appointment
    </button>
  </div>
);

export default ActionButtons;
