const projects = document.getElementById('projects')
const USER = 'jakobxlindstrom'
const USER_URL = `https://api.github.com/users/${USER}`

const getUserData = () => {
  fetch(USER_URL)
    .then((res) => res.json())
    .then((data) => {
      projects.innerHTML = `
      <div class="personal-info">
    <h1>Username: ${data.login}</h1>
    <h4>Full name: ${data.name}</h4>
    <h4>Location : ${data.location}</h4>
    <img class="img" src="${data.avatar_url}"/>
    </div>
     `
    })
}

const getRepos = () => {
  fetch(`https://api.github.com/users/${USER}/repos`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
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
        <p id="commit-${repo.name}"></p>
        <button id="commits">Show latest commit message</button>
        <p><a href="${repo.html_url}" target="blank"> My Repo ${repo.name}</a></p>
        <p>Branch ${repo.default_branch}</p> 
        <p>Recent push ${pushedDate}</p>
        
        </div>

      `
      })
      // drawTimeLine(filtered.length)
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
        console.log(data.review_comments_url)
        const myPR = data.find((pull) => pull.user.login === repo.owner.login)
        const myCommits = myPR.commits_url
        console.log(myCommits)
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
      ).innerHTML += `<p>Commits from each pull requests ${data.length}</p>`
    })
}

getUserData()
getRepos()

// add eventlistener here

{
  /* <p id="commit-${repo.name}">Amount of commits </p> */
}
