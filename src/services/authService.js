import api from "./api";

export const registerUser = async (userData) => {
  return await api.post("/api/users/register", userData);
};

export const loginUser = async (loginData) => {
  return await api.post("/api/users/login", loginData);
};