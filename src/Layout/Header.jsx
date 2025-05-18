// components/Header.jsx
import React from 'react';
import { Icon } from '@iconify/react';
import db from '../data/db.json'

function Header() {
  return (
    <div className="hidden md:flex justify-end space-x-[3rem] items-center mb-4">
      {/* Search Field */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search animals, reports..."
          className="w-full py-2 pl-10 pr-4 rounded-[50px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <Icon icon="material-symbols:search" className="absolute left-3 top-2.5 text-gray-500" />
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        <Icon icon="mdi:bell-outline" className="w-6 h-6 text-gray-600 cursor-pointer  bg-white rounded-[50px]" />
        
      </div>
    </div>
  );
}

export default Header;
