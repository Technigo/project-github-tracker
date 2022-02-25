import { createElement } from "../utility/createElem";
import FilterComp from "./filter";
import RepoListsComp from "./repoLists";

export default function RepositoryComp(technigoRepoData) {
  const section = createElement("section", "repository");
  const filter = FilterComp();
  const repository = RepoListsComp(technigoRepoData);

  section.appendChild(filter);
  section.appendChild(repository);
  return section;
}
