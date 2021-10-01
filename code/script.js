let USER = 'sofiawillebrand'
let PROJECT = 'project-weather-app'
let API_PROFILE = `https://api.github.com/users/${USER}`
let API_ALL_REPOS = `https://api.github.com/users/${USER}/repos`
let REPO_API = `https://api.github.com/repos/${USER}/${PROJECT}/commits`
let repoContainer = document.getElementById('repo-container')
let profileContainer = document.getElementById('profile-container')
let commitsSort = document.getElementById('commit-btn')
let repositorys = []
let repoNr = 0

const insertRepoInfo = (repository) => {
    repoContainer.innerHTML += /*html*/ `
      <div class="repo-card">
        <h3>${repository.name}</h3>
        <p>Date of latest push: ${repository.latest_push}</p>
        <p>Default branch: ${repository.default_branch}</p>
        <p>Latest commit-message: ${repository.commit_message}</p>
        <p>Number of commits: ${repository.number_commits}</p>
        <a>Link to GitHub repo: ${repository.project_url}</a>
      </div>
    `
}

const getProfile = () => {
  fetch(API_PROFILE)
  .then(res => res.json()) 
  .then(profileData => {
    profileContainer.innerHTML += /*html*/`
      <img src=${profileData.avatar_url} class="profile-img">    
      <h1>${profileData.name}</h1>
    `
    });
}

const getRepos = () => {
  fetch(API_ALL_REPOS)
  .then(res => res.json()) 
  .then(reposData => {
    console.log('Repodata: ', reposData)
    const technigoRepos = reposData.filter((repo) => repo.fork && repo.name.startsWith('project-'))
    technigoRepos.sort((a, b) => 
    (a.pushed_at > b.pushed_at ? -1 : 1))
    technigoRepos.forEach(project => {
      let latestPush = new Date(project.pushed_at).toDateString()
      repositorys.push({
        'name': project.name,
        'latest_push': latestPush,
        'default_branch': project.default_branch,
        'project_url': project.html_url
      })

      let REPO_API = `https://api.github.com/repos/${USER}/${project.name}/commits`
 
      fetch(REPO_API)
      .then(res => res.json()) 
      .then(commitData => {
        let commitMessage = commitData[0].commit.message
        let repository = repositorys[repoNr]
        repoNr += 1
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

commitsSort.addEventListener("click", () => {
  repoContainer.innerHTML = ''
  console.log(repositorys)

  let sortRepo = repositorys.sort((a, b) => 
    (a.number_commits > b.number_commits ? 1 : -1))
  sortRepo.forEach((repo) => {
    insertRepoInfo(repo)
  })
})

// // create dynamic ID from for eaxmple the name of the project 
// // avoid using global variables
// // use info about reponame to get element from dynamic id and update innerhtml