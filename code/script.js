// GITHUB API
const username = 'Kyparn'
const API_USER = `https://api.github.com/users/${username}`
const API_REPO = `https://api.github.com/users/${username}/repos`
let reponame = ''
const personData = document.getElementById('personData')

const apiToken = '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'

const api_Token = apiToken || process.API_KEY
console.log(apiToken)

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
        const pushedDate = new Date(repo.pushed_at).toLocaleDateString(
          'en-se',
          {
            hour: '2-digit',
            minute: '2-digit',
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          },
        )

        projects.innerHTML += `
       <div class="repoInfo">
       <p class="cardInfo">Latest push ${pushedDate}</p>
       <p class="cardInfo"> ${repo.name}</p>
        <p class="cardInfo"> ${repo.default_branch}</p>
       <p class="cardInfo"$> <a href="${repo.html_url}" target="blank">Repository ${repo.name}</a></p>
        </div>  `

        const getPullRequests = (repos) => {
          //Get all the PRs for each project.
          repos.forEach((repo) => {
            fetch(
              'https://api.github.com/repos/technigo/' +
                repo.name +
                '/pulls?per_page=200',
              options,
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data)
                //TODO
                //1. Find only the PR that you made by comparing pull.user.login
                // with repo.owner.login
                //2. Now you're able to get the commits for each repo by using
                // the commits_url as an argument to call another function
                //3. You can also get the comments for each PR by calling
                // another function with the review_comments_url as argument
              })
          })
        }
        getPullRequests(filtered)
      })
    })
}

getUserData()
getRepos()
