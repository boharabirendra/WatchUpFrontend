import { comments } from "./components/cards/commentCard";
import { CommentInfoCard } from "./components/cards/commentInfoCard";
import { VideoInfoCard } from "./components/cards/videoInfoCard";
import { logoutHandler, navbarHandler } from "./components/nav/navbarHandler";
import { VideoPlayer } from "./components/player/videoPlayer";
import fetchVideos, {
  fetchSuggestionVideos,
  fetchVideoById,
} from "./components/videos/video";
import { ViewTracker } from "./components/views/viewTracker";
import { handleComment, likesHandler } from "./eventHandler";
import { IVideoInfo } from "./interface/videoCard";

class VideoAppication {
  private videoGridElement: HTMLDivElement;
  private videoPlayerElement: HTMLDivElement;
  private mainVideoElement: HTMLVideoElement;
  private suggestedVideosElement: HTMLDivElement;
  private videoInfoContainerElement: HTMLDivElement;
  private videoCommentContainerElement: HTMLDivElement;

  constructor() {
    this.videoGridElement = document.getElementById(
      "video-grid"
    ) as HTMLDivElement;
    this.mainVideoElement = document.getElementById(
      "main-video"
    ) as HTMLVideoElement;
    this.videoPlayerElement = document.getElementById(
      "video-player"
    ) as HTMLDivElement;
    this.suggestedVideosElement = document.getElementById(
      "suggested-videos"
    ) as HTMLDivElement;
    this.videoInfoContainerElement = document.getElementById(
      "video-info-container"
    ) as HTMLDivElement;
    this.videoCommentContainerElement = document.getElementById(
      "video-comment-container"
    ) as HTMLDivElement;
    this.init();
  }

  private init(): void {
    this.renderVideoGrid();
    this.loadFromUrl();
    window.addEventListener("popstate", () => this.loadFromUrl());
  }

  private async renderVideoGrid() {
    const videos = await fetchVideos();
    this.videoGridElement.innerHTML = videos;
    this.videoGridElement.addEventListener("click", (e) => {
      const videoItem = (e.target as HTMLElement).closest("#video-item");
      if (videoItem) {
        const videoId = videoItem.getAttribute("data-id");
        this.loadVideo(videoId!);
      }
    });
  }

  private loadFromUrl(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get("v");
    if (videoId) {
      this.loadVideo(videoId);
    } else {
      this.showVideoGrid();
    }
  }

  private async loadVideo(videoId: string) {
    const video = await fetchVideoById(videoId);
    if (video) {
      this.showVideoPlayer();
      this.playVideo(video.playbackUrl, videoId);
      this.loadVideoInfo(video);
      this.loadCommentInfo();
      this.renderSuggestedVideos(videoId);
      history.pushState(null, "", `?v=${videoId}`);
      handleComment();
      likesHandler();
    }
  }

  private showVideoGrid(): void {
    this.videoGridElement.classList.add("block");
    this.videoPlayerElement.classList.add("hidden");
  }

  private showVideoPlayer(): void {
    this.videoGridElement.classList.add("hidden");
    this.videoPlayerElement.classList.remove("hidden");
  }

  private playVideo(videoUrl: string, videoId: string): void {
    new VideoPlayer(this.mainVideoElement, videoUrl);
    new ViewTracker(this.mainVideoElement, videoId);
    window.scrollTo(0, 0);
  }

  private async renderSuggestedVideos(currentVideoId: string) {
    const videos = await fetchSuggestionVideos(currentVideoId);
    this.suggestedVideosElement.innerHTML = videos;
    this.suggestedVideosElement.addEventListener("click", (e) => {
      const videoItem = (e.target as HTMLElement).closest("#video-item");
      if (videoItem) {
        const videoId = videoItem.getAttribute("data-id");
        this.loadVideo(videoId!);
      }
    });
  }

  private loadVideoInfo(video: IVideoInfo) {
    this.videoInfoContainerElement.innerHTML = VideoInfoCard(
      video.fullName,
      video.views,
      video.likes,
      video.title,
      video.description
    );
  }

  private loadCommentInfo(){
    this.videoCommentContainerElement.innerHTML = CommentInfoCard(comments);
  }
}

new VideoAppication();
navbarHandler();
logoutHandler();
