  //My API´s//
  const USER = 'MariaThomasson'; 
  const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
  const USER_URL = `https://api.github.com/users/${USER}`;

  //My//
  const projectsContainer = document.getElementById('projects');
  const userData = document.getElementById('user-data')


  //My GitHub Information//
  const presentUserData = () => {
    fetch(USER_URL)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        userData.innerHTML = `
        <img src="${json.avatar_url}"/>
        <h1>${json.name}</h1>
        <p>Username: ${json.login}</p>
        <p>Location: ${json.location}</p>
        <p>This account has a total of ${json.public_repos} public repositories</p>
        `;
      });
    }

  //My Repositories//
  const fetchRepositories = () => {
	  fetch(REPOS_URL)
		.then((res) => res.json())
		.then((data) => {
			const technigoRepositories = data.filter(
				(repo) => repo.name.includes('project-') && repo.fork
			);

			technigoRepositories.forEach((repo) => {
				projectsContainer.innerHTML += 
        `<div class="project-box">
        <h3>${repo.name}</h3>
        <p>Main branch for this project is: ${repo.default_branch}</p>
        <p><a href="${repo.html_url}" target="_blank">Link to GitHub repo</a></p>
        <p>Recent push: ${new Date(repo.pushed_at).toLocaleString()}</p>
        <p id="commit-${repo.name}">Commits amount:</p>
        </div>`;
			});

			fetchPullRequestsArray(technigoRepositories);

	// Draw chart with technigoRepos data
			drawChart(technigoRepositories.length);
		});
  };

  //My Pull Requests//
      const fetchPullRequestsArray = (allRepositories) => {
	    allRepositories.forEach((repo) => {
		  const PULL_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`;

		  fetch(PULL_URL)
			.then((res) => res.json())
			.then((data) => {
		  const myPullRequest = data.find(
				(pull) => pull.user.login === repo.owner.login);

				if (myPullRequest) {
					fetchCommits(myPullRequest.commits_url, repo.name);
				} else {
					document.getElementById(`commit-${repo.name}`).innerHTML =
						'No pull request yet or group project.';
				}
      console.log(myPullRequest)
			});
	  });
  };

//My Commits//
      const fetchCommits = (myCommitsUrl, myRepoName) => {
	    fetch(myCommitsUrl)
		  .then((res) => res.json())
		  .then((data) => {
			document.getElementById(`commit-${myRepoName}`).innerHTML += data.length;
		});
  };
  

fetchRepositories();
presentUserData()