const username = 'NabeelMansour'
const container = document.getElementById('container')
const header = document.getElementById('header')
const technigoRepos = document.getElementById('technigoRepos')
// DOM selectors
const userName = document.getElementById('username')
const project = document.getElementById('projects')
const chart = document.getElementById('chart');
const options = {
	method: 'GET',
	headers: {
		Authorization: `token ${token}`
	}
}
// API'S
const USER_API = `https://api.github.com/users/${username}`
const API_REPOS = `https://api.github.com/users/${username}/repos`
// fetch for the user info
fetch(USER_API, ).then(res => res.json()).then(data => {
	header.innerHTML += `
    <div class="header-text">
      <img src="${data.avatar_url}" class="image" />
      <p>${data.name}</p>
      <h1><span>${data.login}</span></h1>
      <h2>GitHub Tracker</h2>
      <p>${data.bio}</p>
    </div>
    `
})
// fetch the users reposetories
fetch(API_REPOS).then(res => res.json()).then(data => {
	const technigoRepositories = data.filter(repo => repo.name.includes('project-') && repo.fork)
	technigoRepositories.forEach((repo) => {
		container.innerHTML += `
          <div class="technigo-repos" id="technigoRepos">
            <h2 id="repoName">${repo.name}</h2>
            <h3 id="description">${repo.description}</h3>
            <div class="repo-info">
                <p><span> Last push:</span>  ${new Date(repo.pushed_at).toDateString()}</p>
                <p><span> Branch:</span> ${repo.default_branch}</p>
                <p><span> Main language:</span> ${repo.language}</p>
                <p id="commit-${repo.name}"><span> Number of commits:</span> </p>
            </div>
            <p><a class="repo-link" target="_blank" href="${repo.html_url}">My Repo</a></p>
          </div>
                `
	})
	drawChart(technigoRepositories.length)
	getPullRequests(technigoRepositories) // Calling the pull req and commits function
})
// Gets the pull request for the projects
const getPullRequests = (forkedRepos) => {
	forkedRepos.forEach(repo => {
		fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`).then(res => res.json()).then(data => {
			const commit = document.getElementById(`commit-${repo.name}`)
			const filteredPulls = data.find((pull) => pull.user.login === repo.owner.login)
			fetchCommits(filteredPulls.commits_url, repo.name)
		})
	})
}
// fetches the commits 
const fetchCommits = (myCommitsUrl, myRepoName) => {
	fetch(myCommitsUrl).then(res => res.json()).then((data) => {
		document.getElementById(`commit-${myRepoName}`).innerHTML += data.length
	})
}©
2022 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About 
      




 



       
        

