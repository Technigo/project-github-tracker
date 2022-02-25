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
        (repo) => repo.fork && repo.name.startsWith("project")
      );
      onlyForked.forEach((repo) => {
        repoGrid.innerHTML += `
          <div class="repositories">
          <h3 id="repoName">${repo.name}</h3>
          <p id="insideRepo">Default branch: ${repo.default_branch}</p>
          <p id="insideRepo">Recent Push: ${new Date(
            repo.pushed_at
          ).toDateString()}</p>
          <a href="${repo.html_url}">Link to repo</a>
          </div>`;
      });
    });
  getPulls(onlyForked);
};

const getPulls = (repos) => {
  repos.forEach((repo) => {
    fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls`)
      .then((res) => res.json())
      .then((data) => {
        const myPullsOnly = data.find(
          (pull) => pull.user.login === repo.owner.login
        );
        if (myPullsOnly) {
          document.getElementById(`repositories`).innerHTML += `
          <p id="insideRepo">Pulled</p>`;
        } else {
          document.getElementById(`repositories}`).innerHTML += `
         <p id="insideRepo">Group project / No pull requests</p>`;
        }
      });
  });
};

const getCommits = (URL, repoName) => {
  fetch(URL, options)
    .then((res) => res.json())
    .then((data) => {
      //Positioning by dynamic ID repoName
      document.getElementById(repoName).innerHTML += `
      <p>Number of commits: ${data.length}</p>`;
    });
};

getProfile();
