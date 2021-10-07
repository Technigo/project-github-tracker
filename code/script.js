const USER = "ebbadelsol";
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const projectsContainer = document.getElementById("projects-container");
const userContainer = document.getElementById("user-container");

const getUser = () => {
	fetch(`https://api.github.com/users/${USER}`)
		.then((response) => response.json())
		.then((data) => {
			userContainer.innerHTML += /*html*/ `
        <img class="user-image" src="${data.avatar_url}"/>
        <h2 class="user-name">${data.login}</h2>
      `;
		});
};

getUser();

const getRepos = () => {
	fetch(REPOS_URL)
		.then((response) => response.json())
		.then((data) => {
			const technigoProjects = data.filter((repo) => repo.fork && repo.name.startsWith("project-"));

			technigoProjects.sort((oldestRepo, newestRepo) => new Date(newestRepo.pushed_at) - new Date(oldestRepo.pushed_at));

			technigoProjects.forEach((repo) => {
				projectsContainer.innerHTML += /*html*/ `
          <a class="project-link" href="${repo.html_url}" target="_blank">
            <div class="project" id="${repo.name}-container">
              <h3 class="project-name">${repo.name}</h3>
              <p class="project-info">Default branch ${repo.default_branch}</p>
              <p class="project-info">Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
              <p class="project-info" id="commits-${repo.name}">Amount of commits: </p>
            </div>
          </a>
          <hr>
        `;
			});

			getPullRequests(technigoProjects);
			drawChart(technigoProjects.length);
		});
};

getRepos();

const getPullRequests = (repos) => {
	repos.forEach((repo) => {
		fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`)
			.then((response) => response.json())
			.then((data) => {
				const filteredPull = data.find((pull) => pull.user.login === repo.owner.login);

				if (filteredPull) {
					getCommits(filteredPull.commits_url, repo.name);
					getReview(filteredPull.review_comments_url, repo.name);
				} else {
					document.getElementById(`commits-${repo.name}`).innerHTML = "No pull request";
				}
			});
	});
};

const getCommits = (url, repoName) => {
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			document.getElementById(`commits-${repoName}`).innerHTML += data.length;
		});
};

const getReview = (url, repoName) => {
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			if (data.length === 0) {
				document.getElementById(`${repoName}-container`).innerHTML += "";
			} else {
				document.getElementById(`${repoName}-container`).innerHTML += /*html*/ `
        <p class="project-info">Reviewed by ${data[0].user.login}</p>
        `;
			}
		});
};
