const projects = document.getElementById('projects');
const userData = document.getElementById('userData');

const USER = 'gustavfrid';
const PARENT_OWNER = 'Technigo';
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const USER_URL = `https://api.github.com/users/${USER}`;

const options = {
	method: 'GET',
	headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
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
			let filteredRepos = allRepos.filter((repo) => repo.name.includes('project-') && repo.fork);
			console.log('filtered repos: ', filteredRepos);
			filteredRepos.slice(0, 3).forEach((repo) => {
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
				generateProjectCard(fullRepo);
				const COMMITS_URL = `https://api.github.com/repos/${USER}/${fullRepo.name}/commits?per_page=100`;
				fetchCommits(COMMITS_URL, fullRepo);
				fetchCollaborators(fullRepo);
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
					document.getElementById(`collaborators-${repo.name}`).innerHTML += /*html*/ `<a href="${author.html_url}" target="_blank"><img class="avatar-collaborator" src="${author.avatar_url}"></a>`;
				} else {
					document.getElementById(`collaborators-${repo.name}`).innerHTML = /*html*/ 'Individual project';
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
			const myPullReq = data.find((pull) => authors.includes(pull.user.login));
			// console.log('myPullReq', repo.name, myPullReq);
			if (myPullReq) {
				document.getElementById(`pull-${repo.name}`).innerHTML = /*html*/ `<a href=${myPullReq.html_url} target="_blank">Pull request</a>`;
				pullReqData.done++;
				updatePieChart(pieChart, pullReqData.done);
			} else {
				document.getElementById(`pull-${repo.name}`).innerHTML = /*html*/ 'No pull request done :(';
			}
		})
		.catch((err) => console.log('fetchPullRequestsArray error:', err));
};

const fetchUser = () => {
	fetch(USER_URL, options)
		.then((res) => res.json())
		.then((data) => {
			// console.log(data);
			userData.innerHTML += /*html*/ `<a href="${data.html_url}" target="_blank"><img class="avatar-user" src="${data.avatar_url}"></a><p>${data.login}</p>`;
		})
		.catch((err) => console.log('fetchCommits error: ', err));
};

fetchAllReposFromUser();
fetchUser();
// drawPieChart(19,0);
