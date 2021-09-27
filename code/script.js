const USER = 'hejmaria'
const REPOS_URL = `http://api.github.com/users/${USER}/repos`

const projectContainer = document.getElementById('projects')



const getRepos = () => {
    fetch(REPOS_URL)
    .then(res => res.json())
    .then(data => {
    console.log('The data', data)
    data.forEach (repo => console.log(repo.name))
        const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
        forkedRepos.forEach(repo => console.log(repo.name))
        
        forkedRepos.forEach(repo => projectContainer.innerHTML += `<h3>${repo.name}</h3>`)
        
        //make into a div or something to style them
        drawChart(forkedRepos.length)
    });

}

getRepos();

//const drawChart = (amoun