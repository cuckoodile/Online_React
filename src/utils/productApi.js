import axios from "axios";
import { BASE_URL } from "./api_config";


const api = axios.create({
  baseURL: BASE_URL,
});


export const fetchProducts = async () => {
  try {
    const response = await api.get("/api/products");
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (fetchProducts):", error);
    throw new Error("Failed to fetch products");
  }
};


export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/api/products/${id}`);
    console.log("API Response (fetchProductById):", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (fetchProductById):", error);
    throw new Error("Failed to fetch product");
  }
};


export const createProduct = async (productData) => {
  try {
    const response = await api.post("/api/products", productData);
    console.log("Product created:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (createProduct):", error);
    throw new Error("Failed to create product");
  }
};


export const updateProduct = async (id, updatedData) => {
  try {
    const response = await api.put(`/api/products/${id}`, updatedData);
    console.log("Product updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (updateProduct):", error);
    throw new Error("Failed to update product");
  }
};


export const deleteProduct = async (id) => {
  try {
    await api.delete(`/api/products/${id}`);
    console.log("Product deleted with ID:", id);
    return id;
  } catch (error) {
    console.error("API Error (deleteProduct):", error);
    throw new Error("Failed to delete product");
  }
};
