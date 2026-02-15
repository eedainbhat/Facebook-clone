import React, { useContext } from "react";
import MainfeedHead from "./MainfeedHead";
import MainfeedContent from "./MainfeedContent";
import { MyContext } from "../store/Store";

const MainFeed = () => {
  const { postList } = useContext(MyContext);
  return (
    <div className="flex items-center flex-col rounded p-4 w-full h-[92vh] overflow-y-auto webkit-scrollbar-hide">
      <MainfeedHead />
      {postList.length > 0 ? postList.map((post) => (
        <MainfeedContent
          id={post.id}
          key={post.id}
          userName={post.userName}
          userImg={post.userImg}
          postTime={post.postTime}
          postDes={post.postDes}
          postImg={post.postImg}
          postLikeCounts={post.postLikeCounts}
        />
      )) : <p className="text-gray-500 mt-10 text-lg">No posts to display. Create a new post to see it here!</p>}
    </div>
  );
};

export default MainFeed;
