import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import { spinnerStart, spinnerStop } from "../../utils/common";

document.addEventListener("DOMContentLoaded", () => {
  const loginFormElement = document.getElementById("loginForm") as HTMLFormElement;
  const loginErrorElement = document.getElementById(
    "login-error"
  ) as HTMLParagraphElement;
  const spinnerEl = document.getElementById(
    "login-spinner"
  ) as HTMLSpanElement;

  loginFormElement.addEventListener("submit", async (event) => {
    event.preventDefault();
    spinnerStart(spinnerEl);
    try {
      const formData = new FormData(loginFormElement);
      const response = await axios.post(`${BASE_URL}/users/login`, formData);
      const { accessToken, refreshToken } = response.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      window.location.href = "/";
    } catch (error: any) {
      loginErrorElement.innerHTML = error.response.data.message;
      loginErrorElement.classList.remove("hidden");
      setTimeout(()=>{
        loginErrorElement.innerHTML = "";
        loginErrorElement.classList.add("hidden");
      }, 2000);
      console.error("Error during login:", error.response.data.message);
    } finally {
      spinnerStop(spinnerEl);
    }
  });
});
