import React from "react";
import { FaBell, FaCog } from "react-icons/fa";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { adminLogout } from "../redux/adminAuthSlice";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminAuth = useSelector((state) => state.adminAuth);
  const userAuth = useSelector((state) => state.auth);

  const isAdminView = !!adminAuth.user;
  const user = isAdminView ? adminAuth.user : userAuth.user;
  const role = isAdminView ? "admin" : userAuth.role;

  const lastPathSegment = location.pathname
    .split("/")
    .filter((segment) => segment !== "")
    .pop();

  const capitalizedSegment =
    typeof lastPathSegment === "string" && lastPathSegment
      ? lastPathSegment.charAt(0).toUpperCase() + lastPathSegment.slice(1)
      : "LOGO";

  const handleProfileClick = () => {
    if (isAdminView) navigate("/admin-dashboard/profile");
    else if (role === "university") navigate("/university-dashboard/profile");
    else navigate("/student-dashboard/profile");
  };

  const handleSettingsClick = () => {
    if (isAdminView) navigate("/admin-dashboard/setting");
    else if (role === "university") navigate("/university-dashboard/setting");
    else navigate("/student-dashboard/setting");
  };

  const handleLogout = () => {
    if (isAdminView) {
      dispatch(adminLogout());
      navigate("/admin/login");
    } else {
      dispatch(logout());
      navigate("/login");
    }
  };

  const getName = () => {
    if (isAdminView) return user?.username;
    if (role === "university") return user?.name;
    return user?.profile?.name || user?.username;
  };

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center mt-5 rounded-md">
      <div className="font-bold text-xl px-4">{capitalizedSegment}</div>
      <div className="flex items-center space-x-4">
        <button className="focus:outline-none">
          <FaBell className="w-5 h-5 text-gray-600 hover:text-blue-800" />
        </button>
        <button className="focus:outline-none" onClick={handleSettingsClick}>
          <FaCog className="w-5 h-5 text-gray-600 hover:text-blue-800" />
        </button>
        <div className="relative">
          {user ? (
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src:
                      user?.avatarUrl ||
                      "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                  }}
                  className="transition-transform"
                  description={`@${user.username}`}
                  name={getName()}
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
                <DropdownItem key="settings" onClick={handleSettingsClick}>
                  Settings
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <div className="flex gap-3">
              <Button
                radius="full"
                onClick={() =>
                  navigate(isAdminView ? "/admin/signup" : "/signup")
                }
              >
                Register
              </Button>
              <Button
                radius="full"
                color="primary"
                onClick={() =>
                  navigate(isAdminView ? "/admin/login" : "/login")
                }
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
