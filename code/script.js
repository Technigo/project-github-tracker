/* my user*/
/*can't get my USER*/ 
const USER = 'mamite100';

const REPOS_URL = `https://api.github.com/users/${USER}/repos`;

const PROFILE_URL = `https://api.github.com/users/${USER}`

const profileContainer = document.getElementById('profile-container')
const projectsContainer = document.getElementById('projects');

const fetchProfile = () => {
    fetch(PROFILE_URL)
        .then(res => res.json()) 
        .then(profileData => {
          console.log(profileData)
        profileContainer.innerHTML +=`
            <img src="${profileData.avatar_url}" class='profile-img'>    
            <h2>${profileData.name}</h2>
            <p>${profileData.login}</p>`
        });
  }

const fetchRepositories = () => {
	  fetch(REPOS_URL)
		  .then((res) => res.json())
		  .then((data) => {
			const technigoRepositories = data.filter(
				(repo) => repo.name.includes('project-') && repo.fork
			);

		technigoRepositories.forEach((repo) => {
				projectsContainer.innerHTML += `
          <div>
            <a href="${repo.html_url}">${repo.name} with default branch ${
					repo.default_branch
				}</a>
            <p>Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
            <p id="commit-${repo.name}">Commits amount: </p>
          </div>
        `;

			});

		fetchPullRequestsArray(technigoRepositories);

			//draw chart with technigoRepos data. I can't get the char? 
			drawChart(technigoRepositories.length);
		});
};

const fetchPullRequestsArray = (allRepositories) => {
	allRepositories.forEach((repo) => {
		const PULL_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`;

		fetch(PULL_URL)
			.then((res) => res.json())
			.then((data) => {
				const myPullRequest = data.find(
					(pull) => pull.user.login === repo.owner.login
				);

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

fetchRepositories();