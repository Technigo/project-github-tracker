// console.log("script works?")

const userName = "JohannaMJ";
const REPOS_API_URL = `https://api.github.com/users/${userName}/repos`;
const USER_URL = `https://api.github.com/users/${userName}`;
// const PULL_API_URL = `https://api.github.com/repos/technigo/${repo.name}/PULLS`
const reposContainer = document.getElementById("projects");
const profileContainer = document.getElementById("profileContainer");

const userProfile = () => {
  fetch(USER_URL)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      profileContainer.innerHTML = `
        <div class="profile-info-container">
          <p class="profile-text">Username: ${data.login}</h2>
          <p class="profile-text">${data.name}</p>
          <p class="profile-text">${data.location}</p>
        </div>
        <div class="profile-img-container">
          <img class="profile-img" src="${data.avatar_url}"/>
        </div>
      `;
    });
};

const fetchRepos = () => {
  fetch(REPOS_API_URL)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)

      // const repo = repo.name
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      );
      forkedRepos.forEach(
        (repo) =>
          (reposContainer.innerHTML += `
            <div class="repo-card">
              <h3>${repo.name}</h3>
              <p><a href="${repo.html_url}" target="blank">${
            repo.html_url
          }</a></p>
              <p>${repo.default_branch}</p>
              <p>Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
              <p id="commits-${repo.name}">Number of commits: </p>
            </div>  
            `)
      );
      drawChart(forkedRepos.length);
      getPullRequests(forkedRepos);
      // console.log(forkedRepos)
    })
    .catch(() => {
      reposContainer.innerHTML = `<h3>Sorry, we could not find the information</h3>`;
    });
};

const getPullRequests = (repos) => {
  //Get all the PRs for each project.
  repos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`
    )
      .then((res) => res.json())
      .then((data) => {
        const myPull = data.find(
          (pull) => pull.user.login === repo.owner.login
        );
        // console.log(myPull)
        fetchCommits(myPull.commits_url, repo.name);
      });
  });
};

const fetchCommits = (url, myRepoName) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      document.getElementById(`commits-${myRepoName}`).innerHTML += data.length;
    });
};

userProfile();
fetchRepos();
// showCommits()
// getPullRequests()
