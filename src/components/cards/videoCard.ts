import { IVideo } from "../../interface/videoCard";
import { formatDuration, formatViews } from "../../utils/formatDurationAndViews";

export const VideoCard = (video: IVideo) => `
  <div id="video-item" class="group cursor-pointer flex flex-col w-full max-w-xs transition-all duration-300 hover:transform hover:scale-105" 
    data-source="${video.playbackUrl}" 
    data-videoPublicId="${video.videoPublicId}"
    data-title="${video.title}">
    <div class="relative w-full h-48 overflow-hidden rounded-lg shadow-lg bg-gray-800">
      <img src="${video.thumbnailUrl}" alt="${video.title}" class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110" />
      <div class="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
        ${formatDuration(Math.trunc(video.duration))}
      </div>
    </div>
    <div class="mt-4 flex items-start">
      <div class="flex-shrink-0"> 
        <img src="${video.profileUrl || '/public/sample.jpeg'}" class="h-10 w-10 rounded-full object-cover" alt="${video.userEmail}" />
      </div>
      <div class="ml-3 flex-1">
        <h4 class="text-sm font-semibold text-gray-200 line-clamp-2 leading-5 group-hover:text-blue-400 transition-colors duration-300">
          ${video.title}
        </h4>
        <p class="text-xs text-gray-400 mt-1 hover:text-gray-300 transition-colors duration-300">
          ${video.userEmail}
        </p>
        <div class="text-xs text-gray-500 mt-1 flex gap-3">
          <p>${formatViews(video.views)} views</p>
          <p>${video.timeSinceUpload} ago</p>
        </div>
      </div>
    </div>
  </div>
`;


