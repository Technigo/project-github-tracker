const projectsContainer = document.getElementById("projects");
const info = document.getElementById("info");
const chartSection = document.getElementById("projectsInfo");
const username = "HelenaW86";
const gitApi = `https://api.github.com/users/${username}`;
const repoApi = `https://api.github.com/users/${username}/repos`;
const commentsApi = `https://api.github.com/repos/Technigo/project-news-site/pulls/247/comments`;
const commitApi = `https://api.github.com/repos/Technigo/project-news-site/pulls/227/commits`;

const getRepos = () => {
  fetch(repoApi)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      );
      forkedRepos.forEach((repo) => {
        projectsContainer.innerHTML += `<div id="${
          repo.name
        }" class="projects-cards">
        <h3>${repo.name}</h3>
        <h4>Recent Push: ${new Date(repo.pushed_at).toLocaleDateString()}</h4>
        <h4>Default Branch: ${repo.default_branch}</h4>
        <h4>Git URL: <a href="${repo.html_url}">${repo.name}</a></h4></div>`;
      });
      getPulls(forkedRepos);
      drawChart(forkedRepos.length);
    });
};

const getinfo = () => {
  fetch(gitApi)
    .then((response) => response.json())
    .then((data) => {
      info.innerHTML += `
      <h1>Github tracker</h1>
      <img class="profile-img" src="${data.avatar_url}"/>
      <div class="heading-text">
      <h2>${data.login}</h2>
      <h3>${data.name} </h3>
      </div>`;
    });
};

const getPulls = (forkedRepos) => {
  forkedRepos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`
    )
      .then((response) => response.json())
      .then((data) => {
        const myPulls = data.filter(
          (pulls) => repo.owner.login === pulls.user.login
        );
        console.log(myPulls);
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
      ).innerHTML += `Number of comitt messages: ${data.length}`;
    });
};
getRepos();
getinfo();
