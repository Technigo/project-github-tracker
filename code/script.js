let USER = 'sofiawillebrand'
let PROJECT = 'project-weather-app'
let API_PROFILE = `https://api.github.com/users/${USER}`
let API_ALL_REPOS = `https://api.github.com/users/${USER}/repos`
let repoContainer = document.getElementById('repo-container')
let profileContainer = document.getElementById('profile-container')
let chart = document.getElementById('chart-area')
let commitsSort = document.getElementById('commit-btn')
let dateSort = document.getElementById('date-btn')
let nameSort = document.getElementById('repo-btn')
let repositorys = []


// create repo-card for each repository
const insertRepoInfo = (repository) => {
  let latestPush = new Date(repository.latest_push).toDateString()
  repoContainer.innerHTML += /*html*/ `
    <div class="repo-card" id=${repository.name}>
      <a href=${repository.project_url} class="link" target="_blank">${repository.name}</a>
      <p>Date of latest push: ${latestPush}</p>
      <p>Default branch: ${repository.default_branch}</p>
      <p>Number of commits: ${repository.number_commits}</p>
      <p>Latest commit-message: ${repository.commit_message}</p>
    </div>
  `
}

//get info for profile
const getProfile = () => {
  fetch(API_PROFILE)
  .then(res => res.json()) 
  .then(profileData => {
    chart.insertAdjacentHTML("beforeBegin", /*html*/`
      <div class="profile-area">
        <img src=${profileData.avatar_url} class="profile-img">    
        <div>
          <h2>GitHub Tracker</h2>
          <h1>${profileData.name}</h1>
        </div>
      </div>
    `)
    });
}

const getRepos = () => {
  fetch(API_ALL_REPOS)
  .then(res => res.json()) 
  .then(reposData => {
    console.log('Repodata: ', reposData)
    const technigoRepos = reposData.filter((repo) => repo.fork && repo.name.startsWith('project-'))
    technigoRepos.forEach(project => {
      // add information about the repo to and object in the array repositorys
      repositorys.push({
        'name': project.name,
        'latest_push': project.pushed_at,
        'default_branch': project.default_branch,
        'project_url': project.html_url
      })

    // Get info about commits for specific repo
    let REPO_API = `https://api.github.com/repos/${USER}/${project.name}/commits`
 
      fetch(REPO_API)
      .then(res => res.json()) 
      .then(commitData => {
        let commitMessage = commitData[0].commit.message
        // find the object with the same name as the current project in the forEach
        let repository = repositorys.find(repo => repo.name === project.name)
        repository['commit_message'] = commitMessage
        repository['number_commits'] = commitData.length
        insertRepoInfo(repository)
      })
    })
    drawChart(technigoRepos.length)
  })
}

getRepos()
getProfile()

// Sort by number of commits, descending
commitsSort.addEventListener("click", () => {
  repoContainer.innerHTML = ''
  let sortRepo = repositorys.sort((a, b) => 
    (a.number_commits > b.number_commits ? -1 : 1))
  sortRepo.forEach((repo) => {
    insertRepoInfo(repo)
  })
})

// Sort by name of repo, ascending
nameSort.addEventListener("click", () => {
  repoContainer.innerHTML = ''
  let sortRepo = repositorys.sort((a, b) => 
    (a.name > b.name ? 1 : -1))
  sortRepo.forEach((repo) => {
    insertRepoInfo(repo)
  })
})


// sort by date, descending
dateSort.addEventListener("click", () => {
  repoContainer.innerHTML = ''
  let sortRepo = repositorys.sort((a, b) => 
    (a.latest_push > b.latest_push ? -1 : 1))
  sortRepo.forEach((repo) => {
    insertRepoInfo(repo)
  })
})

// // create dynamic ID from for eaxmple the name of the project 
// // avoid using global variables
// // use info about reponame to get element from dynamic id and update innerhtml