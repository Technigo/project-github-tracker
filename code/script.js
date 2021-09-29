const USER = "waliem"
const REPOS_URL = `https://api.github.com/users/${USER}/repos`
const USER_INFO_URL = `https://api.github.com/users/${USER}`
// let repoName = repo.name

const projectsContainer = document.getElementById("projects")
const userContainer = document.getElementById("user-info")

const getUserInfo = () => {
  fetch(USER_INFO_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log("USER DATA", data)
      userContainer.innerHTML += `
      <img src="https://avatars.githubusercontent.com/u/84201089?v=4" alt="User profile picture"> 
      <span id="profile-name"> <h2>Emelie Lindblom</h2>
      <h3>Username: ${data.login}</h3></span>`
    })
}

const getRepos = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log("MY REPOS", data)
      let forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      )
      forkedRepos.forEach(
        (repo) =>
          (projectsContainer.innerHTML += `
        <div class="project-box"> 
        <a href="${repo.html_url}"> ${repo.name}</a> <p>Default branch: ${
            repo.default_branch
          }</p>
        <p>Most recent push: ${new Date(repo.pushed_at).toDateString()}</p>
        <p id="commit-${repo.name}">Commits: </p> `)
      )

      drawChart(forkedRepos.length)
      getPullRequests(forkedRepos)
    })
}

const getPullRequests = (forkedRepos) => {
  forkedRepos.forEach((repo) => {
    const PULLS_URL = `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`

    fetch(PULLS_URL)
      .then((res) => res.json())
      .then((data) => {
        // console.log(`Mother repo for project ${repo.name}`, data)

        const myPulls = data.find(
          (pull) => pull.user.login === repo.owner.login
        )
        // console.log(myPulls)

        getMyCommits(myPulls.commits_url, repo.name)

        // fetch(`https://api.github.com/repos/${USER}/${repo.name}/commits`)
        //   .then((res) => res.json())
        //   .then((data) => {
      })
  })
}

const getMyCommits = (myCommitsUrl, myRepoName) => {
  fetch(myCommitsUrl)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById(`commit-${myRepoName}`).innerHTML += data.length
      console.log("my commits!", data)
    })
}

getUserInfo()
getRepos()
