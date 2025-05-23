import { BASE_URL } from "@/utils/APIs/api_config";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetProducts = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryFn: getProducts,
    queryKey: ["products"],
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};

/* 
    name
    price
    image[0]
    comment.ratings
    cart (is the fetched product on the user cart? BOOLEAN)
    timestamp
*/

const getProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/products`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const res = await response.json();

    if (!res.ok) {
      throw new Error("Error fetching products");
    }

    console.log("Fetch products response: ", res);
    return res.data;
  } catch (error) {
    console.log("Error fetching products", error);
    throw new Error("Error fetching products", error);
  }
};
