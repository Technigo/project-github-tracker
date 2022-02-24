const repoGrid = document.getElementById("repoGrid");
const profile = document.getElementById("profile");

// Global variables:
const userName = "JustineZwiazek";
const API_USER = `https://api.github.com/users/${userName}`;
const API_REPOS = `https://api.github.com/users/${userName}/repos`;

const createProfile = () => {
  fetch(API_USER)
    .then((res) => res.json())
    .then((data) => {
      profile.innerHTML = `
      <img src="${data.avatar_url}" class="user-img">
      <h2>${data.name}</h2>`;
    });
};

const createRepoGrid = (repp) => {
  fetch(API_REPOS)
    .then((res) => res.json())
    .then((data) => {
      let forkedRepo = repositories.filter((data) => {
        return data.fork === true;
      });
      // return repoGrid.fork === true;
      forkedRepo.forEach((repo) => {
        repoGrid.innerHTML += `
          <div class="repo-name"></div>
          <h3 class="repo-name">${data.name}</h3>
          <span><a class="project-url" href="${data.svn_url}">${
          data.name
        }</span></a>
           <p>Updated: ${new Date(data.pushed_at).toLocaleDateString("en-SE", {
             year: "numeric",
             month: "short",
             day: "numeric",
           })}</p>
           <p>Default branch: ${data.default_branch}</p>`;
      });
    });
};
// ${rep.name.substring(rep.name.indexOf("/") + 1)}
createProfile();
createRepoGrid();
