// GITHUB API
const username = 'Kyparn'
const API_USER = `https://api.github.com/users/${username}`
const API_REPO = `https://api.github.com/users/${username}/repos`
const projects = document.getElementById('projects')
const personData = document.getElementById('personData')

//token
const api_Token = apiToken || process.API_KEY

const options = {
  method: 'GET',
  headers: {
    Authorization: `${apiToken}`,
  },
}

//Prints out the user info in the HTML

const getUserData = () => {
  fetch(API_USER)
    .then((res) => res.json())
    .then((user) => {
      personData.innerHTML = `
  <div class="info">
  <img class="img" src="${user.avatar_url}">
  <h2 class="userInfo"> ${user.name}</h2>
  <h2 class="userInfo">${user.location}</h2>
  <h2 class="userInfo">${user.bio}</h2>
  </div>`
    })
}
getUserData()

// Function to fetch my repositories

const getRepos = () => {
  fetch(API_REPO, options)
    .then((res) => res.json())
    .then((data) => {
      // This function filters out my projects from technigo

      const repos = data.filter(
        (repo) => repo.fork && repo.name.startsWith('project-'),
      )

      repos.forEach((repo) => {
        //Her we create a unique ID for each of my forked repos and print them in the HTML
        let projectID = repo.id

        projects.innerHTML += `
              <div class="repoInfo" id="${projectID}">
              <img src="github.png" class="repoimg" alt="logo" width="25px" />
              <p class="cardInfo" id="commit-${repo.name}"></p>
              <p class="cardInfo">${new Date(repo.pushed_at).toDateString()}</p>
              <p class="cardInfo">Branch ${repo.default_branch}</p> 
              <p class="cardInfo"$> <a href="${
                repo.html_url
              }" target="blank">Repository ${repo.name}</a></p>
          <p class="cardInfo" id="commit-${repo.name}"></p>
          <p class="cardInfo" id="pull-request-${repo.name}">
      Pull requests:</p>

              </div>`

        // Invoking function to get the number of commits for the projects
        getCommits(repo, projectID)
      })
      getPullRequest(repos)
      drawChart(repos.length)
    })
}
// This function
const getPullRequest = (repos) => {
  repos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`,
      options,
    )
      .then((res) => res.json())
      .then((data) => {
        //Filter out my pullrequests
        const pulls = data.find((pull) => pull.user.login === repo.owner.login)
        const myPullRequests = data.filter((pullRequest) => {
          return pullRequest.user.login === username
        })
        document.getElementById(
          `pull-request-${repo.name}`,
        ).innerHTML = `Pull Request: ${myPullRequests.length}`
      })
  })
}
//  Function to get commits and print them out
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
