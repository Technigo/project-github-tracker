// DOM SELECTORS
const list = document.getElementById('list')
const avatar = document.getElementById('avatar')
const fullName = document.getElementById('full-name')
const username = document.getElementById('username')

// LIST OF APIS TO FETCH FROM
const API_MY_REPOS = 'https://api.github.com/users/annathunberg/repos'
const API_MY_PROFILE = 'https://api.github.com/users/annathunberg'
const USER = username
const API_PULLS = 'https://api.github.com/repos/Technigo/${user}/pulls'
const API_COMMENTS = 'https://api.github.com/repos/Technigo/project-news-site/pulls/247/comments '
const API_COMMITS = 'https://api.github.com/repos/Technigo/project-news-site/pulls/227/commits'

// FETCHES THE PROFILE PIC, NAME AND USERNAME
fetch(API_MY_PROFILE)
.then((response) => response.json())
.then((data) => {
    console.log("my profile", data)
    fullName.innerHTML = `Hi! I'm ${data.name}.`
    username.innerHTML = `Username: ${data.login}`
    avatar.src = data.avatar_url
})

function addForkedRepoToList(forkedRepo) {
    list.innerHTML += `<li><a href="${forkedRepo.html_url}">${forkedRepo.name}</a></li>`
}


// FETCHES THE PULL REQUESTS
fetch(API_PULLS)
.then((response) => response.json())
.then((data) => {
    console.log("my pullrequests", data)
})


// the default branch is...

// the last update (push) was .....

// there are ... commits (messages)

function isFork(repo) {
    return repo.fork && repo.name.startsWith('project-')
}

function sortingFunctionFromStackOverflow(a, b) {
    // https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
    return new Date(a.created_at) - new Date(b.created_at)
  }

fetch(API_MY_REPOS)
.then((response) => response.json())
.then((data) => {
    //console.log("all the repos", data)
    const forkedRepos = data.filter(isFork)
    const sortedForkedRepos = forkedRepos.sort(sortingFunctionFromStackOverflow)
    sortedForkedRepos.forEach(addForkedRepoToList)
})