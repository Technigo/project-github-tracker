console.log("script works?");

const userContainer = document.getElementById("userInfo");
const reposContainer = document.getElementById("projects");
const reposSubContainer = document.getElementById("project-box");
const navSub = document.getElementById("nav-sub");
const input = document.getElementById("navInput");
const inputMobile = document.getElementById("navInputMobile");
const githubImg = document.getElementById("nav-github-img");
const turnLightMode = document.getElementById("btn-light");
const turnLightModeMobile = document.getElementById("btn-light-nav");

// for removing previous chart
let chartDrawn = false;

//  shows my profile as default profile upon loading the website
showMyProfileOnLoad = () => {
  let userName = "loulunds";
  getUserData(userName);
  fetchRepos(userName);
};

window.onload = showMyProfileOnLoad;

// for getting user data
const getUserData = (user) => {
  fetch(`https://api.github.com/users/${user}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      userContainer.innerHTML = ``;

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
        <a href="${data.html_url}" target="_blank">
        <img class="user-img" src="${data.avatar_url}"/>
        </a>
      </div>
      `;
    })
    .catch(() => {
      userContainer.innerHTML = `<h3>Sorry, we could not find the information</h3>`;
    });
};

// for fetching the repos of the user
const fetchRepos = (user) => {
  fetch(`https://api.github.com/users/${user}/repos`)
    .then((response) => response.json())
    .then((data) => {
      reposSubContainer.innerHTML = ``;

      // filters the repos that are only from Technigo
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      );

      // sorts the repos from oldest to newest
      forkedRepos.sort((a, b) => {
        return new Date(a.pushed_at) - new Date(b.pushed_at);
      });

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

      // renders the chart
      if (!chartDrawn) {
        drawChart(forkedRepos.length);
        chartDrawn = true;
      }
      getPullRequests(forkedRepos);
    });
};

//Get all the PRs for each project.
const getPullRequests = (repos) => {
  repos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`
    )
      .then((res) => res.json())
      .then((data) => {
        // filters user's pull requests
        const filteredPull = data.find(
          (pull) => pull.user.login === repo.owner.login
        );

        if (filteredPull) {
          showCommits(filteredPull.commits_url, repo.name);
        } else {
          document.getElementById(`commit-${repo.name}`).innerHTML =
            " No pull request from me";
        }
      });
  });
};

// shows number of commits
const showCommits = (url, myRepoName) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
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

// for mobile input
inputMobile.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && inputMobile.value) {
    let userName = "";
    userName = inputMobile.value;
    getUserData(userName);
    fetchRepos(userName);
    toggleNav();
  }
});

// turns the light mode on
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

// toggles the mobile-nav menu

const toggleNav = () => {
  navSub.classList.toggle("active");
};

navSub.addEventListener("click", (e) => {
  toggleNav();
});
