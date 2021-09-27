const REPOS_URL = `https://api.github.com/users/madeleinesvensson/repos`;
const container = document.getElementById("projects");

const getRepos = () => {
  fetch(REPOS_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      );
      forkedRepos.forEach(
        (repo) => (container.innerHTML += `<h3>${repo.name}</h3>`)
      );
      drawChart(forkedRepos.length);
    });
};

getRepos();
