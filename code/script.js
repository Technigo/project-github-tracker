import "./style.css";
import MainComp from "./components/main";
import HeaderComp from "./components/header";
import makeChart from "./technigoChart";
import LoadingStatusComp from "./components/spinner";

const root = document.getElementById("root");
const TOKEN = process.env.GITHUB_AUTH;
let myLoginName;
let completedProjects;
let header;
let main;

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

const getUserInfo = fetchGithubData("users/jiiinCho");
const getRepos = fetchGithubData("users/jiiinCho/repos");
const spinner = LoadingStatusComp();

async function init() {
  //display loading status
  root.appendChild(spinner);

  try {
    const value = await Promise.all([getUserInfo, getRepos]);
    const { login, avatar_url, html_url, name } = value[0];
    myLoginName = login;
    const allRepository = value[1];

    const technigoRepoDataRaw = await filterTechnigo(allRepository);

    //filter projects not forked from technigo
    const technigoRepoData = technigoRepoDataRaw.filter(
      (repo) => repo !== undefined
    );
    completedProjects = technigoRepoData.length;

    //sort by last commit date
    technigoRepoData.sort(function (a, b) {
      return b.latestCommitDate - a.latestCommitDate;
    });

    header = HeaderComp(avatar_url);
    main = MainComp(avatar_url, name, login, html_url, technigoRepoData);
  } catch (e) {
    console.error(e);
    root.innerHTML = `
      <div class="error-container">
       <span class="error-message">${e.message}</span>
      </div> `;
  }
}

//filter repos only forked from Tehchnigo => expected [undefined, {}, {}, undefined]
const filterTechnigo = async (repos) => {
  return await Promise.all(
    repos.map(async (repo) => {
      if (!repo.fork) {
        return;
      }
      const name = repo.name; //project-businees-
      const repoInfo = await fetchGithubData(`repos/jiiinCho/${name}`);
      const parentName = repoInfo.parent.owner.login;
      if (parentName === "Technigo") {
        const commitHist = await fetchGithubData(
          `repos/jiiinCho/${name}/commits`
        );
        const pullRequestsInTechnigo = await fetchGithubData(
          `repos/Technigo/${name}/pulls?per_page=72`
        );
        const myPull = pullRequestsInTechnigo.find(
          (pull) => pull.user.login === myLoginName
        );
        const commitCounts = commitHist.length;
        const repositoryData = setRepoData(
          commitHist[0],
          commitCounts,
          repoInfo,
          myPull
        );
        return repositoryData;
      }
    })
  );
};

function setRepoData(latestCommit, allCommitCount, repoInfo, myPull) {
  const name = repoInfo.name;
  const defaultBranch = repoInfo.default_branch;
  const repoURL = repoInfo.html_url;
  const language = repoInfo.parent.language;
  const forkedFrom = repoInfo.parent.full_name;
  const forksCount = repoInfo.parent.forks_count;
  const forksURL = repoInfo.parent.html_url;
  const latestCommitAuthor = latestCommit.commit.author.name;
  const latestCommitDate = new Date(latestCommit.commit.author.date);
  const latestCommitMessage = latestCommit.commit.message;
  const latestCommitUrl = latestCommit.html_url;
  const pullRequestTitle = myPull ? myPull.title : "";
  const pullRequestMessage = myPull ? myPull.body : "";
  const pullRequestUpdatedAt = myPull ? new Date(myPull.updated_at) : "";
  const pullRequestURL = myPull ? myPull.html_url : "";

  const repoData = {
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
  };

  return repoData;
}

init().then(() => {
  //remove loading spinner when data is ready
  root.removeChild(spinner);
  root.appendChild(header);
  root.appendChild(main);

  makeChart(completedProjects, "chart");
  console.log("app is running!");
});
