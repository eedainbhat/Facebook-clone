import { Send } from "lucide-react";
import React, { useContext, useRef } from "react";
import { MyContext } from "../store/Store";

const AddComment = ({ id, userName }) => {
  const { addComment } = useContext(MyContext);
  const commentInput = useRef();

  const handleOnComment = () => {
    let commentInputVal = commentInput.current.value;
    if (commentInputVal.trim() !== "") {
      addComment(commentInputVal, userName, "Just now", id);
    }
    commentInput.current.value = "";
  };
  return (
    <div className="flex items-center mt-3">
      <img
        src="https://randomuser.me/api/portraits/men/1.jpg"
        alt="User Avatar"
        className="w-8 h-8 rounded-full object-cover cursor-pointer hover:opacity-90"
      />
      <input
        type="text"
        className="ml-2 w-full border border-gray-300 rounded-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Add a comment..."
        ref={commentInput}
      />
      <Send
        size={20}
        className="text-blue-500 shrink-0 cursor-pointer ml-2"
        onClick={handleOnComment}
      />
    </div>
  );
};

export default AddComment;
