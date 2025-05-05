import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createProduct,updateProduct,fetchProducts,deleteProduct} from "../productApi";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: createProduct,
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
      },
    });
  };

  export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, updatedData }) => updateProduct(id, updatedData),
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
      },
    });
  };

  export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: deleteProduct,
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
      },
    });
  };