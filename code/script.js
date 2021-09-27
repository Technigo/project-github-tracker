// DOM selectors - store the URL
// My username to GitHub + url to repos
const USER = "camekman";
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const projectsContainer = document.getElementById("projects");

// Function with the fetch wrapped inside
const getRepos = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //data.forEach((repo) => console.log(repo.name));
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      );
      forkedRepos.forEach(
        (repo) =>
          (projectsContainer.innerHTML += `<div class = "repositories"> <h3>${repo.name}</h3> </div>`)
      );
      drawChart(forkedRepos.length);
    });
};

getRepos();

// pull requests
const getPullRequests = (repo) => {
  repo.forEach((repo) => {
    fetch("https://api.github.com/repos/technigo/" + repo.name + PULLS)
      .then((response) => response.json())
      .then((data) => {});
  });
};
