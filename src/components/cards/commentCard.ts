import { ICommentCard } from "../../interface/commentCard";

export const comments:ICommentCard[] = [
  {
    text: "this is new comment",
    imageSrc: "/public/sample.jpeg",
    email: "birendrabohara2074@gmail.com"
  },
  {
    text: "this is new comment",
    imageSrc: "/public/sample.jpeg",
    email: "birendrabohara2074@gmail.com"
  },
  {
    text: "this is new comment",
    imageSrc: "/public/sample.jpeg",
    email: "birendrabohara2074@gmail.com"
  },
]


export const CommentCard = (email: string, comment: string, imageSrc = "./public/sample.jpeg") => `
  <div class="mt-8 flex gap-4">
    <div>
      <img src="${imageSrc}" class="h-10 w-10 rounded-full" alt="user" />
    </div>
    <div>
       <p class="text-sm text-gray-100">@${email}</p>
       <p class="line-clamp-2">${comment}</p>
    </div>
  </div>
`;

