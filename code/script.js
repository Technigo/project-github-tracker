const projects = document.getElementById('projects');
const userData = document.getElementById('userData');

const USER = 'gustavfrid';
const PARENT_OWNER = 'Technigo';
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const USER_URL = `https://api.github.com/users/${USER}`;

const options = {
	method: 'GET',
	headers: { Authorization: `token ${GITHUB_TOKEN}` },
};
const pullReqData = {
	total: 19,
	done: 0,
};

const fetchAllReposFromUser = () => {
	// fetch all repos from user
	fetch(REPOS_URL, options)
		.then((res) => res.json())
		.then((allRepos) => {
			// filter forked repos
			let filteredRepos = allRepos.filter((repo) => repo.fork);
			console.log('filtered repos: ', filteredRepos);
			filteredRepos.slice(0, 2).forEach((repo) => {
				// fetch all data for each repo use .slice(0, 2) to limit
				fetchFullRepo(repo);
			});
		})
		.catch((err) => console.log('fetchAllReposFromUser error: ', err));
};

const fetchFullRepo = (repo) => {
	// fetch all data from each repo
	fetch(`https://api.github.com/repos/${USER}/${repo.name}`, options)
		.then((res) => res.json())
		.then((fullRepo) => {
			// only continue with repos that have PARENT_OWNER as parent
			if (fullRepo.parent.owner.login === PARENT_OWNER) {
				// put data in html
				// console.log('fullRepo', fullRepo.name);
				projects.innerHTML += /*html*/ `
				<p><a href=${fullRepo.html_url} target="_blank">${fullRepo.name}</a> from ${fullRepo.parent.owner.login} default branch: ${
					fullRepo.default_branch
				}</p>
				<p>updated: ${new Date(fullRepo.pushed_at).toDateString()}</p>
				<p id="commit-${fullRepo.name}">Commits</p>
				<p id="pull-${fullRepo.name}">Pull request</p>
				<p id="collaborators-${fullRepo.name}">Collaborators</p>
				`;
				const COMMITS_URL = `https://api.github.com/repos/${USER}/${fullRepo.name}/commits?per_page=100`;
				fetchCommits(COMMITS_URL, fullRepo);
				fetchCollaborators(fullRepo);
			}
		})
		.catch((err) => console.log('fetchFullRepo error:', err));
};

const fetchCommits = (myCommitsUrl, repo) => {
	fetch(myCommitsUrl, options)
		.then((res) => res.json())
		.then((data) => {
			document.getElementById(`commit-${repo.name}`).innerHTML += ` ${data.length}`;
		})
		.catch((err) => console.log('fetchCommits error: ', repo.name, err));
};

const fetchCollaborators = (repo) => {
	const COLLABORATOR_URL = `https://api.github.com/repos/${USER}/${repo.name}/collaborators`;
	fetch(COLLABORATOR_URL, options)
		.then((res) => res.json())
		.then((data) => {
			console.log('fetchCollaborators', data);
			const authors = data.map((author) => author.login);
			console.log('collaborators : ', authors);
			data.forEach((author) => {
				if (data.length > 1) {
					document.getElementById(
						`collaborators-${repo.name}`
					).innerHTML += `<a href="${author.html_url}" target="_blank"><img class="avatar-collaborator" src="${author.avatar_url}"></a>`;
				} else {
					document.getElementById(`collaborators-${repo.name}`).innerHTML = 'No collaborators, so lonely...';
				}
			});
			fetchPullRequestsArray(repo, authors);
		})
		.catch((err) => console.log('fetchCollaborators error: ', err));
};

const fetchPullRequestsArray = (repo, authors) => {
	// fetch all pull requests from repo
	const PULL_URL = `https://api.github.com/repos/${PARENT_OWNER}/${repo.name}/pulls?per_page=100`;
	fetch(PULL_URL, options)
		.then((res) => res.json())
		.then((data) => {
			console.log('fetchPullRequestsArray data: ', data);
			// only pick pull requests connected to user
			const myPullReq = data.find((pull) => authors.includes(pull.user.login)); // pull.user.login === repo.owner.login);
			// console.log('myPullReq', repo.name, myPullReq);
			if (myPullReq) {
				document.getElementById(`pull-${repo.name}`).innerHTML = `<a href=${myPullReq.html_url} target="_blank">Pull request</a>`;
				pullReqData.pullRequests++;
				drawPieChart(pullReqData);
			} else {
				document.getElementById(`pull-${repo.name}`).innerHTML = 'No pull request yet done :(';
			}
		})
		.catch((err) => console.log('fetchPullRequestsArray error:', err));
};

const fetchUser = () => {
	fetch(USER_URL, options)
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			userData.innerHTML += `<a href="${data.html_url}" target="_blank"><img class="avatar" src="${data.avatar_url}"></a><p>${data.login}</p>`;
		})
		.catch((err) => console.log('fetchCommits error: ', err));
};

fetchAllReposFromUser();
fetchUser();
