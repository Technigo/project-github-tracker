const USER = "isabellwastfelt";
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const PROFILE_URL = `https://api.github.com/users/${USER}`;

const projectContainer = document.getElementById("projects");
const profileInfo = document.getElementById("profile");

const options = {
  method: "GET",
  headers: {
    Authorization: `token ${API_TOKEN}`,
  },
};

const getProfile = () => {
  fetch(PROFILE_URL, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      profileInfo.innerHTML += `
        <img src=${data.avatar_url}' alt='image of isabellwastfelt at GitHub'>
        <h3><a href="${data.html_url}">${data.login}</a></h3>
        `;
    });
};
getProfile(); //invoking

const getRepos = () => {
  fetch(REPOS_URL, options)
    .then((res) => res.json())
    .then((data) => {
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project")
      );

      forkedRepos.forEach(
        (repo) =>
          (projectContainer.innerHTML += `
            <div class='card'>
                <a href="${repo.html_url}"><h3>${repo.name}</h3></a>
                <p> Default branch: ${repo.default_branch}</p>
                <p> Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
                <p id='commit-${repo.name}'> Number of commits: </p>
            </div>
        `)
      );

      getPullRequests(forkedRepos);
      drawChart(forkedRepos.length);
    });
};

getRepos();

// Pull requests for each project
const getPullRequests = (repos) => {
  repos.forEach((repo) => {
    const PULLREQUEST_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`;
    fetch(PULLREQUEST_URL, options)
      .then((res) => res.json())
      .then((pull) => {
        const myPullRequest = pull.find(
          (pull) => pull.user.login === repo.owner.login
        );

        // If pull request done by user, getCommits function is invoked
        if (myPullRequest) {
          getCommits(myPullRequest.commits_url, repo.name);
        } else {
          document.getElementById(`commit-${repo.name}`).innerHTML =
            "No pull request done by user";
        }
      });
  });
};

const getCommits = (myCommitsUrl, myRepoName) => {
  fetch(myCommitsUrl)
    .then((res) => res.json())
    .then((commit) => {
      document.getElementById(`commit-${myRepoName}`).innerHTML +=
        commit.length;
    });
};
