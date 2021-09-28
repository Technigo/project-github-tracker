const USER = 'jenquach'
const repoNames = ['project-news-site', 'project-business-site', 'project-chatbot', 'project-guess-who', 'project-weather-app', 'project-github-tracker']
const commitsURL = ['https://api.github.com/repos/Technigo/project-news-site/pulls/242/commits', 'https://api.github.com/repos/Technigo/project-business-site/pulls/222/commits']
const REPOS_URL = `https://api.github.com/users/${USER}/repos`

const projectsContainer = document.getElementById('projects')
const pullRequests = document.getElementById('pullrequests')


const getRepos = () => {
  fetch(REPOS_URL)
  .then(res => res.json())
  .then(data => {
      console.log(data)
      // data.forEach(repo => console.log(repo.name)
      const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
      forkedRepos.forEach(repo => projectsContainer.innerHTML += `<h3>${repo.name}</h3>`)
      drawChart(forkedRepos.length)
  })
}


const getPRs = () => {
  repoNames.forEach(name => {
    fetch(`https://api.github.com/repos/Technigo/${name}/pulls`)
    .then(res => res.json())
    .then(data => {
      for (let i=0; i<data.length; i++) {
        // console.log(data[i].user.login)
        if (data[i].user.login === USER) {
          console.log(data[i])
          pullRequests.innerHTML += `<h3>${data[i].title}</h3>`
        }
      }
    })
  })
}

const getCommits = () => {
  
}


getRepos()
getPRs()