import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCartItems,
  createCartItem,
  updateCartItem,
  deleteCartItem,
} from "../cartApi";

export const useCartItems = () => {
  return useQuery({
    queryKey: ["carts"],
    queryFn: fetchCartItems,
  });
};

export const useAddCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updatedData }) => updateCartItem(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
    },
  });
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
    },
  });
};
