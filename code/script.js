const USER = 'KaraHowes'
const repoURL = `https://api.github.com/users/${USER}/repos`
const projectsContainer = document.getElementById('projects')

const getRepos = ()=>{

    fetch(repoURL)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        //projectsContainer.innerHTML = `The name of your first project was ${data[0].name}`
        
        
        const forkedProjects = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
        forkedProjects.forEach(repo => projectsContainer.innerHTML += `<h3>${repo.name}</h3>`)
    
        drawChart(forkedProjects.length)
        console.log('hello', forkedProjects.length)
    
        
    
    }
    
    
    )
}

getRepos()