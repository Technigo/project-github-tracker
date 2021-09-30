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
			filteredRepos.forEach((repo) => {
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
				projects.innerHTML += /*html*/ `
				<p><a href=${fullRepo.html_url} target="_blank">${fullRepo.name}</a> from ${fullRepo.parent.owner.login} default branch: ${fullRepo.default_branch}</p>
				<p>updated: ${fullRepo.pushed_at}</p>
				<p id="commit-${fullRepo.name}">Commits</p>
				<p id="pull-${fullRepo.name}">Pull request</p>
				`;
				// fetchPullRequestsArray(fullRepo);
				// fetchCollaborators(fullRepo);
				const COMMITS_URL = `https://api.github.com/repos/${USER}/${fullRepo.name}/commits?per_page=100`;
				fetchCommits(COMMITS_URL, fullRepo);
			}
		})
		.catch((err) => console.log('fetchFullRepo error:', err));
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
			userData.innerHTML += `<a href="${data.html_url}" target="_blank"><img class="avatar" src="${data.avatar_url}"></a><p>${data.login}</p>`;
		})
		.catch((err) => console.log('fetchCommits error: ', err));
};

fetchAllReposFromUser();
fetchUser();
