const USER = 'Rosanna86'
const searchBtn = document.getElementById('repo-search')
const REPOS_URL = `https://api.github.com/users/${USER}/repos`
const USER_URL = `https://api.github.com/users/${USER}`
const projectsContainer = document.getElementById('projects')
const userContainer = document.getElementById('myProfile')

let repos;

const userProfile = () => {
  fetch(USER_URL)
  .then(res => res.json())
  .then(data => {
      console.log(data);
      userContainer.innerHTML = `
      <h2>Username: ${data.login}</h2>
      <p>Full name: ${data.name}</p>
      <p>Location: ${data.location}</p>
      <img src="${data.avatar_url}"/>
      `
    })
}

userProfile()



const getRepos = () => {
  fetch(REPOS_URL, {
  
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
      repos = forkedRepos
      forkedRepos.forEach(repo => projectsContainer.innerHTML += `<h3>${repo.name}</h3>`)
      drawChart(forkedRepos.length)
      getPullRequests(repos)
    })

}
getRepos()


const getPullRequests = (repos) => {
  repos.forEach(repo => {
    console.log(repo)
    fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls`, {
    
    })
      .then(res => res.json())
      .then(data => {
        console.log(repo.name)
        console.log(data)
        const myPullRequest = data.filter((pull) => {
          return pull.user.login === repo.owner.login
        })
        console.log(myPullRequest)

      })

  })
}

const getCommits = (repos) => {
  repos.forEach(repo => {
    fetch(myCommitsUrl)
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  
  })
  
  }



  // searchBtn.addEventListener('click', () => {
  //   getRepos()
  // })