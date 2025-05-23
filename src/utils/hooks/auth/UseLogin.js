import { BASE_URL } from "@/utils/APIs/api_config";
import { useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => logInAPI(data),
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

const logInAPI = async (data) => {
  console.log("Attempt to log in data: ", data);

  try {
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (!res.ok) {
      throw new Error("Log in failed");
    }

    console.log("Login response: ", res);
    return await res.data;
  } catch (error) {
    console.error("Login Error: ", error);
    throw new Error("Failed to login");
  }
};
