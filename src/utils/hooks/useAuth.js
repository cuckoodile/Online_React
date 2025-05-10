import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logInAPI } from "../APIs/userApi";

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => logInAPI(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};