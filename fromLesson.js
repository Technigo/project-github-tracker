const USER = 'hejmaria'
const REPOS_URL = `http://api.github.com/users/${USER}/repos`

const getRepos = () => {
    fetch (REPOS_URL)
    .then (res => res.json())
    .then(data => {
    console.log(data)
    //data.forEach (repo => console.log(repo.name))
        const forkedRepos = data.fillter(repo => repo.fork && repo.name.startsWith('procet-'))
        forkedRepos.forEach(repo => console.log(repo.name))
        forkedRepos.forEach(repo => projectsContainer.inneHTML += `<h3>${repo.name}</h3>`)
        //make into a div or something to style them
        drawChart(forkedRepos.length)
    });

}

const drawChart = (amount) =>