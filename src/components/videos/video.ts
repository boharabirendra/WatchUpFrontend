import axios from "axios";
import { IVideo } from "../../interface/videoCard";
import { VideoCard } from "../cards/videoCard";
import { BASE_URL } from "../../constants/constants";
// import { navbarHandler } from "../nav/navbarHandler";

/**get search element */
const searchEl = document.getElementById("search") as HTMLInputElement;


async function fetchVideos(): Promise<string> {
  const filter = searchEl.value.trim();
  /**alter query if search text is there */
  const url = filter
    ? `${BASE_URL}/videos/get-videos?q=${filter}`
    : `${BASE_URL}/videos/get-videos`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const videosArray: IVideo[] = response.data.data;
    const videos = videosArray
      .map((video: IVideo) => VideoCard(video))
      .join("");
    return videos;
  } catch (error) {
    console.log(error);
    return "";
  }
}

export async function fetchSuggestionVideos(videoPublicId: string): Promise<string> {
  const url = `${BASE_URL}/videos/get-suggestion-vidoes/${videoPublicId}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const videosArray: IVideo[] = response.data.data;
    const videos = videosArray
      .map((video: IVideo) => VideoCard(video))
      .join("");
    return videos;
  } catch (error) {
    console.log(error);
    return "";
  }
}

const fiterVideos = () => {
  searchEl.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      displayVideos();
    }
  });
};

const displayVideos = async () => {
  const videos = await fetchVideos();
  const videoContainer = document.getElementById(
    "video-grid"
  ) as HTMLDivElement;
  videoContainer.innerHTML = videos;
  // await navbarHandler();
};




export const fetchVideoById = async (videoPublicId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/videos/get-video/public/${videoPublicId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const video = response.data.data;
    return video ? video : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default fetchVideos;