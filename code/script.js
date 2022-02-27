// DOM-selectors stored as variables
const userContainer = document.getElementById('user-container')
const projectsContainer = document.getElementById('projects-container')


// global variables
const username = 'mathildakarlsson'
const API_USER = `https://api.github.com/users/${username}`
const API_REPOS = `https://api.github.com/users/${username}/repos`
let reponame


//personal token
const options = {
    method: 'GET',
    headers: {
          Authorization: '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'
      }
  }


// fetch user
const getUser = () => {
    fetch(API_USER, options)
    .then(res => res.json())
    .then(data => {
        userContainer.innerHTML += `
        <div class="user">
        <img class="user-img"src="${data.avatar_url}">
        <h2 class="user-name"> ${data.login}    
    `
    })
getRepos()
}


//Fetch 1

const getRepos = () => { 

    fetch(API_REPOS, options)
    .then(res => res.json())
    .then(data => {
    console.log(data)
        
    const filteredRepos = data.filter((repo) => repo.fork && repo.name.startsWith('project'))
   
    filteredRepos.forEach((data) => {
        projectsContainer.innerHTML += `
          <div class="repos" id="${data.name}">
          <h3>${data.name}</h3>
          <a href="${data.html_url}">
          <p>Link to repo</p></a>
          <p>Branch: ${data.default_branch}</p>
          <p>Main language: ${data.language}</p>
          <p>Latest push: ${data.pushed_at}</p>
          <p id="${data.name}">Number of commits: </p>
          </div>
        `
    })
    
    // Fetch 2
    
    const API_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`
    const getPullRequests = (data) => { 
        data.forEach(repo => {
            fetch(API_PR, options)
            .then(res => res.json())
            .then(data => {
                const myPullRequests = data.find((pull) => pull.user.login === repo.owner.login)
                const API_COMMIT = myPullRequests.commits_url
                const dataName = data.name
                if (myPullRequests) {
                    getCommits(API_COMMIT, dataName)
                } else {
                    projectsContainer.innerHTML += `
                    <p>Is this working?</p>
                    `
                }
            })
        getPullRequests(filteredRepos)
    })
}

    

    
    
//Fetch 3
const getCommits = (API_COMMIT, dataName) => { 
    fetch(API_COMMIT, options)
    .then(res => res.json())
    .then(data => {
        // let numberOfCommits = [data.length]
        document.getElementById(dataName).innerHTML += `
        <p>Number of commits: ${data.length}</p>
        `
        })
    }
})

}
getUser()
    
                    