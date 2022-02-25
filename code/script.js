const projects = document.getElementById("projects");
const userProfile = document.getElementById("userProfile");
const chart = document.getElementById("chart");
const user_URL = "https://api.github.com/users/Sherin-Susan-Thomas";
const repo_URL = "https://api.github.com/users/Sherin-Susan-Thomas/repos";

const options = {
  method: "GET",
  headers: {
    Authorization: `token ${API_TOKEN}`,
  },
};

//To fetch profile data
const user = () => {
  fetch(user_URL, options)
    .then((res) => res.json())
    .then((data) => {
      console.log("data", data);
      userProfile.innerHTML += `
      <h1> Technigo GitHub Tracker <br> </h1> 
      <img src = ${data.avatar_url}>
      <h2 class = "user-name" id= "userName"> ${data.name} </h2> 
     
      <button class= "button" id = "button"><a href="${data.html_url}</a>"> Follow </button>
     `;
    });
};
user();

// To fetch repositories
const userRepo = () => {
  fetch(repo_URL, options)
    .then((res) => res.json())
    .then((userData) => {
      console.log("userData", userData);
      const filteredRepos = userData.filter(
        (item) => item.fork == true && item.name.includes("project-") // to filter technigo projects
      );
      filteredRepos.forEach((repo) => {
        const date = new Date(repo.pushed_at).toDateString();
        projects.innerHTML += `
        <a class = "repo1" id= "repo"href="${repo.html_url}"><b>${repo.name}</b></a>
        <p class = "repo2" id= "repo"> <b>Default Branch:</b> ${repo.default_branch} </p>
        <p  class = "repo3"id= "repo"> <b>Latest Push update:</b> ${date} </p>
        <p class = "repo4" id="commit-${repo.name}"><b>Commits Done:</b> </p>
    
        `;
      });
      console.log("filteredRepos", filteredRepos);
      pullRequests(filteredRepos);
    });
};

const pullRequests = (repos) => {
  repos.forEach((repo) => {
    console.log("repo", repo);
    fetch(
      `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`,
      options
    ) // to filter pull requests
      .then((res) => res.json())
      .then((data) => {
        const commits = document.getElementById(`commit-${repo.name}`);
        console.log("data", data);
        const myPullRequest = data.find(
          (pull) => pull.user.login === repo.owner.login
        ); // pullrequests fetches the entire pullrequest specfic to the project,  filtering out pull requests made by me.
        console.log("myPullRequest", myPullRequest);
        fetchCommits(myPullRequest.commits_url, repo.name);
      });
  });
};
const fetchCommits = (commitsURL, reponame) => {
  fetch(commitsURL, options)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("data", data);
      document.getElementById(`commit-${reponame}`).innerHTML += data.length;
    });
};

userRepo();
