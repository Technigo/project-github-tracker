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
        <a href="https://github.com/jenquach">${data.login}</a>
        <p>${data.location}</p>
      </div>
      `
    })
}

const getRepositories = () => {
  fetch(REPOS_URL)
    .then(res => res.json())
    .then(data => {
      const technigoRepositories = data.filter(
        repo => repo.fork && repo.name.includes('project-')
      )
      technigoRepositories.forEach(repo => {
        projectsContainer.innerHTML += `
          <div class="project">
            <a href="${repo.html_url}">${repo.name}</a>
            <p>Recent push ${new Date(repo.pushed_at).toDateString()}</p>
            <p id="commit-${repo.name}">Commits </p>
            <p>Branch ${repo.default_branch}</p>
          </div>
        `
      })  
      // Draw chart with technigoRepositories data
      drawChart(technigoRepositories.length)
      getPullRequests(technigoRepositories)  
    })
}  

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
        'Commits 0';
      }  
    })    
  })
}

const getCommits = (myCommitsUrl, myRepoName) => {
  fetch(myCommitsUrl)
  .then(res => res.json())
  .then(data => {
    document.getElementById(`commit-${myRepoName}`).innerHTML +=  data.length
  }) 
}

userProfile()
getRepositories()