import axios from "axios";
import { BASE_URL } from "../../constants/constants";

export const getComments = async (videoId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/comments/get-comments/${videoId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteComment = async (id: string) => {
  try {
    await axios.delete(`${BASE_URL}/comments/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateComment = async (id: string, text: string) => {
  try {
    await axios.put(
      `${BASE_URL}/comments/update/${id}`,
      { text },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
