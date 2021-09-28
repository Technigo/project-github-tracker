// DOM selectors - store the URL
// My username to GitHub + url to repos
const USER = "camekman";
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const INFO_URL = `https://api.github.com/users/${USER}`;
const projectsContainer = document.getElementById("projects");
const profileContainer = document.getElementById("profile-container");
const image = document.getElementById("image");

// Function with the fetch wrapped inside
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
        (repo) =>
          (projectsContainer.innerHTML += `<div class="repositories" id="${
            repo.name
          }"> <h3>${repo.name}</h3> 
          <h5>${repo.default_branch}</h5> <h5> Recent update ${new Date(
            repo.updated_at
          ).toLocaleDateString()} </h5></div>`)
      );
      drawChart(forkedRepos.length);
      //getPullRequests(forkedRepos);
    });
};

getRepos();

const getInfo = () => {
  fetch(INFO_URL)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // console.log(data.name);
      // console.log(data.login);
      // console.log(data.bio);
      // console.log(data.avatar_url);
      image.src = data.avatar_url;
      profileContainer.innerHTML += `<div> 
      <tr><h1>${data.name}</h1></tr>
      <tr><h5>${data.login}</h5></tr>
      <tr><h5>${data.bio}</h5></tr>
       </div>`;
    });
};

getInfo();

// pull requests
// const getPullRequests = (forkedRepos) => {
//   forkedRepos.forEach((repo) => {
//     fetch(
//       "https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100"
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//       });
//   });
// };
