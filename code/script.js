// define DOM selectors
const projectsContainer = document.getElementById('projects');
const generalInfoContainer = document.getElementById('generalInfo')


// URLs defined in variables
const username = 'JuliaNiki'
const REPOS_URL = `https://api.github.com/users/${username}/repos`
const GENERAL_URL = `https://api.github.com/users/${username}`


const getRepos = () => {
    fetch(REPOS_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-') && !repo.name.endsWith('github-tracker'))
            forkedRepos.forEach(repo => {
                console.log(repo)
                //console.log('owner login', repo.owner.login)
                projectsContainer.innerHTML += `<div class ="my-divs" id='${repo.name}'>
                <h3 class="repo-name">${repo.name}</h3>
                <a class="links" href ="${repo.html_url}" target="_blank">Click to view</a>
                <h5>Most recent update: ${new Date(repo.updated_at).toLocaleDateString()}</h5>
                <h5>Default branch: ${repo.default_branch}</h5>
                </div>`
            })
            getPullRequests(forkedRepos)
            drawChart(forkedRepos.length)
        })
}
getRepos()

const getGeneralInfo = () => {
    fetch(GENERAL_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            generalInfoContainer.innerHTML += `
            <img class="profile-image" src="${data.avatar_url} alt ="avatar"/>
            <h1>${data.login}</h1>
            `
        })
}
getGeneralInfo()

const getPullRequests = (forkedRepos) => {
    forkedRepos.forEach((repo) => {
        fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`)
            .then(response => response.json())
            .then(data => {
                //console.log(data)
                const myPulls = data.filter(pulls => pulls.user.login === repo.owner.login)
                console.log(myPulls)
                const commitsURL = myPulls[0].commits_url
                console.log(commitsURL)
                getCommits(commitsURL, repo)
            })
    })
}
// display Number of commit messages for each repo
getCommits = (commitsURL, repo) => {
    fetch(commitsURL)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log(data.length)
            //console.log('INFO', document.getElementById(`${repo.name}`))
            document.getElementById(`${repo.name}`).innerHTML += `<h5>This repo has been committed ${data.length} times</h5>`
        })

}

