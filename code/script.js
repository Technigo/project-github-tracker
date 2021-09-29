// API's
const USER = 'Mattsson717'
const REPOS_URL = `https://api.github.com/users/${USER}/repos`
const PROFILE_URL = `https://api.github.com/users/${USER}`
const COMMITS_URL = `https://api.github.com/repos/${USER}/project-business-site/commits`
const projectsContainer = document.getElementById('projects')
const profileContainer = document.getElementById('profile')

// Profile
const getProfile = () => {
    fetch(PROFILE_URL)
    .then(response => response.json())
    .then(data => {
        console.log('Profile:',data)
        profileContainer.innerHTML += `
        <img class="profile" src=${data.avatar_url}>
        <h2>${data.login}</h2>`
    })
}
getProfile()

// Repositories
const getRepos = () => {
    fetch(REPOS_URL)
    .then(response => response.json())
    .then(json => {
        console.log('json:',json)
        const forkedRepos = json.filter(repo => repo.fork && repo.name.startsWith('project-'))
        forkedRepos.forEach(repo => projectsContainer.innerHTML += 
            `<div class="project-cards">
            <fieldset>
            <a href="${repo.html_url}"><h3>${repo.name}</h3></a>
             <p>Default branch: ${repo.default_branch}</p>
             <p>Latest push: ${repo.pushed_at.slice(0, 10)} - ${repo.pushed_at.slice(11,16)}</p>
            </fieldset>
             </div>
             `)
        drawChart(forkedRepos.length)   
    })
}
getRepos()

const getCommits = () => {
    fetch(COMMITS_URL)
    .then(response => response.json())
    .then(json => {
        console.log('Commits:',json.length)
        const commitsNumber = json.filter(repo => repo.fork && repo.name.startsWith('project-'))
        commitsNumber.forEach(repo => projectsContainer.innerHTML += 
            `
             `)
    })
}
getCommits()