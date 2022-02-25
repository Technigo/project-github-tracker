// const userData = document.getElementsById('userData')
const username = 'CamillaHallberg'
let reponame = ''

// API's
const API_USER = `https://api.github.com/users/${username}`
const API_URL_REPO = `https://api.github.com/users/${username}/repos`
const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`

// my token
const API_TOKEN = TOKEN;
// console.log(TOKEN)

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
        <div class="info">
        <img class="img" src="${user.avatar_url}" alt="user image">
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

        const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith('project-'))
        console.log(forkedRepos, 'forked repos')
        getPullRequests(forkedRepos)
    })
}

const getPullRequests = (forkedRepos) => {
    forkedRepos.forEach(repo => {
        fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=150`, options)
        .then(res => res.json())
        .then(data => {
            // console.log(data, 'all pull requests on the projects')

            const pulls = data.find((pull) => pull.user.login === repo.owner.login)
            console.log(pulls, 'my pull requests')
        })
    })
}
getRepos()