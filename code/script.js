const USER = 'hemmahosjessi'
const REPOS_URL = `https://api.github.com/users/${USER}/repos`
const projectsContainer = document.getElementById('projects')
const profileContainer = document.getElementById('profile')
// const PULLS_URL = `https://api.github.com/repos/technigo/${repo.name}/pulls`


// ---- PROFILE -----//

const getProfile = () => {
    fetch (`https://api.github.com/users/${USER}`)
    .then (response => response.json())
    .then(data => {
        console.log(data)
    profileContainer.innerHTML += `
    <img src=${data.avatar_url}></img>
    <h2 class="user-name">${data.login}</h2>
    `
    })
}
getProfile()

// ---- REPOS -----//

const getRepos = () => {
    fetch(REPOS_URL)
    .then(response => (response.json()))
    .then(data => {
        console.log(data)
        // data.forEach(repo => console.log(repo.name))
        const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
        forkedRepos.forEach(repo => projectsContainer.innerHTML += `
        <div class="project-card"> 
            <h3>${repo.name}</h3>
            <div class="most-recent">
                <p>Most recent push</p>
                <h4>${repo.pushed_at}</h4>
            </div>
            <div class="default-branch">
                <p>Default branch name</p>
                <h4>${repo.default_branch}</h4>
            </div>
            <div class="url">
                <p>Default branch URL</p>
                <h4 class="break">${repo.url}</h4>
            </div>
        </div>`)
        drawChart(forkedRepos.length)
    })
}
getRepos()


// ---- MOST RECENT PUSH -----//

// const getMostRecentPush = () => {
//     fetch(``)
//     .then(response => (response.json()))
//     .then(data => {

// }
// getMostRecentPush()

// ---- COMMITS -----//

// const getCommitAmount = () => {
//     fetch(`https://api.github.com/${USER}/repos/{owner}/{repo}/pulls/{pull_number}/commits`)
//     .then(response => (response.json()))
//     .then(data => {
//         console.log(data)
// })
// }
// getCommitAmount()

// "https://api.github.com/repos/octocat/Hello-World/commits{/sha}






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


