// GITHUB API
const username = 'Kyparn'
const API_USER = `https://api.github.com/users/${username}`
const API_REPO = `https://api.github.com/users/${username}/repos`
let reponame = ''
const personData = document.getElementById('personData')

const apiToken = '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'

const api_Token = apiToken || process.API_KEY
//console.log(apiToken)

const options = {
  method: 'GET',
  headers: {
    Authorization: `${apiToken}`,
  },
}

//USER INFO

const getUserData = () => {
  fetch(API_USER)
    .then((res) => res.json())
    .then((user) => {
      console.log(user)
      personData.innerHTML = `
  <div class="info">
  <img class="img" src="${user.avatar_url}">
  <h2> ${user.name}</h2>
  <h2>${user.location}</h2>
  <h2></h2>
  <h2></h2> 
  </div>`
    })
}
getUserData()
// ALL OF MY REPOS

const getRepos = () => {
  fetch(API_REPO, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)

      // Filtering in out my forkd repo
      const filtered = data.filter(
        (repo) => repo.fork && repo.name.startsWith('project-'),
      )
      console.log(filtered)

      filtered.forEach((repo) => {
        let projectID = repo.id

        projects.innerHTML += `
       <div class="repoInfo id="${projectID}">
       <p class="cardInfo">${new Date(repo.pushed_at).toDateString()}</p>
       <p class="cardInfo"> ${repo.name}</p>
        <p class="cardInfo"> ${repo.default_branch}</p>
       <p class="cardInfo"$> <a href="${
         repo.html_url
       }" target="blank">Repository ${repo.name}</a></p>
        </div>  `
        getCommits(data, projectID)
      })

      //chart
      getPullRequests(filtered)
      drawChart(filtered.length)
    })
}
const getPullRequests = (repos) => {
  //Get all the PRs for each project.
  repos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`,
      options,
    )
      .then((res) => res.json())
      .then((data) => {
        const commits = document.getElementById(`commit-${repo.name}`)

        const pulls = data.find((pull) => pull.user.login === repo.owner.login)
      })
  })
}
// Function to get commits
const getCommits = (projects, projectID) => {
  const GIT_COMMIT_API = projects.commits_url.replace('{/sha}', '')
  fetch(GIT_COMMIT_API, options)
    .then((res) => res.json())
    .then((data) => {
      let numberOfCommits = data.length
      document.getElementById(projectID).innerHTML += `
      <p>Number of commits: ${numberOfCommits}</p>`
    })
}
getRepos()
