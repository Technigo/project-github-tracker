// const options = {
//     method: 'GET',
//     headers: {
//         Authorization: `token ${token}`
//     }
// }

const USER = 'intehon'
const REPOS_URL = `https://api.github.com/users/${USER}/repos`
const USER_INFO_URL = `https://api.github.com/users/${USER}`

const projectsContainer = document.getElementById('projects')
const infoContainer = document.getElementById('info-container')

const getUserInfo = () => {
    fetch(USER_INFO_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log('user data: ', data)
        infoContainer.innerHTML += `
        <img class="user-img" src="./images/profil.jpg" alt="Profile Picture" />
        <div class="user-info"><h1>${data.name}</h1><a href="https://github.com/intehon"><h3>${data.login}</h3></a><h3>${data.location}</h3><h3>${data.bio}</h3></div>`
      })
    }



const fetchRepos = () => {
    fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
        console.log('my repos: ', data)
        const technigoRepos = data.filter(
            (repo) => repo.name.includes('project-') && repo.fork)
        technigoRepos.forEach(
            (repo) => {
            projectsContainer.innerHTML += `
            <div class="project-container">
            <a href="${repo.html_url}">${repo.name}</a>
            <p>Default branch ${repo.default_branch}</p>
            <p>Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
            <p id="commit-${repo.name}">Commits amount: </p>
            </div>
            `
            // Approach number 1
            // fetchPullRequestsSingle(repo)
        })

        // Approach number 2
        fetchPullRequestsArray(technigoRepos)

        // Draw chart with technigoRepos data
        drawChart(technigoRepos.length)
    })
}   
    // Approach number 1
// const fetchPullRequestsSingle = (singleRepository) => {
//     fetch(singleRepository)
// }

// Approach number 2
const fetchPullRequestsArray = (allRepositories) => {
  allRepositories.forEach((repo) => {
      const PULL_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`

        fetch(PULL_URL)
        .then((response) => response.json())
        .then((data) => {
            const myPullRequests = data.find((pull) => pull.user.login === repo.owner.login
            )
            console.log(myPullRequests)

            // Detect if we have pull request or not.
			// If yes - call fetchCommits function
			// If no - inform user that no pull request was yet done
			if (myPullRequests) {
				fetchCommits(myPullRequests.commits_url, repo.name)
			} else {
				document.getElementById(`commit-${repo.name}`).innerHTML =
					'No pull request or commits done'
			}

        })
  })
    
}

const fetchCommits = (myCommitsUrl, myRepoName) => {
	fetch(myCommitsUrl)
		.then((res) => res.json())
		.then((data) => {
			document.getElementById(`commit-${myRepoName}`).innerHTML += data.length
            console.log('my commits: ', data)
		})
}

 
    fetchRepos()
    getUserInfo()