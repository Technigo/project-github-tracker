// API's
const USER = 'Mattsson717'
const REPOS_URL = `https://api.github.com/users/${USER}/repos`
const PROFILE_URL = `https://api.github.com/users/${USER}`
const COMMITS_URL = `https://api.github.com/repos/${USER}/project-business-site/commits`
const projectsContainer = document.getElementById('projects')
const profileContainer = document.getElementById('profile')

// Profile
const getProfile = () => {
    fetch(PROFILE_URL)
    .then(response => response.json())
    .then(data => {
        console.log('Profile:',data)
        profileContainer.innerHTML += `
        <div class="profile-card">
        <img class="profile-img" src=${data.avatar_url} alt="profile-image">
        <h2>${data.login}</h2>
        </div>`
    })
}
getProfile()

// Repositories
const getRepos = () => {
    fetch(REPOS_URL)
    .then(res => res.json())
    .then(data => {
        console.log('json:',data)
        const forkedRepos = data.filter(
            (repo) => repo.name.includes('project-') && repo.fork
            )
            forkedRepos.forEach((repo) => {
                projectsContainer.innerHTML += 
            `
            <div class="project-cards">
            <a href="${repo.html_url}"><h3>${repo.name}</h3></a>
             <p>Default branch: ${repo.default_branch}</p>
             <p>Latest push: ${new Date(repo.pushed_at).toDateString()}</p>
             <p id="commit-${repo.name}">Commits amount: </p>
            </div>
             `})
        fetchPullRequestsArray(forkedRepos)     
        drawChart(forkedRepos.length)   
    })
}

const fetchPullRequestsArray = (allRepositories) => {
	allRepositories.forEach((repo) => {
		const PULL_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`;

		fetch(PULL_URL)
			.then((res) => res.json())
			.then((data) => {
				const myPullRequest = data.find(
					(pull) => pull.user.login === repo.owner.login
				);

				// Detect if we have pull request or not.
				// If yes - call fetchCommits function
				// If no - inform user that no pull request was yet done
				if (myPullRequest) {
					fetchCommits(myPullRequest.commits_url, repo.name);
				} else {
					document.getElementById(`commit-${repo.name}`).innerHTML =
						'No pull request yet done :(';
				}
			});
	});
};

const fetchCommits = (myCommitsUrl, myRepoName) => {
	fetch(myCommitsUrl)
		.then((res) => res.json())
		.then((data) => {
			document.getElementById(`commit-${myRepoName}`).innerHTML += data.length;
		});
}; 


getRepos()








// const getCommits = () => {
//     fetch(COMMITS_URL)
//     .then(response => response.json())
//     .then(json => {
//         console.log('Commits:',json.length)
//         const commitsNumber = json.
//         commitsNumber.forEach(repo => projectsContainer.innerHTML += 
//             `
//              `)
//     })
// }
// getCommits()