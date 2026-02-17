import { createContext, useReducer, useState } from "react";

export const MyContext = createContext({
  isCreating: false,
  setIsCreating: () => {},
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  updateLikeCount: () => {},
});

const postReducer = (currVal, action) => {
  let newPostList = currVal;
  if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currVal];
  } else if (action.type === "DELETE_POST") {
    newPostList = currVal.filter((post) => post.id !== action.payload);
  } else if (action.type === "UPDATE_LIKE_COUNT") {
    newPostList = currVal.map((post) => {
      if (post.id === action.payload) {
        return { ...post, postLikeCounts: post.postLikeCounts + 1 };
      }
      return post;
    });
  } else if (action.type === "ADD_COMMENT") {
    newPostList = currVal.map((post) => {
      if (post.id === action.payload.postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now(),
              user: action.payload.user,
              avatar: "https://randomuser.me/api/portraits/men/1.jpg",
              commentText: action.payload.commentText,
              time: action.payload.time,
              isHiden: false,
            },
          ],
        };
      }
      return post;
    });
  }

  return newPostList;
};

export const MyProvider = ({ children }) => {
  //----------------------------------//
  {
    /*Default posts functionality */
  }
  const randomUserNames = [
    "Jane Smith",
    "Alice Johnson",
    "Bob Brown",
    "Charlie Davis",
    "Emily Wilson",
    "Frank Miller",
    "Grace Lee",
    "Henry Clark",
    "Isabella Turner",
  ];

  // Inside MyProvider, before useReducer

  const generateDummyPosts = () => {
    return Array.from({ length: 100 }).map((_, index) => ({
      id: Date.now() + index,
      userName:
        randomUserNames[Math.floor(Math.random() * randomUserNames.length)],
      userImg: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`,
      postTime: `${Math.floor(Math.random() * 24)} hours ago`,
      postDes:
        "Hey guys, this is a generated post to test the infinite scroll and comment logic!",
      postImg: `https://picsum.photos/seed/${index + 100}/800/600`,
      postLikeCounts: Math.floor(Math.random() * 500),
      comments: [
        {
          id: Date.now() + 999 + index,
          user: "Elon Musk",
          commentText: "Great post! 🚀",
          time: "2m",
          avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        },
      ],
    }));
  };

  const [postList, dispatch] = useReducer(postReducer, generateDummyPosts());
  const [isCreating, setIsCreating] = useState(false);

  const addPost = (
    userName,
    postDes,
    userImg,
    postContentLink,
    postedTimeAgo,
  ) => {
    dispatch({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        userName: userName,
        userImg: userImg,
        postTime: postedTimeAgo,
        postDes: postDes,
        postImg: postContentLink,
        postLikeCounts: 0,
        comments: [],
      },
    });
  };

  const deletePost = (postId) => {
    dispatch({
      type: "DELETE_POST",
      payload: postId,
    });
  };

  const updateLikeCount = (postId) => {
    dispatch({
      type: "UPDATE_LIKE_COUNT",
      payload: postId,
    });
  };

  const addComment = (commentText, user, time, postId) => {
    dispatch({
      type: "ADD_COMMENT",
      payload: { commentText, user, time, postId },
    });
  };

  return (
    <MyContext.Provider
      value={{
        isCreating,
        setIsCreating,
        postList,
        dispatch,
        addPost,
        deletePost,
        updateLikeCount,
        addComment,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
