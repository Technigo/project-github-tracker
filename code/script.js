const username = 'CamillaHallberg'
let reponame = ''


// API's
const API_USER = `https://api.github.com/users/${username}`
const API_URL_REPO = `https://api.github.com/users/${username}/repos`
const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`

const API_TOKEN = TOKEN;
// console.log(TOKEN)

const options = {
    method: 'GET',
    headers: {
        Authorization: `${API_TOKEN}`
    }
}

fetch(API_USER, options)
.then(res => res.json())
.then(userdata => {
    console.log(userdata, 'my user');
})

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