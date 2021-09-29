const projects = document.getElementById('projects');
const userData = document.getElementById('userData');

const username = 'gustavfrid';
const parentOwner = 'Technigo';
const data = [];

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

const fetchAllReposFromUser = () => {
	fetch(`https://api.github.com/users/${username}/repos`)
		.then((res) => res.json())
		.then((allRepos) => allRepos.filter((repo) => repo.fork))
		.then((filteredRepos) => {
			console.log(filteredRepos);
			return filteredRepos;
		})
		.then((repos) => {
			repos.forEach((repo) => {
				//slice(0, 2).
				// fetch all data for each repo
				fetch(`https://api.github.com/repos/${username}/${repo.name}`)
					.then((res) => res.json())
					.then((fullRepo) => {
						// only continue with repos that have parentOwner as parent
						if (fullRepo.parent.owner.login === parentOwner) {
							// fetch all needed endpoints at same time

							// console.log('data length: ', data.length);
							const fetchArr = ['repo', 'commits', 'pulls'];
							Promise.all([fetch(`https://api.github.com/repos/${username}/${repo.name}/${fetchArr[1]}`), fetch(`https://api.github.com/repos/${parentOwner}/${repo.name}/${fetchArr[2]}`)])
								.then((responses) => {
									return Promise.all(responses.map((res) => res.json()));
								})
								.then((resData) => {
									resData.unshift(fullRepo);
									// console.log('resData: ', resData);
									const newResData = {};
									resData.forEach((item, i) => {
										newResData[fetchArr[i]] = { ...item };
									});
									data.push(newResData);
								});
						}
					});
			});
		})
		.then(() => console.log(data))
		.catch((err) => console.log(err));
};

// fetchAllRepos();
fetchAllReposFromUser();
