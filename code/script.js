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

// API
const API_USER = `https://api.github.com/users/${USER}`
const API_REPOS = `https://api.github.com/users/${USER}/repos`

// Authorization
const options = {
    method: 'GET',
    headers: {
          Authorization: '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'
      }
  }


fetch(API_USER, options)
    .then ((res) => {
        return res.json()
    })
    .then ((data) => {
        console.log(data)
        userName.innerHTML = `<h1>${data.login}</h1>`
        myName.innerHTML = `<p>${data.name}</p>`
        userPic.innerHTML = `<img src="${data.avatar_url}" width="100px" alt="User image">`
        userBio.innerHTML = `<p>${data.bio}</p>`
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
                technigoRepos.innerHTML += `
                <div class="technigo-repos" id="technigoRepos">
                <h2>${repo.name}</h2>
                <h3>${repo.description}</h3>
                <p>Last push: ${repo.pushed_at}</p>
                <p>Branch: ${repo.default_branch}</p>
                <p>Main language: ${repo.language}</p>
                <p id="commit-${repo.name}">Number of commits: </p>
                <p> <a href="${repo.html_url}">Link to Repo</a></p>
                
                </div>
                `

               
            })
            getPullRequests(technigoRepositories)
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
              //TODO
          //1. Find only the PR that you made by comparing pull.user.login
              // with repo.owner.login
              const pulls = data.find((pull) => pull.user.login === repo.owner.login);
            //   console.log(pulls)
            //   commits.innerHTML += `
            //     ${pulls.number}
            //   `
              fetchCommits(pulls.commits_url, repo.name)
              console.log(pulls.commits_url)
              
              
              
              //2. Now you're able to get the commits for each repo by using
              // the commits_url as an argument to call another function

              //3. You can also get the comments for each PR by calling
              // another function with the review_comments_url as argument
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