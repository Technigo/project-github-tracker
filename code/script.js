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

const findingRepos = () => {

fetch(API_URL, options)
.then((res) => res.json())
.then((repos) => {
    console.log(repos)
    console.log(API_TOKEN)

    const forkedRepos = repos.filter(
        repo => repo.fork && repo.name.startsWith('project-')
        ) 
        
    forkedRepos.forEach((repo) => {
        let updated = new Date(repo.updated_at)
    projects.innerHTML += `
    <div class="repos" id="repoDiv">
    <h4>${repo.name}</h4>
    <form id="repoForm" label="projects">
     <ul id="list">
        <li>Most recent update: ${updated}</li>
        <li>Default branch: ${repo.default_branch}</li>
        <li><a href=${repo.html_url} target="_blank">Link to repo</a></li>
     </ul>
    </form>
    </div>`

    fetch(`https://api.github.com/repos/idanaslund/${repo.name}/commits`, options)
    .then((res) => res.json())
    .then((commits) => {
        console.log(commits)

       // profile.innerHTML + `
       // <p>Number of commits: ${commits.length}</p>`
        
    })
}) 

    
    
   




})

    
    
//let API_URL_PR = `https://api.github.com/repos/Technigo/${repo.name}/pulls`
// const getPullRequests = (repos) => {
    //repos.forEach(repo => {
    //fetch(API_URL_PR)
    //.then((res) => res.json())
    //.then((pulls) => {
    //console.log(pulls) 
    //})
  //})
// }
}
findingRepos()



// Eventlisteners