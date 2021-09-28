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

const getPullRequests = (repos) => {
  repos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`
    )
      .then((response) => response.json())
      .then((data) => {
        const userPulls = data.filter(
          (pull) => pull.user.login === repo.owner.login
        );
        console.log('PULL: ');
        console.log(userPulls);
        userPulls.forEach((pull) => {
          projectsContainer.innerHTML += `
          <div class="repo" id=${pull}>
            <h2>${repo.name}</h2>
          </div>
          `;
        });
      });
  });
};

const getCommits = (repos) => {
  repos.forEach((repo) => {
    fetch(`https://api.github.com/repos/${USER}/${repo.name}/commits`)
      .then((res) => res.json())
      .then((data) => {
        let commitCounter = 0;
        repos.forEach(
          (commit) =>
            (projectsContainer.innerHTML += `<h4>Commit: ${commit}</h4>`),
            (commitCounter = commitCounter++),
          console.log('Commits: '),
          console.log(data),
          console.log('Commit count: ' + commitCounter)
        );
      });
  });
};

const getRepositories = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith('project-')
      );
      forkedRepos.forEach(
        (repo) => (projectsContainer.innerHTML += `<h3>${repo.name}</h3>`),
        console.log('All of my Forked Technigo Repos: '),
        console.log(forkedRepos),
        getPullRequests(forkedRepos),
        getCommits(forkedRepos)
      );
      drawChart(forkedRepos.length);
    });
};

getRepositories();
