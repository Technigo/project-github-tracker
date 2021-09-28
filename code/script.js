// DOM SELECTORS
const list = document.getElementById('list')
const avatar = document.getElementById('avatar')
const fullName = document.getElementById('full-name')
const username = document.getElementById('username')

// LIST OF APIS TO FETCH FROM
const user = "annathunberg"
const API_MY_REPOS = 'https://api.github.com/users/annathunberg/repos'
const API_MY_PROFILE = 'https://api.github.com/users/annathunberg'
const API_PULL_REQUESTS = ''
const API_COMMITS = ''
const API_PUSH = ''
const API_BRANCH = ''

// FETCHES THE PROFILE PIC, NAME AND USERNAME
fetch(API_MY_PROFILE)
.then((response) => response.json())
.then((data) => {
    // console.log("my profile", data)
    fullName.innerHTML = `Hi! I'm ${data.name}.`
    username.innerHTML = `Username: ${data.login}`
    avatar.src = data.avatar_url
})

  // FETCHES MY REPOS
  fetch(API_MY_REPOS)
  .then((response) => response.json())
  .then((data) => {
      //console.log("all the repos", data)
      const forkedRepos = data.filter(isFork)
      const sortedForkedRepos = forkedRepos.sort(sortingFunctionFromStackOverflow)
      sortedForkedRepos.forEach(addForkedRepoToList)
      
  })

 
  
// RETURNS REPOS THAT ARE FORKED AND START WITH PROJECTS
function isFork(repo) {
    return repo.fork && repo.name.startsWith('project-')
}

// CREATES THE LIST OF REPOS
function addForkedRepoToList(forkedRepo) {
    list.innerHTML += `<li><a href="${forkedRepo.html_url}">${forkedRepo.name}</a></li>`
}

// SORTS THE REPOS IN CHRONOLOGICAL ORDER BY DATE
function sortingFunctionFromStackOverflow(a, b) {
    // https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
    return new Date(a.created_at) - new Date(b.created_at)
  }

// FETCHES THE PULL REQUESTS
fetch(API_PULL_REQUESTS)
.then((response) => response.json())
.then((data) => {
    console.log("my pullrequests", data)
})

// FETCHES THE DEFAULT BRANCH
fetch(API_BRANCH)
.then((response) => response.json())
.then((data) => {
    console.log("the default branch is..", data)
    // the default branch is...
})

// FETCHES THE LATEST PUSH
fetch(API_PUSH)
.then((response) => response.json())
.then((data) => {
    console.log("the last update (push) was..", data)
    // the last update (push) was .....
})

//FETCHES THE COMMIT MESSAGES (latest one or count the number of?)
fetch(API_COMMITS)
.then((response) => response.json())
.then((data) => {
    console.log("the latest commit was..", data)
    // there are ... commits (messages)
})

