import api from "./apiConfig";

export const fetchPostsFromServer = async (userId) => {
  try {
    const response = await api.get("/user/fetch-post", {
      params: { userId },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error while fetching posts",
    );
  }
};

export const addPostUser = async (postData) => {
  try {
    const response = await api.post("/user/add-post", postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.post;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error while posting");
  }
};

export const deletePostUser = async (postId) => {
  try {
    const response = await api.post(`/user/delete-post/${postId}`);

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error while deleting post",
    );
  }
};

export const likePost = async (postId, userId) => {
  try {
    const response = await api.post(`/user/like-post/${postId}`, { userId });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error while liking post");
  }
};

export const addCommentToPost = async (commentContent, postId, userId, timeCommented) => {
  try {
    const response = await api.post(`/user/add-comment/${postId}`, { commentContent, userId, timeCommented });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error while adding comment");
  }
};