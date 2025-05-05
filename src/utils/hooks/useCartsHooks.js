import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {fetchCartItems,createCartItem,updateCartItem,deleteCartItem} from "../cart_api";

export const useCartItems = () => {
  return useQuery(["cartItems"], fetchCartItems);
};

export const useAddCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation(createCartItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cartItems"]);
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, updatedData }) => updateCartItem(id, updatedData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["cartItems"]);
      },
    }
  );
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCartItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cartItems"]);
    },
  });
};
