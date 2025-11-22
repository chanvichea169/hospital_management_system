import api from "./api";

const GET_USER = process.env.REACT_APP_GET_USER_ENDPOINT;
const UPDATE_USER = process.env.REACT_APP_API_UPDATE_USER_ENDPOINT;

export const getUserById = async (id, token = null) => {
  const res = await api.get(`${GET_USER}/${id}`);
  return res.data;
};

// UPDATE USER PROFILE
export const updateUserProfile = async (id, profileData) => {
  const res = await api.put(`${UPDATE_USER}/${id}`, profileData);
  return res.data;
};
