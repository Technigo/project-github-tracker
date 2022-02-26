const repoGrid = document.getElementById("repoGrid");
const profile = document.getElementById("profile");

// Global variables:
const userName = "JustineZwiazek";
const API_USER = `https://api.github.com/users/${userName}`;
const API_REPOS = `https://api.github.com/users/${userName}/repos`;

// Profile information function
const getProfile = () => {
  fetch(API_USER)
    .then((res) => res.json())
    .then((data) => {
      profile.innerHTML = `
      <img src="${data.avatar_url}" class="user-img">
      <h2>${data.name}</h2>
      <p id="bio">Front end development student @ Technigo</p>`;
    });
  getRepos();
};

// Repositories grid function
const getRepos = () => {
  fetch(API_REPOS)
    .then((res) => res.json())
    .then((data) => {
      // Filtering out not forked repositories
      const forkedRepos = data.filter(
        (repo) => repo.name.startsWith("project") && repo.fork === true
      );
      forkedRepos.forEach((repo) => {
        repoGrid.innerHTML += `
        <div class='repos' id="${repo.name}">
          <h3 id="name">${repo.name}</h3>
          <p id="insideRepo">Default branch: ${repo.default_branch}</p>
          <p id="insideRepo">Recent Push: ${new Date(
            repo.pushed_at
          ).toDateString()}</p>
          <a href="${repo.html_url}">Link to repo</a>
          </div>`;
      });
      getPullRequests(forkedRepos);
      drawChart(forkedRepos.length);
    });
};

// Fetch pull requests
const getPullRequests = (forkedRepos) => {
  forkedRepos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`
    )
      .then((res) => res.json())
      .then((data) => {
        const myPullsOnly = data.find(
          (pull) => pull.user.login === repo.owner.login
        );
        const myCommitsURL = myPullsOnly.commits_url;
        const repoName = repo.name;
        getCommits(myCommitsURL, repoName);
      });
  });
};
// Fetch number of commits
const getCommits = (myCommitsURL, repoName) => {
  fetch(myCommitsURL)
    .then((res) => res.json())
    .then((data) => {
      // count the number of commits
      document.getElementById(repoName).innerHTML += `
            <p id="insideRepo"># of Commits: ${data.length}</p>`;
    });
};
getProfile();
