const projects = document.getElementById('projects')
const USER = 'jakobxlindstrom'
const USER_URL = `https://api.github.com/users/${USER}`

const getUserData = () => {
  fetch(USER_URL)
    .then((res) => res.json())
    .then((data) => {
      projects.innerHTML = `
    <h1>Username: ${data.login}</h1>
    <h4>Full name: ${data.name}</h4>
    <h4>Location : ${data.location}</h4>
    <img src="${data.avatar_url}"/>
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

        projects.innerHTML += `<div id="repoCards" class="repo-cards">
        <button id="commits">Show latest commit message</button>
        <p>Amount of commits..</p><p><a href="${repo.html_url}" target="blank"> My Repo ${repo.name}</a></p>
        <p>Branch ${repo.default_branch}</p> <p>${pushedDate}</p></div>
      `
      })
      drawTimeLine(filtered.length)
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
        getCommits(myCommits)
      })
  })
}

const getCommits = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const amountOfCommits = data.length
      console.log(amountOfCommits)
      projects.innerHTML += `<div id="repoCards" class="repo-cards"><p>Commits from each pull requests ${data.length}</p></div>`
    })
}

getUserData()
getRepos()

// add eventlistener here
