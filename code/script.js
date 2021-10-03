const USER = "AschwinSiaila";
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const nameAndPicture = document.getElementById("nameandpicture");
const projectsContainer = document.getElementById("projects");

const NameandPicture = () => {
  const personal_ID = `https://api.github.com/users/${USER}`;
  fetch(personal_ID)
    .then((res) => res.json())
    .then((data) => {
      global__UserData = data;
    })
    .then(() => NameAndPicture());
};

const NameAndPicture = () => {
  const picture = global__UserData.avatar_url;

  nameAndPicture.innerHTML += `
        <img class="profile-pic" src="${picture}" alt="Picture of gitHub-user"/>
        <div class="profile-name">${USER}</div>
      `;
};

const fetchRepositories = () => {
  fetch(REPOS_URL)
    .then((res) => res.json())
    .then((data) => {
      const technigoRepositories = data.filter((repo) => repo.name.includes("project-") && repo.fork);

      console.log(technigoRepositories);

      technigoRepositories.forEach((repo) => {
        projectsContainer.innerHTML += `
          <div class="project-info">
          <a class="project-links" href="${repo.html_url}">${repo.name} with default branch ${repo.default_branch}</a>
          <p class="push">Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
          <a href="${repo.html_url}"><p class="commits" id="commit-${repo.name}">Commits amount: </p></a>

          </div>
          `;
      });

      fetchPullRequestArray(technigoRepositories);
      drawProgressChart(technigoRepositories);
    });
};

const fetchPullRequestArray = (allrepositories) => {
  allrepositories.forEach((repo) => {
    fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls`)
      .then((res) => res.json())
      .then((data) => {
        const myPullRequest = data.find((pull) => pull.user.login === repo.owner.login);
        fetchCommits(myPullRequest.commits_url, repo.name);
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

NameandPicture();
fetchRepositories();
