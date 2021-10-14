// DOM selectors - store the URL
// My username to GitHub + URL to repos
const USER = "camekman";
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const INFO_URL = `https://api.github.com/users/${USER}`;
const projectsContainer = document.getElementById("projects");
const profileContainer = document.getElementById("profile-container");
const image = document.getElementById("image");

// Function with the fetch wrapped inside
const getRepos = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      );
      forkedRepos.forEach(
        (repo) =>
          (projectsContainer.innerHTML += `<div class="repositories" id="${
            repo.name
          }"> 
          <h3>${repo.name}</h3> 
          <h5>${repo.default_branch}</h5> 
          <h5>latest update: ${new Date(
            repo.updated_at
          ).toLocaleDateString()} </h5>
          <h5>Git URL: <a href="${repo.html_url}">${repo.name}</a></h5>
          </div>`)
      );
      drawChart(forkedRepos.length);
      getPullRequests(forkedRepos);
    });
};

getRepos();

const getInfo = () => {
  fetch(INFO_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      image.src = data.avatar_url;
      profileContainer.innerHTML += `<div> 
      <tr><h1>${data.name}</h1></tr>
      <tr><h5>${data.login}</h5></tr>
      <tr><h5>${data.bio}</h5></tr>
      <tr><h5>Location @${data.location}</h5></tr>
      <tr><h5> Website@ ${data.blog}</h5></tr>
       </div>`;
    });
};

getInfo();

// pull requests
const getPullRequests = (forkedRepos) => {
  forkedRepos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`
    )
      .then((response) => response.json())
      .then((data) => {
        const myPulls = data.filter(
          (pulls) => pulls.user.login === repo.owner.login
        );
        const commitsURL = myPulls[0].commits_url;
        getCommits(commitsURL, repo);
      });
  });
};

const getCommits = (commitsURL, repo) => {
  fetch(commitsURL)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById(
        `${repo.name}`
      ).innerHTML += ` <h5>number of commits: ${data.length}</h5>`;
    });
};
