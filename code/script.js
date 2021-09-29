const searchBtn = document.getElementById('searchbtn')
let username = searchBtn.value
const inputValue = document.getElementById('gitusername')
const user = 'Asivol93'
const REPOS_URL = `https://api.github.com/users/${user}/repos`
const USER_URL = `https://api.github.com/users/${user}`
const userContainer = document.getElementById('userProfile')
const projectsContainer = document.getElementById('projectsContainer')
const userDetailContainer = document.getElementById('userDetails')
// Get the modal
const modal = document.getElementById("myModal")
// Get the button that opens the modal


// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0]




const userProfile = () => {
  fetch(USER_URL)
  .then(res => res.json())
  .then(data => {
      //console.log(data);
      userContainer.innerHTML += `
      <div class="user-section">
        <h2>Username: ${data.login}</h2>
        <p>Full name: ${data.name}</p>
        <p>Location: ${data.location}</p>
      </div>

      <div class=swap-on-hover>
        <a href="https://github.com/Asivol93" target="blank">
          <img class="front-image" src="${data.avatar_url}"/>
          <img class="back-image" src="./images/big-github_icon.png">
        </a>
      </div>

      `
  
        
    
    })
}

const fetchAll = () => {
  fetch(REPOS_URL)
    .then(res => res.json())
    .then(data => {
      
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith('project-'))
      forkedRepos.forEach(repo => {
        const pushedDate = new Date(repo.pushed_at).toLocaleDateString('en-se', {  
        hour: '2-digit',
        minute: '2-digit',
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',           
      }
     
    )
    
    projectsContainer.innerHTML += `
    <div class="repo-item">
      <div class="icon-container">
      <a href="${repo.html_url}" target="blank">
        <img src="./images/github_icon.png" class="github-icon">
      </a>
      </div>

      <h3><a href="${repo.html_url}" target="blank">${repo.name}</a></h3>
      <p>Branch: ${repo.default_branch}<p>
      <p>Latest push: ${pushedDate}</p>
      <p id="commit-${repo.name}"></p>
    </div>
    `
    })
      //drawTimeLine(createdAt)
      drawChart(forkedRepos.length)
      pullRequests(forkedRepos)
    })
  
    
    .catch(() => {
      userContainer.innerHTML = `
    <h1>Sorry we could not find any data!</h1>
    <p>Please try again!</p>
    `
    })
  }



const pullRequests = (repos) => {
  repos.forEach(repo => {
    fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`)
      .then(res => res.json())
      .then(data => {
        const myPulls = data.find(pull => pull.user.login === repo.owner.login)
        //const COMMENTS_URL = myPulls.review_comments_url
        //console.log(data)
        //showComments(COMMENTS_URL)
        //console.log(myPulls)
        showCommits(myPulls.commits_url, repo.name)
      })
      
    })
}

const showCommits = (url, myRepoName) => {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    //console.log(data)
    let commitMessage = data[0].commit.message
    //console.log(commitMessage)
    
      document.getElementById(`commit-${myRepoName}`).innerHTML += ` 
      <p>Number of commits: ${data.length}</p>
      <button id="myBtn-${myRepoName}">Open Modal</button>
          
      `
      document.getElementById("myModal").innerHTML += `
      <p class="modal-message">${commitMessage}</p>
      `
      const btn = document.getElementById(`myBtn-${myRepoName}`)

      btn.onclick = function() {
        console.log(modal)
        document.getElementById("myModal").style.display = "block";
      }

      span.onclick = function() {
        document.getElementById("myModal").style.display = "none";
      }
      
      window.onclick = function(event) {
        if (event.target == modal) {
          document.getElementById("myModal").style.display = "none";
        }
      }

    })
    
}

/*const showComments = (repos) =>
repos.forEach(repo => {
  fetch(COMMENTS_URL)
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })
})*/




userProfile()
fetchAll()
//pullRequests()
//showComments()

//Eventlisteners
searchBtn.addEventListener('click', () => {
  fetchAll()
})



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  document.getElementById("myModal").style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    document.getElementById("myModal").style.display = "none";
  }
}





