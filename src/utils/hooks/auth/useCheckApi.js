import { BASE_URL } from "@/utils/APIs/api_config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCheckApi = async () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (token) => checkUserAPI(token),
    mutationKey: ["currentUser"],
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });
};

/* 
username
token
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

const checkUserAPI = async (token) => {
  console.log("Attempt to check token: ", token);

  try {
    const response = await fetch(`${BASE_URL}/api/user`, {
      method: "POST",
      headers: {
        Accept: "accept/json",
        "Content-Type": "accept/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await response.json();

    if (!res.ok) {
      throw new Error("Log in failed");
    }

    console.log("Checked token response: ", res);
    return await res.data;
  } catch (error) {
    console.error("Login Error: ", error);
    throw new Error("Failed to login");
  }
};
