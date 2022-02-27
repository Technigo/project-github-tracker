const username = 'vanhaj',
  API_USER = `https://api.github.com/users/${username}`,
  API_URL = `https://api.github.com/users/${username}/repos`,
  userDisplay = document.getElementById('userDisplay'),
  projects = document.getElementById('projects');

// token
const options = {
  method: 'GET',
  headers: {
    Authorization: `token ${API_TOKEN}`,
  },
};

// username and profile picture
const myProfile = () => {
  fetch(API_USER, options)
    .then((res) => res.json())
    .then((data) => {
      userDisplay.innerHTML += `
      <div class='profile'>
        <img class='user-img' src=${data.avatar_url} alt='image of user'/>
        <h2 class="user-info">
          <a href='${data.html_url}'>${data.login}</a>
        </h2>
      </div>
      `;
    });
};
myProfile();

// repositories
const myRepos = () => {
  fetch(API_URL, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data, 'without filter');

      //filtering out only those that starts with projects
      const filteredProject = data.filter(
        (repo) => repo.fork && repo.name.startsWith('project')
      );

      filteredProject.forEach((repo) => {
        projects.innerHTML += `
        <div class='repo-card'>
          <a href='${repo.html_url}'>
            <p>Repo name: ${repo.name}</p>
          </a>
          <p>Default branch: ${repo.default_branch}</p>
          <p>Last push: ${new Date(repo.pushed_at).toDateString()}
          <p id =${repo.name}>Number of commits: </p>
        </div>
        `;
      });

      getPullRequests(filteredProject);
      drawChart(filteredProject.length);
    });
};

//fetches 100 pulls
const getPullRequests = (repos) => {
  //Get all the PRs for each project
  repos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`
    )
      .then((res) => res.json())
      .then((data) => {
        const myPS = data.find((pull) => pull.user.login === repo.owner.login);

        // if PS was made by user -> getting the commits (getCommits)
        if (myPS) {
          getCommits(myPS.commits_url, repo.name);
        } else {
          document.getElementById(
            `${repo.name}`
          ).innerHTML = `No pull request was done`;
        }
      });
  });
};

// Getting the commits
const getCommits = (myCommits, myRepoName) => {
  fetch(myCommits)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById(`${myRepoName}`).innerHTML += data.length;
      //`Number of commits: ${data.length}`;
      // console.log('nu då?');
    });
};

myRepos();
