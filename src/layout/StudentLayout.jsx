import React from "react";
import { Outlet } from "react-router-dom";
import { FaTachometerAlt, FaCog, FaBuilding,FaList } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const navItems = [
  {
    to: "/student-dashboard/Dashboard",
    label: "Dashboard",
    icon: FaTachometerAlt,
  },
  {
    to: "/student-dashboard/universities",
    label: "Universities",
    icon: FaBuilding,
  },
  {
    to:"/student-dashboard/applications",
    label:"Your Applications",
    icon: FaList,
  },
  { to: "/student-dashboard/setting", label: "Settings", icon: FaCog },
];

const StudentLayout = ({ children }) => {
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

export default StudentLayout;
