// USERNAME
let username = 'rijad90'
// API
const GITHUB_USER_API = `https://api.github.com/users/${username}`
const GITHUB_REPOS_API = `https://api.github.com/users/${username}/repos`

//FETCH API TO PROFILE. INJECTS PIC,USERNAME,BIO
const getProfile = () => {
  fetch(GITHUB_USER_API)
    .then((res) => res.json())
    .then((data) => {
        profile.innerHTML += `
            <div class="profile">
                <h1> Github Tracker </h1>
                <img class="profile_picture" src ="${data.avatar_url}"/>
                <p>${username}</p>
                <p>${data.bio}</p>
            </div>
        `
    })
}
getProfile()

//DOM SELECTOR
const projects = document.getElementById('projects-container')
//FETCH API AND FILTERS REPO. INJECTS REPO URL, NAME, DEF BRANCH, PUSHED DATE AND COMMIT 
const fetchRepo = () => {
  fetch(GITHUB_REPOS_API)
    .then((res) => res.json())
    .then((data) => {
      const technigoRepo = data.filter(
          // FILTERS MY FORKED REPOS ONLY TO DESPLAY THE ONES NAMNED "project-"
        (repo) => repo.name.includes('project-') && repo.fork 
      )

      technigoRepo.forEach((repo) => {
        projects.innerHTML += `
            <div class="projects"> 
            <a href="${repo.html_url}" target="_blank" class="">${repo.name.toUpperCase()}</a>
            <p>Default branch: ${repo.default_branch}</p>
            <p>Most recent push: ${new Date(repo.pushed_at).toISOString().substring(0, 10)}</p>
            <p id="commit-${repo.name}"> Number of commits: </p>  
            </div>          
            `
      })
      fetchPull(technigoRepo)
      drawChart(technigoRepo.length)
    })
}

// FETCH ALL REPO PULLS
const fetchPull = (allRepo) => {
  allRepo.forEach((repo) => {
    fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls`)
      .then((res) => res.json())
      .then((data) => {
        const myPullRequests = data.find(
          (pull) => pull.user.login === repo.owner.login
        )
        if (myPullRequests) {
          fetchCommits(myPullRequests.commits_url, repo.name)
        } else {
          document.getElementById(`commit-${repo.name}`).innerHTML +=
            'No pull request'
        }
      })
  })
}

const fetchCommits = (myCommitsUrl, myRepoName) => {
  fetch(myCommitsUrl)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById(`commit-${myRepoName}`).innerHTML += data.length
    })
}

fetchRepo()