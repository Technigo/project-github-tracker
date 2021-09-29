// DOM selectors
const main = document.getElementById("projects");
const userInfo = document.getElementById("user-info")

const username = "Smelbows";
const USERS_REPOS_API = `https://api.github.com/users/${username}/repos`;
const TEST_USERS_REPOS_API = `/code/test_data/sarahs-repos-testing.json`;

const fetchUserRepos = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then(filterForTechnigoRepos)
    .then((repos) => {
        writeHTMLForUser(repos[0])
      repos.forEach((repo) => {
        writeHTMLForRepo(repo);
        fetchPullRequests(repo);
      });
    });
};

const filterForTechnigoRepos = (data) => {
  return data.filter((repo) => repo.name.startsWith("project"));
};

const writeHTMLForUser = (repo) => {
    userInfo.innerHTML = `<p>${repo.owner.login}</p><img class="avatar" src=${repo.owner.avatar_url} alt="github avatar"/>`
}

const writeHTMLForRepo = (repo) => {
  main.innerHTML += `<section class="repo-container" id="${
    repo.name
  }"><a href="${repo.html_url}">${repo.name}</a><p>Default branch: ${
    repo.default_branch
  }</p><p>Last pushed: ${new Date(
    repo.pushed_at
  ).toDateString()}</p><p id="commit-${
    repo.name
  }">Number of commits: </p></section>`;
};

const fetchPullRequests = (repo) => {
  fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
    .then((res) => res.json())
    .then((data) => {
      let myPullRequest;
      if (repo.name === "project-weather-app") {
        myPullRequest = data.find((pull) => pull.user.login === "anndimi");
        fetchCommits(myPullRequest.commits_url, repo.name);
      } else if (data === []) {
        document.getElementById(`commit-${repo.name}`).innerHTML += "0";
      } else {
        myPullRequest = data.find(
          (pull) => pull.user.login === repo.owner.login
        );
        fetchCommits(myPullRequest.commits_url, repo.name);
      }
      console.log(myPullRequest);
    });
};

const fetchCommits = (url, name) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById(`commit-${name}`).innerHTML += `${data.length}`;
    });
};

fetchUserRepos(TEST_USERS_REPOS_API);
