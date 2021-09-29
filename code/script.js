let USER = 'sofiawillebrand'
let PROJECT = 'project-weather-app'
let API_PROFILE = `https://api.github.com/users/${USER}`
let API_ALL_REPOS = `https://api.github.com/users/${USER}/repos`
let REPO_API = `https://api.github.com/repos/${USER}/${PROJECT}/commits`
let projectContainer = document.getElementById('project-container')
let profileContainer = document.getElementById('profile-container')
let commitMessage

// const getCommits = (REPO_API) => {
//   fetch(REPO_API)
//   .then(res => res.json()) 
//   .then(commitData => {
//     console.log('här borde det vara commit', commitData[0].commit.message)
//     commitMessage = commitData[0].commit.message
//     projectContainer.innerHTML += /*html*/ `
//     <h2>There have been ${commitData.length} commits and the latest commit was ${commitMessage}</h2>
//     `
//   })
// }

// const getRepos = () => {
//   console.log('working')
//   fetch(API_ALL_REPOS)
//   .then(res => res.json()) 
//   .then(reposData => {
//     console.log('Repodata: ', reposData)
//     const technigoRepos = reposData.filter((repo) => repo.fork && repo.name.startsWith('project-'))
//     technigoRepos.forEach(project => {
//       projectContainer.innerHTML += /*html*/ `
//         <div>
//           <a href="${project.html_url}">${project.name} with default branch ${project.default_branch}</a>
//           <p>Recent push: ${new Date(project.pushed_at).toDateString()}</p>
//         </div>
//       `
//       let REPO_API = `https://api.github.com/repos/${USER}/${project.name}/commits`
//       getCommits(REPO_API)
//     })
//   })
// }

// const getProfile = () => {
//   fetch(API_PROFILE)
//   .then(res => res.json()) 
//   .then(profileData => {
//     console.log('profildata', profileData)
//     profileContainer.innerHTML += /*html*/`
//       <h3>Username: ${profileData.name}</h3>
//       <img src=${profileData.avatar_url}>
//     `
//     });
// }

// getRepos()
// getProfile()

// create dynamic ID from for eaxmple the name of the project 
// avoid using global variables
// use info about reponame to get element from dynamic id and update innerhtml