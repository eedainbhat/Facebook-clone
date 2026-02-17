import { MoreHorizontal } from "lucide-react";
import React from "react";

const Comments = ({ comment }) => {
  return (
    <div className="mt-4">
      <div className="flex gap-2 group">
        {/* Avatar */}
        <img
          src= {comment.avatar}
          className="w-8 h-8 rounded-full object-cover cursor-pointer hover:opacity-90"
        />

        {/* Comment Bubble & Actions */}
        <div className="flex flex-col max-w-[85%]">
          {/* The Bubble */}
          <div className="bg-gray-200 px-3 py-2 rounded-2xl relative">
            <h6 className="font-semibold text-[13px] text-gray-900 cursor-pointer hover:underline">
              {comment.user}
            </h6>

            <p className="text-[15px] text-gray-800 leading-5">
              {comment.commentText}
            </p>
          </div>

          {/* Actions (Like · Reply · Time) */}
          <div className="flex gap-3 ml-3 mt-1 text-[12px] font-semibold text-gray-500">
            <span className="cursor-pointer hover:underline">Like</span>
            <span className="cursor-pointer hover:underline" onClick={() => {
              
            }}>Hide</span>
            <span className="font-normal">{comment.time}</span>
          </div>
        </div>

        {/* More Options (Hidden by default, shows on hover) */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <div className="p-2 hover:bg-gray-200 rounded-full">
            <MoreHorizontal size={16} className="text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
