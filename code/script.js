const projects = document.getElementById('projects')
const personData = document.getElementById('personData')
const USER = 'jakobxlindstrom'
const USER_URL = `https://api.github.com/users/${USER}`
const tracerBtn = document.getElementById('tracerBtn')

// This function simply fetches and presents my user data through innerhtml.
const getUserData = () => {
  fetch(USER_URL)
    .then((res) => res.json())
    .then((data) => {
      personData.innerHTML = `
      <div class="personal-info">    
      <img class="img" src="${data.avatar_url}">
      <h2 class="info">Full name: ${data.name}</h2>
      <h2 class="info">Located in ${data.location}, Sweden</h2>
      <h2 class="info">Github account:  ${data.login}</h2>
    </div>
     `
    })
}

// Inside this function I fetch all the repositories connceted to my github account, presents fetched data and also invokes
// the chart and the next function getPR.
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

        projects.innerHTML += `
        
          <div id="${repo.name}"" class="repo-cards">

            <p class="card-info" id="commit-${repo.name}"></p>
            <p class="card-info">Recent push ${pushedDate}</p>
            <p class="card-info">Branch ${repo.default_branch}</p> 
            <p class="card-info"><a href="${repo.html_url}" target="blank">Repository ${repo.name}</a></p>
          <div class="small-logo"><a href="${repo.html_url}" target="blank">
            <img src="./github_icon.png" class="logo">
            </a>
          </div>
        </div>

      `
      })
      drawChart(filtered.length)
      getPR(filtered)
    })
}
// The pull reguest function fetches all the pull requests where I have been repository owner on github,
//otherwise a else message will appear tell otherwise.
const getPR = (repos) => {
  repos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`
    )
      .then((res) => res.json())
      .then((data) => {
        const myPR = data.find((pull) => pull.user.login === repo.owner.login)
        if (myPR) {
          getCommits(myPR.commits_url, repo.name)
        } else {
          document.getElementById(`commit-${repo.name}`).innerHTML =
            'No pull request yet done :('
        }
      })
  })
}

// This function gets the commits of each pull request and presents it together with earlier fetched data in the "repo cards"
const getCommits = (url, myRepoName) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let commitMessage = data[data.length - 1].commit.message
      document.getElementById(
        `commit-${myRepoName}`
      ).innerHTML += `<p class="card-info">Amount of commits ${data.length}</p>
      <p class="card-info">${commitMessage}</p>
      `
    })
}

// When launching the site this function is invoked directly, simultaing a "landing" feeling before pushing the tracker button
getUserData()

{
}

// This addEventListener makes it possible to view the fetched data by a button click under the userdata
tracerBtn.addEventListener('click', (event) => {
  event.preventDefault()
  getRepos()
})
