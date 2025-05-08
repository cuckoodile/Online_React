import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { fetchCategory,createCategory,updateCategory,deleteCategory } from "../categoriesApi";

export const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategory,
  });
};

export const useCategoryById = (id) => {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => fetchCategory(id),
  });
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: createCategory,
      onSuccess: () => {
        queryClient.invalidateQueries(["categories"]);
      },
    });
  };

  export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, updatedData }) => updateCategory(id, updatedData),
      onSuccess: () => {
        queryClient.invalidateQueries(["categories"]);
      },
    });
  };

  export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: deleteCategory,
      onSuccess: () => {
        queryClient.invalidateQueries(["categories"]);
      },
    });
  };