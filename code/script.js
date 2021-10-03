// //GLOBAL VARIABLES
// const options = {
// 	method: 'GET',
// 	headers: {
// 		Authorization: `token ****`,
// 	},
// };


const USER = 'jenquach'
const USER_URL = `https://api.github.com/users/${USER}`
const REPOS_URL = `https://api.github.com/users/${USER}/repos`

const headerContainer = document.getElementById('topnav')
const profileContainer = document.getElementById('user-info')
const projectsContainer = document.getElementById('projects')
const pullRequests = document.getElementById('pullrequests')

// function to fetch the user data from GitHub API
const userProfile = () => {
  fetch(USER_URL)
    .then(res => res.json())
    .then(data => {
      profileContainer.innerHTML = `
      <div class="picture">
        <img class="user-picture" src="${data.avatar_url}"
      </div>
      <div class="user-information">  
        <h2>${data.name}</h2>
        <a href="https://github.com/jenquach"><i class="fab fa-github"></i> ${data.login}</a>
        <p><i class="fas fa-map-marker-alt"></i> ${data.location}</p>
      </div>
      `
    })
}
// function to fetch the technigo repositories
const getRepositories = () => {
  fetch(REPOS_URL)
    .then(res => res.json())
    .then(data => {
      // filtering the technigo repositories
      const technigoRepositories = data.filter(
        repo => repo.fork && repo.name.includes('project-')
      )
      technigoRepositories.forEach(repo => {
        projectsContainer.innerHTML += `
          <div class="project">
            <div class="repo-info">
              <a href="${repo.html_url}">${repo.name}</a>
              <p class="push">Recent push ${new Date(repo.pushed_at).toLocaleString("sv-SE", {dateStyle: 'short'})}</p>
                <div id="language-${repo.name}" class="progress"></div>
            </div>
            <div class="repo-details">
              <p id="branch">${repo.default_branch}</p>
              <p class="commit" id="commit-${repo.name}"><i class="fas fa-code-branch"></i> </p>
            </div>
          </div>
        `
        getLanguages(repo)
      })  
      // Draw chart with technigoRepositories data
      drawChart(technigoRepositories.length)
      getPullRequests(technigoRepositories)  
    })
}  

// function to fetch all pull requests
const getPullRequests = (allRepositories) => {
  allRepositories.forEach(repo => {
    const myRepoName = repo.name
    const PULL_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`
    fetch(PULL_URL)
    .then(res => res.json())
    .then(data => { //data is the array of all pull requests
      // Detect if we have pull request or not.
      const myPullRequest = data.find(
      pull => pull.user.login === repo.owner.login
    )    
		// If yes - call fetchCommits function
    if (myPullRequest) {
      getCommits(myPullRequest.commits_url, repo.name);
      // If no - commits 0 is shown.
    } else {
      document.getElementById(`commit-${repo.name}`).innerHTML =
        '<i class="fas fa-code-branch"></i> 0';
      }  
    })    
  })
}

// function to fetch number of commits
const getCommits = (myCommitsUrl, myRepoName) => {
  fetch(myCommitsUrl, )
  .then(res => res.json())
  .then(data => {
    document.getElementById(`commit-${myRepoName}`).innerHTML +=  data.length
  }) 
}

// function to fetch all the languages used in the repository
const getLanguages = (repo) => {
  const languages_URL = `https://api.github.com/repos/${USER}/${repo.name}/languages`
  fetch(languages_URL, )
  .then(res => res.json())
  .then(data => {
    const html = data.HTML || 0;
    const css = data.CSS || 0;
    const js = data.JavaScript || 0;
    const sum = html + css + js;
    // calculates the percentage used of each language
    const htmlPercentage = ((html / sum) * 100).toFixed(1);
    const cssPercentage = ((css / sum) * 100).toFixed(1);
    const jsPercentage = ((js / sum) * 100).toFixed(1);

    document.getElementById(`language-${repo.name}`).innerHTML = `
        <div class="language-html" title="html" style="width:${htmlPercentage}%;"></div>
        <div class="language-css" title="css" style="width:${cssPercentage}%;"></div>
        <div class="language-js" title="javascript" style="width:${jsPercentage}%;"></div>
    `
  })
}


userProfile()
getRepositories()
