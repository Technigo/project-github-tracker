//DOM SELECTORS
const projectsContainer = document.getElementById("projects");
const profileSection = document.getElementById("profile");
const searchForm = document.getElementById("search-form")
const searchField = document.getElementById("search-field")
//GLOBAL VARIABLES
const userName = "Fatima-GR";
const API_GITHUB = `https://api.github.com/users/${userName}/repos`; //Here we use backticks instead of quotes because we are injecting a variable
const API_GITHUB_PROFILE = `https://api.github.com/users/${userName}`;
let myRepos;

//Get all info about my github profile
const getMyProfile = () => {
  fetch(API_GITHUB_PROFILE)
  .then(resp => resp.json())
  .then(data => {
    console.log(data)
    profileSection.innerHTML = `
    <div class=picture-container>
       <img class="profile-pic" alt="profile picture" src = ${data.avatar_url}/>
     </div>
     <div class=myProfile>
       <p>${data.name}</p>
       <a href = "http://gitHub.com/Fatima-GR" class="account" target="_blank">${data.login}</a>
       <a href = "mailto:fatigr2692@gmail.com" class="email">fatigr2692@gmail.com</a>
       <p><i class="fas fa-map-marker-alt"></i>${data.location}<p/>
     </div>
     
    `
  })
}
getMyProfile()


//Get all my repositories from Technigo
const getRepos = () => {
  fetch(API_GITHUB)
    .then((resp) => resp.json())
    .then((data) => {
      let forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith("project-")); // Filtering the repos that are forked from Technigo
      myRepos = forkedRepos;
      myRepos.forEach((repo) => {
      projectsContainer.innerHTML += `
      <div class="card">
        <a href= ${repo.html_url} class="repo" target="_blank">${repo.name}</a>
        <p>Default branch:<span> ${repo.default_branch}</span></p>
        <p>Last update: <span>${new Date(repo.pushed_at).toDateString()}<span></p>
        <p id= "commit-${repo.name}"> Number of commits:</p>
      </div>
      `;
    }); 
      drawChart(myRepos.length); // Function being called with the length of the repos which is needed in the chart
      getPullRequests(myRepos); // Function being called
    })
};
getRepos();


//Get all the pull requests of my projects
const getPullRequests = (allRepositories) => {
  allRepositories.forEach((repo) => {
    // console.log(repo.owner.login)
    const API_PR = `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`;
    fetch(API_PR)
      .then((resp) => resp.json())
      .then((data) => {
        const myPullRequest = data.find((pull) => pull.user.login === repo.owner.login) // It gets only the PR that I made by comparing pull.user.login with repo.owner.login
        // console.log(myPullRequest)
        // fetchCommits(myPullRequest.commits_url, repo.name) ////////

        // Detect if we have pull request or not: 
        //If yes - call fetchCommits function // If no - inform user that no pull request was yet done
        if(myPullRequest) {
					getCommits(myPullRequest.commits_url, repo.name); // Function being called
				} else {
					document.getElementById(`commit-${repo.name}`).innerHTML =
						'No pull request yet done!';
				}
      });
  });
};

//Get the amount of commits 
const getCommits = (myCommitsUrl,myRepoName) => {
  fetch(myCommitsUrl)
  .then(res => res.json())
  .then(data => {
    document.getElementById(`commit-${myRepoName}`).innerHTML += `<span> ${data.length}</span>`;
  })
}
//Eventlistener on form-submit
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const search = myRepos.filter(repo => repo.name.indexOf(searchField.value) > -1);
  getPullRequests(search);
})

