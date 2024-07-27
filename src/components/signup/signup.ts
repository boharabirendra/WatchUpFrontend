import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import { spinnerStart, spinnerStop } from "../../utils/common";

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm") as HTMLFormElement;
  const signupSpinner = document.getElementById(
    "signup__spinner"
  ) as HTMLSpanElement;
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    spinnerStart(signupSpinner);
    try {
      const formData = new FormData(signupForm);
      await axios.post(`${BASE_URL}/users/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Error during signup:", error);
    } finally {
      spinnerStop(signupSpinner);
    }
  });

  const profileInputElement = document.getElementById(
    "profile"
  ) as HTMLInputElement;
  const profileFileNameElement = document.getElementById("profileFileName");

  profileInputElement.addEventListener("change", (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (profileFileNameElement) {
      profileFileNameElement.textContent = target.files?.[0]?.name || "";
    }
  });
});
