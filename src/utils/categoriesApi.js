import axios from "axios";
import { BASE_URL } from "./api_config";


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});


export const fetchCategory = async () => {
  try {
    const response = await api.get("/api/categories");
    console.log("API Response:", response.data.data);
    return await response.data.data;
  } catch (error) {
    console.error("API Error (fetchCategories):", error);
    throw new Error("Failed to fetch categories");
  }
};


export const fetchCategoryById = async (id) => {
  try {
    const response = await api.get(`/api/categories/${id}`);
    console.log("API Response (fetchCategoriesById):", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("API Error (fetchCategoriesById):", error);
    throw new Error("Failed to fetch categories");
  }
};


export const createCategory = async (productData) => {
  try {
    const response = await api.post("/api/categories", productData);
    console.log("Product created:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (createCategories):", error);
    throw new Error("Failed to create categories");
  }
};


export const updateCategory = async (id, updatedData) => {
  try {
    const response = await api.put(`/api/categories/${id}`, updatedData);
    console.log("Product updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (updateCategories):", error);
    throw new Error("Failed to update categories");
  }
};


export const deleteCategory = async (id) => {
  try {
    await api.delete(`/api/categories/${id}`);
    console.log("Product deleted with ID:", id);
    return id;
  } catch (error) {
    console.error("API Error (deleteCategories):", error);
    throw new Error("Failed to delete categories");
  }
};
