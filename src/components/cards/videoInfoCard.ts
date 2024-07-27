export const VideoInfoCard = (username: string, views: number, likes: number) => `
  <div class="min-w-12 mt-2 flex gap-2">
    <div>
      <img src="./public/sample.jpeg" class="h-12 w-12 rounded-full" alt="user" />
    </div>
    <div class="flex gap-4 items-center">
      <div>
        <p>@${username}</p>
        <p>${views} views</p>
      </div>
      <div>
        <button class="px-6 py-2 border rounded-full hover:bg-slate-800">${likes} <span class="text-gray-400 px-2">|</span> likes</button>
      </div>
    </div>
  </div>
`;