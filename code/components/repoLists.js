import { createElement } from "../utility/createElem";
import RepoCardComp from "./repoCard";

export default function RepoListsComp(technigoRepoData) {
  const list = createElement("ul", "repository-list");

  technigoRepoData.forEach((repo) => {
    const {
      name,
      defaultBranch,
      forksCount,
      repoURL,
      allCommitCount,
      latestCommitAuthor,
      latestCommitDate,
      latestCommitMessage,
      latestCommitUrl,
      forkedFrom,
      forksURL,
      language,
      pullRequestTitle,
      pullRequestMessage,
      pullRequestUpdatedAt,
      pullRequestURL,
    } = repo;

    const repoistory = RepoCardComp(
      name,
      forkedFrom,
      forksURL,
      language,
      forksCount,
      latestCommitDate,
      defaultBranch,
      repoURL,
      allCommitCount,
      latestCommitAuthor,
      latestCommitMessage,
      latestCommitUrl,
      pullRequestTitle,
      pullRequestMessage,
      pullRequestUpdatedAt,
      pullRequestURL
    );
    list.appendChild(repoistory);
  });

  return list;
}
