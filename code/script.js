const USER = "ebbadelsol";
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const projectsContainer = document.getElementById("projects");

const getRepos = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log("All Repos from the json:", data);
      const technigoProjects = data.filter((repo) => repo.fork && repo.name.startsWith("project-"));
      technigoProjects.forEach((repo) => (projectsContainer.innerHTML += /*html*/ `<h3>${repo.name}</h3>`));
    });
};

getRepos();
