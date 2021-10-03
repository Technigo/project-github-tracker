// THE DOM SELECTORS
const projectContainer = document.getElementById('projects');
const profileSection = document.getElementById('profileSection');

// URLS STORED IN VARIABLES
const USER = 'MT-dotse'; //my github name stored in the variable USER
const REPOS_URL = `https://api.github.com/users/${USER}/repos`; // a variable that stores the URL that fetching the repositories
const MY_PROFILE = `https://api.github.com/users/MT-dotse`; //my github profile

//FETCHING THE GITHUB PROFILE, NAME AND USERNAME

fetch(MY_PROFILE)
  .then((response) => response.json())
  .then((data) => {
    profileSection.innerHTML = `
    <div class= "profile-section">
    <img class="picture" src ="${data.avatar_url}" alt="profile picture"/>
    <p> Hi world, I'm ${data.name}</p>
    <p> ${data.bio}</p>
    <p><i class="fas fa-map-marker-alt"></i> ${data.location}</p>
    <p><i class="fab fa-github"></i><a href="${data.html_url}"> ${data.login}</p>
    </div>
    `;
  });

// FETCHING THE REPOS
const getRepositories = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      const technigoRepositories = data.filter(
        (repo) => repo && repo.name.startsWith('project-')
      );

      technigoRepositories.forEach((repo) => {
        projectContainer.innerHTML += `
       <div id ${repo.name} class="repo-card">
        <h2>${repo.name}</h2>
        <p>Branch: ${repo.default_branch}</p>  
        <p> Main Language: ${repo.language}</p> 
        <p>Last push: ${new Date(repo.pushed_at).toDateString()}</p>
        <p id="commit-${repo.name}"> Number of commits: </p>    
        <p> <a href="${repo.html_url}"> To repo...</a></p>
       
      </div>
        `;
      });
      getPullRequestsArray(technigoRepositories);
      drawChart(technigoRepositories.length);
    });
};

//FETCHING THE PULL REQUESTS
const getPullRequestsArray = (allRepositories) => {
  allRepositories.forEach((repo) => {
    const PULL_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`;
    fetch(PULL_URL)
      .then((res) => res.json())
      .then((data) => {
        const myPullRequest = data.find(
          (pull) => pull.user.login === repo.owner.login
        );

        if (myPullRequest) {
          fetchCommits(myPullRequest.commits_url, repo.name);
        } else {
          document.getElementById(`commit-${repo.name}`).innerHTML =
            'No pull request yet';
        }
      });
  });
};

//FETCHING THE COMMITS
const fetchCommits = (myCommitsUrl, myRepoName) => {
  fetch(myCommitsUrl)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById(`commit-${myRepoName}`).innerHTML += data.length;
    });
};

getRepositories();
