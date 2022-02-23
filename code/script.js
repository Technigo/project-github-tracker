// DOM selectors
const projects = document.getElementById('projects')
const username = 'idanaslund'
const profile = document.getElementById('profile')

let API_URL = `https://api.github.com/users/${username}/repos`


//Get the token here!!
const options = {
    method: 'GET',
    headers: {
        Authorization: `token ${API_TOKEN}`
    }
}

const addingProfile = () => {
    fetch(`https://api.github.com/users/${username}`, options)
    .then((res) => res.json())
    .then((profileInfo) => {
        console.log (profileInfo)
        profile.innerHTML += `
        <img src="${profileInfo.avatar_url}">
         <a href="${profileInfo.html_url}">${profileInfo.login}</a>`
    }) 
}
addingProfile()

const findingAllRepos = () => {

fetch(API_URL, options)
.then((res) => res.json())
.then((repos) => {
    console.log(repos)
    console.log(API_TOKEN)

    const forkedRepos = repos.filter(
        repo => repo.fork && repo.name.startsWith('project-')
        ) 
        
    forkedRepos.forEach((repo) => {
    projects.innerHTML += `<div class="repos"><h4>${repo.name}<h4></div>`}) 
})

 //How to get the reponame here?
 //let API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`

   // fetch(API_URL_PR)
    // .then((res) => res.json())
    // .then((pulls) => {
   // console.log(pulls)
    

 }
findingAllRepos()



// Eventlisteners