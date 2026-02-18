import React from "react";

const PostDescription = ({ postDes }) => {
  return (
    <div className="w-full">
      <p className="mt-1 wrap-break-word w-full">{postDes}</p>
    </div>
  );
};

export default PostDescription;
