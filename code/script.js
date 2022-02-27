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
          Authorization: 'API_TOKEN'
          
        }
    }
    console.log(API_TOKEN)

const getUser = () => {
    fetch (`https://api.github.com/users/${username}`, options)
    .then((res) => res.json())
    .then((data) => {
        userContainer.innerHTML=
        `<h1>${data.login}</h1>
        <img class="user-image" src=${data.avatar_url}/>`


  console.log(data)
    })
}

//getUser()


//fetch all repos,filter technigo
const getRepos = () => {
    fetch (API_URL, options)
    .then((res) => res.json())
    .then((data) => {
     const filterTechnigoProjects = data.filter((repo) => repo.fork && repo.name.startsWith("project"))
         filterTechnigoProjects.forEach(repo => {
            console.log(repo.name)
            let projectID = repo.id
            projectsContainer.innerHTML+=
            `<div class="repocard" id=${projectID}>
            <a href=${data.html_url}><h1> ${repo.name}</h1></a>
            <p> Default branch: ${repo.default_branch}</p>
            <p> Latest push: ${new Date(repo.pushed_at).toDateString()}</p>
            </div>
            `
           
         })
         console.log(filterTechnigoProjects, "här")
         getPullRequests(filterTechnigoProjects)
        })}

getRepos()

const getPullRequests = (filterTechnigoProjects) => {
    filterTechnigoProjects.forEach(repo => {
        fetch (`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`, options)
        .then((res) => res.json())
        .then((data) => {
            console.log(data, 'pr')
        const filterMyPull = data.find((pull) => pull.user.login === repo.owner.login)
        if (filterMyPull) {
            getCommits(filterMyPull.commits_url, repo.name)
        } else {
          projectsContainer.innerHTML += 
          
           `<p>No PR made</p>`
      
           
        }

        
        console.log(filterMyPull)
    })
    })
}

const getCommits = (URL, repoName) => {
    fetch(URL, options)
    .then ((res) => res.json())
    .then (data => {
       projectsContainer.innerHTML +=
       `<p>Number of commits: ${data.length}</p>`
    })
}
    getUser()