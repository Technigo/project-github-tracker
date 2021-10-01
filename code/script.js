const user = 'Asivol93'
const REPOS_URL = `https://api.github.com/users/${user}/repos`
const USER_URL = `https://api.github.com/users/${user}`
const githubImg = './images/big-github_icon.png'
const githubProfile = `https://github.com/${user}`
const userContainer = document.getElementById('userProfile')
const projectsContainer = document.getElementById('projectsContainer')
const userDetailContainer = document.getElementById('userDetails')

// Get the modal
const modal = document.getElementById('myModal')
// Get the button that opens the modal

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0]

const userProfile = () => {
  fetch(USER_URL)
    .then((res) => res.json())
    .then((data) => {
      userContainer.innerHTML += `
      <div class="user-section">
        <h2>Username: ${data.login}</h2>
        <p>Full name: ${data.name}</p>
        <p>Location: ${data.location}</p>
      </div>
    
      <div class=swap-on-hover>
      <a href="${githubProfile}" target="blank">
        <img class="front-image" src="${data.avatar_url}"/>
        <img class="back-image" src="${githubImg}">
      </a>
      </div>
    

      `
    })
}

const fetchAll = () => {
  fetch(REPOS_URL)
    .then((res) => res.json())
    .then((data) => {
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith('project-')
      )

      forkedRepos.sort((a, b) => {
        return new Date(b.pushed_at) - new Date(a.pushed_at)
      })
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
          document.getElementById(`commit-${repo.name}`).innerHTML = `
            <h3>No pull request done</h3>
            <p>(either ongoing project or a group/pair project)</p>`
        }
      })
  })
}

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

      btn.onclick = function () {
        console.log(modal)
        document.getElementById('myModal').style.display = 'block'
      }

      document.getElementsByClassName('close')[0].onclick = function () {
        document.getElementById('myModal').style.display = 'none'
      }

      window.onclick = function (event) {
        if (event.target == modal) {
          document.getElementById('myModal').style.display = 'none'
        }
      }
    })
}

userProfile()
fetchAll()
