const USER = `Ajliin`
const REPOS_URL = `https://api.github.com/users/Ajliin/repos`
const headerContainer = document.getElementById('header')
const projectContainer = document.getElementById('projects')



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
forkedRepo.forEach((repo, index) => {
    console.log(forkedRepo)
    projectContainer.innerHTML += `<div class ="project-grid"> ${repo.name}</div>`
})
headerContainer.innerHTML = `<h3>Welcome to ${data[0].owner.login}s GitHub Tracker</h3>` 

})

// getProjectInfo = (data) => {
//     console.log('from getProjectInfo', repo)
//     fetch('https://api.github.com/repos/technigo/project-chatbot/pulls')
//     .then ((response) => {
//         return response.json()
//     })
//     .then ((json) => {
//         console.log(json)
//     })
// }
// getProjectInfo(data)
