// import { getUser } from "../../utils/getUser";

// export const navbarHandler = async () => {
//   try {
//     const user = await getUser();
//     /** Get elements */
//     const navbarLeftProfileEl = document.getElementById("nav__profile") as HTMLDivElement;
//     const navbarLoginEl = document.getElementById("nav__login") as HTMLDivElement;
//     const navbarSignupEl = document.getElementById("nav__signup") as HTMLDivElement;
//     const navbarUploadEl = document.getElementById("nav__upload") as HTMLDivElement;
  
//     if (user) {
//       navbarLoginEl.classList.add("hidden");
//       navbarSignupEl.classList.add("hidden");
//       navbarLeftProfileEl.classList.remove("hidden");
//       navbarLeftProfileEl.innerHTML = `<img src="/public/userIcon.png">`;
//       navbarUploadEl.classList.remove("hidden");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
