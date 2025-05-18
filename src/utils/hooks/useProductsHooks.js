import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createProduct,updateProduct,fetchProducts,fetchProductById,deleteProduct} from "../APIs/productApi";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export const useProductsById = (id) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => fetchProductById(id),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }) => createProduct(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data, token }) => updateProduct(id, data, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, token }) => deleteProduct(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (reviewData) => {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) throw new Error('Failed to create review');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error('Failed to update review');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete review');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });
};