//DOM-selector for the canvas 👇
const ctx = document.getElementById('chart').getContext('2d')
const projects = document.getElementById('projects')
const username = 'idanaslund'

let API_URL = `https://api.github.com/users/${username}/repos`

const findingAllRepos = () => {

fetch(API_URL)
.then((res) => res.json())
.then((repos) => {
    console.log(repos)
    projects.innerHTML = `${repos[1].name}`

    repos.forEach((repo) => projects.innerHTML += `<div>${repo.name}</div>`)

})
}

findingAllRepos()

//"Draw" the chart here 👇


