import axios from "axios";
import { BASE_URL } from "../../constants/constants";

export const logoutUser = async () => {
  try {
    const response = await axios.put(
      `${BASE_URL}/users/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log(response);
    if (response.status === 200) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  } catch (error) {
    console.error("Error while logout: ", error);
  }
};
