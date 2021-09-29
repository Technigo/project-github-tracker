//DOM SELECTORS
const projectsContainer = document.getElementById("projects");

const userName = "Fatima-Gamero-Romero";
const API_GITHUB = `https://api.github.com/users/${userName}/repos`; //Here we use backticks instead of quotes because we are injecting a variable

const getRepos = () => {
  fetch(API_GITHUB)
    .then((resp) => resp.json())
    .then((data) => {
      const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith("project-")); // Filtering the repos that are forked from Technigo
      console.log(forkedRepos)
      forkedRepos.forEach((repo) => {
      projectsContainer.innerHTML += `
      <div>
        <a href= "${repo.html_url}">${repo.name} with default branch ${repo.default_branch}</a>
        <p>Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
      </div>
      `;
    }); 
      drawChart(forkedRepos.length); // Function being called with the length of the repos which is needed in the chart
      getPullRequests(forkedRepos); // Function being called
    })
};
/////////////////////////////////////////////////////////////////////////////

const getPullRequests = (reposParameter) => {
  reposParameter.forEach((repo) => {
    // console.log(repo.owner.login)
    const API_PR = `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`;
    fetch(API_PR)
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data)
        // console.log(data[0]); ???
        const myPullRequest = data.filter((pull) => pull.user.login === repo.owner.login) //1. It gets only the PR that I made by comparing pull.user.login with repo.owner.login
        // console.log(myPullRequest)
        //2. Now you're able to get the commits for each repo by usingthe commits_url as an argument to call another function
      // console.log(myPullRequest)
      const url = myPullRequest[0].commits_url
      
      getCommits(url) // Function being called which prints all my commits

      });
  });
};



const getCommits = (commitsParameter) => {
  projectsContainer.innerHTML += `<h2>${commitsParameter}</h2>`

}



getRepos();
