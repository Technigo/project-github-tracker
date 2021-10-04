const USER = "efstasia";
const GITHUB_URL = `https://api.github.com/users/${USER}/repos`;
const projectsContainer = document.getElementById("projects");
const pullContainer = document.getElementById("pull-requests");
const profileInfo = document.getElementById("profile");

// function to get profile info
const profile = () => {
  fetch(`https://api.github.com/users/${USER}`)
    .then(response => {
      return response.json();
    })
    .then(json => {
      profileInfo.innerHTML += `
        <img src=${json.avatar_url}>
        <a class="username-link" href="https://github.com/efstasia">
        <h3 class="username"><i class="fab fa-github"></i>
      ${json.login}</a></h3>
      <p class="location">Current location: ${json.location}</p>
        <p class="repo-amount">This account has a total of ${json.public_repos} repos</p>
        `;
    });
};
profile(); // invoking the profile function

// function to get all of the repos and commits
const getRepos = () => {
  fetch(GITHUB_URL)
    .then(response => {
      return response.json();
    })
    .then(json => {
      // this filters out ONLY the forked projects from technigo
      const forkedRepos = json.filter(
        repo => repo.fork && repo.name.startsWith("project-")
      );

      // this creates a forEach function to get all of the projects + inner HTML for the project section
      forkedRepos.forEach(
        repo =>
          (projectsContainer.innerHTML += `<div class="cards"><h3 class="repo-title">${
            repo.name
          }</h3>
          <a class="links" href=${
            repo.html_url
          }>LINK TO THE REPOSITORY ON GITHUB</a>
          <div class="push-date">
        <p><span class="push-title">Most recent push</span>
    ${new Date(repo.pushed_at).toDateString()} at ${repo.pushed_at.slice(
            11,
            16
          )}</p>
        </div>
        <p class="branch">${repo.default_branch}</p>
        <p id="commit-${repo.name}">Number of commits: </p></div>`)
      );
      fetchPullRequestsArray(forkedRepos);
      drawChart(forkedRepos.length);
    });
};

// this fetches all of the pull requests
const fetchPullRequestsArray = allRepositories => {
  allRepositories.forEach(repo => {
    const PULL_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`;
    fetch(PULL_URL)
      .then(res => res.json())
      .then(json => {
        const myPullRequest = json.find(
          pull => pull.user.login === repo.owner.login
        );
        // Detect if we have pull request or not.
        // If yes - call fetchCommits function
        // If no - inform user that no pull request was yet done
        if (myPullRequest) {
          fetchCommits(myPullRequest.commits_url, repo.name);
        } else {
          document.getElementById(`commit-${repo.name}`).innerHTML =
            "No pull requests done / team project";
        }
      });
  });
};
// this is a function to fetch number of commits made
const fetchCommits = (myCommitsUrl, myRepoName) => {
  fetch(myCommitsUrl)
    .then(res => res.json())
    .then(json => {
      document.getElementById(`commit-${myRepoName}`).innerHTML += json.length;
    });
};
getRepos(); // invoking the function

// function to toggle the dark mode, connected to the button in HTML
const myFunction = () => {
  const element = document.body;
  element.classList.toggle("dark-mode");
};
