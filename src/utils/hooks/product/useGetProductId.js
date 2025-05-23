import { BASE_URL } from "@/utils/APIs/api_config";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetProductId = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryFn: (id) => getProductId(id),
    queryKey: ["products"],
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};

/* 
    name
    description
    price
    images
    stocks (transaction.type == inbound - transaction.type == outbound)
    category_id
    cart (is the fetched product on the user cart? BOOLEAN)
    timestamp
    specifications: {
        "detail1": "value1",
        "detail2": "value2",
    }
    comments: {
        comment
        rating
        comment_id (recursive relationship, null by default)
    }
*/

const getProductId = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();

    if (!res.ok) {
      throw new Error(`Error fetching product id ${id}`);
    }

    console.log(`Fetched product id ${id} response`, res);
    return res.data;
  } catch (error) {
    console.log(`Error fetching product id ${id}`, error);
    throw new Error(`Error fetching product id ${id}`, error);
  }
};
