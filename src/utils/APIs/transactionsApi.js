import axios from "axios";
import { BASE_URL } from "./api_config";

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchTransactions = async () => {
  try {
    const response = await api.get("/api/transactions");
    console.log("API Response (fetchTransactions):", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (fetchTransactions):", error);
    throw new Error("Failed to fetch transactions");
  }
};

export const fetchTransactionById = async (id) => {
  try {
    const response = await api.get(`/api/transactions/${id}`);
    console.log("API Response (fetchTransactionById):", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (fetchTransactionById):", error);
    throw new Error("Failed to fetch transaction");
  }
};
export const createTransaction = async (transactionData) => {
  try {
    const response = await api.post("/api/transactions", transactionData);
    console.log("Transaction created:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (createTransaction):", error);
    throw new Error("Failed to create transaction");
  }
};
export const updateTransaction = async (id, updatedData) => {
  try {
    const response = await api.put(`/api/transactions/${id}`, updatedData);
    console.log("Transaction updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (updateTransaction):", error);
    throw new Error("Failed to update transaction");
  }
};
export const deleteTransaction = async (id) => {
  try {
    await api.delete(`/api/transactions/${id}`);
    console.log("Transaction deleted with ID:", id);
    return id;
  } catch (error) {
    console.error("API Error (deleteTransaction):", error);
    throw new Error("Failed to delete transaction");
  }
};