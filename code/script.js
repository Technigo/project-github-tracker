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
      <h1> GitHub Tracker <br> </h1> 
      <img class= "user" src = ${data.avatar_url}>
      <h2 class = "user-name" id= "userName"> ${data.name}  </h2> 
      <h4> ${data.bio} </h4>  <br>
      <h4>  Follow <a href="${data.html_url}">   <i class="fa fa-github" aria-hidden="true"></i> </a>   </h4> 
     
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
        projects.innerHTML += `<div class = "repos" >
        <h3 class = "repo"><b>${repo.name}</b><a href="${repo.html_url}">  <i class="fa fa-github" aria-hidden="true"></i></a> </h3> 
        <p class = "repo">  (${repo.default_branch}) </p>
        <p class = "repo">  <b>Latest update:</b> Pushed on ${date} </p>
        <p class = "repo"id="commit-${repo.name}""><b>Commits Done:</b> </p>
        </div>
        `;
      });
      fetchChart(filteredRepos.length);
      console.log("filteredRepos", filteredRepos);
      pullRequests(filteredRepos);
    });
  const pullRequests = (repos) => {
    repos.forEach((repo) => {
      console.log("repo", repo);
      fetch(
        `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`,
        options
      ) // to filter pull requests
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          const myPullRequest = data.find(
            (pull) => pull.user.login === repo.owner.login
          ); // pullrequests fetches the entire pullrequest specfic to the project,  filtering out pull requests made by me.
          console.log("myPullRequest", myPullRequest);
          if (myPullRequest) {
            fetchCommits(myPullRequest.commits_url, repo.name);
          } else {
            document.getElementById(`commit-${repo.name}`).innerHTML =
              "<b>Commits Done: </b> 0 (Pull request unavailable/Group project) ";
          }
        });
    });
  };
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
