console.log("script works?");

// let userName = "Loulunds";
let userContainer = document.getElementById("userInfo");
const reposContainer = document.getElementById("projects");
const reposSubContainer = document.getElementById("project-box");
const input = document.getElementById("navInput");
const githubImg = document.getElementById("nav-github-img");
const turnLightMode = document.getElementById("btn-light");
const turnLightModeMobile = document.getElementById("btn-light-nav");

let chartDrawn = false;

showMyProfileOnLoad = () => {
  let userName = "Loulunds";
  getUserData(userName);
  fetchRepos(userName);
};

window.onload = showMyProfileOnLoad;

const getUserData = (user) => {
  fetch(`https://api.github.com/users/${user}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      userContainer.innerHTML = "";

      userContainer.innerHTML = `
      <div class="user-profile-box">
        <div class="user-info-box">
          
          <h1 class="user-username"> <span id="userSpan">${
            data.login
          }</span></h1>
          
          <h2 class="user-fullname"> <span id="userSpanSub">${
            data.name
          }</span></h2>
          
          <h3 class="user-location"> <img class="user-pin-img" src="images/pin-map.png" alt="pin"/><span class="user-span">${
            data.location
          }</span></h3>
          
          <h3 class="user-join"> Member since: ${new Date(data.created_at)
            .toDateString()
            .slice(4)}</h3>
        </div>
      <div class="user-img-box">
        <img class="user-img" src="${data.avatar_url}"/>
      </div>
      `;
    })
    .catch(() => {
      userContainer.innerHTML = `<h3>Sorry, we could not find the information</h3>`;
    });
};

const fetchRepos = (user) => {
  fetch(`https://api.github.com/users/${user}/repos`)
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      reposSubContainer.innerHTML = ``;

      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      );

      forkedRepos.sort((a, b) => {
        return new Date(a.pushed_at) - new Date(b.pushed_at);
      });

      console.log(forkedRepos);
      forkedRepos.forEach(
        (repo) =>
          (reposSubContainer.innerHTML += `
          <div class="repo-box">
          
           
            <a href="${
              repo.html_url
            }" target="blank"> <h3 class="repo-name"><img class="repo-book-img"src="images/book.png" alt="book"/>
            ${repo.name}</h3>
           </a>

            <p>Default branch <span class="repo-branch">${
              repo.default_branch
            }</span></p>

            <p>Language: <span class="repo-language">${repo.language}</span></p>
            
            <p>Recent push: <span class="repo-date">${new Date(
              repo.pushed_at
            ).toDateString()}</span></p>
            
            <p>Commits:<span id="commit-${
              repo.name
            }" class="repo-commit"> </span></p>
          </div>
          `)
      );

      if (!chartDrawn) {
        drawChart(forkedRepos.length);
        chartDrawn = true;
      }
      getPullRequests(forkedRepos);
      // console.log(forkedRepos);
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

        if (filteredPull) {
          showCommits(filteredPull.commits_url, repo.name);
        } else {
          document.getElementById(`commit-${repo.name}`).innerHTML =
            " No pull request from me";
        }

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

// event listener

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && input.value) {
    let userName = "";
    userName = input.value;
    getUserData(userName);
    fetchRepos(userName);
  }
});

// lightmode

const toLightMode = () => {
  document.body.classList.toggle("light");
  document.getElementById("userSpan").classList.toggle("user-span-light");
  document.getElementById("userSpanSub").classList.toggle("user-span-light");
};

turnLightMode.addEventListener("click", (e) => {
  toLightMode();
});

turnLightModeMobile.addEventListener("click", (e) => {
  toLightMode();
});
