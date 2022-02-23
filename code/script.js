const projects = document.getElementById("projects");
const chart = document.getElementById("chart");
const repo_URL = "https://api.github.com/users/Sherin-Susan-Thomas/repos";

const options = {
  method: "GET",
  headers: {
    Authorization: ` ${API_TOKEN}`,
  },
};

fetch(repo_URL, options)
  .then((res) => res.json())
  .then((userData) => {
    console.log("userData", userData);
    const filteredRepos = userData.filter(
      (item) => item.fork && item.name.includes("project-")
    );
    filteredRepos.forEach((repo) => {
      projects.innerHTML += `<h2 class = "repo-name" id = "repoName"> ${repo.name} </h2>`;
    });
    console.log("filteredRepos", filteredRepos);
  });
