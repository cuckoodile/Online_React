import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCategories = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryFn: getCategories,
    queryKey: ["categories"],
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
};

/* 
    id
    name
    timestamp
*/

const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/categories`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const res = await response.json();

    if (!res.ok) {
      throw new Error("Error fetching categories");
    }

    console.log("Fetched categories response: ", res);
    return res.data;
  } catch (error) {
    console.log("Error fetching categories: ", error);
  }
};
