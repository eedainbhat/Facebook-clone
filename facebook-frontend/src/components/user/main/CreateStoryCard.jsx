import React from "react";

const CreateStoryCard = ({ user, defaultPfp }) => (
  <div className="w-28 h-48 md:w-[140px] md:h-[250px] bg-white rounded-xl shadow-sm overflow-hidden flex flex-col relative cursor-pointer group shrink-0 border border-gray-200">
    <img
      src={
        user?.profilePicture
          ? `${import.meta.env.VITE_BACKEND_URL}${user.profilePicture}`
          : defaultPfp
      }
      className="h-[65%] w-full object-cover transition duration-300"
      alt="Me"
    />
    <div className="h-[35%] w-full flex flex-col items-center justify-end pb-2 relative">
      <div className="absolute -top-5 bg-[#1877f2] border-4 border-white rounded-full w-10 h-10 flex items-center justify-center">
        <span className="text-white text-2xl font-bold mb-1">+</span>
      </div>
      <span className="text-sm font-semibold">Create story</span>
    </div>
  </div>
);

export default CreateStoryCard;
