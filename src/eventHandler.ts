import { getLikeStatus, updateLikeCount } from "./components/likes/likes";
import { mustLoginMessage } from "./utils/common";
import { isUserAuthenticated } from "./utils/verifyUser";

/**Comment event section */
export const handleComment = () => {
  // Get elements
  const addCommentElement = document.getElementById(
    "add-comment"
  ) as HTMLDivElement;
  const cancelCommentElement = document.getElementById(
    "cancel-comment"
  ) as HTMLButtonElement;
  const submitCommentElement = document.getElementById(
    "submit-comment"
  ) as HTMLButtonElement;
  const commentInputBoxElement = document.getElementById(
    "comment-input-box"
  ) as HTMLTextAreaElement;

  const updateSubmitButtonState = () => {
    const isEmpty = commentInputBoxElement.value.trim() === "";
    submitCommentElement.disabled = isEmpty;
    if (isEmpty) {
      submitCommentElement.classList.remove("bg-blue-800", "hover:bg-blue-600");
      submitCommentElement.classList.add(
        "bg-gray-400",
        "text-gray-500",
        "cursor-not-allowed"
      );
    } else {
      submitCommentElement.classList.add("bg-blue-800", "hover:bg-blue-600");
      submitCommentElement.classList.remove(
        "bg-gray-400",
        "text-gray-500",
        "cursor-not-allowed"
      );
    }
  };

  commentInputBoxElement.addEventListener("input", () => {
    addCommentElement.classList.remove("hidden");
    updateSubmitButtonState();
  });

  cancelCommentElement.addEventListener("click", () => {
    addCommentElement.classList.add("hidden");
    commentInputBoxElement.value = "";
    updateSubmitButtonState();
  });

  submitCommentElement.addEventListener("click", async () => {
    if(!(await mustLoginMessage())) return;
  });

  updateSubmitButtonState();
};

/**Like event section */
export const likesHandler = async () => {
  const likeButton = document.getElementById("likeButton") as HTMLButtonElement;
  const likePath = document.getElementById("likePath") as any;
  const likeCount = document.getElementById("likeCount") as HTMLSpanElement;

  const updateLikeUI = (liked: boolean) => {
    if (liked) {
      likePath.setAttribute("fill", "#065fd4");
      likePath.setAttribute("stroke", "#065fd4");
    } else {
      likePath.setAttribute("fill", "none");
      likePath.setAttribute("stroke", "currentColor");
    }
  };
  const searchParams = new URLSearchParams(window.location.search);
  const videoPublicId = searchParams.get("v");

  let isLiked: any;
  if (videoPublicId) {
    isLiked = await getLikeStatus(videoPublicId);
    updateLikeUI(isLiked ? true : false);
  }

  likeButton.addEventListener("click", async () => {
    if(!(await mustLoginMessage())) return;
    const searchParams = new URLSearchParams(window.location.search);
    const videoPublicId = searchParams.get("v");
    if (videoPublicId) {
      const response = await updateLikeCount(videoPublicId);
      updateLikeUI(response.liked);
      likeCount.innerHTML = response.likes;
    }
    likeButton.classList.add("scale-110");
    setTimeout(() => {
      likeButton.classList.remove("scale-110");
    }, 200);
  });
};



document.addEventListener("DOMContentLoaded", () => {
  const sidebarToggle = document.getElementById(
    "sidebar-toggle"
  ) as HTMLButtonElement;
  const sidebar = document.getElementById("sidebar") as HTMLDivElement;
  const overlay = document.getElementById("overlay") as HTMLDivElement;

  sidebarToggle.addEventListener("click", toggleSidebar);
  overlay.addEventListener("click", toggleSidebar);

  function toggleSidebar() {
    sidebar.classList.toggle("-translate-x-full");
    overlay.classList.toggle("hidden");
  }
});