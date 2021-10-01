const USER = "amandatilly";
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const USER_URL = `https://api.github.com/users/${USER}`;

const projectContainer = document.getElementById("projects");
const profileContainer = document.getElementById("userProfile");

// function to fetch and display user profile info
const fetchUser = () => {
  fetch(USER_URL)
    .then((res) => res.json())
    .then((data) => {
      profileContainer.innerHTML = `
      <section class="user">
      <img class="picture" src="${data.avatar_url}" alt="profile picture" />
      <h2>Hi I'm ${data.name}</h2>
      <p>An ${data.bio} based in ${data.location}</p>
      <a href="${data.html_url}">@${data.login}</a>
      </section>
      `;
    });
};

//function to fetch and display repos
const getRepos = () => {
  fetch(REPOS_URL)
    .then((res) => res.json())
    .then((data) => {
      // filters out repos for user name and that starts with project-
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      );

      forkedRepos.forEach(
        (repo) =>
          (projectContainer.innerHTML += `
        <div class="repo-card" id=${repo.name}>
          <a href="${repo.html_url}">${repo.name}</a>
				  <p>Branch: ${repo.default_branch} </p>
            <p>Latest update: ${new Date(repo.pushed_at).toDateString()}</p>
            <p id="commit-${repo.name}">Number of commits: </p>
            </div>
        `)
      );
      drawChart(forkedRepos.length); // calling function and passing value to chart.js (amount)
      getPullRequests(forkedRepos); // calling function and passing value
    });
};

//function to fetch pull
const getPullRequests = (repos) => {
  repos.forEach((repo) => {
    fetch(
      `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`
    )
      .then((res) => res.json())
      .then((data) => {
        //compares repo user info to pull user info and title with my name
        const userPullRequests = data.find(
          (pull) =>
            repo.owner.login === pull.user.login ||
            pull.title.includes("Amanda")
        );
        // displays number of commits if a pull request has been made, if not it displays message
        if (userPullRequests) {
          fetchCommits(userPullRequests.commits_url, repo.name); //calling function and passing values
        } else {
          document.getElementById(`commit-${repo.name}`).innerHTML =
            "No pull request yet";
        }
      });
  });
};

//function to fetch and display commits
const fetchCommits = (myCommitsUrl, myRepoName) => {
  fetch(myCommitsUrl)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById(`commit-${myRepoName}`).innerHTML += data.length;
    });
};

getRepos();
fetchUser();
