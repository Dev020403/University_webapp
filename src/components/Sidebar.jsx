import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ logo, navItems }) => {
  const location = useLocation();

  return (
    <div className="bg-white shadow-lg w-64 flex flex-col h-screen">
      <div className="pt-8 pb-7 font-bold text-xl flex justify-center items-center">
        {logo}
      </div>
      <hr className="border-t border-gray-200" />
      <nav className="flex-1 px-5 py-4 space-y-2 mt-5">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className={`flex items-center px-5 py-4 text-gray-700 rounded hover:bg-gray-200 hover:text-blue-700 space-x-3 transition-colors duration-200 text-md ${
              location.pathname === item.to ? "bg-gray-200 text-blue-700" : ""
            }`}
          >
            {item.icon && <item.icon className="w-5 h-5" />}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
