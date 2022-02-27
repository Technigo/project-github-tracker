const username = 'vanhaj',
  API_USER = `https://api.github.com/users/${username}`,
  API_URL = `https://api.github.com/users/${username}/repos`,
  userDisplay = document.getElementById('userDisplay'),
  projects = document.getElementById('projects');
// let reponame;

// token
const options = {
  method: 'GET',
  headers: {
    Authorization: `token ${API_TOKEN}`,
  },
};
console.log(API_TOKEN);

// username and profile picture
const myProfile = () => {
  fetch(API_USER, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data, 'min user');

      userDisplay.innerHTML += `
      <img src=${data.avatar_url} alt='image of user'/>
      <h2><a href='${data.html_url}'>${data.login}</a></h2>
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
        (repo) => repo.fork && repo.name.startsWith('project-')
      );
      console.log(filteredProject, 'my repos');

      // img code here?
      filteredProject.forEach((repo) => {
        console.log(repo.name, 'hejhej');
        projects.innerHTML += `
        <a href='${repo.html_url}'><p>name of my repo: ${repo.name}</p></a>
        <p>Default branch: ${repo.default_branch}</p>
        <p>Last push: ${new Date(repo.pushed_at).toLocaleString()}
        <p id =${repo.name}>Number of commits:</p>
        `;
      });

      getPullRequests(filteredProject);
      drawChart(forkedRepos.length);
    });
};

//fetches 100 pulls
const getPullRequests = (filteredProject) => {
  //Get all the PRs for each project
  filteredProject.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        const myPS = data.find((pull) => pull.user.login === repo.owner.login);

        // console.log(repo.name, 'detta');

        // if PS was made by user -> getting the commits (getCommits)
        if (myPS) {
          getCommits(myPS.commits_url, repo.name);
        } else {
          document.getElementById(
            (`${repo.name}`.innerHTML += 'No pull request was done by the user')
          );
        }
        // const myCommits = myPS.commits_url;
        // const myRepoName = repo.name;
        // getCommits(myCommits, myRepoName);
        // console.log(data, 'is this working');
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
//------

// if you have time, get the comments
// also dont forget the token step when deploying to netlify
