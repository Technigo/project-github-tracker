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
      <div class="user-profile-box">
        <h1 class="user-username"> <span class="user-span">${data.login}</span></h1>
        <h2 class="user-fullname"> <span class="user-span">${data.name}</span></h2>
        <h3 class="user-location"> <img class="user-pin-img" src="images/pin-map.png" alt="pin"/><span class="user-span">${data.location}</span></h3>
        <img class="user-img" src="${data.avatar_url}"/>
      </div>
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
          <div class="repo-box">
            <h3 class="repo-name"><img class="repo-book-img"src="images/book.png" alt="book"/>${
              repo.name
            }</h3>
            <p class="repo-url">Url: <a href="${
              repo.html_url
            }" target="blank">${repo.html_url}</a></p>
            <p>Default branch <span class="repo-branch">${
              repo.default_branch
            }</span></p>
            <p>Recent push: <span class="repo-date">${new Date(
              repo.pushed_at
            ).toDateString()}</span></p>
            <p>Commits:<span id="commit-${
              repo.name
            }" class="repo-commit"> </span></p>
          </div>
          `)
      );
      drawChart(forkedRepos.length);
      getPullRequests(forkedRepos);
      //   console.log(forkedRepos);
    });
  // .catch(error => {
  //   return Promise.reject()
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
