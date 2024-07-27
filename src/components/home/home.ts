import {
  fetchVideoDetail,
  VideoDetailsComponent,
} from "../videos/videoDetails";
import fetchVideos from "../videos/video";
import { ViewTracker } from "../views/viewTracker";
import { VideoPlayer } from "../player/videoPlayer";
import { VideoPlayerComponent } from "../videos/videoPlayerComponent";



const videoGrid = document.getElementById("video-grid") as HTMLDivElement;
if (videoGrid) {
  videoGrid.addEventListener("click", handleVideoSelection);
}


async function handleVideoSelection(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const videoItem = target.closest("#video-item") as HTMLElement;
  if (videoItem) {
    const videoSource = videoItem.getAttribute("data-source");
    const videoPublicId = videoItem.getAttribute("data-videoPublicId");
    const title = videoItem.getAttribute("data-title");
    if (videoSource && videoPublicId && title) {
      await loadVideoPlayer(videoSource, videoPublicId, title);
      await loadSideVideos(); 
    }
  }
}


async function loadVideoPlayer(
  videoSource: string,
  videoPublicId: string,
  title: string
) {
  const appContainer = document.getElementById("content") as HTMLDivElement;
  appContainer.innerHTML = VideoPlayerComponent(title);
  new VideoPlayer("player", videoSource);
  new ViewTracker("player", videoPublicId);
  const videoDetail = await fetchVideoDetail(videoPublicId);
  console.log(videoDetail);
  const xyz = VideoDetailsComponent(
    {
      views: videoDetail.views,
      description: videoDetail.description,
      likes: 0,
      username: videoDetail.users[0].fullName,
    },
    []
  );
  const div = document.createElement("div");
  div.innerHTML = xyz.trim();
  const x = div.firstElementChild as HTMLElement;
  appContainer.appendChild(x);
}


async function loadSideVideos() {
  const sideVideoContainer = document.getElementById(
    "side__videos__container"
  ) as HTMLDivElement;
  if (sideVideoContainer) {
    sideVideoContainer.innerHTML = await fetchVideos();
    sideVideoContainer.addEventListener("click", handleSideVideoSelection);
  }
}


async function handleSideVideoSelection(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const videoItem = target.closest("#video-item") as HTMLElement;
  if (videoItem) {
    const videoSource = videoItem.getAttribute("data-source");
    const videoPublicId = videoItem.getAttribute("data-videoPublicId");
    if (videoSource && videoPublicId) {
      new VideoPlayer("player", videoSource);
      new ViewTracker("player", videoPublicId);
      window.scrollTo(0, 0);
      await loadSideVideos();
    }
  }
}

