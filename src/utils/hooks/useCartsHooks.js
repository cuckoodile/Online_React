import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCartItems,
  fetchCartItemById,
  createCartItem,
  updateCartItem,
  deleteCartItem,
} from "../APIs/cartApi";

export const useCartItems = (data) => {
  console.log("Fetching cart items for user:", data);
  return useQuery({
    queryKey: ["carts", data?.user_id],
    queryFn: () => fetchCartItems(data),
  });
};

export const useCartItemsById = (id) => {
  return useQuery({
    queryKey: ["carts", id],
    queryFn: () => fetchCartItemById(id),
  });
};

export const useAddCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }) => createCartItem({ ...data, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updatedData, token }) => updateCartItem(id, { ...updatedData, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
    },
  });
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, token }) => deleteCartItem(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
    },
  });
};
