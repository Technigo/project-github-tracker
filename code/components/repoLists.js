import { createElement } from "../utility/createElem";
import RepoCardComp from "./repoCard";

export default function RepoListsComp(technigoRepoData) {
  const list = createElement("ul", "repository-list");

  technigoRepoData.forEach((repo) => {
    console.log("repo in repolist", repo);
    const {
      name,
      forkedFrom,
      language,
      forksCount,
      latestCommitDate,
      defaultBranch,
      repoURL,
    } = repo;

    const repoistory = RepoCardComp(
      name,
      forkedFrom,
      language,
      forksCount,
      latestCommitDate,
      defaultBranch,
      repoURL
    );
    list.appendChild(repoistory);
  });

  return list;
}
