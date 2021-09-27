// API's
const USER = 'Mattsson717'
const REPOS_URL = `https://api.github.com/users/${USER}/repos`
const PROFILE_URL = `https://api.github.com/users/${USER}`
const COMMITS_URL = `https://api.github.com/repos/Mattsson717/project-business-site/commits{/sha}`
const projectsContainer = document.getElementById('projects')
const profileContainer = document.getElementById('profile')

// Profile
const getProfile = () => {
    fetch(PROFILE_URL)
    .then(response => response.json())
    .then(data => {
        console.log('Profile:',data)
        profileContainer.innerHTML += `
        <img src=${data.avatar_url}>
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
            `<h3>${repo.name}</h3>
             <h3>${repo.default_branch}</h3>
             <h4>Latest push: ${repo.pushed_at.slice(0, 10)} - ${repo.pushed_at.slice(11,16)}</h4>
             <a href="${repo.html_url}">Github adress</a>
             `)
        drawChart(forkedRepos.length)   
    })
}
getRepos()

const getCommits = () => {
    fetch(COMMITS_URL)
    .then(response => response.json())
    .then(json => {
        console.log('Commits:',json)
    })
}
getCommits()