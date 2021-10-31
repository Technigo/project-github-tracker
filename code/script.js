
const USER = 'mamite100';

const REPOS_URL = `https://api.github.com/users/${USER}/repos`;

const PROFILE_URL = `https://api.github.com/users/${USER}`

const profileContainer = document.getElementById('profileContainer')
const projectsContainer = document.getElementById('projects');
const profileImage = document.getElementById('profileImage')

const fetchProfile = () => {
    fetch(PROFILE_URL)
        .then(res => res.json()) 
        .then(profileData => {
         
        profileContainer.innerHTML +=`
            <img src="${profileData.avatar_url}" class='profile-image'>    
            <h2>${profileData.name}</h2>
            <p>${profileData.login}</p>`
        });
  }

const fetchRepositories = () => {
	  fetch(REPOS_URL)
		  .then((res) => res.json())
		  .then((data) => {
			const technigoRepositories = data.filter(
				(repo) => repo.name.includes('project-') && repo.fork
			);

		technigoRepositories.forEach((repo) => {
		fetch(`${repo.languages_url}`)
          .then((language) => language.json())
          .then((data) => {
            
            const language = Object.keys(data)[0];

				projectsContainer.innerHTML += `
             <div class="repo" id="${repo.name}"> 
               <a class="repo-title" href="${repo.html_url}" target="_blank">${
              repo.name
            }</a>
               <div class="repo-item2"><span class="branch">${
                 repo.default_branch
               }</span></div>
               <h4 class="updated">Last updated: ${new Date(
                 repo.updated_at
               ).toDateString()}</h4>
               <h5 class="language">${language} </h5>
             </div>
          `;
          })
          .catch((err) => console.log(err));
      });

		fetchPullRequestsArray(technigoRepositories);

	
		drawChart(technigoRepositories.length);
		});
};


const fetchPullRequestsArray = (allRepositories) => {
	allRepositories.forEach((repo) => {
		const PULL_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`;

		fetch(PULL_URL)
			.then((res) => res.json())
			.then((data) => {
				const myPullRequest = data.find(
					(pull) => pull.user.login === repo.owner.login
				);

				if (myPullRequest) {
					fetchCommits(myPullRequest.commits_url, repo.name);
				} else {
					document.getElementById(`commit-${repo.name}`).innerHTML =
						'No pull request yet done :(';
				}
			});
	});
};

const fetchCommits = (myCommitsUrl, myRepoName) => {
	fetch(myCommitsUrl)
	  .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById(
        `${repo.name}`
      ).innerHTML += `<h4 class="repo-item5"> Number of commits: ${data.length}</h4>`;
    })
    .catch((err) => console.log(err));
};

fetchRepositories();
fetchProfile();