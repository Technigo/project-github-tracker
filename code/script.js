// console.log("script works?")

const userName = "JohannaMJ"
const REPOS_API_URL = `https://api.github.com/users/${userName}/repos`
const USER_URL = `https://api.github.com/users/${userName}`
// const PULL_API_URL = `https://api.github.com/repos/technigo/${repo.name}/PULLS`
const reposContainer = document.getElementById("projects")
const profileContainer = document.getElementById("profileContainer")
const pullRequestData = document.getElementById("pullRequestData")

// let repoName = document.getElementById("repo.name")

const userProfile = () => {
  fetch(USER_URL)
  .then(response => response.json())
  .then(data => {
    // console.log(data)
    profileContainer.innerHTML = `
    <h2>Username: ${data.login}</h2>
    <p>Full name: ${data.name}</p>
    <p>Location: ${data.location}</p>
    <img src="${data.avatar_url}"/>
   
    `

  })
}

const fetchRepos = () => {
  fetch(REPOS_API_URL)
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      
      // const repo = repo.name
      const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith("project-")
      )
      forkedRepos.forEach(repo => reposContainer.innerHTML += `
      <h3>${repo.name}</h3>
      <p><a href="${repo.html_url}" target="blank">${repo.html_url}</a></p>
      <p>${repo.default_branch}</p>
      <p>${repo.pushed_at}</p>
      `)
      drawChart(forkedRepos.length)
      getPullRequests(forkedRepos)
      // console.log(forkedRepos)
    })
    .catch(() => {
      reposContainer.innerHTML = `<h3>Sorry, we could not find the information</h3>`
    })
    
    
}


const getPullRequests = (repos) => {
  //Get all the PRs for each project.
  repos.forEach((repo) => {
    fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`)
    .then(res => res.json())
    .then(data => {
        const myPull = data.find(pull => pull.user.login === repo.owner.login) 
        // console.log(myPull)
        fetchCommits(myPull.commits_url)
      // if (data.user.login === userName && data.repo.owner.login === userName) {
      // }

			//TODO
	    //1. Find only the PR that you made by comparing pull.user.login
			// with repo.owner.login
			//2. Now you're able to get the commits for each repo by using
			// the commits_url as an argument to call another function
			//3. You can also get the comments for each PR by calling
			// another function with the review_comments_url as argument
		})
  })
}

const fetchCommits = (url) => {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    // console.log(data)
    pullRequestData.innerHTML += `
    <p>${data.length}</p>
    `
  })
}

userProfile()
fetchRepos()
// showCommits()
// getPullRequests()
