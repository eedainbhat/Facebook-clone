import React from "react";
import {
  FaFacebook,
  FaSearch,
  FaUserFriends,
  FaCog,
  FaPlus,
} from "react-icons/fa";
import { MdHome, MdOndemandVideo, MdGroups } from "react-icons/md";
import { UseUserContext } from "../../context/UserContext";
import defaultPfp from "../../assets/default-pfp.webp";
import { Link } from "react-router-dom";

const NavTab = ({ icon, isActive, to }) => (
  <Link
    to={to}
    className={`flex-1 h-12 flex items-center justify-center cursor-pointer rounded-lg hover:bg-gray-100 transition ${isActive ? "border-b-[3px] border-[#1877f2] rounded-none hover:bg-transparent" : ""}`}
  >
    <div className={`${isActive ? "text-[#1877f2]" : "text-gray-500"}`}>
      {icon}
    </div>
  </Link>
);

const IconButton = ({ icon, hiddenOnMobile, to }) => (
  <Link
    to={to}
    className={`w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center cursor-pointer transition ${hiddenOnMobile ? "hidden md:flex" : "flex"}`}
  >
    {icon}
  </Link>
);

const Navbar = () => {
  const { user } = UseUserContext();
  

  return (
    <nav className="bg-white h-14 flex items-center justify-between px-2 md:px-4 fixed top-0 w-full z-50 shadow-sm">
      <div className="flex items-center gap-2 w-1/4">
        <Link to="/">
          <FaFacebook className="text-[#1877f2] text-4xl shrink-0 cursor-pointer" />
        </Link>
        <div className="bg-gray-100 rounded-full flex items-center px-3 py-2 cursor-pointer hover:bg-gray-200 transition">
          <FaSearch className="text-gray-500 text-sm" />
          <input
            type="text"
            placeholder="Search Facebook"
            className="bg-transparent outline-none ml-2 text-[15px] hidden xl:block w-48"
          />
        </div>
      </div>

      <div className="hidden md:flex justify-center items-center h-full w-2/4 max-w-[600px] gap-1 md:gap-2">
        <NavTab to="/" icon={<MdHome size={28} />} isActive={true} />
        <NavTab to="/friends" icon={<FaUserFriends size={24} />} />
        <NavTab to="/reels" icon={<MdOndemandVideo size={28} />} />
        <NavTab to="/chats" icon={<MdGroups size={28} />} />
      </div>

      <div className="flex items-center justify-end gap-2 w-1/4">
        <IconButton to="/" icon={<MdHome size={20} />} hiddenOnMobile />
        <IconButton to="/add-post" icon={<FaPlus size={20} />} />
        <IconButton to="/settings" icon={<FaCog size={20} />} />
        <Link to={`/profile/${user?._id}`}>
          <img
            src={
              user?.profilePicture
                ? `${import.meta.env.VITE_BACKEND_URL}${user.profilePicture}`
                : defaultPfp
            }
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer hover:opacity-90 transition object-cover ml-1"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
