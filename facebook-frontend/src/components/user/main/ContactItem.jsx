import React from "react";

const ContactItem = ({ img, name }) => (
  <div className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition relative">
    <div className="relative">
      <img
        src={img}
        className="w-9 h-9 rounded-full object-cover"
        alt="Contact"
      />
      <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-[#f0f2f5] absolute bottom-0 right-0"></div>
    </div>
    <span className="font-medium text-[15px]">{name}</span>
  </div>
);

export default ContactItem;