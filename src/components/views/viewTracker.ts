import axios from "axios";
import { BASE_URL } from "../../constants/constants";

export class ViewTracker {
  viewThreshold = 5000;
  videoPublicId: string;
  videoElement: HTMLVideoElement;
  viewTimeout: number | null = null;

  constructor(videoElementId: string, videoPublicId: string) {
    this.videoElement = document.getElementById(
      videoElementId
    ) as HTMLVideoElement;
    this.videoPublicId = videoPublicId;
    this.setupTracking();
  }

  setupTracking() {
    this.videoElement.addEventListener("play", () => {
      this.startViewTimer();
    });

    this.videoElement.addEventListener("pause", () => {
      this.clearViewTimer();
    });

    this.videoElement.addEventListener("ended", () => {
      this.clearViewTimer();
    });

    this.videoElement.addEventListener("seeking", () => {
      this.clearViewTimer();
    });
  }

  startViewTimer() {
    this.viewTimeout = window.setTimeout(() => {
      this.recordView();
    }, this.viewThreshold);
  }

  clearViewTimer() {
    if (this.viewTimeout !== null) {
      clearTimeout(this.viewTimeout);
      this.viewTimeout = null;
    }
  }

  async recordView() {
    try {
      const response = await axios.put(
        `${BASE_URL}/videos/update-views/${this.videoPublicId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      this.clearViewTimer();
      console.log(error);
    }
  }
}
