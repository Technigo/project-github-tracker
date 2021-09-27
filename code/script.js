const USER = "efstasia";
const GITHUB_URL = `https://api.github.com/users/${USER}/repos`;
const projectsContainer = document.getElementById("projects");
const pullContainer = document.getElementById("pull-requests");
const profileInfo = document.getElementById("profile");

// function to get profile picture and name
const profile = () => {
  fetch(`https://api.github.com/users/${USER}`)
    .then(response => {
      return response.json();
    })
    .then(json => {
      profileInfo.innerHTML += `
        <h3>Username: ${json.login}</h3>
        <img src=${json.avatar_url}>
        `;
    });
};
profile(); // invoking the profile function

// function to get all of the repos and commits
const getRepos = () => {
  fetch(GITHUB_URL)
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log(json);
      const forkedRepos = json.filter(
        repo => repo.fork && repo.name.startsWith("project-")
      );
      forkedRepos.forEach(
        repo =>
          (projectsContainer.innerHTML += `<h3>Name of repo: ${repo.name}</h3>
        <p>Most recent push: ${repo.pushed_at.slice(
          0,
          10
        )} at ${repo.pushed_at.slice(11, 16)} from ${
            repo.default_branch
          } branch</p>
        URL: <a href=${repo.html_url}>CLICK HERE</a>`)
      );
      drawChart(forkedRepos.length);
    });
};
getRepos(); // invoking the function

// this gets the repos
// const getPullRequests = repos => {
//     repos.forEach(repo => {
//       fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls`)
//         .then(response => response.json())
//         .then(json => {
//           console.log(json);

//           const filterPulls = json.filter(pull =>
//             pull.user.login.includes("efstasia")
//           );
//           console.log("FILTER PULLS", filterPulls);
//           filterPulls.forEach(
//             repo =>
//               (pullContainer.innerHTML += `<h3>halloj vart är dom andra?? ${repo.name} ${repo.html_url}</h3>`)
//           );
//         });
//     });
//   };
