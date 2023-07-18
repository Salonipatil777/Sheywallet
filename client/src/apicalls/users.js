const { axiosInstance } = require(".");

export const LoginUser = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/api/users/login", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const RegisterUser = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/api/users/register", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const GetUserInfo = async () => {
  try {
    const { data } = await axiosInstance.post("/api/users/get-user-info-by-id");
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//get all users
export const GetAllUsers = async () => {
  try {
    const { data } = await axiosInstance.post("/api/users/get-all-users");
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//update verified user status
export const UpdateVerifiedUser = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/users/update-verified-user",
      payload
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};
