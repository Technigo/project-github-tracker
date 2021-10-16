// DOM selectors

// HTML sections to inject into
const main = document.getElementById("projects");
const userInfo = document.getElementById("user-info");

const username = "Smelbows";
const USERS_REPOS_API = `https://api.github.com/users/${username}/repos`;

const fetchUserRepos = (userUrl) => {
  fetch(userUrl)
    .then((res) => res.json())
    .then(filterForTechnigoRepos)
    .then((repos) => {
      userInfo.innerHTML = createHTMLForUser(repos[0]);
      repos.forEach((repo) => {
        main.innerHTML += createHTMLForRepo(repo);
        fetchPullRequests(repo);
      });
      drawChart(repos);
    });
};

const filterForTechnigoRepos = (data) => {
  return data.filter((repo) => repo.name.startsWith("project"));
};

const createHTMLForUser = (repo) => {
  return `<img class="avatar" src=${repo.owner.avatar_url} alt="github avatar"/><p class="name">${repo.owner.login}</p>`;
};

const createHTMLForRepo = (repo) => {
  return `<a target="blank" href="${repo.html_url}" class="repo-container ${
    repo.language
  }" id="${repo.name}"><p class="repo-name">${
    repo.name
  }</p><p>Default branch: ${repo.default_branch}</p><p>Last pushed: ${new Date(
    repo.pushed_at
  ).toDateString()}</p><div id="commit-${repo.name}"></div></a>`;
};

const fetchPullRequests = (repo) => {
  fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
    .then((res) => res.json())
    .then((data) => {
      myPullRequest = findMyPullRequest(data, repo.name);
    //   Only continues to fetch commit data if there is a pull request there
      if (myPullRequest === undefined) {
        document.getElementById(`commit-${repo.name}`).innerHTML +=
          "<p>No pull request made yet</p>";
      } else {
        fetchCommits(myPullRequest.commits_url, repo.name);
      }
    });
};

const findMyPullRequest = (pullsData, repoName) => {
    // this project was pulled from Anna's fork
  if (repoName === "project-weather-app") {
    return pullsData.find((pull) => pull.user.login === "anndimi");
  } else {
    return pullsData.find((pull) => pull.user.login === username);
  }
};

const fetchCommits = (url, name) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById(
        `commit-${name}`
      ).innerHTML += `<p>Number of commits: ${
        data.length
      }</p><p>Last commit message: ${data[data.length - 1].commit.message}</p>`;
    });
};

fetchUserRepos(USERS_REPOS_API);

