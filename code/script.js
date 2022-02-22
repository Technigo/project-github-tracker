//Global variables
const username = 'emmahogberg88'
const URL_REPO = `https://api.github.com/users/${username}/repos`
const TOKEN = 
//option for authorization
const options = {
  method: 'GET',
  headers: {
    Authorization: `token ${TOKEN}`  // you need to paste your token over here.
  }
}


//fetch data from GitHub repo//
const gitHubData = () => {

fetch(URL_REPO, options)
  .then(res => res.json())
  .then(data => {

  getUserData(data)
  getRepoData(data)

  })
}


const getUserData = (data) => {

//Get image from user profile and display on website
  document.getElementById('profile-picture').innerHTML = `
  <img src='${data[0].owner.avatar_url}' alt='image of emmahogberg88 at GitHub' >
  `
  //Get url to user profile and show on website
  document.getElementById('username').innerHTML = `
  <a class="header" href='${data[0].html_url}'>${username}</a>
  `
}


const getRepoData = (data) => {

  //Filter all technigoProjects to get specific info about each repo.
//Get technigo projects by filtering data by repos that starts with "project-"
  const technigoProjects = data.filter(repo => repo.name.startsWith('project-'))
  console.log('array with technigo projects:', technigoProjects)

  //Loop through array to get data about each item in array
  technigoProjects.forEach(repo => {
    
    //Get name of repo
  let reponame = repo.name

  //Get url to each repo 
  let projectUrl = repo.html_url
  
  //Get default branch
  let defaultBranch = repo.default_branch
  
  //Get the date of latest update of the repo
  let latestUpdateRepo = new Date(repo.updated_at).toLocaleDateString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'})
  
  //Display HTML for all GitHub repos on website, setting dynamic ID to be able to add on more HTML in another function
  document.getElementById('section-projects').innerHTML += `
  <div class="section-projects__card flex">
    <a class="reponame-link" href='${projectUrl}'>${reponame}</a>
    <p class="repo-info">Default branch: ${defaultBranch}</p>
    <p class="repo-info">Latest update: ${latestUpdateRepo}</p>
    <p class="repo-info" id=commits-${repo.name}>Commits</p>
    <p class="repo-info" id=comments-${repo.name}>Comments</p>
  
  </div>  
  `

  //Fetch pull request data
  fetch(`https://api.github.com/repos/Technigo/${reponame}/pulls?per_page=100`, options)
    .then(res => res.json())
    .then(data => {
      data.forEach( repo => {
        if(repo.user.login === username) {
          console.log('data from Technigo', data)
          let reponame = repo.base.repo.name 
          //get url for commits to use in new fetch
          const commitsUrl = repo.commits_url
          getCommits(commitsUrl, reponame)        
          //get url for comments to use in new fetch  
          const commentsUrl = repo.review_comments_url
          getComments(commentsUrl, reponame) 

        } else if (repo.user.login === 'tiiliu' && reponame === 'project-chatbot') {
          getCommits(repo.commits_url, 'project-chatbot')        
            
        } else {
          document.getElementById(`commits-${reponame}`).innerHTML = 'No commits for this repo'
          document.getElementById(`comments-${reponame}`).innerHTML = ''
        }
      })
    })
  })
}

const getCommits = (commitsUrl, reponame) => {
  fetch(commitsUrl, options)
  .then(res => res.json())
  .then(data => {
    console.log('commits', data, reponame)
    document.getElementById(`commits-${reponame}`).innerHTML = `Amount of commits: ${data.length}`
  })
}

const getComments = (commentsUrl, reponame) => {
  fetch(commentsUrl, options)
  .then(res => res.json())
  .then(data => {
    console.log('comments', data, reponame)
    document.getElementById(`comments-${reponame}`).innerHTML = `Comments from: ${data[0].user.login}`
  })
}

gitHubData()