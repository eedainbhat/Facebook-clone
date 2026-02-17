import { Forward, MessageCircle, ThumbsUp } from "lucide-react";
import React, { use, useContext } from "react";
import { MyContext } from "../store/Store";

const PostInteractions = ({ postLikeCounts, setIsCommentBoxOn, isCommentBoxOn, id }) => {
  const { updateLikeCount } = useContext(MyContext);
  return (
    <div className="flex justify-between items-center mt-4">
      <div
        className={
          postLikeCounts > 0
            ? "liked text-white flex items-center justify-center gap-2 cursor-pointer rounded-md pt-2 pb-2 grow"
            : "text-gray-600 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md pt-2 pb-2 grow"
        }
        onClick={() => {
          updateLikeCount(id);
        }}
      >
        <ThumbsUp strokeWidth={1.5} size={28} />
        <p className="font-medium">Like</p>
      </div>
      <div className="text-gray-600 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md pt-2 pb-2 grow" 
      onClick={()=>{
        setIsCommentBoxOn(!isCommentBoxOn)
      }}>
        <MessageCircle strokeWidth={1.5} size={27} />
        <p className="font-medium">Comment</p>
      </div>
      <div className="text-gray-600 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md pt-2 pb-2 grow">
        <Forward strokeWidth={1.5} size={28} />
        <p className="font-medium">Share</p>
      </div>
    </div>
  );
};

export default PostInteractions;
