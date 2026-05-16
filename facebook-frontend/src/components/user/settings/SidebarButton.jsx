import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

const SidebarButton = ({ icon, label, isActive, onClick, isDanger }) => {
  let activeStyles = "hover:bg-gray-100 text-gray-700";
  let iconStyles = "text-gray-500";

  if (isActive) {
    activeStyles = isDanger ? "bg-red-50 text-red-700" : "bg-[#ebf5ff] text-[#1877f2]";
    iconStyles = isDanger ? "text-red-600" : "text-[#1877f2]";
  }

  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors cursor-pointer ${activeStyles}`}
    >
      <div className="flex items-center gap-3">
        <div className={`text-xl ${iconStyles}`}>{icon}</div>
        <span className="font-semibold text-[15px]">{label}</span>
      </div>
      <FaChevronRight className={`text-xs ${isActive ? iconStyles : 'text-gray-400'}`} />
    </button>
  );
};

export default SidebarButton;