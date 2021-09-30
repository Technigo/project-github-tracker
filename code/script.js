const USER = 'jenquach'
const REPOS_URL = `https://api.github.com/users/${USER}/repos`

// const repoNames = [
//   'project-news-site', 
//   'project-business-site', 
//   'project-chatbot', 
//   'project-guess-who', 
//   'project-weather-app', 
// ]

// const commitsURL = [
//   'https://api.github.com/repos/Technigo/project-news-site/pulls/242/commits', 
//   'https://api.github.com/repos/Technigo/project-business-site/pulls/222/commits', 
//   'https://api.github.com/repos/Technigo/project-chatbot/pulls/65/commits',
//   'https://api.github.com/repos/Technigo/project-guess-who/pulls/120/commits',
// ]


const projectsContainer = document.getElementById('projects')
const pullRequests = document.getElementById('pullrequests')


const getRepositories = () => {
  fetch(REPOS_URL)
    .then(res => res.json())
    .then(data => {
      const technigoRepositories = data.filter(
        repo => repo.fork && repo.name.includes('project-')
      )
      console.log(technigoRepositories)

      technigoRepositories.forEach(repo => {
        projectsContainer.innerHTML += `
          <div>
            <a href="${repo.html_url}">${repo.name} with default branch ${repo.default_branch}</a>
            <p>Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
            <p id="commit-${repo.name}">Amounts of commit:</p>
          </div>
        `
      })  
      drawChart(technigoRepositories.length)
      getPullRequests(technigoRepositories)  
    })
}  
      

const getPullRequests = (allRepositories) => {
  allRepositories.forEach(repo => {
    const myRepoName = repo.name
    const PULL_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`
    fetch(PULL_URL)
    .then(res => res.json())
    .then(data => { //data is the array of all pull requests
      const myPullRequest = data.find(
      pull => pull.user.login === repo.owner.login
    )     
      getCommits(myPullRequest.commits_url, myRepoName)
    })    
  })
}

const getCommits = (myCommitsUrl, myRepoName) => {
  fetch(myCommitsUrl)
  .then(res => res.json())
  .then(data => {
    document.getElementById(`commit-${myRepoName}`).innerHTML += data.length
  })
}

getRepositories()
