import React from "react";
import { FaBell, FaCog } from "react-icons/fa";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  const lastPathSegment = location.pathname
    .split("/")
    .filter((segment) => segment !== "")
    .pop();
  const handleProfileClick = () => {
    if (role === "university") navigate("/university-dashboard/profile");
    else {
      navigate("/student-dashboard/profile");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center mt-5 rounded-md">
      <div className="font-bold text-xl px-4">{lastPathSegment}</div>
      <div className="flex items-center space-x-4">
        <button className="focus:outline-none">
          <FaBell className="w-5 h-5 text-gray-600 hover:text-blue-800" />
        </button>
        <button
          className="focus:outline-none"
          onClick={() => {
            navigate("/student-dashboard/setting");
          }}
        >
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
                description={`@${user.username}`}
                name={role === "university" ? user.name : user.profile.name}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">Signed in as</p>
                <p className="font-bold">@{user.username}</p>
              </DropdownItem>
              <DropdownItem key="profile" onClick={handleProfileClick}>
                My Profile
              </DropdownItem>
              <DropdownItem
                key="settings"
                onClick={() => {
                  navigate("/student-dashboard/setting");
                }}
              >
                Settings
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
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
