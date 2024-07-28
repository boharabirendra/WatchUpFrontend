import { ICommentCard } from "../../interface/commentCard";
import { CommentCard } from "./commentCard";
import { CommentInputCard } from "./commentInputCard";

export const CommentInfoCard = (comments: ICommentCard[]) => `
          <div class="flex flex-col">
            <div class="mt-8">
                <p class="text-xl">${comments.length} Comments</p>
            </div>
            ${CommentInputCard()}
            <div id="done-comments-container">
                ${comments
                  .map((comment) =>
                    CommentCard(comment.email, comment.text, comment.imageSrc)
                  )
                  .join("")}
            </div>
        </div>
`;
