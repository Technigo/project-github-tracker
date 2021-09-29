const USER = "ebbadelsol";
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const projectsContainer = document.getElementById("projects");

const getRepos = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      //console.log("All Repos from the json:", data);
      const technigoProjects = data.filter((repo) => repo.fork && repo.name.startsWith("project-"));
      technigoProjects.forEach((repo) => (projectsContainer.innerHTML += /*html*/ `<h3>${repo.name}</h3>`));
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

        getCommits(filteredPull.commits_url);

        getReview(filteredPull.review_comments_url);
      });
  });
};

const getCommits = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //console.log("My commits:", data);
    });
};

const getReview = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //console.log("My review:", data);
    });
};
