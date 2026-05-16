import React from "react";
import { Link } from "react-router-dom";

const SidebarItem = ({ icon, img, label, url }) => {
  return (
    <Link to={url}>
      <div className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition">
        {img ? (
          <img
            src={img}
            className="w-9 h-9 rounded-full object-cover"
            alt="icon"
          />
        ) : (
          <div className="w-9 h-9 flex items-center justify-center">{icon}</div>
        )}
        <span className="font-medium text-[15px]">{label}</span>
      </div>
    </Link>
  );
};
export default SidebarItem;
