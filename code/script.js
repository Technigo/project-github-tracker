const projects = document.getElementById('projects')
const personData = document.getElementById('personData')
const USER = 'jakobxlindstrom'
const USER_URL = `https://api.github.com/users/${USER}`
const tracerBtn = document.getElementById('tracerBtn')

const getUserData = () => {
  fetch(USER_URL)
    .then((res) => res.json())
    .then((data) => {
      personData.innerHTML = `
      <div class="personal-info">    
      <img class="img" src="${data.avatar_url}"/>
      <h3>Username: ${data.login}</h3>
      <h5>${data.name}</h5>
      <h5>${data.location}</h5>
    </div>
     `
    })
}

const getRepos = () => {
  fetch(`https://api.github.com/users/${USER}/repos`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      const filtered = data.filter(
        (repo) => repo.fork && repo.name.startsWith('project-')
      )
      filtered.forEach((repo) => {
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

        projects.innerHTML += `<div id="${repo.name}"" class="repo-cards">
        
        <button id="commits">Show latest commit message</button>
        <p id="commit-${repo.name}"></p>
        <p>Recent push ${pushedDate}</p>
        <p>Branch ${repo.default_branch}</p> 
        <p><a href="${repo.html_url}" target="blank">Repository ${repo.name}</a></p>
        </div>

      `
      })
      drawChart(filtered.length)
      getPR(filtered)
    })
}
const getPR = (repos) => {
  repos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.review_comments_url)
        const myPR = data.find((pull) => pull.user.login === repo.owner.login)
        const myCommits = myPR.commits_url
        // console.log(myCommits)
        getCommits(myCommits, repo.name)
      })
  })
}

const getCommits = (url, myRepoName) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById(
        `commit-${myRepoName}`
      ).innerHTML += `<p>Amount of commits ${data.length}</p>`
    })
}

getUserData()

{
}

// add eventlistener here
tracerBtn.addEventListener('click', (event) => {
  event.preventDefault()
  getRepos()
})
