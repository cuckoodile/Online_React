import axios from "axios";
import { BASE_URL } from "./api_config";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const fetchProducts = async () => {
  try {
    const response = await api.get("/api/products");
    // console.log("API Response:", response.data.data);
    return await response.data.data;
  } catch (error) {
    console.error("API Error (fetchProducts):", error);
    throw new Error("Failed to fetch products");
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/api/products/${id}`);
    console.log("API Response (fetchProductById):", response.data);
    return response.data.data;
  } catch (error) {
    console.error("API Error (fetchProductById):", error);
    throw new Error("Failed to fetch product");
  }
};

export const createProduct = async (productData, token) => {
  try {
    const response = await api.post("/api/products", productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Product created:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("API Error (createProduct):", error);
    throw new Error("Failed to create product");
  }
};

export const updateProduct = async ({ id, data, token }) => {
  for (let pair of data.entries()) {
    console.log(pair[0] + ":", pair[1]);
  }
  console.log("Updated Data:", data);

  try {
    const response = await api.patch(`/api/products/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Product updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (updateProduct):", error);
    throw new Error("Failed to update product");
  }
};

export const deleteProduct = async (id, token) => {
  try {
    await api.delete(`/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Product deleted with ID:", id);
    return id;
  } catch (error) {
    console.error("API Error (deleteProduct):", error);
    throw new Error("Failed to delete product");
  }
};
