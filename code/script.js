let USER = 'qwer-ctrl'

const USER_URL = `https://api.github.com/users/${USER}`
const REPOS_URL = `https://api.github.com/users/${USER}/repos`


const options = {
    method: "GET", 
    headers: {
        Authorization: `token ${API_TOKEN}`,
    }
}
console.log(TOKEN)
const profile = document.getElementById('profile-container')
const projects = document.getElementById('projects')

const fetchProfile = () => {
fetch(USER_URL, options)
    .then((response) => response.json())
    .then((data) => {
     profile.innerHTML += `
        <div id="profile-container" class="profile">
        <div class="profile-image">
        <a href="${USER_URL}">
            <img src="${data.avatar_url}" alt="Avatar of ${data.login}">
            </a>
            </div>
            <p class="username">${data.login}<p>
        </div>
        <div>
        <p class="public-repositories">Public repositories: ${data.public_repos}</p>
        </div>
        `
        })
}
fetchProfile()

const fetchRepos = () => {
fetch(REPOS_URL, options)
    .then((response) => response.json())
    .then((data) => {
     const technigoRepos = data.filter(
    (repo) => repo.name.includes('project-') && repo.fork)
        technigoRepos.forEach((repo) => {
        projects.innerHTML += `
            <div class="projects-card" id="${repo.id}">
                <h1><a href="${repo.html_url}">${repo.name}</a></h1>
                <p>Update: ${new Date(repo.pushed_at).toDateString()}</p>
                <p>Branch: ${repo.default_branch}</p>
                <p id="commit_${repo.name}">Commits: </p>
                <p>${repo.language}</p>
                </div>
                `
            })
            myChart(technigoRepos)
 fetchPullRequests(technigoRepos)
 
        })
}

    const fetchPullRequests = (repositories) => {
     repositories.forEach((repo) => {
     fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`, options)
        .then((response) => response.json())
        .then((data) => {
        const pullRequest = data.find((pull) => pull.user.login === repo.owner.login)
            if (pullRequest) {
                fetchCommits(pullRequest.commits_url, repo.name)
            } else {
                document.getElementById(`commit_${repo.name}`)
                .innerHTML = 'No pullrequest available';
            }
                })
        })
    }

        const fetchCommits = (commitsUrl, repoName) => {
            fetch(commitsUrl, options)
                .then((response) => response.json())
                .then((data) => {
                    document.getElementById(`commit_${repoName}`).innerHTML += data.length
                })
        }

        //I used this API for my project: `https://api.github.com/repos/${username}/${repo.name}/commits`


fetchRepos()