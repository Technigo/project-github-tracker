const REPOS_URL = "https://api.github.com/users/Lundgreneddie/repos";
const PR_URL = "https://api.github.com/repos/technigo/${reponame}/pulls"
const projectsContainer = document.getElementById('projects');
const pullContainer = document.getElementById('pullRequests');

const getRepos = () => {
    fetch(REPOS_URL)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      //data.forEach(repo => console.log(repo.name))
      const forkedRepos = json.filter(repo => repo.fork && repo.name.startsWith('project-'))
      forkedRepos.forEach(repo => projectsContainer.innerHTML += `<h3>${repo.name}<h3>`)
      drawChart(forkedRepos.length)
      getPullRequests(forkedRepos)
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