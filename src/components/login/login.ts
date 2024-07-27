import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import { spinnerStart, spinnerStop } from "../../utils/common";

document.addEventListener("DOMContentLoaded", () => {
  const loginFormEl = document.getElementById("loginForm") as HTMLFormElement;
  const loginErrorEl = document.getElementById(
    "login__error"
  ) as HTMLParagraphElement;
  const spinnerEl = document.getElementById(
    "login__spinner"
  ) as HTMLSpanElement;

  loginFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    spinnerStart(spinnerEl);
    try {
      const formData = new FormData(loginFormEl);
      const response = await axios.post(`${BASE_URL}/users/login`, formData);
      const { accessToken, refreshToken } = response.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      window.location.href = "/";
    } catch (error: any) {
      loginErrorEl.innerHTML = error.response.data.message;
      console.error("Error during login:", error.response.data.message);
    } finally {
      spinnerStop(spinnerEl);
    }
  });
});
