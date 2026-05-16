import React from "react";
import {
  FaUserPlus,
  FaFacebookMessenger,
  FaPen,
  FaChevronDown,
} from "react-icons/fa";
import defaultPfp from "../../../assets/default-pfp.webp";
import { Link } from "react-router-dom";

const ProfileHeader = ({ user, isOwnProfile }) => {
  
  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-250 mx-auto relative">
        <div className="h-20 w-full rounded-b-lg overflow-hidden bg-gray-200"></div>

        <div className="px-4 md:px-8 pb-4">
          <div className="flex flex-col md:flex-row gap-4 md:items-end -mt-12 md:-mt-8 relative z-10">
            <div className="w-[168px] h-[168px] rounded-full border-4 border-white bg-white overflow-hidden shrink-0 relative cursor-pointer">
              <img
                src={
                  user?.profilePicture
                    ? `${import.meta.env.VITE_BACKEND_URL}${user.profilePicture}`
                    : defaultPfp
                }
                alt="Profile"
                className="w-full h-full object-cover hover:opacity-90 transition"
              />
            </div>

            <div className="flex-1 md:pb-4 md:pt-12 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900">
                {user?.username }
              </h1>
              <p className="text-gray-500 font-semibold text-[15px] hover: cursor-pointer">
                1.2K Friends
              </p>
              <div className="flex -space-x-2 mt-1 justify-center md:justify-start">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <img
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-end gap-2 md:pb-4">
              {isOwnProfile ? (
                <>
                  <button className="bg-[#1877f2] hover:bg-[#166fe5] text-white font-semibold py-2 px-3 rounded-lg transition flex items-center gap-2">
                    <span className="text-xl">+</span> Add to story
                  </button>
                  <Link to="/settings" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-3 rounded-lg transition flex items-center gap-2">
                    <FaPen /> Edit profile
                  </Link>
                </>
              ) : (
                <>
                  <button className="bg-[#1877f2] hover:bg-[#166fe5] text-white font-semibold py-2 px-4 rounded-lg transition flex items-center gap-2">
                    <FaUserPlus /> Add Friend
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition flex items-center gap-2">
                    <FaFacebookMessenger /> Message
                  </button>
                </>
              )}
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 px-3 rounded-lg transition">
                <FaChevronDown />
              </button>
            </div>
          </div>

          <div className="border-t border-gray-300 mt-6 flex gap-1 pt-1">
            <div className="text-[#1877f2] border-b-4 border-[#1877f2] px-4 py-3 font-semibold cursor-pointer">
              Posts
            </div>
            <div className="text-gray-600 hover:bg-gray-100 rounded-lg px-4 py-3 font-semibold cursor-pointer transition">
              About
            </div>
            <div className="text-gray-600 hover:bg-gray-100 rounded-lg px-4 py-3 font-semibold cursor-pointer transition">
              Friends
            </div>
            <div className="text-gray-600 hover:bg-gray-100 rounded-lg px-4 py-3 font-semibold cursor-pointer transition">
              Photos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
