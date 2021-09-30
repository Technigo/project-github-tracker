const USER = 'silvertejp89'
const REPOS_URL = `https://api.github.com/users/${USER}/repos`
const projectContainer = document.getElementById('projects')

const getRepos = () => {
    fetch(REPOS_URL)
    .then(response => response.json())
    .then(data => {
        console.log(data) //so we can see all the info 
        // data.forEach(repo => console.log(repo.name)) //Only the names
        const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-')) //could be written as for example repo.fork ... === true (or false) but if you write nothing is true.
        forkedRepos.forEach(repo => projectContainer.innerHTML += `<h3>${repo.name}</h3>`) 
        drawChart(forkedRepos.length)
        
    })
}
getRepos() //invoking it







