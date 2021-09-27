const projects = document.getElementById('projects');

const username = 'gustavfrid';

const fetchAllRepos = () => {
	fetch(`https://api.github.com/users/${username}/repos`)
		.then((response) => {
			return response.json();
		})
		.then((res) => {
			let forkedRepos = filterRepos(res);
			forkedRepos.forEach((repo) => {
				projects.innerHTML += /*html*/ `<p>${repo.name}</p>`;
			});

			console.log(forkedRepos);
		});
};

const filterRepos = (repos) => {
	return repos.filter((repo) => repo.fork);
};

fetchAllRepos();
