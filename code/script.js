const USER = "ebbadelsol";
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const projectsContainer = document.getElementById("projects");
const userContainer = document.getElementById("user-container");

const getUser = () => {
  fetch(`https://api.github.com/users/${USER}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log("Image URL: ", data.avatar_url);
      // console.log("User: ", data.login);
      userContainer.innerHTML += /*html*/ `
        <img class="user-image" src="${data.avatar_url}"/>
        <h1>${data.login}</h1>
      `;
    });
};

getUser();

const getRepos = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      //console.log("All Repos from the json:", data);
      const technigoProjects = data.filter((repo) => repo.fork && repo.name.startsWith("project-"));

      technigoProjects.forEach((repo) => {
        projectsContainer.innerHTML += /*html*/ `
          <div class="${repo.name}-container" id="${repo.name}-container">
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            <p>Default branch ${repo.default_branch}</p>
            <p>Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
            <p id="commits-${repo.name}">Amount of commits: </p>
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

        getReview(filteredPull.review_comments_url, repo.name);
      });
  });
};

const getCommits = (url, repoName) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //console.log("My commits:", data);
      document.getElementById(`commits-${repoName}`).innerHTML += data.length;
    });
};

const getReview = (url, repoName) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      //console.log("My review:", data);
      // console.log(`Reviewed by ${data[0].user.login}`);
      document.getElementById(`${repoName}-container`).innerHTML += /*html*/ `
      <p>Reviewed by: ${data[0].user.login}</p>
      `;
    });
};
