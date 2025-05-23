import { BASE_URL } from "@/utils/APIs/api_config";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUsers = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryFn: getUsers,
    queryKey: ["users"],
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};

/* 
  username
  timestamp
  profile: {
    first_name
    last_name
    contact
    role
    profile_image
    timestamp
    address: {
      region
      province
      city
      baranggay
      house_address
      zip_code
      timestamp
    }
    transaction: {
      type_id
      status_id
      payment_id
    }
  }
*/

const getUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/users`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const res = await response.json();

    if (!res.ok) {
      throw new Error("Error fetching users");
    }

    console.log("Fetched users response: ", res);
    return res.data;
  } catch (error) {
    console.log("Error fetching users: ", error);
    throw new Error("Error fetching users: ", error);
  }
};
