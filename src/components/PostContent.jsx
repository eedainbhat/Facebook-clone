import React from "react";

const PostContent = ({ postImg }) => {
  return (
    <div className="w-full h-fit mt-3 mb-2 flex justify-center items-center shrink-0">
      {postImg && (
        <img src={postImg} />
      )}
    </div>
  );
};

export default PostContent;
