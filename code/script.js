const USER = 'Rosanna86'
const REPOS_URL = `https://api.github.com/users/${USER}/repos`
const projectContainer = document.getElementById('projects')

const getRepos = () => {
  fetch(REPOS_URL)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('projects-'))
      forkedRepos.forEach(repo => projectsContainer.innerHTML += `<h2>${repo.name}</h2>`)

})


}



getRepos()