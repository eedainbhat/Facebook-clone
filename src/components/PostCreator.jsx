import { X } from "lucide-react";
import { useContext } from "react";
import { MyContext } from "../store/Store";

const PostCreator = ({ userName, userImg, postTime, id }) => {
  const { postList, setPostList } = useContext(MyContext);
  
  return (
    <div className="flex justify-between">
      <div className="flex">
        <img
          src={userImg}
          alt="image"
          className="w-12 h-12 rounded-full mr-3 border-2 border-blue-800 p-0.75 cursor-pointer"
        />
        <div>
          <h6 className="cursor-pointer hover:underline font-semibold">{userName}</h6>
          <p className="text-gray-700 text-sm leading-3">{postTime}</p>
        </div>
      </div>
      <X className="cursor-pointer" onClick={() => setPostList(postList.filter(post => post.id !== id))} />
    </div>
  );
};

export default PostCreator;
