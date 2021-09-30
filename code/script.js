// DOM selectors
const main = document.getElementById("projects");
const userInfo = document.getElementById("user-info");

const username = "Smelbows";
const USERS_REPOS_API = `https://api.github.com/users/${username}/repos`;
const TEST_USERS_REPOS_API = `/code/test_data/sarahs-repos-testing.json`;

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
    });
};

const filterForTechnigoRepos = (data) => {
  return data.filter((repo) => repo.name.startsWith("project"));
};

const createHTMLForUser = (repo) => {
  return `<p>${repo.owner.login}</p><img class="avatar" src=${repo.owner.avatar_url} alt="github avatar"/>`;
};

const createHTMLForRepo = (repo) => {
  return `<section class="repo-container" id="${repo.name}"><a href="${
    repo.html_url
  }">${repo.name}</a><p>Default branch: ${
    repo.default_branch
  }</p><p>Last pushed: ${new Date(
    repo.pushed_at
  ).toDateString()}</p><div id="commit-${
    repo.name
  }"></div></section>`;
};

const fetchPullRequests = (repo) => {
  fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
    .then((res) => res.json())
    .then((data) => {
      myPullRequest = findMyPullRequest(data, repo.name);
      if (myPullRequest === undefined) {
        document.getElementById(`commit-${repo.name}`).innerHTML += "<p>Number of commits: 0</p>";
      } else {
        fetchCommits(myPullRequest.commits_url, repo.name);
      }
      console.log(myPullRequest);
    });
};

const findMyPullRequest = (pullsData, repoName) => {
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
      console.log(data);
      document.getElementById(`commit-${name}`).innerHTML += `<p>Number of commits: ${data.length}</p><p>Last commit message: ${data[data.length-1].commit.message}</p>`;
    });
};

fetchUserRepos(TEST_USERS_REPOS_API);
