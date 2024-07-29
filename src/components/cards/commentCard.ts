export const CommentCard = (
  email: string,
  comment: string,
  imageSrc: string,
  timeSinceComment: string
) => `
  <div class="mt-8 flex gap-4">
    <div>
      <img src="${imageSrc}" class="h-10 w-10 rounded-full" alt="user" />
    </div>
    <div>
      <div class="flex gap-2 text-[12px] text-gray-100">
           <p>@${email}</p>
           <p>${timeSinceComment}</p>
       </div>
       <p class="line-clamp-2">${comment}</p>
    </div>
  </div>
`;
