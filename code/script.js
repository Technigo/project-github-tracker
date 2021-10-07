const USER = "IdaAspen";
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const USER_INFO_URL = `https://api.github.com/users/${USER}`;

const projectsContainer = document.getElementById("projects-container");
const userContainer = document.getElementById("user-container");

//get username and profile picture
const getUserInfo = () => {
  fetch(USER_INFO_URL)
    .then((response) => response.json())
    .then((data) => {
      userContainer.innerHTML = `
        <div class="user-card">
        <img src="https://avatars.githubusercontent.com/u/80949028?v=4"
        alt="Profile picture"><h2>User name: <a href="https://github.com/IdaAspen">${data.name}</a></h2>
        <p>${data.bio}</p>
        </div>
        `;
    });
};

/////////////////////// GET REPOS /////////////////////////////////////////
//Get all repos w/ details
const getRepos = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      let forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      );
      //Sorts filtered repos after dates
      forkedRepos.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      forkedRepos = forkedRepos.reverse();

      forkedRepos.forEach(
        (repo) =>
          (projectsContainer.innerHTML += `
            <div class="project-card">
              <h3><a href=${repo.html_url} target="_blank">${repo.name.replace(
            "-",
            " "
          )}</a></h3>
              <p>Most recent push: ${repo.pushed_at.substring(0, 10)}</p>
              <p>Name of default branch: ${repo.default_branch}</p>
              <p id="commit-${repo.name}">No of commits: </p>
            </div>`),

        //pass along filtered repos as an argument when invoke getPullRequest
        getPullRequests(forkedRepos)
      );
      drawChart(forkedRepos.length);
    });
};

/////////////////////// GET PR /////////////////////////////////////////
//Get all PRs for each project
const getPullRequests = (repos) => {
  repos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`
    )
      .then((res) => res.json())
      .then((data) => {
        const myPulls = data.find(
          (pull) => pull.user.login === repo.owner.login
        );
        if (myPulls) {
          fetchCommits(myPulls.commits_url, repo.name);
        } else {
          document.getElementById(`commit-${repo.name}`).innerHTML =
            "No pull request done ✖️";
        }
      });
  });
};

/////////////////////// GET COMMITS /////////////////////////////////////////
//Get commits for each project
const fetchCommits = (myCommitsUrl, myRepoName) => {
  fetch(myCommitsUrl)
    .then((response) => response.json())
    .then((data) => {
      //creating dynamic id
      document.getElementById(`commit-${myRepoName}`).innerHTML += data.length;
    });
};

//Invoke the functions
getUserInfo();
getRepos();
