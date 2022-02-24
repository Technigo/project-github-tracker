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
      userProfile.innerHTML += `<h2 class = "user-name" id= "userName"> ${data.name} </h2>
      <img src = ${data.avatar_url}>`;
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
        (item) => item.fork && item.name.includes("project-") // to filter technigo projects
      );
      filteredRepos.forEach((repo) => {
        const date = new Date(repo.pushed_at).toDateString();
        projects.innerHTML += `<h2 class = "repo-name" id= "repoName"> ${repo.name} </h2>
        <a href="${repo.html_url}">Link to the repository</a>
        <p class = "repo-name" id= "repoName"> Default Branch: ${repo.default_branch} </p>
        <p class = "repo-name" id= "repoName"> Latest Push update: ${date} </p>
        `;
      });
      console.log("filteredRepos", filteredRepos);
      pullRequests(filteredRepos);
      myChart(filteredRepos.length);
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
        console.log("data", data);
        const myPullRequest = data.find(
          (pull) => pull.user.login === repo.owner.login
        ); // pullrequests fetches the entire pullrequest specfic to the projecr,  filtering out pull requests made by me.
        console.log("myPullRequest", myPullRequest);
      });
  });
};

userRepo();
