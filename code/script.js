const USER = 'KaraHowes'
const repoURL = `https://api.github.com/users/${USER}/repos`
const projectsContainer = document.getElementById('projects')
const cardsContainer = document.getElementById('cards-container')



const getRepos = ()=>{
    // This function fetches the data from the Githug API
    fetch(repoURL)
    .then(response => response.json())
    .then(data => {
        
        //console.log('DATA', data)
      //Here, I filter only the projects forked from Technigo, starting from 2021 (since I have earlier projects also forked from Technigo)  
        const forkedProjects = data.filter(repo => repo.fork && repo.name.startsWith('project-') && repo.created_at.startsWith('2021-'))
      // Here I update the projectsContainer.innerHTML to show a list of all forked repos  
        forkedProjects.forEach(repo => projectsContainer.innerHTML += `<h3>${repo.name}</h3>`)
        // Here I update the cards.Container to show cards with data extracted from the GitHUb API
        forkedProjects.forEach(repo => cardsContainer.innerHTML += `
        <section class="js-card">
      <div class="card-projectname" id="cardProjectName">   
        Project Name: <span class="space">${repo.name}</span></div>
        <div class="updated" id="cardUpdated">
      Most recent update: <span class="space"> ${new Date(repo.pushed_at).toDateString()}</span>   
        </div>
        <div class= "branch" id="cardBranch">
      Name of default branch:<span class="space">${repo.default_branch}</span>    
        </div>
         <div class= "URL" id="cardURL">
      URL: <span class="space"><a href="${repo.html_url} ">Clicky</a></span> 
        </div>
        <div class= "number-commits" id="commit-${repo.name}">
      Number of commit Messages:   
        </div>
         <div class= "times-forked" id="cardForked">
      Number of times forked: <span class="space">${repo.forks}</span>  
        </div>
        <div class= "blank-line" id="cardBlank">
      blank   
        </div>
    
     
    </section>`)
        // Here we store the forkedProjects.length and console.log to make sure it is correct.
        drawChart(forkedProjects.length)
        //console.log('hello', forkedProjects.length)
    getPullRequests(forkedProjects)
    })   
}

getRepos()

const getPullRequests = (forkedProjects) => {
   
    forkedProjects.forEach((repo) => {
        
        fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`)
        .then((response) => response.json())
        .then((data) => {
            //console.log(data)
            const myPullRequests = data.find(pull => pull.user.login === repo.owner.login)
            //console.log('howdy', myPullRequests)
          
            getCommits(myPullRequests.commits_url, repo.name) 
        })

      
    })
}

const getCommits = (myCommitsUrl, myRepoName) => {

  fetch(myCommitsUrl)
  .then((response) => response.json())
  .then ((data) => {

    console.log(data)
    document.getElementById(`commit-${myRepoName}`).innerHTML+=data.length

  }
    
  )

}

