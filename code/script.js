//DOM selectors

//Global selectors
const username = 'josse79'
let reponame = ''
const API_REPOS = `https://api.github.com/users/${username}/repos`


const getRepos = () => {
     fetch(API_REPOS)
     .then((res) => res.json())
     .then((data) => {
        console.log(data)
        reponame = data.name
        const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith('project'))
        console.log(forkedRepos)


      forkedRepos.forEach = ((repo) => (
        console.log(repo.name)
      ))
      
        })
  }
 













getRepos ()