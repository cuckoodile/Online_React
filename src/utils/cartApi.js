import axios from "axios";
import { BASE_URL } from "./api_config";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer 1|W6noOftMowcteA9Pb4dZ9yJyQfL5wygcpqVTkxZ7b2496ec2"
  },
});

export const fetchCartItems = async () => {
  try {
    const response = await api.get("/api/carts");
    console.log("API Response (fetchCartItems):", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (fetchCartItems):", error);
    throw new Error("Failed to fetch cart items");
  }
};

export const fetchCartItemById = async (id) => {
  try {
    const response = await api.get(`/api/carts/${id}`);
    console.log("API Response (fetchCartItemById):", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (fetchCartItemById):", error);
    throw new Error("Failed to fetch cart item");
  }
};

export const createCartItem = async (cartItemData) => {
  try {
    const response = await api.post("/api/carts", cartItemData);
    console.log("Cart item created:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (createCartItem):", error);
    throw new Error("Failed to create cart item");
  }
};

export const updateCartItem = async (id, updatedData) => {
  try {
    const response = await api.patch(`/api/carts/${id}`, updatedData);
    console.log("Cart item updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (updateCartItem):", error);
    throw new Error("Failed to update cart item");
  }
};

export const deleteCartItem = async (id) => {
  try {
    await api.delete(`/api/carts/${id}`);
    console.log("Cart item deleted with ID:", id);
    return id;
  } catch (error) {
    console.error("API Error (deleteCartItem):", error);
    throw new Error("Failed to delete cart item");
  }
};
