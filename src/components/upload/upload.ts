import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import { spinnerStart, spinnerStop } from "../../utils/common";

document.addEventListener("DOMContentLoaded", () => {
  const videoUploadFormEl = document.getElementById(
    "videoUploadForm"
  ) as HTMLFormElement;
  const uploadSpinnerEl = document.getElementById(
    "upload__spinner"
  ) as HTMLSpanElement;
  const uploadErrorEl = document.getElementById(
    "upload__error"
  ) as HTMLParagraphElement;
  videoUploadFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    spinnerStart(uploadSpinnerEl);
    videoUploadFormEl.classList.add("opacity-25");
    const formData = new FormData(videoUploadFormEl);
    try {
      const response = await axios.post(
        `${BASE_URL}/videos/add-video`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response.data);
    } catch (error: any) {
      console.log(error);
      uploadErrorEl.innerHTML = error.response.data.message;
    } finally {
      spinnerStop(uploadSpinnerEl);
      videoUploadFormEl.classList.remove("opacity-25");
    }
  });

  const videoInput = document.getElementById("video") as HTMLInputElement;
  const thumbnailInput = document.getElementById(
    "thumbnail"
  ) as HTMLInputElement;
  const videoFileNameElement = document.getElementById("videoFileName");
  const thumbnailFileNameElement = document.getElementById("thumbnailFileName");

  videoInput.addEventListener("change", (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (videoFileNameElement) {
      videoFileNameElement.textContent = target.files?.[0]?.name || "cear";
    }
  });

  thumbnailInput.addEventListener("change", (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (thumbnailFileNameElement) {
      thumbnailFileNameElement.textContent = target.files?.[0]?.name || "";
    }
  });
});
