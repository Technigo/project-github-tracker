const USER = "IdaAspen";
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const USER_INFO_URL = `https://api.github.com/users/${USER}`;
const projectsContainer = document.getElementById("projects-container");
const userContainer = document.getElementById("user-container");

//get username and profile picture
const getUserInfo = () => {
  fetch(USER_INFO_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); //REMOVE
      userContainer.innerHTML = `
      <img src="https://avatars.githubusercontent.com/u/80949028?v=4"
       alt="Profile picture"><h2>User name: ${data.name}</h2><p>${data.bio}</p>
      `;
    });
};

const getPullRequests = (repos) => {
  //Get all the PRs for each project.
  repos.forEach((repo) => {
    //put in another container?
    fetch(
      `https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`
    )
      .then((res) => res.json())
      .then((data) => {
        const myPulls = data.filter(
          (pull) => pull.user.login === repo.owner.login
        );
        // console.log("MY PULLS", myPulls);
        // console.log("PULL DATA", data);
      });
  });
};

//Started w function for capital letter
// const capitalLetter = ((name) => {
//   name.charAt(0).toUpperCase() + name.slice(1)
// }

//Get all repos w/ details
const getRepos = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log("DATA_GETREPOS", data);
      let forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      );
      //Sorts filtered repos after dates
      forkedRepos.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      forkedRepos = forkedRepos.reverse();

      forkedRepos.forEach(
        (repo) =>
          (projectsContainer.innerHTML += `<h3>${repo.name}</h3>
          <p>Most recent push: ${repo.pushed_at.substring(0, 10)}
          </p><p>Name of default branch: ${repo.default_branch}</p>
          <a href=${repo.html_url} target="_blank">LINK TO REPO</a>`),
        console.log("FORKED REPOS", forkedRepos),
        //pass along filtered repos as an argument when calling getPullRequest
        getPullRequests(forkedRepos)
      );
      drawChart(forkedRepos.length);
    });
};

//Testing commits, going not so good....
const COMMITS_URL = `https://api.github.com/repos/${USER}/project-business-site/commits{/sha}`;

const myCommits = () => {
  fetch(COMMITS_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log("Commits:", data);
    });
};
myCommits();

getUserInfo();
getRepos();
// getPullRequests();
