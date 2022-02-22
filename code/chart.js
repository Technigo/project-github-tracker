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

    repos.forEach((repo) => projects.innerHTML += `<div><h4>${repo.name}<h4></div>`)

})
}

findingAllRepos()

//"Draw" the chart here 👇


