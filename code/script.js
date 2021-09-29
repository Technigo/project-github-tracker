const USER = "ebbadelsol";
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const projectsContainer = document.getElementById("projects");

const getRepos = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      //console.log("All Repos from the json:", data);
      const technigoProjects = data.filter((repo) => repo.fork && repo.name.startsWith("project-"));

      technigoProjects.forEach((repo) => {
        projectsContainer.innerHTML += /*html*/ `
          <div>
            <a href="${repo.html_url}" target="_blank">${repo.name} with default branch ${repo.default_branch}</a>
            <p>Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
            <p id="commits-${repo.name}">Commits amount: </p>
          </div>
        `;
      });

      getPullRequests(technigoProjects);
      drawChart(technigoProjects.length);
    });
};

getRepos();

const getPullRequests = (repos) => {
  // Get all the PRs for each project.
  repos.forEach((repo) => {
    fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`)
      .then((response) => response.json())
      .then((data) => {
        //console.log("Data from pull request:", data);

        const filteredPull = data.find((pull) => pull.user.login === repo.owner.login);

        //console.log("My pull request for:", filteredPull);

        getCommits(filteredPull.commits_url, repo.name);

        getReview(filteredPull.review_comments_url);
      });
  });
};

const getCommits = (url, repoName) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("My commits:", data);
      console.log(repoName);
      document.getElementById(`commits-${repoName}`).innerHTML += data.length;
    });
};

const getReview = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //console.log("My review:", data);
    });
};
