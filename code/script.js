// DOM SELECTORS
const list = document.getElementById('list')
const avatar = document.getElementById('avatar')
const fullName = document.getElementById('full-name')
const username = document.getElementById('username')

// LIST OF APIS TO FETCH FROM
const USER = 'annathunberg'
const API_MY_REPOS = `https://api.github.com/users/${USER}/repos`// user-variable instead of my login
const API_MY_PROFILE = 'https://api.github.com/users/annathunberg'

// FETCHES THE PROFILE PIC, NAME AND USERNAME
fetch(API_MY_PROFILE)
.then((response) => response.json())
.then((data) => {
    fullName.innerHTML = `Hi! I'm ${data.name}`
    username.innerHTML = `Username: <a href="${data.html_url}">${data.login}</a>`
    avatar.src = data.avatar_url
})

  // FETCHES MY REPOS
  fetch(API_MY_REPOS)
  .then((response) => response.json())
  .then((data) => {
        const forkedRepos = data.filter(isFork)
        const sortedForkedRepos = forkedRepos.sort(sortingFunctionFromStackOverflow)
        sortedForkedRepos.forEach(addRepoToList)
        drawChart(sortedForkedRepos.length)
        addCommits(sortedForkedRepos)
        addPullRequests(sortedForkedRepos)
  })

function addCommits(repos) {
    repos.forEach((repo) => {
        const commitsUrl = `https://api.github.com/repos/${USER}/${repo.name}/commits`;
        fetch(commitsUrl)
        .then((response) => response.json())
        .then((data) => {
            document.getElementById(`commit-${repo.name}`).innerHTML = `Commits: ${data.length}`
        })
    });
 }

 function addPullRequests(repos) {
    repos.forEach((repo) => {
        const pullRequestsUrl = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`;
        fetch(pullRequestsUrl)
            .then((response) => response.json())
            .then((data) => {
                const myPullRequests = data.filter((pullRequest) => pullRequest.user.login === USER);
                document.getElementById(`pull-request-${repo.name}`).innerHTML = `Pull requests: ${myPullRequests.length}`
            });
    });
 }
  
// RETURNS REPOS THAT ARE FORKED AND START WITH PROJECTS
function isFork(repo) {
    return repo.fork && repo.name.startsWith('project-')
}

// CREATES THE LIST OF REPOS
function addRepoToList(repo) {
    list.innerHTML += `<div>
        <a href="${repo.html_url}">${repo.name}</a>
        <p>Default Branch: ${repo.default_branch}</p>
        <p>Updated: ${new Date(repo.pushed_at).toDateString()}</p>
        <p id="commit-${repo.name}"></p>
        <p id="pull-request-${repo.name}"></p>
    </div>`
}

// SORTS THE REPOS IN CHRONOLOGICAL ORDER BY DATE
function sortingFunctionFromStackOverflow(a, b) {
    // https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
    return new Date(a.created_at) - new Date(b.created_at)
}




