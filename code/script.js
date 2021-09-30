// THE DOM SELECTORS
const projectContainer = document.getElementById('projects');
const avatarImage = document.getElementById('avatar');
const fullName = document.getElementById('full-name');
const username = document.getElementById('username');
const bio = document.getElementById('bio');
const list = document.getElementById('list')

// URLS STORED IN VARIABLES
const USER = 'MT-dotse'; //my github name stored in the variable USER
const REPOS_URL = `https://api.github.com/users/${USER}/repos`; // a variable that stores the URL that fetching the repositories
const MY_PROFILE = `https://api.github.com/users/MT-dotse`; //my github profile

//FETCHING THE GITHUB PROFILE, NAME AND USERNAME

fetch(MY_PROFILE)
  .then((response) => response.json())
  .then((data) => {
    fullName.innerHTML = `Hi world, I'm ${data.name}`
    bio.innerHTML = `I'm a ${data.bio}`
    username.innerHTML = `Username: <a href="${data.html_url}"> ${data.login}</a>`
    avatarImage.src = data.avatar_url;
    
  });

// FETCHING THE REPOS
const fetchRepositories = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      const technigoRepositories = data.filter(
        (repo) => repo && repo.name.startsWith('project-')
      );

      technigoRepositories.forEach((repo) => {
        projectContainer.innerHTML += `
       <div>
        <p><a href="${repo.html_url}"> ${repo.name} with default branch ${repo.default_branch}</a></p>
        <p>Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
        <p id="commit-${repo.name}"> Commits amount: </p>
      </div>
        `;
      });
      fetchPullRequestsArray(technigoRepositories);
      drawChart(technigoRepositories.length);
    });
};

//FETCHING THE PULL REQUESTS
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
						'No pull request yet';
				}
			});
	});
};

//FETCHING THE COMMITS
const fetchCommits = (myCommitsUrl, myRepoName) => {
	fetch(myCommitsUrl)
		.then((res) => res.json())
		.then((data) => {
			document.getElementById(`commit-${myRepoName}`).innerHTML += data.length;
		});
};






fetchRepositories();
