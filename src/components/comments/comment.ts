import axios from "axios";
import { BASE_URL } from "../../constants/constants";

export const getComments = async (videoId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/comments/get-comments/${videoId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
