const user = "Rephili";
const REPOS_URL = `https://api.github.com/users/${user}/repos`;
const projectsContainer = document.getElementById("projects");

// Function to fetch all my repositories and then filter out the forked projects from Technigo
const fetchRepos = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      const technigoProjects = data.filter(
        (repo) => repo.name.startsWith("project-") && repo.fork
      );

      // InnerHTML to make all the projects show on the page
      technigoProjects.forEach((repo) => {
        projectsContainer.innerHTML += `
                <div>
                    <a href="${repo.html_url}">${repo.name}</a>
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

const fetchCommits = (myCommitsUrl, myRepoName) => {
  fetch(myCommitsUrl)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById(`commit-${myRepoName}`).innerHTML += data.length;
    });
};

fetchRepos();
