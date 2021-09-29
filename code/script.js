const username = "madeleinesvensson";
const REPOS_URL = `https://api.github.com/users/${username}/repos`;
const USERS_URL = `https://api.github.com/users/${username}`;
//const PULLREQUEST_URL = `https://api.github.com/repos/technigo/${repo.name}/pulls`;
const container = document.getElementById("projects");
const userInformation = document.getElementById("user-information");
const commitsContainer = document.getElementById("commit-container");

const getRepos = () => {
  fetch(REPOS_URL)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      );
      forkedRepos.forEach((repo) => {
        const pushedDate = new Date(repo.pushed_at).toLocaleDateString(
          "en-GB",
          {
            hour: "2-digit",
            minute: "2-digit",
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        );

        container.innerHTML += `
        <div class="repo-cards">
          <a href=${repo.html_url}><h3>${repo.name}</h3></a>
          <p>Recent push: ${pushedDate}</p>
          <p>${repo.default_branch}</p>
          <p id="commit-${repo.name}"> Commits amount: </p>
          </div>
          `;
      });
      drawChart(forkedRepos.length);
      getPullRequests(forkedRepos);
    });
};

getRepos();

//Remember to pass along your filtered repos as an argument when
//you are calling this function

const getPullRequests = (repos) => {
  //Get all the PRs for each project.
  repos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`
    )
      .then((res) => res.json())
      .then((data) => {
        const filteredPullrequests = data.find(
          (pull) => pull.user.login === repo.owner.login
        );
        //const myCommits = filteredPullrequests.commits_url;
        //console.log(filteredPullrequests);
        commits(filteredPullrequests.commits_url, repo.name);
        //TODO
        //2. Now you're able to get the commits for each repo by using
        // the commits_url as an argument to call another function
        //3. You can also get the comments for each PR by calling
        // another function with the review_comments_url as argument
      });
  });
};

const commits = (url, myRepoName) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById(`commit-${myRepoName}`).innerHTML += data.length;
    });
};

fetch(USERS_URL)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    userInformation.innerHTML = `
    <h3>Name: ${data.name}</3>
    <h3>Username: ${data.login}</h3>
    <h3>Location: ${data.location}</3>
    <h3>Bio: ${data.bio}</h3>
    <img src="${data.avatar_url}"/>
    `;
  });
