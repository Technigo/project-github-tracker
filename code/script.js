//DOM SELECTORS

const projectsContainer = document.getElementById('projects')
const userContainer = document.getElementById('user-container')

//APIS TO FETCH FROM
const username = 'Thereese'
let reponame
const API_URL = `https://api.github.com/users/${username}/repos`
const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`
//let reponame

const options = {
    method: 'GET',
    headers: {
          Authorization: 'token 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' // you need to paste your token over here.
          
        }
    }
    console.log(API_TOKEN)// 'HERE_WILL_BE_YOUR_TOKEN'

const getUser = () => {
    fetch (`https://api.github.com/users/${username}`, options)
    .then((res) => res.json())
    .then((data) => {
        userContainer.innerHTML=
        `<p>${data.login}</p>
        <img src=${data.avatar_url}/>`


  console.log(data)
    })
}

getUser()

//fetch all repos,filter technigo
const getRepos = () => {
    fetch (API_URL, options)
    .then((res) => res.json())
    .then((data) => {
     const filterTechnigoProjects = data.filter((repo) => repo.fork && repo.name.startsWith("project"))
         filterTechnigoProjects.forEach(repo => {
            console.log(repo.name)
            projectsContainer.innerHTML+=
            `<h1>${repo.name}</h1>`
         })
         console.log(filterTechnigoProjects, "här")
         getPullRequests(filterTechnigoProjects)
        })}

getRepos()

const getPullRequests = (filterTechnigoProjects) => {
    filterTechnigoProjects.forEach(repo => {
        fetch (`https://api.github.com/repos/Technigo/${repo.name}/pulls`)
        .then((res) => res.json())
        .then((data) => {
            
        console.log(data)
    })
    })
}
    