//DOM SELECTORS
const projectsContainer = document.getElementById("projects");

const userName = "Fatima-Gamero-Romero";
const API_GITHUB = `https://api.github.com/users/${userName}/repos`; //Here we use backticks instead of quotes because we are injecting a variable

const getRepos = () => {
  fetch(API_GITHUB)
    .then((resp) => resp.json())
    .then((data) => {
      const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith("project-")); // Filtering the repos that are forked from Technigo
      forkedRepos.forEach((repo) => {
      projectsContainer.innerHTML += `
      <div>
        <a href= "${repo.html_url}">${repo.name} with default branch ${repo.default_branch}</a>
        <p>Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
        <p id= "commit-${repo.name}">Commits amount: </p>
      </div>
      `;
    }); 
      drawChart(forkedRepos.length); // Function being called with the length of the repos which is needed in the chart
      getPullRequests(forkedRepos); // Function being called
    })
};
/////////////////////////////////////////////////////////////////////////////

const getPullRequests = (allRepositories) => {
  allRepositories.forEach((repo) => {
    // console.log(repo.owner.login)
    const API_PR = `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`;
    fetch(API_PR)
      .then((resp) => resp.json())
      .then((data) => {
        const myPullRequest = data.find((pull) => pull.user.login === repo.owner.login) //1. It gets only the PR that I made by comparing pull.user.login with repo.owner.login
        // console.log(myPullRequest)
        fetchCommits(myPullRequest.commits_url, repo.name)
      });
  });
};
////////////////////////////////
const fetchCommits = (myCommitsUrl,myRepoName) => {
  fetch(myCommitsUrl)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    document.getElementById(`commit-${myRepoName}`).innerHTML += data.length;
  })
}

getRepos();
