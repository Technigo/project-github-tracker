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
      userContainer.innerHTML = `<h2>User name: ${data.name}</h2>
      <img src="https://avatars.githubusercontent.com/u/80949028?v=4"
       alt="Profile picture">
      `;
    });
};

const getRepos = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //data.forEach((repo) => console.log(repo.name));
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith("project-")
      );
      forkedRepos.forEach(
        (repo) => (projectsContainer.innerHTML += `<h3>${repo.name}</h3>`)
      );
      drawChart(forkedRepos.length);
    });
};

//Remember to pass along your filtered repos as an argument when
//you are calling this function
// const getPullRequests = (repos) => {
//   //Get all the PRs for each project.
//   repos.forEach((repo) => {
//     fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls`)
//       .then((res) => res.json())
//       .then((data) => {
//         const myPulls = data.filter(
//           (pull) => pull.user.login === repo.owner.login
//         );
//         console.log("MY PULLS", myPulls);

//         //TODO
//         //1. Find only the PR that you made by comparing pull.user.login
//         // with repo.owner.login
//         //2. Now you're able to get the commits for each repo by using
//         // the commits_url as an argument to call another function
//         //3. You can also get the comments for each PR by calling
//         // another function with the review_comments_url as argument
//       });
//   });
// };
getUserInfo();
getRepos();
//getPullRequests();
