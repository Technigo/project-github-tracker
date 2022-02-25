// DOM SELECTORS
const USER = 'Neaa99'
const userName = document.getElementById('userName')
const myName = document.getElementById('myName')
const userPic = document.getElementById('userPic')
const userBio = document.getElementById('userBio')
const technigoRepos = document.getElementById('technigoRepos')
const repoPush = document.getElementById('repoPush')
const defaultBranch = document.getElementById('defaultBranch')
const repoURL = document.getElementById('repoURL')
const repoCommits = document.getElementById('repoCommits')
const allPullReq = document.getElementById('allPullReq')
const container = document.getElementById('container')
const header = document.getElementById('header')

const API_TOKEN = TOKEN || process.env.API_KEY;

// API
const API_USER = `https://api.github.com/users/${USER}`
const API_REPOS = `https://api.github.com/users/${USER}/repos`

// Authorization
const options = {
    method: 'GET',
    headers: {
          Authorization: `token ${API_TOKEN}`
      }
  }


fetch(API_USER, options)
    .then ((res) => {
        return res.json()
    })
    .then ((data) => {
        console.log(data)
        header.innerHTML = `
        <a class="img-link" target="_blank" href="https://www.linkedin.com/in/linnea-frisk-59a170206/"><img src="${data.avatar_url}" width="100px" alt="User image"></a>
            <div class="header-text">
            <p>${data.name}</p>
                <h1><span>${data.login}</span></h1>
                <h1>GitHub Tracker</h1>
                <p>${data.bio}</p>
            </div>
            
            `
    })

    fetch(API_REPOS, options)
        .then ((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data)
            const technigoRepositories = data.filter(repo => 
                repo.name.includes('project-') && repo.fork === true)

                console.log(technigoRepositories)
            technigoRepositories.forEach((repo) => {
                container.innerHTML += `
                <div class="technigo-repos" id="technigoRepos">
                    <a class="netlify-link" target="_blank" href="https://fascinated-jury-3fb.notion.site/Netlify-5e83f8322f8d4b92a96b4f0e8c2ccf96"><h2 id="repoName">${repo.name}</h2></a>
                    <h3 id="description">${repo.description}</h3>
                    <div class="info">
                        <p><span>• Last push:</span>  ${new Date(repo.pushed_at).toDateString()}</p>
                        <p><span>• Branch:</span> ${repo.default_branch}</p>
                        <p><span>• Main language:</span> ${repo.language}</p>
                        <p id="commit-${repo.name}"><span>• Number of commits:</span> </p>
                    </div>
                    <p> <a class="repo-link" target="_blank" href="${repo.html_url}">Link to Repo</a></p>
                
                </div>
                `

               
            })
            drawChart(technigoRepositories.length) // Calling the chart
            getPullRequests(technigoRepositories) // Calling the pull req and commits function
        })
        

    //Remember to pass along your filtered repos as an argument when
//you are calling this function

const getPullRequests = (repos) => {
    //Get all the PRs for each project.
    repos.forEach(repo => {
      fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`, options)
      .then(res => res.json())
      .then(data => {
        const commits = document.getElementById(`commit-${repo.name}`)

              const pulls = data.find((pull) => pull.user.login === repo.owner.login);

              fetchCommits(pulls.commits_url, repo.name)
              console.log(pulls.commits_url)
              
          })
    })
  }
  
  const fetchCommits = (myCommitsUrl, myRepoName) => {
    fetch(myCommitsUrl, options)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            document.getElementById(`commit-${myRepoName}`).innerHTML += data.length
            
        })
  }

  // Center canvas/chart
  window.onload = window.onresize = function() {
    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
}