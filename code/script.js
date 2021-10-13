const username = "madeleinesvensson";
const REPOS_URL = `https://api.github.com/users/${username}/repos`;
const USERS_URL = `https://api.github.com/users/${username}`;
const container = document.getElementById("projects");
const userInformation = document.getElementById("user-information");

//Takes away the - in the project name
const formattedRepoName = (name) => name.replace(/-/g, " ");

//Gets the forked repos from github.
const getRepos = () => {
  fetch(REPOS_URL)
    .then((res) => res.json())
    .then((data) => {
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      );
      //Fixes the date and time in last pushed.
      forkedRepos.sort(function (a, b) {
        return new Date(b.pushed_at) - new Date(a.pushed_at);
      });
      forkedRepos.forEach((repo) => {
        const pushedDate = new Date(repo.pushed_at).toLocaleDateString(
          "en-GB",
          {
            hour: "2-digit",
            minute: "2-digit",
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        );

        container.innerHTML += `
        <div class="repo-cards">
          <a href=${repo.html_url} target="_blank"><h3>${formattedRepoName(
          repo.name
        )}</h3></a>
          <p>${repo.default_branch}</p>
          <p>Latest update: ${pushedDate}</p>
          <p id="commit-${repo.name}"> Commits: </p>
        </div>
          `;
      });
      drawChart(forkedRepos.length);
      getPullRequests(forkedRepos);
    });
};

getRepos();

const getPullRequests = (repos) => {
  //Get all the PRs for each project.
  repos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`
    )
      .then((res) => res.json())
      .then((data) => {
        const filteredPullrequests = data.find(
          (pull) => pull.user.login === repo.owner.login
        );
        if (filteredPullrequests) {
          commits(filteredPullrequests.commits_url, repo.name);
        } else {
          document.getElementById(`commit-${repo.name}`).innerHTML = "No data";
        }
      });
  });
};
//gets the commits in the project container.
const commits = (url, myRepoName) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById(`commit-${myRepoName}`).innerHTML += data.length;
    });
};

//Gets the user data.
fetch(USERS_URL)
  .then((res) => res.json())
  .then((data) => {
    userInformation.innerHTML = `
    <img src="${data.avatar_url}"/>
    <div class="user-information">
      <h3>${data.name}</h3>
      <h4>${data.login}</h4>
      <h4>Location: ${data.location}</h4>
      <h4>Bio: ${data.bio}</h4>
    </div>
    `;
  });
