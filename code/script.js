const projects = document.getElementById("projects");
const chart = document.getElementById("chart");
const repo_URL = "https://api.github.com/users/Sherin-Susan-Thomas/repos";

fetch(repo_URL)
  .then((res) => res.json())
  .then((userData) => {
    console.log("userData", userData);
    const filteredRepos = userData.filter((item) => item.fork);
    console.log("filteredRepos", filteredRepos);
    const filteredRepos2 = filteredRepos.filter((item) =>
      item.name.includes("project-")
    );
    console.log("filteredRepos2", filteredRepos2);
  });
