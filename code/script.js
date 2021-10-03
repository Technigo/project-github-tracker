const user = 'Asivol93'
const REPOS_URL = `https://api.github.com/users/${user}/repos`
const USER_URL = `https://api.github.com/users/${user}`
const githubImg = './images/big-github_icon.png'
const githubProfile = `https://github.com/${user}`
const userContainer = document.getElementById('userProfile')
const projectsContainer = document.getElementById('projectsContainer')
const userDetailContainer = document.getElementById('userDetails')
const modal = document.getElementById('myModal') // Get the modal
const span = document.getElementsByClassName('close')[0] // Get the <span> element that closes the modal

//Fetches general user info
const userProfile = () => {
  fetch(USER_URL)
    .then((res) => res.json())
    .then((data) => {
      userContainer.innerHTML += `
      <div class="user-section">
        <h2>Username: ${data.login}</h2>
        <p>Full name: ${data.name}</p>
        <p>Location: ${data.location}</p>
        <div class=swap-on-hover>
        <a href="${githubProfile}" target="blank">
        <img class="front-image" src="${data.avatar_url}"/>
        <img class="back-image" src="${githubImg}">
        </div>
      </a>
      </div>
    
      
      
      
      `
    })
}

//Fetches all repositories that are forked and starts with "project-" to get the ones from Technigo
const fetchAll = () => {
  fetch(REPOS_URL)
    .then((res) => res.json())
    .then((data) => {
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith('project-')
      )
      //Sorts and displays the projects by the newest to the latest projects
      forkedRepos.sort((a, b) => {
        return new Date(b.pushed_at) - new Date(a.pushed_at)
      })
      //Formates the date nicely
      forkedRepos.forEach((repo) => {
        const pushedDate = new Date(repo.pushed_at).toLocaleDateString(
          'en-se',
          {
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
          <img src="./images/github-icon_black.png" class="github-icon">
        </a>
      </div>

      <h3><a href="${repo.html_url}" target="blank">${repo.name}</a></h3>
      <p>Branch: ${repo.default_branch}<p>
      <p>Latest push: ${pushedDate}</p>
      <p id="commit-${repo.name}"></p>
    </div>
    `
      })

      drawChart(forkedRepos.length)
      pullRequests(forkedRepos)
    })

    .catch(() => {
      userContainer.innerHTML = `
    <h1>Sorry we could not find any data!</h1>
    `
    })
}

//Gets the PR from the forked repos.
const pullRequests = (repos) => {
  repos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`
    )
      .then((res) => res.json())
      .then((data) => {
        const myPulls = data.find(
          (pull) => pull.user.login === repo.owner.login
        )

        if (myPulls) {
          showCommits(myPulls.commits_url, repo.name)
        } else {
          //Displays message if not commits are made
          document.getElementById(`commit-${repo.name}`).innerHTML = `
            <h3>No pull request done</h3>
            <p>(either ongoing project or a group/pair project)</p>`
        }
      })
  })
}

//Displayes the commit messages for the repos that have a PR
const showCommits = (url, myRepoName) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let commitMessage = data[data.length - 1].commit.message
      console.log(data)

      document.getElementById(`commit-${myRepoName}`).innerHTML += ` 
      <p>Number of commits: ${data.length}</p>
      <button id="myBtn-${myRepoName}" class="modal-button">Read commit</button>  
      `
      document.getElementById('myModal').innerHTML += `
      <div id="modalContent" class="modal-content">
      <button class="close">&times;</button>
        <p class="modal-message">${myRepoName} latest commit: ${commitMessage}</p>
      </div> 
      `

      const btn = document.getElementById(`myBtn-${myRepoName}`)

      //Opens the commit msg in a modal by clicking at the button
      btn.onclick = function () {
        console.log(modal)
        document.getElementById('myModal').style.display = 'block'
      }

      //Closes the modal when clicking at X
      document.getElementsByClassName('close')[0].onclick = function () {
        document.getElementById('myModal').style.display = 'none'
      }

      //Have not made this function work yet, closes the modal when clicking outside of it
      window.onclick = function (event) {
        if (event.target == modal) {
          document.getElementById('myModal').style.display = 'none'
        }
      }
    })
}

userProfile()
fetchAll()
