const USER = "Lundgreneddie";
const GITHUB_URL = `https://api.github.com/users/${USER}/repos`;
const COMMIT_URL = `https://api.github.com/repos/Lundgreneddie/project-news-site/commits`;
const projectsContainer = document.getElementById("projects");
const pullContainer = document.getElementById("pull-requests");
const profileInfo = document.getElementById("profile");

// function to get profile picture and name
const profile = () => {
  fetch(`https://api.github.com/users/${USER}`)
    .then(response => {
      return response.json();
    })
    .then(json => {
      profileInfo.innerHTML += `
        <img src=${json.avatar_url}>
        <a class="username-link" href="https://github.com/Lundgreneddie">
        <h3 class="username"><i class="fab fa-github"></i>
      ${json.login}</a></h3>
        <p class="repo-amount">This account has a total of ${json.public_repos} repos</p>
        `;
    });
};
profile(); // invoking the profile function

//

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

      // this creates a forEach function to get all of the projects
      forkedRepos.forEach(
        repo =>
          (projectsContainer.innerHTML += `
          <div class="repo-items">
            <a class="links" href=${repo.html_url}>${repo.name}</a>
        <p><span class="push-title">Most recent push</span>
    ${new Date(repo.pushed_at).toDateString()} at ${repo.pushed_at.slice(
            11,
            16
          )}</p>
        <p class="branch">${repo.default_branch}</p>
        <p id="commit-${repo.name}">Number of commits: </p>
        </div>`)
      );

      fetchPullRequestsArray(forkedRepos);
      drawChart(forkedRepos.length);
    });
};

// this fetches all of the pull requests and commit made to those
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
            "No pull requests done";
        }
      });
  });
};
const fetchCommits = (myCommitsUrl, myRepoName) => {
  fetch(myCommitsUrl)
    .then(res => res.json())
    .then(json => {
      document.getElementById(`commit-${myRepoName}`).innerHTML += json.length;
    });
};
getRepos(); // invoking the function

// function to toggle the dark mode
const myFunction = () => {
  const element = document.body;
  element.classList.toggle("dark-mode");
};
