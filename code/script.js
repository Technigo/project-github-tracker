const userName = "JohannaMJ";
const REPOS_API_URL = `https://api.github.com/users/${userName}/repos`;
const USER_URL = `https://api.github.com/users/${userName}`;
const reposContainer = document.getElementById("projects");
const profileContainer = document.getElementById("profileContainer");

const userProfile = () => {
  fetch(USER_URL)
    .then((response) => response.json())
    .then((data) => {
      profileContainer.innerHTML = `
      <div class="icon-container">
      <a href="${data.blog}" target="blank"><img class="linkedin-icon" src="./assets/icon.png"></a>
    </div>  
        <div class="profile-info-container">
          <p class="profile-text">${data.name}</p>
          <p class="profile-text">Located in ${data.location}</p>
          <p class="profile-text">GitHub name: ${data.login}</p>
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
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      );
      forkedRepos.sort(function (a, b) {
        return new Date(b.pushed_at) - new Date(a.pushed_at);
      });
      forkedRepos.forEach(
        (repo) =>
          (reposContainer.innerHTML += `
            <div class="repo-card">
              <h3>${repo.name}</h3>
              <p class="project-info">Branch: ${repo.default_branch}</p>
              <p class="project-info">Latest push: ${new Date(
                repo.pushed_at
              ).toDateString()}</p>
              <p class="project-info" id="commits-${
                repo.name
              }">Number of commits: </p>
              <p class="project-info">Go to repo: <a href="${
                repo.html_url
              }" target="blank">Click here!</a></p>
            </div>  
            `)
      );
      drawChart(forkedRepos.length);
      fetchPullRequests(forkedRepos);
    })
    .catch(() => {
      reposContainer.innerHTML = `<h3>Sorry, we could not find the information</h3>`;
    });
};

const fetchPullRequests = (repos) => {
  repos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`
    )
      .then((res) => res.json())
      .then((data) => {
        const myPullRequests = data.find(
          (pull) => pull.user.login === repo.owner.login
        );
        if (myPullRequests) {
          fetchCommits(myPullRequests.commits_url, repo.name);
        } else {
          document.getElementById(`commits-${repo.name}`).innerHTML =
            "No pull request yet";
        }
      });
  });
};

const fetchCommits = (url, myRepoName) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById(`commits-${myRepoName}`).innerHTML += data.length;
    });
};

userProfile();
fetchRepos();
