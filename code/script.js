const projects = document.getElementById('projects');
const userData = document.getElementById('userData');

const username = 'gustavfrid';
const parentOwner = 'Technigo';
const apiEndPoints = ['repo', 'commits', 'pulls'];
const data = [];

const fetchAllReposFromUser = () => {
	fetch(`https://api.github.com/users/${username}/repos`)
		.then((res) => res.json())
		.then((allRepos) => {
			let filteredRepos = allRepos.filter((repo) => repo.fork);
			console.log('filtered repos: ', filteredRepos);
			return filteredRepos.slice(0, 2);
		})
		.then((repos) => {
			return repos.forEach((repo) => {
				// fetch all data for each repo
				fetch(`https://api.github.com/repos/${username}/${repo.name}`)
					.then((res) => res.json())
					.then((fullRepo) => {
						// only continue with repos that have parentOwner as parent
						if (fullRepo.parent.owner.login === parentOwner) {
							// fetch all needed endpoints at same time
							Promise.all([
								fetch(`https://api.github.com/repos/${username}/${repo.name}/${apiEndPoints[1]}`),
								fetch(`https://api.github.com/repos/${parentOwner}/${repo.name}/${apiEndPoints[2]}?per_page=100`),
							])
								.then((responses) => {
									return Promise.all(responses.map((res) => res.json()));
								})
								.then((resData) => {
									resData.unshift(fullRepo);
									// console.log('resData: ', resData);
									const newResData = {};
									resData.forEach((item, i) => {
										newResData[apiEndPoints[i]] = item;
									});
									data.push(newResData);
								});
						}
					});
			});
			// .then((data) => console.log(data));
		})
		// .then(() => generateList)
		.catch((err) => console.log(err));
};

const generateList = () => {
	data.forEach((data) => {
		console.log('generateList:');
		projects.innerHTML += /*html*/ `
		<p><a href=${data.repo.html_url} target="_blank">${data.repo.name}</a> from ${data.repo.parent.owner.login} default branch: ${data.repo.default_branch} updated: ${data.repo.pushed_at} commits: ${data.commits.length} </p>
		`;
	});
};

// fetchAllRepos();
fetchAllReposFromUser();

// const fetchAllRepos = () => {
// 	fetch(`https://api.github.com/users/${username}/repos`)
// 		.then((response) => {
// 			return response.json();
// 		})
// 		.then((allRepos) => {
// 			console.log(allRepos);
// 			// filter out repos that are forked
// 			let filteredRepos = filterForkedRepos(allRepos);
// 			// fetch all detailed info for each forked repo, to be able to get and filter the owner
// 			filteredRepos.forEach((repo) => {
// 				fetch(`https://api.github.com/repos/${username}/${repo.name}`)
// 					.then((response) => {
// 						return response.json();
// 					})
// 					.then((someRepos) => {
// 						// only pick repos with owner = Technigo
// 						if (someRepos.parent.owner.login === parentOwner) {
// 							fetch(`https://api.github.com/repos/${username}/${repo.name}/commits`)
// 								.then((response) => {
// 									return response.json();
// 								})
// 								.then((res) => {
// 									projects.innerHTML += /*html*/ `
// 										<p><a href=${repo.html_url} target="_blank">${repo.name}</a> from ${someRepos.parent.owner.login} default branch: ${repo.default_branch} updated: ${repo.pushed_at} commits: ${res.length} </p>
// 										`;
// 									// console.log('commits:', res);
// 								});
// 							console.log(someRepos);
// 						}
// 					})
// 					.catch((err) => console.log(err));
// 			});
// 			userData.innerHTML = /*html*/ `
// 			<p>${username}</p>
// 			<a href="${filteredRepos[0].owner.html_url}" target="_blank">
// 				<img class="avatar" src="${filteredRepos[0].owner.avatar_url}" alt="avatar" />
// 			</a>
// 				`;
// 			console.log(filteredRepos);
// 		})
// 		.catch((err) => console.log(err));
// };
