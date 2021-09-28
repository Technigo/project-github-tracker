const projects = document.getElementById('projects');
const userData = document.getElementById('userData');

const username = 'gustavfrid';
const parentOwner = 'Technigo';

const fetchAllRepos = () => {
	fetch(`https://api.github.com/users/${username}/repos`)
		.then((response) => {
			return response.json();
		})
		.then((res) => {
			// filter out repos that are forked
			let filteredRepos = filterForkedRepos(res);
			// fetch all detailed info for each forked repo, to be able to get and filter the owner
			filteredRepos.forEach((repo) => {
				fetch(`https://api.github.com/repos/${username}/${repo.name}`)
					.then((response) => {
						return response.json();
					})
					.then((res) => {
						// only pick repos with owner = Technigo
						if (res.parent.owner.login === parentOwner) {
							projects.innerHTML += /*html*/ `<p>${repo.name} from ${res.parent.owner.login} </p>`;
						}
					})
					.catch((err) => alert(err));
			});
			userData.innerHTML = /*html*/ `
			<p>${username}</p>
			<a href="${filteredRepos[0].owner.html_url}" target="_blank">
				<img class="avatar" src="${filteredRepos[0].owner.avatar_url}" alt="avatar" />
			</a>
				`;
			console.log(filteredRepos);
		})
		.catch((err) => alert(err));
};

const filterForkedRepos = (repos) => {
	return repos.filter((repo) => repo.fork);
};

fetchAllRepos();
