import axios from "axios";
import { getUser } from "../../utils/getUser";
import { BASE_URL } from "../../constants/constants";
import { spinnerStart, spinnerStop } from "../../utils/common";

document.addEventListener("DOMContentLoaded", async () => {
  const changeProfileFullNameElement = document.getElementById(
    "fullname"
  ) as HTMLInputElement;
  const changeProfilePictureElement = document.getElementById(
    "profile-picture"
  ) as HTMLInputElement;
  const changeProfilePreviewElement = document.getElementById(
    "profile-preview"
  ) as HTMLImageElement;
  const changeProfileFormElement = document.getElementById(
    "update-profile-form"
  ) as HTMLFormElement;
  const changeProfileSpinnerElement = document.getElementById(
    "profile-change-spinner"
  ) as HTMLSpanElement;
  const changeProfileUpdateAccountBtnElement = document.getElementById(
    "update-account-btn"
  ) as HTMLButtonElement;


  changeProfileFullNameElement.addEventListener("focus", () => {
    changeUpdateAccountUI();
  });

  changeProfilePictureElement.addEventListener("change", () => {
    changeUpdateAccountUI();
  });


  try {
    const user = await getUser();
    changeProfileFullNameElement.value = user.fullName;
    changeProfilePreviewElement.src = user.profileUrl || "/public/userIcon.png";

    changeProfileFormElement.addEventListener("submit", async (event) => {
      changeProfileFormElement.classList.add("opacity-25");
      spinnerStart(changeProfileSpinnerElement);
      event.preventDefault();
      const formData = new FormData(changeProfileFormElement);
      await axios.put(`${BASE_URL}/users/update-user`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      location.href = "/";
    });
  } catch (error) {
    console.log(error);
  } finally {
    spinnerStop(changeProfileSpinnerElement);
    changeProfileFormElement.classList.remove("opacity-25");
  }

  function changeUpdateAccountUI() {
    changeProfileUpdateAccountBtnElement.classList.remove("cursor-not-allowed");
    changeProfileUpdateAccountBtnElement.classList.remove("bg-gray-300");
    changeProfileUpdateAccountBtnElement.classList.add("bg-indigo-500");
    changeProfileUpdateAccountBtnElement.disabled = false;
  }
});
