import { createElement } from "../utility/createElem";
import { capitalizeFirstLetter } from "../utility/capitalizeFirst";
import commitIcon from "../assets/icons/code-commit-solid.svg";
import forkedIcon from "../assets/icons/code-fork-solid.svg";
import pullIcon from "../assets/icons/code-pull-request-solid.svg";

export default function RepoCardComp(
  title,
  forkedFrom,
  forksURL,
  languageIdentity,
  forkedCount,
  lastUpdate,
  branch,
  repoURL,
  allCommitCount,
  latestCommitAuthor,
  latestCommitMessage,
  latestCommitUrl,
  pullRequestTitle,
  pullRequestMessage,
  pullRequestUpdatedAt,
  pullRequestURL
) {
  const li = createElement("li", "repository-card");

  const titleContainer = createElement("div", "repository-title-container");
  const aElem = createElement("a", "link-to-repo");
  aElem.setAttribute("href", repoURL);
  const cardTitle = createElement("h2", "card-title");
  cardTitle.innerText = title;
  aElem.appendChild(cardTitle);
  titleContainer.appendChild(aElem);

  const forkedOrigin = createElement("div", "card-forked-branch");
  forkedOrigin.innerHTML = `
  <p class="card-forked-from">Forked from <a class="go-to-forked-origin" href="${forksURL}">${forkedFrom}</a></p>
  <span class="branch">Branch: ${branch}</span>
  `;

  const spec = createElement("article", "card-spec");

  const languageSpec = createElement("div", "spec-container");
  const languageId = languageIdentity || "unknown";
  languageSpec.innerHTML = `
  <div class="language-identification ${languageId.toLowerCase()}"></div>
  <span class="language">${capitalizeFirstLetter(languageId)}</span>
  `;

  const forkedContent = `<img class="forked-icon" src=${forkedIcon} alt="forked icon"/>${forkedCount}`;
  const forked = specItem(forkedContent, "language");

  const lastUpdated = specItem(displayLastUpdatedDate(lastUpdate), "date");
  const commitCountContent = `<img class="commit-icon" src=${commitIcon} alt="commit icon"/> ${allCommitCount}`;
  const commitCount = specItem(commitCountContent, "commit-count");
  const commitAuthor = specItem(latestCommitAuthor, "commit-author");

  const commitMessage = createElement("div", "spec-container");
  commitMessage.innerHTML = `
  <a href=${latestCommitUrl} class="go-to-commit">
    <span class="commit-message">${substractMessage(
      latestCommitMessage,
      27
    )}</span>
  </a>
  `;

  spec.appendChild(languageSpec);
  spec.appendChild(forked);
  spec.appendChild(lastUpdated);
  spec.appendChild(commitCount);
  spec.appendChild(commitAuthor);
  spec.appendChild(commitMessage);

  if (pullRequestURL) {
    const pullContainer = createElement("div", "spec-container");
    pullContainer.classList.add("pull-container");
    pullContainer.innerHTML = `
    <img src="${pullIcon}" alt="pull request icon" class="pull-icon"/>
      <a href=${pullRequestURL} class="go-to-pull-request">${pullRequestTitle}</a>
      `;
    spec.appendChild(pullContainer);
  }

  li.appendChild(titleContainer);
  li.appendChild(forkedOrigin);
  li.appendChild(spec);

  return li;
}

function displayLastUpdatedDate(commitDate) {
  const today = new Date().getTime();
  const commitdate = new Date(commitDate).getTime();
  const datediff = today - commitdate;
  const lastCommited = Math.round(datediff / (24 * 60 * 60 * 1000));
  return lastCommited === 0
    ? "Updated today"
    : `Updated ${lastCommited} days ago`;
}

function specItem(innerElementContent, innerElementClass) {
  const specContainer = createElement("div", "spec-container");
  const innerElement = createElement("span", innerElementClass);
  innerElement.innerHTML = innerElementContent;
  specContainer.appendChild(innerElement);
  return specContainer;
}

function substractMessage(message, messageLimit) {
  const substracted = message.slice(0, messageLimit);
  return message.length > messageLimit ? `${substracted} ...` : message;
}
