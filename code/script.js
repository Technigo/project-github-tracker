const list = document.getElementById('list')
const avatar = document.getElementById('avatar')
const username = document.getElementById('username')


// profile => 'https://api.github.com/users/annathunberg'
const API_MY_REPOS = 'https://api.github.com/users/annathunberg/repos'
const API_MY_PROFILE = 'https://api.github.com/users/annathunberg'

fetch(API_MY_PROFILE)
.then((response) => response.json())
.then((data) => {
    console.log("my profile", data)
    username.innerHTML = data.login
    avatar.src = data.avatar_url

})

function addForkedRepoToList(forkedRepo) {
    list.innerHTML += `<li><a href="${forkedRepo.html_url}">${forkedRepo.name}</a></li>`
}

function isFork(repo) {
    return repo.fork
}

function sortingFunctionFromStackOverflow(a, b) {
    // https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
    return new Date(a.created_at) - new Date(b.created_at)
  }

fetch(API_MY_REPOS)
.then((response) => response.json())
.then((data) => {
    console.log("all the repos", data)
   

    const forkedRepos = data.filter(isFork)
    const sortedForkedRepos = forkedRepos.sort(sortingFunctionFromStackOverflow)
    sortedForkedRepos.forEach(addForkedRepoToList)
})

