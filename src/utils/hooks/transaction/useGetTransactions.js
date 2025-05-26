import { useQueryClient } from "@tanstack/react-query";

export const useGetTransactions = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryFn: getTransactions,
    queryKey: ["transactions"],
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
    },
  });
};

/* 
    id
    owner_id
    type_id
    status_id
    payment_id
    timestamp
*/

const getTransactions = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/transactions`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const res = await response.json();

    if (!res.ok) {
      throw new Error("Error fetching transactions");
    }

    console.log("Fetched transactions response: ", res);
    return res.data;
  } catch (error) {
    console.log("Error fetching transactions: ", error);
  }
};
