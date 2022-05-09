const USER = 'rebeccablixt';
const USER_URL = `https://api.github.com/users/${USER}`;
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;

// Used to write innerHTML after fetches
const profileInfo = document.getElementById('profileInfo');
const projectsContainer = document.getElementById('projectsContainer');

// Fetches user info from GitHub profile
const userProfile = () => {
	fetch(USER_URL)
		.then((res) => res.json())
		.then((data) => {
			profileInfo.innerHTML += `
			  <a href="${data.html_url}">
          <img class="profile-image" src="${data.avatar_url}"/>
          <span class="profile-name">
            ${data.login}
          </span>
        </a>
		  `;
		});
};

userProfile();

// Fetching all repos done by user
const getRepos = () => {
	fetch(REPOS_URL)
		.then((res) => res.json())
		.then((data) => {
			// filters Technigo projects from other GitHub repos
			const forkedRepos = data.filter(
				(repo) => repo.fork && repo.name.startsWith('project-')
			);

			// Inserts fetched info from API into HTML
			forkedRepos.forEach(
				(repo) =>
					(projectsContainer.innerHTML += `
            <div class="repo-card">
              <a href="${repo.html_url}">
                <h3>
                  ${repo.name}
                </h3>
              </a>
              <p>Default Branch: <span>${repo.default_branch}</span></p>
              <p>Recent Push: ${new Date(repo.pushed_at).toDateString()}</p>
              <p id="commit-${repo.name}">Amount of Commits: </p>
            </div>
          `)
			);
			getPullRequests(forkedRepos);
			drawChart(forkedRepos.length);
		});
};

getRepos();

// Pull requests for each project
const getPullRequests = (repos) => {
	repos.forEach((repo) => {
		const PULLREQUEST_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`;
		fetch(PULLREQUEST_URL)
			.then((res) => res.json())
			.then((pull) => {
				const myPullRequest = pull.find(
					(pull) => pull.user.login === repo.owner.login
				);

				// If pull request done by user, getCommits function is invoked
				if (myPullRequest) {
					getCommits(myPullRequest.commits_url, repo.name);
				} else {
					document.getElementById(`commit-${repo.name}`).innerHTML =
						'No pull request done by user';
				}
			});
	});
};

// If commits done by user, number of commits is added in HTML
const getCommits = (myCommitsUrl, myRepoName) => {
	fetch(myCommitsUrl)
		.then((res) => res.json())
		.then((commit) => {
			document.getElementById(`commit-${myRepoName}`).innerHTML +=
				commit.length;
		});
};
