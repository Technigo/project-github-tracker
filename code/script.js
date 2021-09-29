const USER = "amandatilly";
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const USER_URL = `https://api.github.com/users/${USER}`;

const projectContainer = document.getElementById("projects");
const profileContainer = document.getElementById("userProfile");

const fetchUser = () => {
  fetch(USER_URL)
    .then((res) => res.json())
    .then((data) => {
      profileContainer.innerHTML = /*html*/ `
      <section class="user">
      <h2>Username: ${data.login}</h2>
      <img class="picture" src="${data.avatar_url}" alt="profile picture" />
      </section>
      `;
    });
};

const getRepos = () => {
  fetch(REPOS_URL)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);

      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
        // (repo) => repo.fork === true && repo.name.includes('project-')
      );
      forkedRepos.forEach(
        (repo) =>
          (projectContainer.innerHTML += /*html*/ `
        <div>
        <a href="${repo.html_url}">${repo.name} with default branch ${
            repo.default_branch
          }</a>
        <p>Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
        <p id="commit-${repo.name}"> Commits amount: </p>
        </div>
        `)
      );
      getPullRequests(forkedRepos);
    });
};

const getPullRequests = (repos) => {
  repos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`
    )
      .then((res) => res.json())
      .then((data) => {
        const userPullRequests = data.find(
          (pull) => pull.user.login === repo.owner.login
        );

        if (userPullRequests) {
          fetchCommits(userPullRequests.commits_url, repo.name);
        } else {
          document.getElementById(`commit-${repo.name}`).innerHTML =
            "No pull request yet";
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

getRepos();
fetchUser();
