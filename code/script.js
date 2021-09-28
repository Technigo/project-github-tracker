const USER = "amandatilly";
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const PR_URL = `https://api.github.com/repos/Technigo/${reponame}/pulls`;
const projectContainer = document.getElementById("projects");

const getRepos = () => {
  fetch(REPOS_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      //   data.forEach((repo) => console.log(repo.name));
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      );
      forkedRepos.forEach(
        (repo) => (projectContainer.innerHTML += `<h3>${repo.name}</h3>`)
      );
    });
};

const getPullRequests = (repos) => {
  repos.forEach((repo) => {
    fetch(PR_URL)
      .then((res) => res.json())
      .then((data) => {});
  });
};

getRepos();
