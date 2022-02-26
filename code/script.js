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
      <h2>${data.name}</h2>`;
    });
  getRepos();
};

// Repositories grid function
const getRepos = () => {
  fetch(API_REPOS)
    .then((res) => res.json())
    .then((data) => {
      // Filtering out not forked repositories
      const onlyForked = data.filter(
        (repo) => repo.name.startsWith("project") && repo.fork === true
      );
      onlyForked.forEach((repo) => {
        repoGrid.innerHTML += `
          <div class="repositories">
          <h3 id="name">${repo.name}</h3>
          <p id="insideRepo">Default branch: ${repo.default_branch}</p>
          <p id="insideRepo">Recent Push: ${new Date(
            repo.pushed_at
          ).toDateString()}</p>
          <a href="${repo.html_url}">Link to repo</a>
          </div>`;
      });
      getPulls(onlyForked);
    });
};

// Fetch pull requests
const getPulls = (onlyForked) => {
  onlyForked.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`
    )
      .then((res) => res.json())
      .then((data) => {
        const myPullsOnly = data.find(
          (pull) => pull.user.login === repo.owner.login
        );
        // const myCommitsURL = myPullsOnly.commits_url;
        // const repoName = repo.name;
        getCommits();
      });
  });
};
// Fetch number of commits
const getCommits = (myCommitsURL, repoName) => {
  fetch(myCommitsURL)
    .then((res) => res.json())
    .then((data) => {
      // count the number of commits
      document.getElementById(
        repoName
      ).innerHTML += `Number of commits: ${data.length}`;
    });
};
// Fetch commits function
// const getCommits = (URL, repoName) => {
//   fetch(URL)
//     .then((res) => res.json())
//     .then((data) => {
//       document.getElementById(`commit-${myRepoName}`).innerHTML += `
//       <p># of Commits: ${data.length}</p>`;
//     });
// };

getProfile();
