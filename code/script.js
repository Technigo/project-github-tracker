// -- DOM SELECTORS -- //
const projectsContainer = document.getElementById("projects");
const profileInfo = document.getElementById("profileInfo");

// -- GLOBAL VARIABLES -- //
const USER = "brunsant";
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const USER_API = `https://api.github.com/users/${USER}`;

// -- REPOS -- //
const getRepos = () => {
  fetch(REPOS_URL)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log("DATA", json);
      const forkedRepos = json.filter(
        (project) => project.fork && project.name.startsWith("project-")
      );

      forkedRepos.forEach((project) => {
        const COMMIT_URL = `https://api.github.com/repos/${USER}/${project.name}/commits`;
        fetch(COMMIT_URL)
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            console.log("COMMITS", json);
            const filteredCommits = json.filter(
              (project) => project.commit.author.name === "Bruna Santos Araujo"
            );
            console.log("FILTERED", filteredCommits);
            console.log("NUMBER OF COMMITS", filteredCommits.length);
            // console.log("COMMIT MESSAGE", filteredCommits.commit.message);
            //TRYING TO PUT THE MESSAGE ON THE LAST COMMIT//

            projectsContainer.innerHTML += `
          <div>
          <h3> Project Name: ${project.name}</h3>
          <a href = ${project.html_url}> ${project.name} </a>
          <p> Main branch: ${project.default_branch}</p>
          <p> Number of commits: ${filteredCommits.length}</p>
          <p> Latest push: ${project.pushed_at.slice(
            0,
            10
          )}, ${project.pushed_at.slice(11, 16)} 
          </p>
          </div>
          `;

            // const getPulls = (forkedRepos) => {
            //   forkedRepos.forEach((project) => {
            //     fetch(
            //       `https://api.github.com/repos/technigo/${project.name}/pulls`
            //     )
            //       .then((response) => response.json())
            //       .then((data) => {
            //         console.log("PULLS", data);
            //       });
            //   });
            // };
          });
      });
      drawChart(forkedRepos.length);
    });
};

// const getPulls = (forkedRepos) => {
//   forkedRepos.forEach((project) => {
//     fetch(`https://api.github.com/repos/technigo/${project.name}/pulls`)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("PULLS", data);
//       });
//   });
// };

// -- PROFILE INFO -- //
const getUser = () => {
  fetch(USER_API)
    .then((response) => response.json())
    .then((data) => {
      console.log("USER DATA", data);
      profileInfo.innerHTML = `
          <h3> Profile Info </h3>
          <img src = "https://avatars.githubusercontent.com/u/80712035?v=4">
          <h4> ${data.name}</h4>
          <h4> ${data.login}</h4>
          `;
    });
};

getRepos();
getUser();
