const USER= "mamite100";
const REPOS_URL= `https://api.github.com/users/${USER}/repos`;
const projectsContainer = document.
getElementById("projects");

const fetchRepositories = () => {
    fetch (REPOS_URL)
        .then((res) => res.json())
        .then((data) => {
        const technigoRepositories = data.filter((repo) => repo.name.includes("project-") && repo.fork 
        );
      technigoRepositories.forEach(
        (repo) => {
        projectsContainer.innerHTML += `
        <div>
        <a href="${repo.html_url }" > ${repo.name} with default branch
        ${repo.default_branch}</a>   
        <p> Recent push: ${new Date (repo.pushed_at) .toDateString() } </p> 
        <p id="commit-${repo.name}"> Commits: </p>   
         </div> 
        `;
        });
        });
};

const fetchPullRequestsArray = ( allRepositories) => {
  allRepositories.forEach((repo) => {
   const PULL_URL = 
   `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`;
   fetch (PULL_URL)
    .then( (res) => res.json())
    .then((data) => {
              const myPullRequest = data.find(
                (pull) => pull.user.login === repo.owner.login
              );
if (myPullRequest) {
					fetchCommits(myPullRequest.commits_url, repo.name);
				} else {
					document.getElementById(`commit-${repo.name}`).innerHTML =
						'No pull request yet done : ( ';
				}
			});
	});
};

const fetchCommits = (myCommitsUrl, myRepoName) => {
	fetch(myCommitsUrl)
		.then((res) => res.json())
		.then((data) => {
			document.getElementById(`commit-${myRepoName}`).innerHTML += data.length;
		});
};

fetchRepositories();
