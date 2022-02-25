import { createElement } from "../utility/createElem";

export default function UserProfileComp(
  userProfileImage,
  username,
  email,
  githubLink
) {
  const aside = createElement("aside", "user-profile");
  const profileContainer = createElement("div", "user-profile-container");

  const userProfileImg = createElement("img", "user-profile-img");
  userProfileImg.src = userProfileImage;

  const userInfoContainer = createElement("div", "user-info");
  const usernameElem = createElement("h1", "username");
  usernameElem.innerText = username;

  const emailElem = createElement("p", "email");
  emailElem.innerText = email;

  const canvasContainer = createElement("div", "canvas-container");
  const canvas = createElement("canvas", "canvas");
  canvas.id = "chart";
  canvasContainer.appendChild(canvas);

  userInfoContainer.appendChild(usernameElem);
  userInfoContainer.appendChild(emailElem);

  profileContainer.appendChild(userProfileImg);
  profileContainer.appendChild(userInfoContainer);

  const githubLinkElem = createElement("a", "go-to-github");
  githubLinkElem.innerText = `Go to ${username}'s Github`;
  githubLinkElem.href = githubLink;

  aside.appendChild(profileContainer);
  aside.appendChild(githubLinkElem);
  aside.appendChild(canvasContainer);
  return aside;
}
