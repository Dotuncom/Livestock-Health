
// export default VetD
import { NavLink, Outlet, useLocation } from "react-router-dom";
import logoo from "../assets/logoo.png"
// import Header from "./Header";
import { Icon } from "@iconify/react";
import { useState } from "react";

function VetDashboardLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navClasses = ({ isActive }) =>
    `flex items-center space-x-[15px] px-4 py-2 rounded transition-colors ${
      isActive ? "bg-green-700 text-white font-bold" : "hover:bg-[#3A7D34]"
    }`;

  const getTitle = (pathname) => {
    if (pathname.includes('/vet-dashboard')) return 'Dashboard Overview';
    if (pathname.includes('/farmer')) return 'Farmer';
    if (pathname.includes('/appointment')) return 'Appointment';
    if (pathname.includes('/messages')) return 'Messages';
    if (pathname.includes('/alerts')) return 'Alerts';
    if (pathname.includes('/reports')) return 'Reports';
    if (pathname.includes('/settings')) return 'Settings';
    if (pathname.includes('/profile')) return 'Profile';
    return 'Dashboard';
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
          <NavLink to="/vet-dashboard" end className={navClasses} onClick={handleNavClick}>
            <Icon icon="mdi:view-dashboard-outline" className="h-[24px] w-[24px]" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/farmer" className={navClasses} onClick={handleNavClick}>
            <Icon icon="mdi:account-group" className="h-[24px] w-[24px]" />
            <span>Farmer</span>
          </NavLink>

          <NavLink to="/appointment" className={navClasses} onClick={handleNavClick}>
            <Icon icon="mdi:calendar-clock" className="h-[24px] w-[24px]" />
            <span>Appointment</span>
          </NavLink>

          <NavLink to="/messages" className={navClasses} onClick={handleNavClick}>
            <Icon icon="mdi:message-text-outline" className="h-[24px] w-[24px]" />
            <span>Messages</span>
          </NavLink>

          <NavLink to="/alerts" className={navClasses} onClick={handleNavClick}>
            <Icon icon="mdi:bell-alert-outline" className="h-[24px] w-[24px]" />
            <span>Alert</span>
          </NavLink>

          <NavLink to="/reports" className={navClasses} onClick={handleNavClick}>
            <Icon icon="mdi:chart-box-outline" className="h-[24px] w-[24px]" />
            <span>Reports</span>
          </NavLink>

          <NavLink to="/settings" className={navClasses} onClick={handleNavClick}>
            <Icon icon="mdi:cog-outline" className="h-[24px] w-[24px]" />
            <span>Settings</span>
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
            <button onClick={() => setOpen(!open)} className="focus:outline-none">
              =
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 overflow-auto bg-[#F5F5F5]">
          {/* <Header title={currentTitle} /> */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default VetDashboardLayout;
