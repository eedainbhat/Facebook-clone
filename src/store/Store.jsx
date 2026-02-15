import { createContext, use, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [postList, setPostList] = useState([]);

  const addPost = (
    userName,
    postDes,
    userImg,
    postContentLink,
    postedTimeAgo,
  ) => {
    setPostList([
      {
        id: Date.now(),
        userName: userName,
        userImg: userImg,
        postTime: postedTimeAgo,
        postDes: postDes,
        postImg: postContentLink,
        postLikeCounts: 0,
      },
      ...postList,
    ]);
  };

  const updateLikeCount = (postId) => {
    setPostList((prevPostList) =>
      prevPostList.map((post) =>
        post.id === postId
          ? { ...post, postLikeCounts: post.postLikeCounts + 1 }
          : post,
      ),
    );
  };

  return (
    <MyContext.Provider
      value={{
        isCreating,
        setIsCreating,
        postList,
        setPostList,
        addPost,
        updateLikeCount,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
