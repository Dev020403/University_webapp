import React from "react";
import { FaBell, FaCog } from "react-icons/fa";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  
  // Get the last part of the pathname
  const lastPathSegment = location.pathname.split("/").filter((segment) => segment !== "").pop();

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center mt-5 rounded-md">
      <div className="font-bold text-xl px-4">{lastPathSegment}</div>
      <div className="flex items-center space-x-4">
        <button className="focus:outline-none">
          <FaBell className="w-5 h-5 text-gray-600 hover:text-blue-800" />
        </button>
        <button className="focus:outline-none">
          <FaCog className="w-5 h-5 text-gray-600 hover:text-blue-800" />
        </button>
        <div className="relative">
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                }}
                className="transition-transform"
                description="@tonyreichert"
                name="Tony Reichert"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">Signed in as</p>
                <p className="font-bold">@tonyreichert</p>
              </DropdownItem>
              <DropdownItem key="settings">My Profile</DropdownItem>
              <DropdownItem key="settings">Settings</DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
