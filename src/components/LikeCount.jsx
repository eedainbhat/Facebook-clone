import React, { useContext } from "react";
import { MyContext } from "../store/Store";

const LikeCount = ({ postLikeCounts }) => {
  return (
    <div className="mt-2 bg-gray-100 px-2">
      {postLikeCounts > 0 && (
        <p className="text-gray-600 text-sm font-medium">
          {postLikeCounts} {postLikeCounts === 1 ? "Like" : "Likes"}
        </p>
      )}
    </div>
  );
};

export default LikeCount;
