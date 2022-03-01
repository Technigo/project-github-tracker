// DOM selectors
const projectsContainer = document.getElementById('projects')

const username = 'CamillaHallberg'
let reponame = ''

// Authentication
const API_TOKEN = TOKEN || process.env.API_KEY;
const options = {
    method: 'GET',
    headers: {
        Authorization: `${API_TOKEN}`
    }
}
// API's
const API_USER = `https://api.github.com/users/${username}`
const API_URL_REPO = `https://api.github.com/users/${username}/repos`

// Function to fetch my user data
const getUser = () => {
    fetch(API_USER, options)
    .then(res => res.json())
    .then(user => {
        userData.innerHTML = `
        <div class="avatar">
            <img class="img" src="${user.avatar_url}" alt="user image">
        </div>
        <div class="info">
            <h3>${user.login}</h3>
            <h4>${user.bio}</h4>
            <h4>Location: ${user.location}</h4>
        </div>`
    })
}
getUser()

// Function to fetch my repositories
const getRepos = () => {
    fetch(API_URL_REPO, options)
    .then(res => res.json())
    .then(data => {
        // Filter to get only my forked repos from Technigo
        const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith('project-'))
 
        forkedRepos.forEach((repo) => {
            // Creating unique ID for each forked repo
            let projectID = repo.id
            
            projectsContainer.innerHTML += `
                <div class="projects-card" id="${projectID}">
                    <h3><a href="${repo.html_url}">${repo.name}</a></h3>
                    <p class="default-branch">Branch: ${repo.default_branch}</p>
                    <p>Latest push: ${new Date(repo.pushed_at).toDateString()}</p>
                </div>`
            
            // Invoking function to get the number of commits for the projects    
            getCommits(repo, projectID)
        })
        getPullRequests(forkedRepos)
        drawChart(forkedRepos.length)
    })
}

const getPullRequests = (forkedRepos) => {
    forkedRepos.forEach(repo => {
        fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=150`, options)
        .then(res => res.json())
        .then(data => {
            const pulls = data.find((pull) => pull.user.login === repo.owner.login);
        })
    })
}

const getCommits = (projectsContainer, projectID) => {
    const GIT_COMMIT_API = projectsContainer.commits_url.replace("{/sha}", "")
    fetch (GIT_COMMIT_API, options)
    .then((res) => res.json())
    .then(data => {
        let numberOfCommits = data.length
        document.getElementById(projectID).innerHTML +=`
        <p>Number of commits: ${numberOfCommits}</p>`
    })
}

getRepos() 