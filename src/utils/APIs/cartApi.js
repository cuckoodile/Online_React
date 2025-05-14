import axios from "axios";
import { BASE_URL } from "./api_config";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const fetchCartItems = async (data) => {
  console.log("Fetching cart items for user_id:", data?.user_id);
  try {
    const response = await api.get("/api/carts", {
      params: { user_id: data?.user_id },
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });
    console.log("API Response (fetchCartItems):", response.data);
    return response.data.data;
  } catch (error) {
    console.error("API Error (fetchCartItems):", error);
    throw new Error("Failed to fetch cart items");
  }
};

export const fetchCartItemById = async (id) => {
  try {
    const response = await api.get(`/api/carts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

export const deleteCartItem = async (id,token) => {
  try {
    await api.delete(`/api/carts/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Cart item deleted with ID:", id);
    return id;
  } catch (error) {
    console.error("API Error (deleteCartItem):", error);
    throw new Error("Failed to delete cart item");
  }
};
