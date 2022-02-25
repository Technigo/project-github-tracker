import "./style.css";
import MainComp from "./components/main";
import HeaderComp from "./components/header";
import makeChart from "./technigoChart";
import LoadingStatusComp from "./components/spinner";

const root = document.getElementById("root");
const TOKEN = process.env.GITHUB_AUTH;
const USERNAME = "jiiinCho";
const spinner = LoadingStatusComp();

async function fetchGithubData(path) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Basic ${TOKEN}`);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const response = await fetch(
    `https://api.github.com/${path}`,
    requestOptions
  );
  if (response.status === 403) {
    throw new Error(
      "API rate limit excceded, please visit again after an hour :)"
    );
  }
  return await response.json();
}

async function init() {
  //start by displaying loading state
  root.appendChild(spinner);
  try {
    const allRepository = await fetchGithubData(`users/${USERNAME}/repos`);
    //user info
    const { avatar_url, html_url } = allRepository[0].owner;

    //step 1. filter technigo projects
    let projectNames = [];
    let technigoRepos = [];
    allRepository.forEach((repo) => {
      if (repo.name.startsWith("project-")) {
        technigoRepos.push(repo);
        projectNames.push(repo.name);
      }
    });
    const completedProjects = technigoRepos.length;

    // step 2. fetch all required data
    const baseData = await fetchAll(projectNames);

    // step 4. sort by last commit date
    baseData.sort(function (a, b) {
      const dataCurr = new Date(a.latestCommitDate);
      const dateNext = new Date(b.latestCommitDate);
      return dateNext - dataCurr;
    });

    // step 5. create and inject html elements
    const header = HeaderComp(avatar_url);
    const main = MainComp(avatar_url, "jiiin✨", USERNAME, html_url, baseData);
    return { header, main, completedProjects };
  } catch (e) {
    //error handling
    console.error(e);
    root.innerHTML = `
      <div class="error-container">
       <span class="error-message">${e.message}</span>
      </div> `;
  }
}

function getParentData(parentInfo) {
  const name = parentInfo.name;
  const defaultBranch = parentInfo.default_branch;
  const repoURL = parentInfo.html_url;
  const language = parentInfo.parent.language;
  const forkedFrom = parentInfo.parent.full_name;
  const forksCount = parentInfo.parent.forks_count;
  const forksURL = parentInfo.parent.html_url;
  return {
    name,
    defaultBranch,
    repoURL,
    language,
    forkedFrom,
    forksCount,
    forksURL,
  };
}

function getCommitInfo(commitInfo) {
  const allCommitCount = commitInfo.length;
  const latestCommit = commitInfo[0];
  const latestCommitAuthor = latestCommit.commit.author.name;
  const latestCommitDate = new Date(latestCommit.commit.author.date);
  const latestCommitMessage = latestCommit.commit.message;
  const latestCommitUrl = latestCommit.html_url;
  return {
    allCommitCount,
    latestCommitAuthor,
    latestCommitDate,
    latestCommitMessage,
    latestCommitUrl,
  };
}

function getPullInfo(pullInfo) {
  const myPull = pullInfo.find((pull) => pull.user.login === USERNAME);
  const pullRequestTitle = myPull ? myPull.title : "";
  const pullRequestMessage = myPull ? myPull.body : "";
  const pullRequestUpdatedAt = myPull ? new Date(myPull.updated_at) : "";
  const pullRequestURL = myPull ? myPull.html_url : "";
  return {
    pullRequestTitle,
    pullRequestMessage,
    pullRequestUpdatedAt,
    pullRequestURL,
  };
}

const fetchAll = async (projectNames) => {
  return await Promise.all(
    projectNames.map(async (projectName) => {
      const parentInfo = await fetchGithubData(
        `repos/${USERNAME}/${projectName}`
      );
      const commitInfo = await fetchGithubData(
        `repos/${USERNAME}/${projectName}/commits`
      );
      const pullInfo = await fetchGithubData(
        `repos/Technigo/${projectName}/pulls?per_page=60`
      );

      //stpe 3. process data and create data object
      const parent = getParentData(parentInfo);
      const commit = getCommitInfo(commitInfo);
      const pull = getPullInfo(pullInfo);

      return { ...parent, ...commit, ...pull };
    })
  );
};

init().then((result) => {
  const { header, main, completedProjects } = result;
  root.removeChild(spinner);
  root.appendChild(header);
  root.appendChild(main);
  makeChart(completedProjects, "chart");
  console.log("app is running!");
});
