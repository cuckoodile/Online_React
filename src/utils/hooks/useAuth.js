import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logInAPI,logOutAPI } from "../APIs/userApi";

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => logInAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (token) => logOutAPI(token),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};