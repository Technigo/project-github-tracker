const USER = `Ajliin`
const REPOS_URL = `https://api.github.com/users/${USER}/repos`

const headerContainer = document.getElementById('header')
const projectContainer = document.getElementById('projects')

let PROJECT = ""
let PROJECT_API = ""


const getRepos =() => {
fetch(REPOS_URL)
    .then ((response) => {
        return response.json()
    })
    .then ((data) => {
        repoInfo(data)   
})
}
getRepos()



const repoInfo = ((data) =>{
console.log(data[0].owner.login)
console.log(data[0].fork)

const forkedRepo = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
console.log(forkedRepo)
forkedRepo.forEach((repo) => {
    projectContainer.innerHTML += `<div class ="project"> ${repo.name}</div>`
})
headerContainer.innerHTML = `<h3>Welcome to ${data[0].owner.login}s GitHub Tracker</h3>
<img class="profile-img" src="https://avatars.githubusercontent.com/u/84288114?v=4" alt="profile pic Ajliin">` 

getProjectInfo(forkedRepo)
})

getProjectInfo = (forkedRepo) => {
    console.log('from getProjectInfo', forkedRepo[0].name )
    PROJECT = forkedRepo[0].name
    console.log(PROJECT)
    PROJECT_API = `https://api.github.com/repos/technigo/${forkedRepo[0].name}/pulls?per_page=100`
    console.log(PROJECT_API)
    fetchProjectinfo()
} 

const fetchProjectinfo = () => {
    fetch(PROJECT_API)
    .then ((response) => {
        return response.json()
    })
    .then ((json) => {
        const userProject = json.find(repo => repo.user.login === USER)
        console.log(userProject)
    })
}
 
    

// getProjectInfo(data)
