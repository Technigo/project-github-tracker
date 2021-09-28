// list of repos DONE!
// username & profile pic
// most recent update (push) for each repo
// name of default branch for each
// URL to actual GH repo
// number of commits for each repo
// chart.js

const userLogin = "BritishSwede";
const REPOS_URL = "https://api.github.com/users/BritishSwede/repos";
const PULLREQUEST_URL =
  "https://api.github.com/repos/technigo/${repo.name}/pulls";
const COMMITS_URL =
  "https://api.github.com/repos/Technigo/project-news-site/pulls/227/commits";
const projectsContainer = document.getElementById("projects");

// Fetching all repos done by me
const getRepos = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // data.forEach((repo) => console.log(repo.name));
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      );
      console.log(forkedRepos);
      forkedRepos.forEach(
        (repo) => (projectsContainer.innerHTML += `<h3>${repo.name}</h3>`)
      );
      getPullRequests(forkedRepos);
      drawChart(forkedRepos.length);
    });
};

getRepos();

// Skipping for now
const getPullRequests = (repos) => {
  repos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`
    )
      .then((response) => response.json())
      .then((pull) => {
        // console.log(pull);
        const myPullRequest = pull.filter(
          (pull) => pull.user.login === repo.owner.login
        );
        console.log(myPullRequest);
        myPullRequest.forEach(
          (pull) => (projectsContainer.innerHTML += `<p>${pull.title}`)
        );
      });
  });
};
