import React from "react";
import { Outlet } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCog,
  FaBuilding,
  FaUserFriends,
} from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const navItems = [
  {
    to: "/admin-dashboard/Dashboard",
    label: "Dashboard",
    icon: FaTachometerAlt,
  },
  {
    to: "/admin-dashboard/universities",
    label: "All Universities",
    icon: FaBuilding,
  },
  {
    to: "/admin-dashboard/students",
    label: "All Students",
    icon: FaUserFriends,
  },
];

const AdminLayout = ({ children }) => {
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

export default AdminLayout;
