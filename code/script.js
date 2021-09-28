const USER = 'jenquach'
const repoNames = ['project-business-site', 'project-chatbot']
const REPOS_URL = `https://api.github.com/users/${USER}/repos`

const projectsContainer = document.getElementById('projects')


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


const getPRs = (repoNames) => {
  repoNames.forEach(name => {
    fetch(`https://api.github.com/repos/Technigo/${name}/pulls`)
    .then(res => res.json())
    .then(data => {
    console.log(data)
    })
  })
}


getRepos()
getPRs()