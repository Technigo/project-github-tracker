const projects = document.getElementById('projects');
const userData = document.getElementById('userData');

const USER = 'gustavfrid';
const PARENT_OWNER = 'Technigo';
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const USER_URL = `https://api.github.com/users/${USER}`;

const fetchAllReposFromUser = () => {
	// fetch all repos from user
	fetch(REPOS_URL)
		.then((res) => res.json())
		.then((allRepos) => {
			// filter forked repos
			let filteredRepos = allRepos.filter((repo) => repo.fork);
			// console.log('filtered repos: ', filteredRepos);
			filteredRepos.slice(0, 3).forEach((repo) => {
				// fetch all data for each repo use .slice(0, 2) to limit
				fetchFullRepo(repo);
			});
		})
		.catch((err) => console.log('fetchAllReposFromUser error: ', err));
};

const fetchFullRepo = (repo) => {
	// fetch all data from each repo
	fetch(`https://api.github.com/repos/${USER}/${repo.name}`)
		.then((res) => res.json())
		.then((fullRepo) => {
			// only continue with repos that have PARENT_OWNER as parent
			if (fullRepo.parent.owner.login === PARENT_OWNER) {
				// put data in html
				console.log('fullRepo', fullRepo.name);
				generateProjectCard(fullRepo);

				const COMMITS_URL = `https://api.github.com/repos/${USER}/${fullRepo.name}/commits?per_page=100`;
				fetchCommits(COMMITS_URL, fullRepo);
			}
		})
		.catch((err) => console.log('fetchFullRepo error:', err));
};

const generateProjectCard = (repo) => {
	projects.innerHTML += /*html*/ `
	<h3 class="repo"><a href=${repo.html_url} target="_blank">${repo.name}</a></h3>
	<div class="repo-info">
		<p class="info">From ${repo.parent.owner.login}, default branch: ${repo.default_branch}</p>
		<p class="pull" id="pull-${repo.name}">Pull request</p>
		<p class="commit" id="commit-${repo.name}">Commits: </p>
		<p class="update">Updated: ${new Date(repo.pushed_at).toDateString()}</p>
	</div>
	<p class="collaboration" id="collaborators-${repo.name}">Collaborators:</p>
	`;
};

const fetchCommits = (myCommitsUrl, repo) => {
	fetch(myCommitsUrl)
		.then((res) => res.json())
		.then((data) => {
			console.log('fetchCommits data: ', repo.name, data);
			document.getElementById(`commit-${repo.name}`).innerHTML += ` ${data.length}`;
			const authors = data.map((commit) => {
				return commit.author ? commit.author.login : '';
			});
			console.log('fetchCommits authors', authors);
			fetchPullRequestsArray(repo, authors);
		})
		.catch((err) => console.log('fetchCommits error: ', repo.name, err));
};

const fetchPullRequestsArray = (repo, authors) => {
	// fetch all pull requests from repo
	const PULL_URL = `https://api.github.com/repos/${PARENT_OWNER}/${repo.name}/pulls?per_page=100`;
	fetch(PULL_URL)
		.then((res) => res.json())
		.then((data) => {
			console.log('fetchPullRequestsArray data: ', data);
			// only pick pull requests connected to user
			const myPullReq = data.find((pull) => authors.includes(pull.user.login)); // pull.user.login === repo.owner.login);
			console.log('myPullReq', repo.name, myPullReq);
			if (myPullReq) {
				document.getElementById(`pull-${repo.name}`).innerHTML = `<a href=${myPullReq.html_url} target="_blank">Pull request</a>`;
			} else {
				document.getElementById(`pull-${repo.name}`).innerHTML = 'No pull request yet done :(';
			}
		})
		.catch((err) => console.log('fetchPullRequestsArray error:', err));
};

const fetchUser = () => {
	fetch(USER_URL)
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			userData.innerHTML += /*html*/ `<a href="${data.html_url}" target="_blank"><img class="avatar-user" src="${data.avatar_url}"></a><p>${data.login}</p>`;
		})
		.catch((err) => console.log('fetchCommits error: ', err));
};

fetchAllReposFromUser();
fetchUser();
