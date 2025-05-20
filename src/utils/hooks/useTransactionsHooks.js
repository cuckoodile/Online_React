import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  fetchTransactionTypes,
  fetchTransactionTypeById,
  createTransactionType,
  updateTransactionType,
  deleteTransactionType,
  fetchTransactionStatuses,
  fetchTransactionStatusById,
  createTransactionStatus,
  updateTransactionStatus,
  deleteTransactionStatus,
  fetchTransactionPaymentMethods,
  fetchTransactionPaymentMethodById,
  createTransactionPaymentMethod,
  updateTransactionPaymentMethod,
  deleteTransactionPaymentMethod,
} from "../APIs/transactionsApi";

// Transactions
export const useTransactions = () => {
  return useQuery({ queryKey: ["transactions"], queryFn: fetchTransactions });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }) => createTransaction({ data, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
    },
  });
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, updatedData }) => updateTransaction(id, updatedData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["transactions"]);
      },
    }
  );
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
    },
  });
};

export const useTransactionById = (id) => {
  return useQuery({
    queryKey: ["transactions", id],
    queryFn: () => fetchTransactions(id),
  });
};

// Transaction Types
export const useTransactionTypes = () => {
  return useQuery({
    queryKey: ["transactionTypes"],
    queryFn: fetchTransactionTypes,
  });
};

export const useTransactionTypeById = (id) => {
  return useQuery({
    queryKey: ["transactionType", id],
    queryFn: () => fetchTransactionTypeById(id),
    enabled: !!id,
  });
};

export const useCreateTransactionType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }) => createTransactionType({ data, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(["transactionTypes"]);
    },
  });
};

export const useUpdateTransactionType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data, token }) =>
      updateTransactionType({ id, data, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(["transactionTypes"]);
    },
  });
};

export const useDeleteTransactionType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, token }) => deleteTransactionType({ id, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(["transactionTypes"]);
    },
  });
};

// Transaction Statuses
export const useTransactionStatuses = () => {
  return useQuery({
    queryKey: ["transactionStatuses"],
    queryFn: fetchTransactionStatuses,
  });
};

export const useTransactionStatusById = (id) => {
  return useQuery({
    queryKey: ["transactionStatus", id],
    queryFn: () => fetchTransactionStatusById(id),
    enabled: !!id,
  });
};

export const useCreateTransactionStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }) => createTransactionStatus({ data, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(["transactionStatuses"]);
    },
  });
};

export const useUpdateTransactionStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data, token }) =>
      updateTransactionStatus({ id, data, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(["transactionStatuses"]);
    },
  });
};

export const useDeleteTransactionStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, token }) => deleteTransactionStatus({ id, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(["transactionStatuses"]);
    },
  });
};

// Transaction Payment Methods
export const useTransactionPaymentMethods = () => {
  return useQuery({
    queryKey: ["transactionPaymentMethods"],
    queryFn: fetchTransactionPaymentMethods,
  });
};

export const useTransactionPaymentMethodById = (id) => {
  return useQuery({
    queryKey: ["transactionPaymentMethod", id],
    queryFn: () => fetchTransactionPaymentMethodById(id),
    enabled: !!id,
  });
};

export const useCreateTransactionPaymentMethod = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }) =>
      createTransactionPaymentMethod({ data, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(["transactionPaymentMethods"]);
    },
  });
};

export const useUpdateTransactionPaymentMethod = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data, token }) =>
      updateTransactionPaymentMethod({ id, data, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(["transactionPaymentMethods"]);
    },
  });
};

export const useDeleteTransactionPaymentMethod = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, token }) =>
      deleteTransactionPaymentMethod({ id, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(["transactionPaymentMethods"]);
    },
  });
};
