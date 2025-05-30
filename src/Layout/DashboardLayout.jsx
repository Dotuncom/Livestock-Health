// import { NavLink, Outlet, useLocation } from "react-router-dom";
// import logoo from "../assets/logoo.png";
// // import { AlignJustify } from "lucide-react";
// import Header from "./Header";
// import { Icon } from "@iconify/react";
// import { useState } from "react";

// function DashboardLayout() {
//   const [open, setOpen] = useState(false);
//   const location = useLocation();

//   const navClasses = ({ isActive }) =>
//     `flex items-center space-x-[15px] px-4 py-2 rounded transition-colors ${
//       isActive ? "bg-green-700 text-white font-bold" : "hover:bg-[#3A7D34]"
//     }`;

//   const getTitle = (pathname) => {
//     if (pathname.includes('/farmers-dashboard')) return 'Animal Overview';
//     if (pathname.includes('/animal')) return 'Animal';
//     if (pathname.includes('/devices')) return 'Devices';
//     if (pathname.includes('/report')) return 'Reports';
//     if (pathname.includes('/alert')) return 'Alert';
//     if (pathname.includes('/vet')) return 'Meet vet';
//     if (pathname.includes('/profile')) return 'Profile';
//     return 'Dashboard';
//   };

//   const currentTitle = getTitle(location.pathname);

//   const handleNavClick = () => {
//     if (window.innerWidth < 768) {
//       setOpen(false);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <aside
//         className={`bg-[#1D4719] text-white md:max-w-68 flex-shrink-0 text-[18px]
//         fixed md:relative z-50 transform transition-transform duration-200
//         ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
//       >
//         <img
//           className="h-[70px] w-[121px] mb-[62px] mt-[20px] mx-auto"
//           src={logoo}
//           alt="Logo"
//         />

//         <nav className="space-y-[18px]">
//           <NavLink to="/farmer-dashboard" end className={navClasses} onClick={handleNavClick}>
//             <Icon icon="mdi:view-dashboard-outline" className="h-[24px] w-[24px]" />
//             <span>Dashboard</span>
//           </NavLink>

//           <NavLink to="/animal" className={navClasses} onClick={handleNavClick}>
//             <Icon icon="mdi:paw" className="h-[24px] w-[24px]" />
//             <span>Animals</span>
//           </NavLink>

//           <NavLink to="/reports" className={navClasses} onClick={handleNavClick}>
//             <Icon icon="mdi:chart-box-outline" className="h-[24px] w-[24px]" />
//             <span>Reports</span>
//           </NavLink>

//           <NavLink to="/devices" className={navClasses} onClick={handleNavClick}>
//             <Icon icon="mdi:chip" className="h-[24px] w-[24px]" />
//             <span>Devices</span>
//           </NavLink>

//           <NavLink to="/alerts" className={navClasses} onClick={handleNavClick}>
//             <Icon icon="mdi:bell-alert-outline" className="h-[24px] w-[24px]" />
//             <span>Alert</span>
//           </NavLink>

//           <NavLink to="/vet" className={navClasses} onClick={handleNavClick}>
//             <Icon icon="mdi:stethoscope" className="h-[24px] w-[24px]" />
//             <span>Vet</span>
//           </NavLink>

//           <NavLink to="/profile" className={navClasses} onClick={handleNavClick}>
//             <Icon icon="mdi:account-circle-outline" className="h-[24px] w-[24px]" />
//             <span>Profile</span>
//           </NavLink>
//         </nav>
//       </aside>

//       {/* Content area */}
//       <div className="flex-1 flex flex-col ml-0">
//         {/* Mobile navbar */}
//         <div className="bg-green-900 text-white p-4 flex justify-between items-center md:hidden">
//           <img className="h-[40px] w-[40px]" src={logoo} alt="Logo" />

//           <div className="flex items-center space-x-4">
//             {/* Notification Icon */}
//             <button className="relative focus:outline-none" aria-label="Notifications">
//               <Icon icon="mdi:bell-outline" className="h-6 w-6" />
//               <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600"></span>
//             </button>

//             {/* Hamburger Icon */}
//             <button onClick={() => setOpen(!open)} className="focus:outline-none" aria-label="Toggle menu">
//               <Icon icon="mdi:menu" className="h-9 w-9" />
//             </button>
//           </div>
//         </div>

//         {/* Page content */}
//         <main className="p-4 overflow-auto bg-[#F5F5F5]">
//           <Header title={currentTitle} />
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// export default DashboardLayout;

import { NavLink, Outlet, useLocation } from "react-router-dom";
import logoo from "../assets/logoo.png";
import Header from "./Header";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Prevent background scroll when sidebar is open
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  const navClasses = ({ isActive }) =>
    `flex items-center space-x-[15px] px-4 py-2 rounded transition-colors ${
      isActive ? "bg-green-700 text-white font-bold" : "hover:bg-[#3A7D34]"
    }`;

  const getTitle = (pathname) => {
    if (pathname.includes("/farmers-dashboard")) return "Animal Overview";
    if (pathname.includes("/animal")) return "Animal";
    if (pathname.includes("/devices")) return "Devices";
    if (pathname.includes("/report")) return "Reports";
    if (pathname.includes("/alert")) return "Alert";
    if (pathname.includes("/vet")) return "Meet vet";
    if (pathname.includes("/profile")) return "Profile";
    return "Dashboard";
  };

  const currentTitle = getTitle(location.pathname);

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-[#1D4719] text-white md:max-w-60 flex-shrink-0 text-[18px]
        fixed md:relative z-50 transform top-0 left-0 h-full w-[250px]
        transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <img
          className="h-[70px] w-[121px] mb-[62px] mt-[20px] mx-auto"
          src={logoo}
          alt="Logo"
        />

        <nav className="space-y-[18px]">
          <NavLink to="/farmer-dashboard" end className={navClasses} onClick={handleNavClick}>
            <Icon icon="mdi:view-dashboard-outline" className="h-[24px] w-[24px]" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/animal" className={navClasses} onClick={handleNavClick}>
            <Icon icon="mdi:paw" className="h-[24px] w-[24px]" />
            <span>Animals</span>
          </NavLink>

          <NavLink to="/reports" className={navClasses} onClick={handleNavClick}>
            <Icon icon="mdi:chart-box-outline" className="h-[24px] w-[24px]" />
            <span>Reports</span>
          </NavLink>

          <NavLink to="/devices" className={navClasses} onClick={handleNavClick}>
            <Icon icon="mdi:chip" className="h-[24px] w-[24px]" />
            <span>Devices</span>
          </NavLink>

          <NavLink to="/alerts" className={navClasses} onClick={handleNavClick}>
            <Icon icon="mdi:bell-alert-outline" className="h-[24px] w-[24px]" />
            <span>Alert</span>
          </NavLink>

          <NavLink to="/vet" className={navClasses} onClick={handleNavClick}>
            <Icon icon="mdi:stethoscope" className="h-[24px] w-[24px]" />
            <span>Vet</span>
          </NavLink>

          <NavLink to="/profile" className={navClasses} onClick={handleNavClick}>
            <Icon icon="mdi:account-circle-outline" className="h-[24px] w-[24px]" />
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
            {/* Notification Icon */}
            <button className="relative focus:outline-none" aria-label="Notifications">
              <Icon icon="mdi:bell-outline" className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600"></span>
            </button>

            {/* Dynamic Hamburger Icon */}
            <button
              onClick={() => setOpen(!open)}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              <Icon icon={open ? "mdi:close" : "mdi:menu"} className="h-9 w-9" />
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="p-2 overflow-auto bg-[#F5F5F5]">
          
          <Header title={currentTitle} />
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
