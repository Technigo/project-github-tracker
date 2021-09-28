const USER = 'KaraHowes'
const repoURL = `https://api.github.com/users/${USER}/repos`
const projectsContainer = document.getElementById('projects')
const cardsContainer = document.getElementById('cards-container')

const getRepos = ()=>{

    fetch(repoURL)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        //projectsContainer.innerHTML = `The name of your first project was ${data[0].name}`
        
        const forkedProjects = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
        forkedProjects.forEach(repo => projectsContainer.innerHTML += `<h3>${repo.name}</h3>`)

        forkedProjects.forEach(repo => cardsContainer.innerHTML += `
        <section class="js-card">
      <div class="card-projectname" id="cardProjectName">   
        Project Name: <span>${repo.name}</span></div>
        <div class="updated" id="cardUpdated">
      Most recent update:   
        </div>
        <div class= "branch" id="cardBranch">
      Name of default branch:  ${repo.default_branch}    
        </div>
         <div class= "URL" id="cardURL">
      URL: ${repo.url}   
        </div>
        <div class= "number-commits" id="cardCommits">
      Number of commit Messages:   
        </div>
         <div class= "blank-line" id="cardBlank">
      blank   
        </div>
        <div class= "blank-line" id="cardBlank">
      blank   
        </div>
    
     
    </section>`)

        drawChart(forkedProjects.length)
        console.log('hello', forkedProjects.length)
    
    }
    )
}

getRepos()