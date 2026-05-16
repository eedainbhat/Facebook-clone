import React from "react";

const StoryCard = ({ img, profile, name }) => (
  <div className="w-28 h-48 md:w-[140px] md:h-[250px] rounded-xl overflow-hidden relative cursor-pointer group shrink-0 shadow-sm">
    <img
      src={img}
      className="w-full h-full object-cover transition duration-300"
      alt="Story"
    />
    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition duration-300"></div>
    <div className="absolute top-3 left-3 w-10 h-10 border-4 border-[#1877f2] rounded-full overflow-hidden z-10">
      <img src={profile} className="w-full h-full object-cover" alt="Profile" />
    </div>
    <span className="absolute bottom-3 left-3 right-3 text-white text-sm font-semibold truncate z-10 drop-shadow-md">
      {name}
    </span>
  </div>
);

export default StoryCard;