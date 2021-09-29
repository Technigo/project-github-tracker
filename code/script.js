console.log("script works?");

const userName = "Loulunds";
const USER_URL = `https://api.github.com/users/${userName}`;
const REPOS_API_URL = `https://api.github.com/users/${userName}/repos`;
const userContainer = document.getElementById("userInfo");
const reposContainer = document.getElementById("projects");
const commentsContainer = document.getElementById("comments");
const commitsContainer = document.getElementById("commits");

const getUserData = () => {
  fetch(USER_URL)
    .then((response) => response.json())
    .then((data) => {
      userContainer.innerHTML = `
      <h1> Username: ${data.login}</h1>
      <h2> Fullname: ${data.name}</h2>
      <h3> Location: ${data.location}</h3>
      <img src="${data.avatar_url}"/>
      
      `;
    })
    .catch(() => {
      userContainer.innerHTML = `<h3>Sorry, we could not find the information</h3>`;
    });
};

const fetchRepos = () => {
  fetch(REPOS_API_URL)
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);

      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      );
      forkedRepos.forEach(
        (repo) =>
          (reposContainer.innerHTML += `
        <h3>${repo.name}</h3>
        <p><a href="${repo.html_url}" target="blank">${repo.html_url}</a></p>
        <p>with default branch ${repo.default_branch}</p>
        <p>Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
        <p id="commit-${repo.name}">Commits: </p>
        `)
      );
      drawChart(forkedRepos.length);
      getPullRequests(forkedRepos);
      //   console.log(forkedRepos);
    });
  // .catch(() => {
  //   reposContainer.innerHTML = `<h3>Sorry, we could not find the information</h3>`;
  // });
};

const getPullRequests = (repos) => {
  console.log(repos);
  //Get all the PRs for each project.
  repos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        const filteredPull = data.find(
          (pull) => pull.user.login === repo.owner.login
        );

        showCommits(filteredPull.commits_url, repo.name);

        //TODO
        //1. Find only the PR that you made by comparing pull.user.login
        // with repo.owner.login
        //2. Now you're able to get the commits for each repo by using
        // the commits_url as an argument to call another function
        //3. You can also get the comments for each PR by calling
        // another function with the review_comments_url as argument
        // showComments(COMMENTS_URL);
      });
  });
};

const showCommits = (url, myRepoName) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById(`commit-${myRepoName}`).innerHTML += data.length;
    });
};

getUserData();
fetchRepos();
