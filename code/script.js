//Global variables
const username = 'emmahogberg88'
const URL_REPO = `https://api.github.com/users/${username}/repos`

//option for authorization
const options = {
  method: 'GET',
  headers: {
    Authorization: 'token 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' // you need to paste your token over here.
  }
}



//fetch data from GitHub repo
const gitHubData = () => {

fetch(URL_REPO, options)
  .then(res => res.json())
  .then(data => {
  console.log('data:', data)

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
  technigoProjects.forEach(project => {
    
    //Get name of repo
  let reponame = project.name
  console.log('project reponame:', reponame)

  //Get url to each repo 
  let projectUrl = project.html_url
  console.log('project url:', projectUrl)

  let defaultBranch = project.default_branch
  console.log('default branch:', defaultBranch)
  
  //Get the date of latest update of the repo
  let latestUpdateRepo = new Date(project.updated_at).toLocaleDateString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'})
  console.log('latest update of repo:',latestUpdateRepo)
  
  document.getElementById('section-projects').innerHTML += `
  <div class="section-projects__card flex">
    <a class="reponame-link" href='${projectUrl}'>${reponame}</a>
    <p>Default branch: ${defaultBranch}</p>
    <p>Latest update: ${latestUpdateRepo}</p>
  </div>  
  `
  
  const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`

  fetch(API_URL_PR, options)
    .then(res => res.json())
    .then(data => {
        console.log('data from Technigo', data)
        // if (data.user.login === )
    })
  })
}

gitHubData()