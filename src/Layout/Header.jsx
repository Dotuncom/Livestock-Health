import React from 'react';
import search from '../assets/search.png';
import notification from '../assets/notification.png';

function Header({title}) {
  return (
    <div className="hidden md:flex space-x-[63px] justify-between h-[131px]  items-center pt-[20px] pb-[20px]  pr-[139px] mb-[39px]">
      <h1 className='text-4xl poppins'>{title}</h1>
      <div className='flex items-center gap-[2rem]'>
     {/* Search Bar */}
     <div className="relative flex items-center w-[462px] h-[48px] rounded-[50px] pl-[1rem] border border-[#333] bg-white text-2xl shadow-sm">
        <img 
          src={search} 
          alt="Search Icon" 
          className="w-[20px] h-[20px] mr-3"
        />
        <input
          type="text"
          placeholder="search..."
          className="w-full h-full bg-transparent rounded-[50px]  outline-none"
        />
      </div>

      {/* Notification Icon */}
      <img
        src={notification}
        alt="Notification Icon"
        className="w-[43px] h-[43px] border border-[#000000] rounded-[50px] bg-white p-3 " 
      />
      </div>
     
    </div>
  );
}

export default Header;
