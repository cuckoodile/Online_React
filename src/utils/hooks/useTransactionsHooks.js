import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {fetchTransactions,createTransaction,updateTransaction,deleteTransaction} from "../APIs/transactionsApi";

export const useTransactions = () => {
  return useQuery(["transactions"], fetchTransactions);
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:({data,token})=> createTransaction ({data,token }),
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
