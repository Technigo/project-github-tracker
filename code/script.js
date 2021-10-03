const user = "Rephili";
const REPOS_URL = `https://api.github.com/users/${user}/repos`;
const projectsContainer = document.getElementById("projects");
const USER_URL = `https://api.github.com/users/${user}`;
const userContainer = document.getElementById("userProfile");

//User information: profile image, name and location
const userProfile = () => {
  fetch(USER_URL)
    .then((res) => res.json())
    .then((data) => {
      userContainer.innerHTML = `
      <div class="userinfo">
      <div class="userimg"><img src="${data.avatar_url}"/></div>
      <h2>${data.name}</h2>
      <a class="userlink" href="https://github.com/Rephili">@${data.login}</a>
      <p>📍 ${data.location}</p>
      </div>
      </div>`;
    });
};

userProfile();

//Function to fetch all my repositories and then filter out the forked projects from Technigo
const fetchRepos = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      const technigoProjects = data.filter(
        (repo) => repo.name.startsWith("project-") && repo.fork
      );

      // InnerHTML to make all the projects and the info show on the page
      technigoProjects.forEach((repo) => {
        projectsContainer.innerHTML += `
                <div class="projectinfo">
                    <a class="repolink" href="${repo.html_url}">${repo.name}</a>
                    <p>Default branch for this project is ${
                      repo.default_branch
                    }</p>
                    <p>Latest push: ${new Date(
                      repo.pushed_at
                    ).toDateString()}</p>
                    <p id="commit-${repo.name}">Amount of Commits: </p>
                </div>
            `;
      });

      fetchPullRequests(technigoProjects);
    });
};

//Function to get the pull requests for each project
const fetchPullRequests = (allRepositories) => {
  allRepositories.forEach((repo) => {
    const PULL_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`;

    fetch(PULL_URL)
      .then((response) => response.json())
      .then((data) => {
        const myPullRequest = data.find(
          (pull) => pull.user.login === repo.owner.login
        );

        if (myPullRequest) {
          fetchCommits(myPullRequest.commits_url, repo.name);
        } else {
          document.getElementById(`commit-${repo.name}`).innerHTML =
            "No pull request yet or group project";
        }
      });
  });
};

//Function to get the amount of commits
const fetchCommits = (myCommitsUrl, myRepoName) => {
  fetch(myCommitsUrl)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById(`commit-${myRepoName}`).innerHTML += data.length;
    });
};

fetchRepos();
