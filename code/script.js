const projects = document.getElementById('projects');
const userData = document.getElementById('userData');
const filterSizeBtn = document.getElementById('filterSizeBtn');
const filterUpdateBtn = document.getElementById('filterUpdateBtn');
const filterCreatedBtn = document.getElementById('filterCreatedBtn');

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
			let filteredRepos = allRepos.filter((repo) => repo.name.includes('project-') && repo.fork);
			filteredRepos.sort((a, b) => {
				if (a.pushed_at > b.pushed_at) {
					return -1;
				} else if (a.pushed_at < b.pushed_at) {
					return 1;
				} else {
					return 0;
				}
			});
			console.log('filtered repos: ', filteredRepos);
			fetchFullRepo(filteredRepos.slice(0, 2));
		})
		.catch((err) => console.log('fetchAllReposFromUser error: ', err));
};

const fetchFullRepo = (repos) => {
	// fetch all data from each repo
	Promise.all(repos.map((repo) => fetch(repo.url)))
		.then((res) => Promise.all(res.map((res) => res.json())))
		.then((repos) => {
			console.log(repos);
			repos.forEach((repo) => {
				if (repo.parent.owner.login === PARENT_OWNER) {
					reposArr.push(repo);
					reposData[repo.name] = { pullRequest: '', authors: '', commits: '' };
					// put data in html
					// console.log('fullRepo', fullRepo.name);
					generateProjectCard(repo);
					const COMMITS_URL = `https://api.github.com/repos/${USER}/${repo.name}/commits?per_page=100`;
					fetchCommits(COMMITS_URL, repo);
				}
			});
		})
		.catch((err) => console.log('fetchFullRepo error:', err));
};

const generateProjectCard = (repo) => {
	projects.innerHTML += /*html*/ `
	<div class="repo-info">
		<p class="repo"><a href=${repo.html_url} target="_blank">${repo.name}</a></p>
		<p class="info">From ${repo.parent.owner.login}, default branch: ${repo.default_branch}</p>
		<p class="pull" id="pull-${repo.name}">Pull request</p>
		<p class="commit" id="commit-${repo.name}">Commits: </p>
		<p class="update">Updated: ${new Date(repo.pushed_at).toDateString()}</p>
		<p class="collaboration" id="collaborators-${repo.name}">Collaborators:</p>
	</div>
	`;
};

const fetchCommits = (myCommitsUrl, repo) => {
	fetch(myCommitsUrl)
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			const commitsSinceFork = data.filter((commit) => commit.commit.author.date > repo.created_at);
			// console.log(commitsSinceFork);
			reposData[repo.name].commits = commitsSinceFork;
			populateCommits(repo, commitsSinceFork);
			getCollaborators(commitsSinceFork, repo);
		})
		.catch((err) => console.log('fetchCommits error: ', repo.name, err));
};

const populateCommits = (repo, commits) => {
	document.getElementById(`commit-${repo.name}`).innerHTML += ` ${commits.length}`;
};

const getCollaborators = (commits, repo) => {
	let authors = {};
	commits.forEach((commit) => {
		if (!Object.keys(authors).includes(commit.author.login)) {
			authors[commit.author.login] = { avatar_url: commit.author.avatar_url, html_url: commit.author.html_url };
			// reposData[repo.name].authors = { [commit.author.login]: { avatar_url: commit.author.avatar_url, html_url: commit.author.html_url } };
		}
	});
	reposData[repo.name].authors = authors;
	console.log('authirs', authors);
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
			// console.log('fetchPullRequestsArray data: ', data);
			// only pick pull requests connected to user
			const myPullReq = data.find((pull) => authors.includes(pull.user.login));
			// console.log('myPullReq', repo.name, myPullReq);
			if (myPullReq) {
				pullReqData.done++;
				reposData[repo.name].pullRequest = myPullReq;
				updatePieChart(pieChart, pullReqData.done);
			}
			populatePullRequest(myPullReq, repo);
		})
		.catch((err) => console.log('fetchPullRequestsArray error:', err));
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
			// console.log(data);
			userData.innerHTML += /*html*/ `<a href="${data.html_url}" target="_blank"><img class="avatar-user" src="${data.avatar_url}"></a><p class="user-name">${data.login}</p>`;
		})
		.catch((err) => console.log('fetchCommits error: ', err));
};

const sort = (param) => {
	projects.innerHTML = '';
	reposArr.sort((a, b) => {
		if (a[param] > b[param]) {
			return -1;
		} else if (a[param] < b[param]) {
			return 1;
		} else {
			return 0;
		}
	});
	regenerateProjectCards();
};

const regenerateProjectCards = () => {
	reposArr.forEach((repo) => {
		generateProjectCard(repo);
		populateCommits(repo, reposData[repo.name].commits);
		populateCollaborators(reposData[repo.name].authors, repo);
		populatePullRequest(reposData[repo.name].pullRequest, repo);
	});
};

filterSizeBtn.addEventListener('click', () => sort('size'));
filterUpdateBtn.addEventListener('click', () => sort('updated_at'));
filterCreatedBtn.addEventListener('click', () => sortSize('created_at'));

fetchAllReposFromUser();
fetchUser();
// drawPieChart(19,0);
