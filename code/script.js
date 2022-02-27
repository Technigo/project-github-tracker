// GITHUB API
const username = 'Kyparn'
const API_USER = `https://api.github.com/users/${username}`
const API_REPO = `https://api.github.com/users/${username}/repos`
const projects = document.getElementById('projects')
const personData = document.getElementById('personData')

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
  <h2>${user.bio}</h2>
  </div>`
    })
}
getUserData()

// Function to fetch my repositories
const getRepos = () => {
  fetch(API_REPO, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      // Filter to get only my forked repos from Technigo
      const filtered = data.filter(
        (repo) => repo.fork && repo.name.startsWith('project-'),
      )

      filtered.forEach((repo) => {
        // Creating unique ID for each forked repo
        let projectID = repo.id

        projects.innerHTML += `
              <div class="repoInfo" id="${projectID}">
              <img src="github.png" class="repoimg" alt="logo" width="25px" />
              <p class="cardInfo">${new Date(repo.pushed_at).toDateString()}</p>
              <p class="cardInfo">Branch ${repo.default_branch}</p> 
              <p class="cardInfo"$> <a href="${
                repo.html_url
              }" target="blank">Repository ${repo.name}</a></p>

              </div>`

        // Invoking function to get the number of commits for the projects
        getCommits(repo, projectID)
      })
      getPullRequests(filtered)
      drawChart(filtered.length)
    })
}

const getPullRequests = (filtered) => {
  filtered.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`,
      options,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const pulls = data.find((pull) => pull.user.login === repo.owner.login)
      })
  })
}

const getCommits = (projects, projectID) => {
  const GIT_COMMIT_API = projects.commits_url.replace('{/sha}', '')
  fetch(GIT_COMMIT_API, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      let numberOfCommits = data.length
      document.getElementById(projectID).innerHTML += `
      <p>Number of commits: ${numberOfCommits}</p>`
    })
}

getRepos()
