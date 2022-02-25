//DOM selectors
const userContainer = document.getElementById ('userContainer')
const projectContainer = document.getElementById ('projectContainer')

//Global selectors
const user = 'josse79'
const API_USER = `https://api.github.com/users/${user}`
const API_REPOS_LIST = `https://api.github.com/users/${user}/repos`

const options = {
  method: 'GET',
  headers: {
    Authorization: 'API_KEY'
  }
}

const getUser = () => {
  fetch(API_USER, options)
  .then(res => res.json())
  .then(data => {
    userContainer.innerHTML = `
     <img class='user-image' src='${data.avatar_url}'/>
     <h2 class='user-name'> ${data.login}</h2>`
  })
  getRepos ()
}

const getRepos = () => {
  fetch(API_REPOS_LIST, options)
  .then(res => res.json())
  .then(data => {
    const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith('project'))
    console.log(forkedRepos)
     forkedRepos.forEach((repo) => {
      projectContainer.innerHTML += `
        <div class='repos' id=${repo.name}>
            <h1>${repo.name}</h1>
            <a href='${repo.html_url}' target='_blank'>${repo.html_url}</a>
            <p>Default branch ${repo.default_branch}</p>
            <p>Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
         </div>`
      })
     getPullRequests(forkedRepos)
     activateChart(forkedRepos.length)
   })

  const getPullRequests = (repos) => {
    repos.forEach(repo => {
      fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`, options)
      .then(res => res.json())
      .then(data => {
        const filteredPulls = data.find((pull) => pull.user.login === repo.owner.login)
        console.log(filteredPulls)
          if (filteredPulls) {
            getCommits(filteredPulls.commits_url, repo.name)
            getReview(filteredPulls.review_comments_url, repo.name)
          } else {
             document.getElementById(`${repo.name}`).innerHTML += `
               <p>No pull request made</p>`
           }
      })
    })
  }

  const getCommits = (URL, repoName) => {
    fetch(URL, options)
    .then(res => res.json())
    .then(data => {
      document.getElementById(repoName).innerHTML += `
        <p>Number of commits: ${data.length}</p>`
    })
  }

  const getReview = (URL, repoName) => {
    fetch(URL, options)
    .then(res => res.json())
    .then(data => {
     console.log(data)
      if (`${data[0].user.login} == ''`) {
        document.getElementById(repoName).innerHTML += `
          <p>Review made by: ${data[0].user.login}</p>`
      } else {
             }
      })
  }
}

getUser ()
