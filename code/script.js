let USER = 'qwer-ctrl'



const profile = document.getElementById('profile-container')
const projects = document.getElementById('projects')

const fetchProfile = () => {
fetch(USER_URL)
    .then((response) => response.json())
    .then((data) => {
     profile.innerHTML += `
        <div id="profile-container" class="profile">
        <div class="profile-image">
        <a href="${USER_URL}">
            <img src="${data.avatar_url}" alt="Avatar of ${data.login}">
            </a>
            </div>
            <h1 class="username">${data.login}<h1>
        </div>
        <div>
        <p>Public repositories: ${data.public_repos}</p>
        </div>
        `
        })
}
fetchProfile()

const fetchRepos = () => {
fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
     const technigoRepos = data.filter(
    (repo) => repo.name.includes('project-') && repo.fork)
        technigoRepos.forEach((repo) => {
        projects.innerHTML += `
            <div class="projects-card" id="${repo.id}">
                <h1><a href="${repo.html_url}"><b>${repo.name}</b></a></h1>
                <p>Update: ${new Date(repo.pushed_at).toDateString()}</p>
                <p>Branch: ${repo.default_branch}</p>
                <p id="commit_${repo.name}">Commits: </p>
                <p>${repo.language}</p>
                </div>
                `
            })
 fetchPullRequests(technigoRepos)
        })
}

fetchRepos()
    /*const fetchPullRequests = (repositories) => {
     repositories.forEach((repo) => {
     fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
        .then((response) => response.json())
        .then((data) => {
        const pullRequest = data.find((pull) => pull.user.login === repo.owner.login)
            if (pullRequest) {
                fetchCommits(pullRequest.commits_url, repo.name)
            } else {
                document.getElementById(`commit_${repo.name}`)
                .innerHTML = 'No pull reguest';
            }
                })
        })
    }

        const fetchCommits = (commitsUrl, repoName) => {
            fetch(commitsUrl)
                .then((response) => response.json())
                .then((data) => {
                    document.getElementById(`commit_${repoName}`).innerHTML += data.length
                })
        }

fetchRepos()*/