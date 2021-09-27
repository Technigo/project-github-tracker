const API_PROFILE = 'https://api.github.com/users/sofiawillebrand'
const API_ALL_REPOS = 'https://api.github.com/users/sofiawillebrand/repos'
let projectContainer = document.getElementById('project-container')
let profileContainer = document.getElementById('profile-container')

const getRepos = () => {
fetch(API_ALL_REPOS)
.then(res => res.json()) 
.then(repoData => {
  console.log('Repodata: ', repoData)
  //try using a filter instead
  repoData.forEach(project => {
    if(project.fork && project.name.startsWith('project-')){
      projectContainer.innerHTML += /*html*/ `
        <h3>${project.name}</h3>
      `
    }
  });
})}
getRepos()

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
// getProfile()
