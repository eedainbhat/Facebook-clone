import React from "react";

const ProfilePhotos = ({user}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl hover: cursor-pointer">Photos</h2>
        <span className="text-[#1877f2] hover:bg-gray-100 px-2 py-1 rounded-lg cursor-pointer transition text-[15px]">See all photos</span>
      </div>
      
      <div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden">
        {user?.posts?.slice(0, 3).forEach(post => {
          <img src={post?.postPhoto} className="w-full h-24 object-cover cursor-pointer hover:opacity-90" />
        })}
      </div>
    </div>
  );
};

export default ProfilePhotos;