const USER = 'hemmahosjessi'
const REPOS_URL = `https://api.github.com/users/${USER}/repos`
const projectsContainer = document.getElementById('projects')
const profileContainer = document.getElementById('profile')
// const PULLS_URL = `https://api.github.com/repos/technigo/${repo.name}/pulls`


// ---- PROFILE -----

const getProfile = () => {
    fetch (`https://api.github.com/users/${USER}`)
    .then (response => response.json())
    .then(data => {
        console.log(data)
    profileContainer.innerHTML += `
    <h2>${data.login}</h2>
    <img src=${data.avatar_url}></img>
    `
    })
}

getProfile()


const getRepos = () => {
    fetch(REPOS_URL)
    .then(response => (response.json()))
    .then(data => {
        console.log(data)
        // data.forEach(repo => console.log(repo.name))
        const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
        forkedRepos.forEach(repo => projectsContainer.innerHTML += `<h3>${repo.name}</h3>`)
        drawChart(forkedRepos.length)
    })
}

getRepos()



// const getPullRequests = (repos) => {
//     //Get all the PRs for each project.
//     repos.forEach(repo => {
//       fetch(PULLS_URL + repo.name + PULLS)
//       .then(res => res.json())
//       .then(data => {
//         console.log(data)
//       })
    
//     })

// }

//     getPullRequests()


// const getPullRequests = () => {
//     fetch(PULLS_URL)
//     .then(response => (response.json()))
//     .then(data => {
//         console.log(data)
//     })
// }

// getPullRequests()


