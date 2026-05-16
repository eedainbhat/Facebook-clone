import React from "react";

const PostAction = ({ icon, label, hiddenOnMobile }) => (
  <div
    className={`flex items-center justify-center gap-2 flex-1 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition ${hiddenOnMobile ? "hidden md:flex" : "flex"}`}
  >
    {icon}
    <span className="font-semibold text-gray-500 text-[15px]">{label}</span>
  </div>
);

export default PostAction;