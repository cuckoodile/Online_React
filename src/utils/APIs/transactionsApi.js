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

export const createTransaction = async ({ data, token }) => {
  try {
    const response = await api.post("/api/transactions", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

// Transaction Types
export const fetchTransactionTypes = async () => {
  try {
    const response = await api.get("/api/transactions/type");
    return response.data;
  } catch (error) {
    console.error("API Error (fetchTransactionTypes):", error);
    throw new Error("Failed to fetch transaction types");
  }
};

export const fetchTransactionTypeById = async (id) => {
  try {
    const response = await api.get(`/api/transactions/type/${id}`);
    return response.data;
  } catch (error) {
    console.error("API Error (fetchTransactionTypeById):", error);
    throw new Error("Failed to fetch transaction type");
  }
};

export const createTransactionType = async ({ data, token }) => {
  try {
    const response = await api.post("/api/transactions/type", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("API Error (createTransactionType):", error);
    throw new Error("Failed to create transaction type");
  }
};

export const updateTransactionType = async ({ id, data, token }) => {
  try {
    const response = await api.patch(`/api/transactions/type/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("API Error (updateTransactionType):", error);
    throw new Error("Failed to update transaction type");
  }
};

export const deleteTransactionType = async ({ id, token }) => {
  try {
    await api.delete(`/api/transactions/type/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  } catch (error) {
    console.error("API Error (deleteTransactionType):", error);
    throw new Error("Failed to delete transaction type");
  }
};

// Transaction Statuses
export const fetchTransactionStatuses = async () => {
  try {
    const response = await api.get("/api/transactions/status");
    return response.data;
  } catch (error) {
    console.error("API Error (fetchTransactionStatuses):", error);
    throw new Error("Failed to fetch transaction statuses");
  }
};

export const fetchTransactionStatusById = async (id) => {
  try {
    const response = await api.get(`/api/transactions/status/${id}`);
    return response.data;
  } catch (error) {
    console.error("API Error (fetchTransactionStatusById):", error);
    throw new Error("Failed to fetch transaction status");
  }
};

export const createTransactionStatus = async ({ data, token }) => {
  try {
    const response = await api.post("/api/transactions/status", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("API Error (createTransactionStatus):", error);
    throw new Error("Failed to create transaction status");
  }
};

export const updateTransactionStatus = async ({ id, data, token }) => {
  try {
    const response = await api.patch(`/api/transactions/status/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("API Error (updateTransactionStatus):", error);
    throw new Error("Failed to update transaction status");
  }
};

export const deleteTransactionStatus = async ({ id, token }) => {
  try {
    await api.delete(`/api/transactions/status/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  } catch (error) {
    console.error("API Error (deleteTransactionStatus):", error);
    throw new Error("Failed to delete transaction status");
  }
};

// Transaction Payment Methods
export const fetchTransactionPaymentMethods = async () => {
  try {
    const response = await api.get("/api/transactions/payment");
    return response.data;
  } catch (error) {
    console.error("API Error (fetchTransactionPaymentMethods):", error);
    throw new Error("Failed to fetch transaction payment methods");
  }
};

export const fetchTransactionPaymentMethodById = async (id) => {
  try {
    const response = await api.get(`/api/transactions/payment/${id}`);
    return response.data;
  } catch (error) {
    console.error("API Error (fetchTransactionPaymentMethodById):", error);
    throw new Error("Failed to fetch transaction payment method");
  }
};

export const createTransactionPaymentMethod = async ({ data, token }) => {
  try {
    const response = await api.post("/api/transactions/payment", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("API Error (createTransactionPaymentMethod):", error);
    throw new Error("Failed to create transaction payment method");
  }
};

export const updateTransactionPaymentMethod = async ({ id, data, token }) => {
  try {
    const response = await api.patch(`/api/transactions/payment/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("API Error (updateTransactionPaymentMethod):", error);
    throw new Error("Failed to update transaction payment method");
  }
};

export const deleteTransactionPaymentMethod = async ({ id, token }) => {
  try {
    await api.delete(`/api/transactions/payment/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  } catch (error) {
    console.error("API Error (deleteTransactionPaymentMethod):", error);
    throw new Error("Failed to delete transaction payment method");
  }
};