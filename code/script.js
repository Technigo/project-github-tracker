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
        //   Authorization: `token ${API_TOKEN}`
        Authorization: `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`
      }
  }


fetch(API_USER, options)
    .then ((res) => {
        return res.json()
    })
    .then ((data) => {
        console.log(data)
        header.innerHTML = `
        <a class="img-link "href"#"><img src="${data.avatar_url}" width="100px" alt="User image"></a>
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
                    <a class="netlify-link"  href="https://fascinated-jury-3fb.notion.site/Netlify-5e83f8322f8d4b92a96b4f0e8c2ccf96"><h2 id="repoName">${repo.name}</h2></a>
                    <h3 id="description">${repo.description}</h3>
                    <div class="info">
                        <p><span>• Last push:</span>  ${new Date(repo.pushed_at).toDateString()}</p>
                        <p><span>• Branch:</span> ${repo.default_branch}</p>
                        <p><span>• Main language:</span> ${repo.language}</p>
                        <p id="commit-${repo.name}"><span>• Number of commits:</span> </p>
                    </div>
                    <p> <a class="repo-link" href="${repo.html_url}">Link to Repo</a></p>
                
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