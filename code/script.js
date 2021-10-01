const USER = "AschwinSiaila";
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;

const projectsContainer = document.getElementById("projects");

const fetchRepositories = () => {
  fetch(REPOS_URL)
    .then((res) => res.json())
    .then((data) => {
      const technigoRepositories = data.filter(
        (repo) => repo.name.includes("project-") && repo.fork
      );

      console.log(technigoRepositories);

      technigoRepositories.forEach((repo) => {
        projectsContainer.innerHTML += `
          <div>
          <a> href="${repo.name} with default branch ${repo.default_branch}"</a>
          <p>Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
          <p id="commit-${repo.name}">Commits amount: </p>
          </div>
          `;
      });

      fetchPullRequestArray(technigoRepositories);
    });
};

const fetchPullRequestArray = (allRepositories) => {
  allRepositories.forEach((repo) => {
    fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls`)
      .then((res) => res.json())
      .then((data) => {
        const myPullRequest = data.find(
          (pull) => pull.user.login === repo.owner.login
        );
        console.log();

        fetchCommits(myPullRequest.commits_url, repo.name);
      });
  });
};
const fetchCommits = (myCommitsUrl, myRepoName) => {
  fetch(myCommitsUrl)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById(`commit-${myRepoName}`).innerHTML += data.length;
    });
};
fetchRepositories();
