import axios from "axios";
import { BASE_URL } from "./api_config";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const logInAPI = async (data) => {
  try {
    const response = await api.post("/api/login", data);
    console.log("User logged in: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Login Error: ", error);
    throw new Error("Failed to login");
  }
};

export const checkUserAPI = async (token) => {
  try {
    const response = await api.get("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Checked user logged in: ", response.data.data);
    return response.data;
  } catch (error) {
    console.error("Login Error: ", error);
    throw new Error("Failed to login");
  }
};

export const fetchUsers = async (data) => {
  console.log("Attempt to fetch user data: ", data);

  try {
    const response = await api.get("/api/users", {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });
    console.log("API Response (fetchUsers):", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (fetchUsers):", error);
    throw new Error("Failed to fetch users");
  }
};

export const fetchUserById = async (id) => {
  try {
    const response = await api.get(`/api/users/${id}`);
    console.log("API Response (fetchUserById):", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (fetchUserById):", error);
    throw new Error("Failed to fetch user");
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post("/api/users", userData);
    console.log("User created:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (createUser):", error);
    throw new Error("Failed to create user");
  }
};

export const updateUser = async (id, updatedData) => {
  try {
    const response = await api.put(`/api/users/${id}`, updatedData);
    console.log("User updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (updateUser):", error);
    throw new Error("Failed to update user");
  }
};

export const deleteUser = async (id) => {
  try {
    await api.delete(`/api/users/${id}`);
    console.log("User deleted with ID:", id);
    return id;
  } catch (error) {
    console.error("API Error (deleteUser):", error);
    throw new Error("Failed to delete user");
  }
};
