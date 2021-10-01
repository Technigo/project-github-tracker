const USER = 'KaraHowes'
const USER_URL = `https://api.github.com/users/${USER}`
const repoURL = `https://api.github.com/users/${USER}/repos`
const profileContainer = document.getElementById('profile-container')
const cardsContainer = document.getElementById('cards-container')

const userProfile = () => {
  fetch (USER_URL)
  .then (response => response.json())
  .then (data => {
    console.log ('profile', data)
    profileContainer.innerHTML+= `
    <div class="profile-wrapper" id="profile-wrapper">
    <div class="profile-photo" id=" profile-image">
      <img src="https://avatars.githubusercontent.com/u/70952682?v=4" alt="Profile Picture of User" >
    </div>
    <div class="profile-username" id ="profile-username">
      <h1>${data.name}</h1>
      <h2>${data.login}</h2>
      <h3>${data.location}, Switzerland</h3>
    </div>
  </div>
  <div class="profile-text" id="profile-text">
    <p> ${data.bio}</p>
  </div>`
  })
}
userProfile()

const getRepos = ()=>{
    // This function fetches the data from the Githug API
    fetch(repoURL)
    .then(response => response.json())
    .then(data => {
        
      
      //Here, I filter only the projects forked from Technigo, starting from 2021 (since I have earlier projects also forked from Technigo)  
        const forkedProjects = data.filter(repo => repo.fork && repo.name.startsWith('project-') && repo.created_at.startsWith('2021-'))
      // Here I update the projectsContainer.innerHTML to show a list of all forked repos  
        //forkedProjects.forEach(repo => projectsContainer.innerHTML += `<p>${repo.name}</p>`)
        // Here I update the cards.Container to show cards with data extracted from the GitHUb API
        
        forkedProjects.forEach(repo => cardsContainer.innerHTML += `
        <section class="js-card">
          <div class="card-projectname" id="cardProjectName">   
          Project Name: <span class="space">${repo.name}</span></div>
          <div class="updated" id="cardUpdated">
          Most recent update:<span class="space"> ${new Date(repo.pushed_at).toDateString()}</span>   
          </div>
          <div class= "branch" id="cardBranch">
          Name of default branch:<span class="space">${repo.default_branch}</span>    
          </div>
          <div class= "URL" id="cardURL">
          URL: <span class="space"><a href="${repo.html_url} ">Clicky</span></a> 
          </div>
          <div class= "number-commits" id="commit-${repo.name}">
          Number of commit Messages:  
          </div>
          <div class= "times-forked" id="cardForked">
          Number of times forked:<span class="space">${repo.forks}</span>  
          </div>
        </section>`
    
    )
    
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
           
          if (myPullRequests) {
            getCommits(myPullRequests.commits_url, repo.name)
          } else {
            document.getElementById(`commit-${repo.name}`).innerHTML =
            'Sorry, no pull request done yet'
          }
             
        })
 
    })
}

const getCommits = (myCommitsUrl, myRepoName) => {

  fetch(myCommitsUrl)
  .then((response) => response.json())
  .then ((data) => {
    document.getElementById(`commit-${myRepoName}`).innerHTML+=`<span class="space">${data.length}<span>`

  })
}

