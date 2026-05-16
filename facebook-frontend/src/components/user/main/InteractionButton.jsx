import React from "react";

const InteractionButton = ({ icon, label, isLiked }) => (
  <button
    type="submit"
    className={`w-full flex items-center justify-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer transition ${isLiked ? "text-[#1877f2]" : "text-gray-500"}`}
  >
    {icon}
    <span className="font-semibold text-[15px]">{label}</span>
  </button>
);

export default InteractionButton;