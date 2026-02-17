import { Send, MoreHorizontal, ThumbsUp } from "lucide-react";
import React, { useContext, useRef, useState } from "react";
import { MyContext } from "../store/Store";
import Comments from "./Comments";
import AddComment from "./AddComment";

const PostComments = ({ comments, id, userName }) => {
  const { postList } = useContext(MyContext);
  const [commentAdders, setCommentAdders] = useState([
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Bob Brown",
    "Charlie Davis",
    "Emily Wilson",
    "Frank Miller",
    "Grace Lee",
    "Henry Clark",
    "Isabella Turner",
  ]);

  return (
    <div className="w-full max-h-84 overflow-y-auto bg-white mt-5 border border-gray-100 p-2 rounded">
      <AddComment id={id} userName={userName} />
      {comments.length === 0 && <p className="flex justify-center text-gray-500 mt-4">No comments yet</p>}
      {comments.length > 0 && <p className="text-sm text-gray-500 mt-2">{comments.length} comments</p>}
      {comments.map((comment) => (
        <Comments key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default PostComments;
