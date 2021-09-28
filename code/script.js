const USER = "Jsfrulle";
const API_Projects = `https://api.github.com/users/${USER}/repos`;
const API_USER = `https://api.github.com/users/${USER}`;

const projects = document.getElementById("projects");

const getResponse = () => {
	fetch(API_Projects)
		.then((response) => response.json())
		.then((data) => {
			const repos = data.filter(
				(repo) =>
					repo.pushed_at && repo.fork && repo.name.startsWith("project-")
			);

			repos.forEach(
				(repo) =>
					(projects.innerHTML += `
					
					
            `)
			);

			drawChart(repos.length);

			getPull(repos);
		});
};

getResponse();

const getPull = (repos) => {
	repos.forEach((repo) => {
		fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls`)
			.then((res) => res.json())
			.then((data) => {
				const pulls = data.filter(
					(pull) => pull.user.login === repo.owner.login
				);

				console.log(pulls);

				pulls.forEach(
					(pull) =>
						(projects.innerHTML +=
							
							
							`
							<div>
							<h3>${repo.name}</h3>
							
							
							<h3>${pull.url}</h3>

							<h3>pushed: ${repo.pushed_at}</h3>

							</div>
		
`)
				);
			});
	});
};

/* USER - info & img */

const getUser = () => {
	fetch(API_USER)
		.then((response) => response.json())
		.then((data) => {
			document.getElementById("userimg").innerHTML = `

            <img src='${data.avatar_url}' alt='userimg'>
            
            `;

			document.getElementById("username").innerHTML = `

<h3>${data.login}</h3>

`;
		});
};

getUser();
