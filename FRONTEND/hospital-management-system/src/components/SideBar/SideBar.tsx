import React from "react";
import { Navigate } from "react-router-dom";
import {
  IconLayoutDashboard,
  IconStethoscope,
  IconUser,
  IconCalendar,
  IconPill,
  IconSettings,
} from "@tabler/icons-react";
import { NavLink, Link } from "react-router-dom";

const links = [
  {
    name: "Dashboard",
    url: "/",
    icon: <IconLayoutDashboard size={22} stroke={1.5} />,
  },
  {
    name: "Doctors",
    url: "/doctors",
    icon: <IconStethoscope size={22} stroke={1.5} />,
  },
  {
    name: "Patients",
    url: "/patients",
    icon: <IconUser size={22} stroke={1.5} />,
  },
  {
    name: "Appointments",
    url: "/appointments",
    icon: <IconCalendar size={22} stroke={1.5} />,
  },
  {
    name: "Pharmacy",
    url: "/pharmacy",
    icon: <IconPill size={22} stroke={1.5} />,
  },
  {
    name: "Schedule",
    url: "/schedule",
    icon: <IconCalendar size={22} stroke={1.5} />,
  },
  {
    name: "Settings",
    url: "/settings",
    icon: <IconSettings size={22} stroke={1.5} />,
  },
];

const SideBar = () => {
  const token = localStorage.getItem("token");

  // If not logged in, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="w-72 bg-dark-100 flex flex-col items-center p-6 min-h-screen">
      <Link to="/" className="flex flex-col items-center cursor-pointer">
        <img
          src="logo.png"
          alt="Preah Ang Duong Hospital Logo"
          className="w-24 h-24 object-contain mb-2 rounded-full border-4 border-white shadow-[0_0_15px_white]"
        />
        <span className="mt-3 font-heading font-bold text-xl text-[#09aedb] text-center whitespace-nowrap">
          Preah Ang Duong Hospital
        </span>
      </Link>
      <p className="mt-2 text-lg text-white">Admin</p>

      <nav className="mt-12 w-full">
        <ul className="flex flex-col gap-4">
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.url}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 font-semibold rounded-lg transition ${
                    isActive
                      ? "bg-cyan-400 text-dark-50"
                      : "text-gray-300 hover:text-dark-50 hover:bg-light-50"
                  }`
                }
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
