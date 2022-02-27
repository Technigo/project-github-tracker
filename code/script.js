// DOM-selectors stored as variables
const container = document.getElementById('container')

// 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 github API

// global variables
const username = 'mathildakarlsson'
const API_REPOS = `https://api.github.com/users/${username}/repos`
let reponame


//personal token
const options = {
    method: 'GET',
    headers: {
          Authorization: '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'
      }
  }
  
  console.log(API_TOKEN)

//Fetch 1

const getRepos = () => { 

    fetch(API_REPOS, options)
    .then(res => res.json())
    .then(data => {
        
    const filteredRepos = data.filter((repo) => repo.fork && repo.name.startsWith('project'))
   
    filteredRepos.forEach((data) => {
        let projectID = data.id
        container.innerHTML += `
          <div class="repos" id="${projectID}">
          <h3>${data.name}</h3>
          <a href="${data.html_url}">
          <p>${data.name}</p></a>
          <p>Branch: ${data.default_branch}</p>
          <p id="repoName">Number of commits: </p>
          </div>
        `
    })
    
    // Fetch 2
    
    const API_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`
    const getPullRequests = (data) => { 
        data.forEach(repo => {
            fetch(API_PR)
            .then(res => res.json())
            .then(data => {
                const myPullRequests = data.find((pull) => pull.user.login === repo.owner.login)
                if (myPullRequests) {
                    getCommits(data, projectID)
                } else {
                    document.getElementById(`${data.name}`).innerHTML += `
                    <p>Is this working?</p>
                    `
                }
                getPullRequests(filteredRepos)
    })
})

    
}
    
    
//Fetch 3
const getCommits = (projects, projectsID) => { 
    const API_COMMIT = projects.commits_url.replace("{/sha}","")
    fetch(API_COMMIT, options)
    .then(res => res.json())
    .then(data => {
        let numberOfCommits = data.length
        document.getElementById(projectsID).innerHTML += `
        <p>Number of commits: ${numberOfCommits}</p>
        `
        })
    }
})
}


getRepos()
    
                    