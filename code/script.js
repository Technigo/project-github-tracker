const USER = 'KaraHowes'
const USER_URL = `https://api.github.com/users/${USER}`
const repoURL = `https://api.github.com/users/${USER}/repos`
const profileContainer = document.getElementById('profile-container')
const cardsContainer = document.getElementById('cards-container')

const userProfile = () => {
  // This function fetches User data from the API to update the user name, avator, location of User
  fetch (USER_URL)
  .then (response => response.json())
  .then (data => {
     // This injects the fetched data into the profileContainer innerHTML
    profileContainer.innerHTML+= `
    <div class="profile-wrapper" id="profile-wrapper">
      <div class="profile-photo" id=" profile-image">
        <img src="https://avatars.githubusercontent.com/u/70952682?v=4" alt="Profile Picture of User" >
      </div>
      <div class="profile-username" id ="profile-username">
        <div class="user-name">Name:<span class="space">${data.login}</span></div>
        <div class="real-name">AKA:<span class="space">${data.name}</span></div>
        <div class="location">Find me in:<span class="space">${data.location}, CH</span></div>
      </div>
  </div>
  <div class="profile-text" id="profile-text">
    <p> ${data.bio}</p>
  </div>`
  })
}
//This invokes the userProfile function
userProfile()

const getRepos = ()=>{
    // This function fetches the data from the Github API
    fetch(repoURL)
    .then(response => response.json())
    .then(data => {
        
      
      //Here, I filter only the projects forked from Technigo, starting from 2021 (since I have earlier projects also forked from Technigo)  
        const forkedProjects = data.filter(repo => repo.fork && repo.name.startsWith('project-') && repo.created_at.startsWith('2021-'))

      // Here I update the cards.Container to show cards with data extracted from the GitHUb API
      //ForEach function ensures I perform this function for each card  
        forkedProjects.forEach(repo => cardsContainer.innerHTML += `
        <section class="js-card">
          <div class="card-projectname" id="cardProjectName">   
          <span class="space">Project Name:<span> <span class="space">${repo.name}</span></div>
          <div class="updated" id="cardUpdated">
          <span class="space">Most recent update:<span><span class="space"> ${new Date(repo.pushed_at).toDateString()}</span>   
          </div>
          <div class= "branch" id="cardBranch">
          <span class="space">Name of default branch:<span><span class="space">${repo.default_branch}</span>    
          </div>
          <div class= "URL" id="cardURL">
          <span class="space">URL:<span> <span class="space"><a href="${repo.html_url} ">Clicky</span></a> 
          </div>
          <div class= "number-commits" id="commit-${repo.name}">
          <span class="space">Number of commits:<span>  
          </div>
          <div class= "times-forked" id="cardForked">
          <span class="space">Number of times forked:<span><span class="space">${repo.forks}</span>  
          </div>
        </section>`
    )
    
      // Here we store the forkedProjects.length and console.log to make sure it is correct.
        drawChart(forkedProjects.length)
        console.log('hello', forkedProjects.length)
        getPullRequests(forkedProjects)
    })   
}
//Herev we invoke the getRepos function 
getRepos()

const getPullRequests = (forkedProjects) => {
   // This function fetches all pull requests from Technigo for a specific repository
    forkedProjects.forEach((repo) => {
        
        fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`)
        .then((response) => response.json())
        .then((data) => {
          // This ensures to FIND only pull requests submitted by user are found
            const myPullRequests = data.find(pull => pull.user.login === repo.owner.login)
           
          if (myPullRequests) {
            getCommits(myPullRequests.commits_url, repo.name,)
          } else {
            document.getElementById(`commit-${repo.name}`).innerHTML =
            'Sorry, no pull request done yet'
          }
             
        })
    })
}

const getCommits = (myCommitsUrl, myRepoName,) => {
// This function allows us to fetch only commits made by the user and then inject into cardsContainer using a dynamid id
    fetch(myCommitsUrl)
    .then((response) => response.json())
    .then ((data) => {
      console.log (data)
      document.getElementById(`commit-${myRepoName}`).innerHTML+=`<span class="space">${data.length}<span>`
    })
  }

