import api from "./apiConfig";

export const signUpUser = async (
  username,
  email,
  password,
  confirmPassword,
  phoneNumber,
  terms,
) => {
  try {
    const response = await api.post("/auth/sign-up", {
      username,
      email,
      password,
      confirmPassword,
      phoneNumber,
      terms,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Sign up failed");
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post('/auth/logout');

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
}

export const deleteProfile = async (userId) => {
  try {
    const response = await api.post(`/auth/delete-profile/${userId}`);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message);
  }
};

