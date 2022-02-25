//DOM Selectors
const toggleSwitch = document.getElementById('switch')
const modalWrapper = document.getElementById('modal-wrapper')
const modalBtn = document.getElementById("modal-btn")
const myProjects = document.getElementById('section-projects')

//Global variables
const username = 'emmahogberg88'
const URL_REPO = `https://api.github.com/users/${username}/repos`
//const API_TOKEN = TOKEN || process.env.API_KEY

//option for authorization
const options = {
  method: 'GET',
  headers: {
    Authorization: `token ${API_TOKEN}`  // you need to paste your token over here.
  }
}


///////////////////////////////////////////////////////////////////////////
//////////////////////           REPO DATA         ////////////////////////
///////////////////////////////////////////////////////////////////////////
const gitHubData = () => {

fetch(URL_REPO, options)
  .then(res => res.json())
  .then(data => {

  //Get technigo projects by filtering data by repos that starts with "project- and is forked"
  const technigoProjects = data.filter(repo => repo.name.startsWith('project-') && repo.fork)
  
  //Get image and url from user profile and display on website
  document.getElementById('profile-picture').innerHTML = `
  <img class="box-shadow" src='${data[0].owner.avatar_url}' alt='image of emmahogberg88 at GitHub'>
  `
  document.getElementById('username').innerHTML = `
  <h4><a class="header nav-link" href='${data[0].html_url}'><i class="fab fa-github"></i> ${username}</a></h4>
  `
  
  //Toggle switch to toggle between sorting projects by latest updated project or by name 
  let toggleStatus = true
  toggleSwitch.addEventListener('click', () => {
    if (toggleStatus){
      technigoProjects.sort((a, b) => new Date(a.pushed_at) < new Date(b.pushed_at) ? 1 : -1)
      myProjects.innerHTML = ''
      repoData(technigoProjects)
      toggleStatus = false
    } else if (!toggleStatus){
      technigoProjects.sort((a, b) => a.name > b.name ? 1 : -1)
      myProjects.innerHTML = ''
      repoData(technigoProjects)
      toggleStatus = true
    }
  })

  repoData(technigoProjects)

  //Pass amount of finished technigo projects to progressChart in chart.js file
  progressChart(technigoProjects.length)  

  })
  .catch(err => console.error(err))
}


//--display repo information--//
const repoData = (technigoProjects) => {


  //Loop through array to get data about each item in array
  technigoProjects.forEach(repo => {
   
  //Get name of repo and date of latest update of the repo
  const reponame = repo.name
  
  //Display HTML for all GitHub repos on website, setting dynamic ID to be able to add on more HTML in another function
  myProjects.innerHTML += `
  <div class="section-projects__card box-shadow">
    <div>
      <h3 class="repo-title bold-text"><a class="nav-link" href='${repo.html_url}'><i class="fab fa-github"></i> ${repo.name}</a></h3>
      <p><span class="bold-text">Default branch:</span> ${repo.default_branch}</p>
      <p><span class="bold-text">Latest update:</span> ${new Date(repo.updated_at).toLocaleDateString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'})}</p>
      <p id="commits-${repo.name}"></p>
      <p id="comments-${repo.name}"></p>
    </div>  
    <div class="card-btn flex">
      <p id="website-${repo.name}"></p>
      <p id="comments-btn-${repo.name}"></p>
    </div>
  </div>  
  `

  /////////////////////////////////////////////////////////////////////////////
  ////////////////////////      PULL REQUEST DATA      ///////////////////////
  ///////////////////////////////////////////////////////////////////////////
  fetch(`https://api.github.com/repos/Technigo/${reponame}/pulls?per_page=100`, options)
    .then(res => res.json())
    .then(data => {
      
      data.forEach( repo => {
        if(repo.user.login === username) {

          let reponame = repo.base.repo.name
         
          //get url for commits, comments and netlify to use in new fetch
          displayCommits(repo.commits_url, reponame)        
          displayComments(repo.review_comments_url, reponame) 
          displayLink(repo.body, reponame)

        } else if (repo.user.login === 'tiiliu' && reponame === 'project-chatbot') {
          displayCommits(repo.commits_url, reponame)   
          displayComments(repo.review_comments_url, reponame) 
          displayLink('https://movie-bot.netlify.app/', reponame)     
            
        } else {
          document.getElementById(`commits-${reponame}`).innerHTML = 'No commits for this repo'
          document.getElementById(`comments-${reponame}`).innerHTML = ''
        }
      })
    })
    .catch(err => console.error(err))
  })
}


////////////////////////////////////////////////////////////////////////////
///////////////////////////      COMMITS DATA     /////////////////////////
//////////////////////////////////////////////////////////////////////////
const displayCommits = (commitsUrl, reponame) => {
  fetch(commitsUrl, options)
  .then(res => res.json())
  .then(data => {
    document.getElementById(`commits-${reponame}`).innerHTML = `
    <p>
    <span class="bold-text">Amount of commits:</span> ${data.length}
    </p>`
  })
  .catch(err => console.error(err))
}

////////////////////////////////////////////////////////////////////////////
//////////////////////////      COMMENTS DATA     /////////////////////////
//////////////////////////////////////////////////////////////////////////
const displayComments = (commentsUrl, reponame) => {
  fetch(commentsUrl, options)
  .then(res => res.json())
  .then(data => {
    if (data.length > 0) {

      let commentsArray = []
      
      data.forEach(comment => {
        if (comment.user.login !== username) {
          document.getElementById(`comments-${reponame}`).innerHTML = `
          <p>
            <span class="bold-text">Reviewed by:</span> 
            <a class="nav-link" href="${data[0].user.html_url}"> ${data[0].user.login}</a>
          </p>
          `         
          document.getElementById(`comments-btn-${reponame}`).innerHTML = `
            <button class="outlined-button" id="click-${reponame}">comments 💬</button> 
          `

          commentsArray.push(comment.body)
          document.getElementById(`click-${reponame}`).addEventListener('click', () => {
            commentsArray.forEach(item => {
              modalWrapper.style.display = 'block'
        
              document.getElementById('modal').innerHTML += `
              <p><span class="bold-text modal-header">Comment from ${data[0].user.login}</span></p>
              <p class="modal-text">${item}</p>
              <br>
              `
            })
           
          })
        }
        
      })
    }
  })
  .catch(err => console.error(err))
}

////////////////////////////////////////////////////////////////////////////
///////////////////////////      NETLIFY LINK     /////////////////////////
//////////////////////////////////////////////////////////////////////////

const displayLink = (netlifyUrl, reponame) => {
  
    document.getElementById(`website-${reponame}`).innerHTML = `
    <a href="${netlifyUrl}" target="_blank">
    <button class="filled-button">visit website</button>
    </a>
    `
  }


gitHubData()


////////////////////////////////////////////////////////////////////////////
////////////////////////       EVENTLISTENER         //////////////////////
//////////////////////////////////////////////////////////////////////////

modalBtn.addEventListener('click', () => {
  modalWrapper.style.display = 'none'
  document.getElementById('modal').innerHTML = ''
})


