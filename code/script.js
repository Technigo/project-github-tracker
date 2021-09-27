console.log("script works?")

const userName = "JohannaMJ"
const REPOS_API_URL = `https://api.github.com/users/${userName}/repos`
// const PULL_API_URL = `https://api.github.com/repos/technigo/${repo.name}/PULLS`
const reposContainer = document.getElementById("projects")


const fetchRepos = () => {
  fetch(REPOS_API_URL)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      
      // const repo = repo.name
      const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith("project-")
      )
      forkedRepos.forEach(repo => reposContainer.innerHTML += `
      <h3>${repo.name}</h3>
      <p><a href="${repo.html_url}" target="blank">${repo.html_url}</a></p>
      <p>${repo.default_branch}</p>
      `)
      getPullRequests(forkedRepos)
      console.log(forkedRepos)
    })
    .catch(() => {
      reposContainer.innerHTML = `<h3>Sorry, we could not find the information</h3>`
    })
    
    
}
fetchRepos()

const getPullRequests = (repos) => {
  console.log(repos)
  //Get all the PRs for each project.
  repos.forEach((repo) => {
    fetch(`https://api.github.com/repos/technigo/${repo.name}/PULLS`)
    .then(res => res.json())
    .then(data => {
      console.log(data)

      if (data.user.login === userName && data.repo.owner.login === userName) {
        console.log("hej")
      }

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

getPullRequests()
