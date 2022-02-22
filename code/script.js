const username = 'Nosslexa'
let reponame = ''
const API_URL = `https://api.github.com/users/${username}/repos`




// This function fetch all my repos and then filters out the ones forked = true and starts with "project-"
const getRepos = () => {
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        
        const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith("project-"))
        console.log(forkedRepos)

        // const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`
        //     .fetch(API_URL_PR)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data)
        //     })
    })
}
getRepos()

const getPullRequests = (repos) => {
    repos.forEach(repo => {
      fetch('https://api.github.com/repos/technigo/' + repo.name + '/pulls')
      .then(res => res.json())
      .then(data => {
           console.log(data)
          })
    })
  }
getPullRequests()
























