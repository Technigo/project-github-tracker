const USER = 'isomoth';
const USER_URL = `https://api.github.com/users/${USER}`;
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const projectsContainer = document.getElementById('projects');

const getUserProfile = () => {
  fetch(USER_URL)
    .then((response) => response.json())
    .then((data) => {
      projectsContainer.innerHTML += `
      <h2>User Name: ${data.login}</h2>
      <img src='${data.avatar_url}'/>
      `;
    });
};

getUserProfile();

const getPullRequests = (allRepos) => {
  allRepos.forEach((repo) => {
    const PULL_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`
    fetch(PULL_URL)
      .then((response) => response.json())
      .then((data) => {
        const userPullRequest = data.find(
          (pull) => pull.user.login === repo.owner.login
        );
        if(userPullRequest){
          getCommits(userPullRequest.commits_url, repo.name);
        } else {
          document.getElementById(`commit-${repo.name}`).innerHTML = 'No pull requests so far.';
        }
      });
  });
};

/* const getCommits = (repos) => {
  repos.forEach((repo) => {
    fetch(`https://api.github.com/repos/${USER}/${repo.name}/commits`)
      .then((res) => res.json())
      .then((data) => {
        let commitCounter = 0;
        const userCommits = data.filter(
          (commit) => commit.committer.login === `${USER}`);
        userCommits.forEach(
          (commit) =>
            (projectsContainer.innerHTML += `<h4>Commit: ${commit}</h4>`),
            (commitCounter = commitCounter++),
          console.log('Commits: '),
          console.log(data),
          console.log('Commit count: ' + commitCounter)
        );
      });
  });
}; */

const getCommits = (myCommitsUrl, myRepoName) => {
	fetch(myCommitsUrl)
		.then((res) => res.json())
		.then((data) => {
			document.getElementById(`commit-${myRepoName}`).innerHTML += data.length;
		});
};


const getRepositories = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.includes('project-')
      );
      forkedRepos.forEach(
        (repo) => {
          projectsContainer.innerHTML += 
          `<div>
            <a href="${repo.html_url}">${repo.name} with default branch ${repo.default_branch}</a>
            <p>Latest push: ${new Date(repo.pushed_at).toDateString()}</p>
            <p id="commit-${repo.name}">Amount of commits: </p>
          </div>`
        },
      );
      getPullRequests(forkedRepos),
      drawChart(forkedRepos.length);
    });
};

getRepositories();
