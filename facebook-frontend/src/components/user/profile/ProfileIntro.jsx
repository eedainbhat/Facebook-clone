import React from "react";
import { FaGraduationCap, FaHome, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import { UseUserContext } from "../../../context/UserContext";

const ProfileIntro = ({user}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h2 className="font-bold text-xl mb-4">Bio</h2>
      <p className="text-[15px] mb-4 text-gray-700">
        {user?.bio || "No bio added"}
      </p>
    </div>
  );
};

export default ProfileIntro;