import axios from "axios";
import { ICommentCard } from "../../interface/commentCard";
import { IVideoData } from "../../interface/videoCard";
import { CommentCard } from "../cards/commentCard";
import { CommentInputCard } from "../cards/commentInputCard";
import { VideoDescriptionCard } from "../cards/videoDescriptionCard";
import { VideoInfoCard } from "../cards/videoInfoCard";
import { BASE_URL } from "../../constants/constants";

export const fetchVideoDetail = async (videoPublicId: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/videos/get-video/public/${videoPublicId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const VideoDetailsComponent = (
  videoData: IVideoData,
  comments: ICommentCard[]
) => {
  const { username, views, likes, description } = videoData;
  return `
      <div class="flex flex-col">
        ${VideoInfoCard(username, views, likes)}
        ${VideoDescriptionCard(description)}
        <div class="mt-8">
          <p class="text-xl">${comments.length} Comments</p>
        </div>
        ${CommentInputCard()}
        <div id="comments__container">
          ${comments
            .map((comment) =>
              CommentCard(comment.email, comment.text, comment.imageSrc)
            )
            .join("")}
        </div>
      </div>
    `;
};
