const USER = 'Lundgreneddie'
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const profileContainer = document.getElementById('profile');
const projectsContainer = document.getElementById('projects');
const pullContainer = document.getElementById('pullRequests');

const getProfile = () => {
  fetch (`https://api.github.com/users/${USER}`)
    .then(res => res.json())
    .then(json => {
      profileContainer.innerHTML = `
      <h2>${json.login}</h2>
      <img src=${json.avatar_url}>
      `
    })
}
getProfile()

const getRepos = () => {
    fetch(REPOS_URL)
     .then(res => res.json())
     .then(json => {
        console.log(json);
        //data.forEach(repo => console.log(repo.name))
        const forkedRepos = json.filter(repo => repo.fork && repo.name.startsWith('project-'))
        forkedRepos.forEach(repo => projectsContainer.innerHTML += `<h3>${repo.name}<h3>
        <h3>${repo.pushed_at.slice(0, 10)}: ${repo.pushed_at.slice(11, 16)}</h3>
        <h3>${repo.default_branch}</h3>
        <a href=${repo.html_url}>Go here</a>
      `)

      drawChart(forkedRepos.length)
    })   
 }

 getRepos()

 //fetch for Technigo pull requests
 const getPullRequests = (repos) => {
  repos.forEach(repo => {
    fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls`)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      
      const pullRequest = json.filter(pull => pull.user.login.includes('Lundgreneddie'))
      pullRequest.forEach(repo => pullContainer.innerHTML += `<h3>${repo}</h3>`)
		})
  })
}