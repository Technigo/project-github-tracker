const REPOS_URL = `https://api.github.com/users/Elsa-Johanna/repos`
const projectsContainer = document.getElementById('projects')

const getRepos = () => {
    fetch(REPOS_URL)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        //data.forEach(repo => console.log(repo.name))
        const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
        forkedRepos.forEach(repo => console.log(repo.name))
        forkedRepos.forEach(repo => projectsContainer.innerHTML += `<h3> ${repo.name}</h3>`)
        drawChart(forkedRepos.length)
    })
}
getRepos()
