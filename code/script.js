const userSection = document.getElementById ('userSection')
const repoSection = document.getElementById ('repoSection')

const username = 'mistscale'
const API_USER_URL = `https://api.github.com/users/${username}`
const API_REPOS_URL = `https://api.github.com/users/${username}/repos`

const options = {
    method: 'GET',
    headers: {
        Authorization: 'API_TOKEN'
      }
  }

// Display profile picture and username
const getUser = () =>  {
    fetch(API_USER_URL, options)
    .then(res => res.json())
    .then(data => {
        userSection.innerHTML = `
        <img src='${data.avatar_url}' class='profile-img'/>
        <h2>${data.login}</h2>`
    })
   getRepos() 
}

const getRepos = () => {
    fetch(API_REPOS_URL, options)
    .then(res => res.json())
    .then(data => {
       const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith('project'))
       forkedRepos.forEach((repo) => {
           repoSection.innerHTML += `
           <div class='projects' id='${repo.name}'>
            <h2>${repo.name}</h2>
            <p>Repo link: <a href='${repo.html_url}'>here</a></p>
            <p>Default branch: ${repo.default_branch}</p>
            <p>Recent update: ${new Date(repo.pushed_at).toLocaleDateString('sv-SE')}</p>
           </div>`
       })
       getPullRequests(forkedRepos)
       activateChart(forkedRepos.length)
    })

const getPullRequests = (forkedRepos) => {
    forkedRepos.forEach(repo => {
        fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`, options)
        .then(res => res.json())
        .then(data => {

            const filterPullRequests = data.find((pull) => pull.user.login === repo.owner.login)
            
            if (filterPullRequests) {
                document.getElementById(`${repo.name}`).innerHTML += `
                <p>Pull request: <a href='${filterPullRequests.html_url}'>here</a></p>`
            } else {
                document.getElementById(`${repo.name}`).innerHTML += `
                <p>Pull request by team member</p>`
            }
            if (filterPullRequests) {
                getCommits(filterPullRequests.commits_url, repo.name) 
            } else {
                document.getElementById(`${repo.name}`).innerHTML += `
                <p>Commits by team member</p>`
            }
        })
    })
}

const getCommits = (commitsURL, repoName) => {
    fetch(commitsURL)
    .then((res) => res.json())
    .then (data => {
      document.getElementById(repoName).innerHTML += `
      <p>Commits: ${data.length}</p>`
  })
}}

getUser()
