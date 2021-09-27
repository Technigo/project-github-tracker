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
        (repo) => (projectsContainer.innerHTML += `<h3>${repo.name}</h3>`)
      );
      drawChart(forkedRepos.length);
    });
};

getRepos();
