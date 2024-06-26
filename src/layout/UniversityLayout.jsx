// src/layout/DashboardLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import { FaTachometerAlt, FaAppStore, FaCog } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const navItems = [
  {
    to: "/university-dashboard/Dashboard",
    label: "Dashboard",
    icon: FaTachometerAlt,
  },
  {
    to: "/university-dashboard/application",
    label: "Applications",
    icon: FaAppStore,
  },
  { to: "/university-dashboard/setting", label: "Settings", icon: FaCog },
];

const UniversityLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar logo="LOGO" navItems={navItems} />
      <div className="flex-1 flex flex-col mx-5 gap-5">
        <Navbar />
        <div className="flex-1 space-y-5 h-full pb-5 overflow-y-auto">
          {children}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UniversityLayout;
