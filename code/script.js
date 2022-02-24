import "./style.css";
import MainComp from "./components/main";
import HeaderComp from "./components/header";

import { commitHist } from "./dummyData/repoHist";
import { allRepo } from "./dummyData/allRepo";
import { userInfo } from "./dummyData/userInfo";
import { repoData } from "./dummyData/repoData";

const root = document.getElementById("root");
const TOKEN = process.env.GITHUB_AUTH;
console.log(TOKEN);

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
  return await response.json();
}

// const getUserInfo = fetchGithubData("users/jiiinCho");
// const getRepos = fetchGithubData("users/jiiinCho/repos");

async function init() {
  try {
    // const value = await Promise.all([getUserInfo, getRepos]);
    const { login, avatar_url, html_url, name } = userInfo;
    const allRepository = allRepo;

    // const technigoRepoDataRaw = await filterTechnigo(allRepository);
    const technigoRepoDataRaw = repoData;
    const technigoRepoData = technigoRepoDataRaw.filter(
      (repo) => repo !== undefined
    );
    console.log("repodata", technigoRepoData);
    const header = HeaderComp(avatar_url);
    const main = MainComp(avatar_url, name, login, html_url, technigoRepoData);

    root.appendChild(header);
    root.appendChild(main);
  } catch (e) {
    console.error(e);
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
        const commitCounts = commitHist.length;
        const repositoryData = setRepoData(
          commitHist[0],
          commitCounts,
          repoInfo
        );
        return repositoryData;
      }
    })
  );
};

function setRepoData(latestCommit, allCommitCount, repoInfo) {
  const name = repoInfo.name;
  const defaultBranch = repoInfo.default_branch;
  const forksCount = repoInfo.forks_count;
  const repoURL = repoInfo.html_url;
  const language = repoInfo.parent.language;
  const forkedFrom = repoInfo.parent.full_name;
  const latestCommitAuthor = latestCommit.commit.author.name;
  const latestCommitDate = latestCommit.commit.author.date;
  const latestCommitMessage = latestCommit.commit.message;
  const latestCommitUrl = latestCommit.html_url;
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
    language,
  };

  return repoData;
}

init().then(() => {
  console.log("app is running!");
});
