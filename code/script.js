//DOM selectors
const profileInfo = document.getElementById("profile");
const allProjects = document.getElementById("projects");

const username = "TereseClaesson";
const API_PROFILE = `https://api.github.com/users/${username}`;
const API_URL_REPOS = `https://api.github.com/users/${username}/repos`;

//Functions to get the username and profilepicture
const userProfile = () => {
  fetch(API_PROFILE)
    .then((res) => res.json())
    .then(profileData => {
      profileInfo.innerHTML += `
        <h2>GitHub Tracker</h2>
        <img src = "${profileData.avatar_url}">
        <h3>${profileData.name}</h3>
        <h4> <a href = ${profileData.html_url}> ${profileData.login}</h4>
        `;
    })
};

//Repos
const repositories = () => { 
fetch(API_URL_REPOS)
  .then((res) => res.json())
  .then((allRepos) => {

    const forkedRepos = allRepos.filter((repo) => repo.fork && repo.name.startsWith("project-"));
    forkedRepos.forEach((repo) => {
      allProjects.innerHTML += `
        <div>
        <h3> Project name: ${repo.name} </h3>
        <p> Latest push: ${new Date(repo.pushed_at).toLocaleString('en-GB', { dateStyle:'short',})} </p>
        <p> Default branch: ${repo.default_branch}</p>
        <a href = ${repo.html_url}>${repo.name}</a>
        <p id ="pull-${repo.name}"></p>
        <p id ="commit-${repo.name}">Commits:</p>
        </div>
        `
        commits(repo.commits_url, repo.name)
    });
    getPullRequest(forkedRepos);
  });
}

const getPullRequest = (forkedRepos) => {
  forkedRepos.forEach((repo) => {
    
    const PULL_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`
    
    fetch(PULL_URL)
      .then((res) => res.json())
      .then((pullReqs) => {
      let groupProject = true
        pullReqs.forEach((pull) => {
          if (pull.user.login === username) {
            groupProject = false
            document.getElementById(`pull-${repo.name}`).innerHTML = `
            <a href = ${pull.html_url}> Go to pull request </a>
            `
          }
        });

        if (groupProject === true) {
          document.getElementById(`pull-${repo.name}`).innerHTML = `
          <p> No pull request, group project </p>
          `
        }
      });
  });
};

/*const comments = (pullReq) => {
  fetch(pullReq.review_comments_url)
    .then((res) => res.json())
    .then((commentrev) => {
      console.log(commentrev);
    });
};*/

const commits = (myCommits, repoName) => {
  let commitUrl = myCommits.replace('{/sha}','')
  fetch(commitUrl)
    .then((res) => res.json())
    .then((commitNumber) => {
     document.getElementById(`commit-${repoName}`).innerHTML += commitNumber.length;
    })
};

userProfile();
repositories();
