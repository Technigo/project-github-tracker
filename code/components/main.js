import { createElement } from "../utility/createElem";
import UserProfileComp from "./userProfile.js";
import RepositoryComp from "./repository";

export default function MainComp(
  userProfileImage,
  userId,
  name,
  githubLink,
  technigoRepoData
) {
  const main = createElement("main", "main");
  main.id = "projects";

  const userInfo = UserProfileComp(userProfileImage, userId, name, githubLink);
  const repository = RepositoryComp(technigoRepoData);

  main.appendChild(userInfo);
  main.appendChild(repository);
  return main;
}
