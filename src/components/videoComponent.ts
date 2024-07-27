// import { ICommentCard } from "../interface/commentCard";
// import { IVideoData } from "../interface/videoCard";
// import { CommentCard } from "./cards/commentCard";
// import { CommentInputCard } from "./cards/commentInputCard";
// import { VideoDescriptionCard } from "./cards/videoDescriptionCard";
// import { VideoInfoCard } from "./cards/videoInfoCard";
// // import { VideoPlayerCard } from "./cards/videoPlayerCard";

// export const VideoComponent = (videoData: IVideoData, comments: ICommentCard[]) => {
//   const { title, username, views, likes, description } = videoData;
//   return `
//     <div class="text-white mt-4 flex">
//       <div class="basis-[75%]">
//         <div class="flex flex-col">
         
//           <h1 class="text-xl font-bold mt-2">${title}</h1>
//           ${VideoInfoCard(username, views, likes)}
//           ${VideoDescriptionCard(description)}
//           <div class="mt-8">
//             <p class="text-xl">${comments.length} Comments</p>
//           </div>
//           ${CommentInputCard()}${VideoPlayerCard(title)}
//           <div id="comments__container">
//             ${comments.map(comment => CommentCard(comment.email, comment.text, comment.imageSrc)).join('')}
//           </div>
//         </div>
//       </div>
//       <div 
//         id="side__videos__container" 
//         class="basis-[25%] p-4 rounded-sm flex flex-col gap-5"
//       ></div>
//     </div>
//   `;
// };