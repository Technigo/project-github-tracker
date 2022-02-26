// const userData = document.getElementsById('userData')
const username = 'CamillaHallberg'
let reponame = ''

const API_TOKEN = TOKEN || process.env.API_KEY;
// console.log(TOKEN)

// API's
const API_USER = `https://api.github.com/users/${username}`
const API_URL_REPO = `https://api.github.com/users/${username}/repos`

const projectsContainer = document.getElementById('projects')


const options = {
    method: 'GET',
    headers: {
        Authorization: `${API_TOKEN}`
    }
}

const getUser = () => {
fetch(API_USER, options)
.then(res => res.json())
.then(user => {
    console.log(user, 'my user');
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

const getRepos = () => {
    fetch(API_URL_REPO, options)
    .then(res => res.json())
    .then(data => {
        console.log(data, 'my repos')

        // Filtering to get only my forked repos
        const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith('project-'))
        console.log(forkedRepos, 'forked repos')

        forkedRepos.forEach((repo) => {
            projectsContainer.innerHTML += `
                <div class="projects-card" id="${repo.id}">
                    <h3><a href="${repo.html_url}">${repo.name}</a></h3>
                    <p class="default-branch">Branch: ${repo.default_branch}</p>
                    <p>Latest push: ${new Date(repo.pushed_at).toDateString()}</p>
                    <p id="commit_${repo.name}">Number of commits:</p>
                    <p>Main language: ${repo.language}</p>
                </div>
            `
        })
        getPullRequests(forkedRepos)
    })
}

getRepos()

const getPullRequests = (forkedRepos) => {
    forkedRepos.forEach(repo => {
        fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=150`, options)
        .then(res => res.json())
        .then(data => {
            const commits = document.getElementById(`commit-${repo.name}`)
            
            const pulls = data.find((pull) => pull.user.login === repo.owner.login);
            
            getCommits(pulls.commits_url, repo.name)
            console.log(pulls.commits_url)
        })
    })
}

const getCommits = (myCommitsUrl, myRepoName) => {
    fetch(myCommitsUrl, options)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        document.getElementById(`commit-${myRepoName}`).innerHTML += data.length
    })
}