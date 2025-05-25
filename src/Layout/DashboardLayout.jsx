// import { useState } from "react";
import { NavLink, Outlet,useLocation } from "react-router-dom";
import logoo from "../assets/logoo.png";
// import { AlignJustify } from "lucide-react";
import Header from "./Header";
import dashboard from "../assets/dashboard.png";
import animal from "../assets/animal.png";
import analytics from "../assets/report.png";
import device from "../assets/device.png";
import alert from "../assets/alert.png";
import location from '../assets/location.png'
import profile from "../assets/profile.png";
import { useState } from "react";

 function DashboardLayout() {
  const [open, setOpen] = useState(false);

  const navClasses = ({ isActive }) =>
    `flex items-center space-x-[15px] px-4 py-2 rounded transition-colors ${
      isActive ? "bg-green-700 text-white font-bold" : "hover:bg-[#3A7D34]"
    }`;


  // Dashboard title
const location =  useLocation();
const getTitle = (pathname)=>{
  if(pathname.includes('/dashboard') ) return 'Animal Overview'
  if(pathname.includes('/animal')) return 'Animal'
  if(pathname.includes('/devices')) return 'Devices'
  if(pathname.includes('/report')) return 'Reports'
  if(pathname.includes('/alert')) return 'Alert'
  if(pathname.includes('/location')) return 'Animal Location'
  if(pathname.includes('/profile')) return 'Animal Profile'

  return 'Dashboard'
}
const currentTitle = getTitle(location.pathname)


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-[#1D4719] text-white md:max-w-68 flex-shrink-0 text-[18px]
        fixed md:relative z-50 transform transition-transform duration-200
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <img
          className="h-[70px] w-[121px] mb-[62px] mt-[20px] mx-auto"
          src={logoo}
          alt="Logo"
        />

        <nav className="space-y-[18px]">
          <NavLink to="/dashboard" end className={navClasses}>
            <img className="object-cover h-[24px] w-[24px]" src={dashboard} alt="dashboard icon" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/animal" className={navClasses}>
            <img className="object-cover h-[24px] w-[24px]" src={animal} alt="animal icon" />
            <span>Animals</span>
          </NavLink>

          <NavLink to="/reports" className={navClasses}>
            <img className="object-cover h-[24px] w-[24px]" src={analytics} alt="analytics icon" />
            <span>Reports</span>
          </NavLink>

          <NavLink to="/devices" className={navClasses}>
            <img className="object-cover h-[24px] w-[24px]" src={device} alt="device icon" />
            <span>Devices</span>
          </NavLink>

          <NavLink to="/alerts" className={navClasses}>
            <img className="object-cover h-[24px] w-[24px]" src={alert} alt="alert icon" />
            <span>Alert</span>
          </NavLink>

          <NavLink to="/location" className={navClasses}>
            <img className="object-cover h-[24px] w-[24px]" src={location} alt="alert icon" />
            <span> Location</span>
          </NavLink>

          <NavLink to="/profile" className={navClasses}>
            <img className="object-cover h-[24px] w-[24px]" src={profile} alt="profile icon" />
            <span>Profile</span>
          </NavLink>
        </nav>
      </aside>

      {/* Content area */}
      <div className="flex-1 flex flex-col ml-0">
        {/* Mobile navbar */}
        <div className="bg-green-900 text-white p-4 flex justify-between items-center md:hidden">
          <img className="h-[40px] w-[40px]" src={logoo} alt="Logo" />
          <div className="flex items-center space-x-4">
            <button onClick={() => setOpen(!open)} className="focus:outline-none">
              {/* <AlignJustify className="w-6 h-6" /> */}=
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 overflow-auto bg-[#F5F5F5]">
          <Header title={currentTitle}/>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;