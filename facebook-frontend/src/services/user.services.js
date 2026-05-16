import api from "./apiConfig";

export const getHome = async () => {
  try {
    const response = await api.get("/user/home");

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

export const editProfile = async (formDataPayload) => {
  try {
    const response = await api.post(
      "/user/edit-profile",
      formDataPayload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Update failed");
  }
};

export const getProfile = async (userId) => {
  try {
    const response = await api.get(`/user/profile/${userId}`);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};