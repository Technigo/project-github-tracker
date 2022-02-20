  //My API´s//
  const USER = 'MariaThomasson'; 
  const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
  const USER_URL = `https://api.github.com/users/${USER}`;


  //My variables//
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
        userData.innerHTML = 
        `<div class="my-info">
        <img class="avatar" src="${json.avatar_url}"/>
        <h1>${json.name}</h1>
        <p><i class="fas fa-user"></i> ${json.login}</p>
        <p><i class="fas fa-map-marker-alt"></i> Location: ${json.location}</p>
        <img class="languages" src="./images/language.png"/>`
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
        <p><i class="fab fa-github"></i><a href="${repo.html_url}"target="_blank"> GitHub repo</a></p>
        <p><i class="fas fa-code-branch"></i> ${repo.default_branch}</p>
        <p><i class="far fa-clock"></i> Recent push: ${new Date(repo.pushed_at).toLocaleDateString()}</p>
        <p id="commit-${repo.name}">Commits: </p>
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
          'Group project.';
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