const projects = document.getElementById('projects');
const userData = document.getElementById('userData');
const sortSizeBtn = document.getElementById('sortSizeBtn');
const sortUpdateBtn = document.getElementById('sortUpdateBtn');
const sortCreatedBtn = document.getElementById('sortCreatedBtn');
const sortCommitsBtn = document.getElementById('sortCommitsBtn');
const sortNameBtn = document.getElementById('sortNameBtn');
const filterAllBtn = document.getElementById('filterAllBtn');
const filterLangJsBtn = document.getElementById('filterLangJsBtn');
const filterLangHtmlBtn = document.getElementById('filterLangHtmlBtn');

const USER = 'gustavfrid';
const PARENT_OWNER = 'Technigo';
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const USER_URL = `https://api.github.com/users/${USER}`;

let reposArr = [];
let reposData = {};

const pullReqData = {
	total: 19,
	done: 0,
};

const fetchAllReposFromUser = () => {
	// fetch all repos from user
	fetch(REPOS_URL)
		.then((res) => res.json())
		.then((allRepos) => {
			// filter forked repos
			let filteredRepos = allRepos.filter((repo) => (repo.name.includes('project-') && repo.fork) || (repo.name.includes('portfolio') && repo.fork));
			sortRepos(filteredRepos, 'pushed_at', true);
			fetchFullRepo(filteredRepos);
		})
		.catch((err) => alert('fetchAllReposFromUser error: ', err));
};

const fetchFullRepo = (repos) => {
	// fetch all data from each repo
	Promise.all(repos.map((repo) => fetch(repo.url)))
		.then((res) => Promise.all(res.map((res) => res.json())))
		.then((repos) => {
			repos.forEach((repo) => {
				if (repo.parent.owner.login === PARENT_OWNER) {
					// push data to store for use when sorting projects
					reposArr.push(repo);
					reposData[repo.name] = { pullRequest: '', authors: '', commits: '' };

					generateProjectCard(repo);
					const COMMITS_URL = `https://api.github.com/repos/${USER}/${repo.name}/commits?per_page=100`;
					fetchCommits(COMMITS_URL, repo);
				}
			});
		})
		.catch((err) => alert('fetchFullRepo error:', err));
};

const generateProjectCard = (repo) => {
	// generating project cards
	projects.innerHTML += /*html*/ `
	<div class="repo-info">
		<div class="repo-heading">
			<p class="repo"><a href=${repo.html_url} target="_blank">${repo.name}</a></p>
			<p class="lang ${repo.language}">${repo.language}</p>
		</div>
		<p class="info">From ${repo.parent.owner.login}, default branch: ${repo.default_branch}</p>
		<p class="pull" id="pull-${repo.name}">Pull request</p>
		<div class="numbers">
			<p class="commit" id="commit-${repo.name}">Commits: </p>
			<p class="size">Size: ${repo.size}</p>
		</div>
		<p class="update">Updated: ${new Date(repo.pushed_at).toDateString()}</p>
		<p class="collaboration" id="collaborators-${repo.name}">Commit authors:</p>
	</div>
	`;
};

const fetchCommits = (myCommitsUrl, repo) => {
	// fetch all commits from repo
	fetch(myCommitsUrl)
		.then((res) => res.json())
		.then((data) => {
			// filter only commits done after repo was forked
			const commitsSinceFork = data.filter((commit) => commit.commit.author.date > repo.created_at);
			// storing necessary data for later sorting
			reposData[repo.name].commits = commitsSinceFork;
			populateCommits(repo, commitsSinceFork);
			getCollaborators(commitsSinceFork, repo);
		})
		.catch((err) => alert('fetchCommits error: ', repo.name, err));
};

const populateCommits = (repo, commits) => {
	document.getElementById(`commit-${repo.name}`).innerHTML += ` ${commits.length}, `;
};

const getCollaborators = (commits, repo) => {
	// filter out each commit author and stor for later sort
	let authors = {};
	commits.forEach((commit) => {
		if (!Object.keys(authors).includes(commit.author.login)) {
			authors[commit.author.login] = { avatar_url: commit.author.avatar_url, html_url: commit.author.html_url };
		}
	});
	reposData[repo.name].authors = authors;
	populateCollaborators(authors, repo);
	fetchPullRequestsArray(repo, Object.keys(authors));
};

const populateCollaborators = (authors, repo) => {
	for (const author in authors) {
		if (Object.keys(authors).length > 1) {
			document.getElementById(
				`collaborators-${repo.name}`
			).innerHTML += /*html*/ `<a href="${authors[author].html_url}" target="_blank"><img class="avatar-collaborator" src="${authors[author].avatar_url}"></a>`;
		} else {
			document.getElementById(`collaborators-${repo.name}`).innerHTML = /*html*/ 'Individual project';
		}
	}
};

const fetchPullRequestsArray = (repo, authors) => {
	// fetch all pull requests from repo
	const PULL_URL = `https://api.github.com/repos/${PARENT_OWNER}/${repo.name}/pulls?per_page=100`;
	fetch(PULL_URL)
		.then((res) => res.json())
		.then((data) => {
			// only pick pull requests connected to user
			const myPullReq = data.find((pull) => authors.includes(pull.user.login));
			if (myPullReq) {
				pullReqData.done++;
				reposData[repo.name].pullRequest = myPullReq;
				updatePieChart(pieChart, pullReqData.done);
			}
			populatePullRequest(myPullReq, repo);
		})
		.catch((err) => alert('fetchPullRequestsArray error:', err));
};

const populatePullRequest = (myPullReq, repo) => {
	if (myPullReq) {
		document.getElementById(`pull-${repo.name}`).innerHTML = /*html*/ `<a href=${myPullReq.html_url} target="_blank">Pull request</a>`;
	} else {
		document.getElementById(`pull-${repo.name}`).innerHTML = /*html*/ 'No pull request done :(';
	}
};

const fetchUser = () => {
	fetch(USER_URL)
		.then((res) => res.json())
		.then((data) => {
			userData.innerHTML += /*html*/ `<a href="${data.html_url}" target="_blank"><img class="avatar-user" src="${data.avatar_url}"></a><p class="user-name">${data.login}</p>`;
		})
		.catch((err) => alert('fetchCommits error: ', err));
};

const sortRepos = (array, param, init) => {
	array.sort((a, b) => {
		if (a[param] > b[param]) {
			return -1;
		} else if (a[param] < b[param]) {
			return 1;
		} else {
			return 0;
		}
	});
	if (param === 'name') array.reverse();
	if (!init) regenerateProjectCards(reposArr);
};

const sortReposByCommit = (array, param) => {
	array.sort((a, b) => {
		if (reposData[a[param]].commits > reposData[b[param]].commits) {
			return -1;
		} else if (reposData[a[param]].commits < reposData[b[param]].commits) {
			return 1;
		} else {
			return 0;
		}
	});
	regenerateProjectCards(reposArr);
};

const filterRepos = (array, lang) => {
	if (lang !== 'All') {
		const filteredReposArr = array.filter((repo) => repo.language === lang);
		regenerateProjectCards(filteredReposArr);
	} else {
		regenerateProjectCards(array);
	}
};

const regenerateProjectCards = (repos) => {
	projects.innerHTML = '';
	repos.forEach((repo) => {
		generateProjectCard(repo);
		populateCommits(repo, reposData[repo.name].commits);
		populateCollaborators(reposData[repo.name].authors, repo);
		populatePullRequest(reposData[repo.name].pullRequest, repo);
	});
};

sortSizeBtn.addEventListener('click', () => sortRepos(reposArr, 'size', false));
sortUpdateBtn.addEventListener('click', () => sortRepos(reposArr, 'updated_at', false));
sortCreatedBtn.addEventListener('click', () => sortRepos(reposArr, 'created_at', false));
sortCommitsBtn.addEventListener('click', () => sortReposByCommit(reposArr, 'name'));
sortNameBtn.addEventListener('click', () => sortRepos(reposArr, 'name', false));
filterLangJsBtn.addEventListener('click', () => filterRepos(reposArr, 'JavaScript'));
filterLangHtmlBtn.addEventListener('click', () => filterRepos(reposArr, 'HTML'));
filterAllBtn.addEventListener('click', () => filterRepos(reposArr, 'All'));

fetchAllReposFromUser();
fetchUser();
