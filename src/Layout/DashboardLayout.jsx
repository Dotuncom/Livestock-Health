import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import logoo from '../assets/logoo.png';
import { Icon } from '@iconify/react';
import { AlignJustify } from 'lucide-react';
import Header from '../Layout/Header'

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  const navClasses = ({ isActive }) =>
    `block px-4 py-2 rounded hover:bg-[#3A7D34] flex items-center space-x-[18px] ${
      isActive ? 'bg-green-700 font-bold' : ''
    }`;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-[#1D4719] text-white w-64 text-[21px]
        fixed md:relative z-50 transform transition-transform duration-200
        ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <img
          className="h-[70px] w-[121px] mb-[62px] mt-[20px] mx-auto"
          src={logoo}
          alt="Logo"
        />

        <nav className="space-y-2">
          <NavLink to={'/dashboard'} className={navClasses}>
            <Icon icon={'mage:dashboard-fill'} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to={'/animals'} className={navClasses}>
            <Icon icon={'healthicons:animal-cow-outline'} />
            <span>Animal</span>
          </NavLink>
          <NavLink to={'/reports'} className={navClasses}>
            <Icon icon={'ic:outline-analytics'} />
            <span>Reports</span>
          </NavLink>
          <NavLink to={'/Devices'} className={navClasses}>
            <Icon icon={'rivet-icons:device'} />
            <span>Devices</span>
          </NavLink>
          <NavLink to={'/alerts'} className={navClasses}>
            <Icon icon={'fluent:alert-24-regular'} />
            <span>Alert</span>
          </NavLink>
          <NavLink to={'/profile'} className={navClasses}>
            <Icon icon={'ix:user-profile'} />
            <span>Profile</span>
          </NavLink>
        </nav>
      </aside>

      {/* Content area */}
      <div className="flex-1 flex flex-col ml-0 ">
        {/* Mobile navbar */}
        <div className="bg-green-900 text-white p-4 flex justify-between items-center md:hidden">
          {/* Left: Logo */}
          <img className="h-[40px] w-[40px]" src={logoo} alt="Logo" />

          {/* Right: Search | Notification | Hamburger */}
          <div className="flex items-center space-x-4">
            <Icon icon="material-symbols:search" className="w-6 h-6" />
            <Icon icon="mdi:bell-outline" className="w-6 h-6" />
            <button onClick={() => setOpen(!open)} className="focus:outline-none">
              <AlignJustify className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 overflow-auto bg-[#EFEEEE]">
          <Header/>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
