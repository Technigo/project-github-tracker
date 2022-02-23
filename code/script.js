// DOM selectors
const projects = document.getElementById('projects')
const username = 'idanaslund'

let API_URL = `https://api.github.com/users/${username}/repos`

const addingProfile = () => {
    profile.innerHTML += `Username: ${username}`
}
addingProfile()

const findingAllRepos = () => {

fetch(API_URL)
.then((res) => res.json())
.then((repos) => {
    console.log(repos)


    repos.forEach((repo) => {
    projects.innerHTML += `<div class="repos"><h4>${repo.name}<h4></div>`})
  })

}

findingAllRepos()

// Eventlisteners