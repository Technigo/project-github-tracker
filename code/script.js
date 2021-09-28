// -- DOM SELECTORS -- //
const projectsContainer = document.getElementById("projects");
const profileInfo = document.getElementById("profileInfo");

// -- GLOBAL VARIABLES -- //
const USER = "brunsant";
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const USER_API = `https://api.github.com/users/${USER}`;

// -- REPOS -- //
const getRepos = () => {
  fetch(REPOS_URL)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log("DATA", json);
      const forkedRepos = json.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      );

      forkedRepos.forEach((repo) => {
        let currentProject = repo.name;
        const COMMIT_URL = `https://api.github.com/repos/${USER}/${currentProject}/commits`;
        fetch(COMMIT_URL)
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            console.log("COMMITS", json);
            const filteredCommits = json.filter(
              (repo) => repo.commit.committer.name === "Bruna Santos"
            );
            // let commitDate = filteredCommits[0].commit.author.date;
            // let commitMessage = filteredCommits[0].commit.message;

            projectsContainer.innerHTML += `
            <div>
            <h3> Project Name: ${repo.name}</h3>
            <a href = ${repo.html_url}> ${repo.name} </a>
            <p>Main branch: ${repo.default_branch}</p>
            </div>
            `;
          });
      });
      drawChart(forkedRepos.length);
    });
};

// -- PROFILE INFO -- //
const getUser = () => {
  fetch(USER_API)
    .then((response) => response.json())
    .then((data) => {
      console.log("USER DATA", data);
      profileInfo.innerHTML = `
          <h3> Profile Info </h3>
          <img src = "https://avatars.githubusercontent.com/u/80712035?v=4">
          <h4> ${data.name}</h4>
          <h4> ${data.login}</h4>
          `;
    });
};

getRepos();
getUser();
