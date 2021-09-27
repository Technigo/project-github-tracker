const USER = "Alisebrink";
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const USER_URL = `https://api.github.com/users/${USER}`;

const projectsContainer = document.getElementById("projects");

const presentRepoData = () => {
  fetch(REPOS_URL)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      const technigoRepos = json.filter(
        (project) => project.fork && project.name.startsWith("project-")
      );

      technigoRepos.forEach((project) => {
        let currentProject = project.name;
        const COMMIT_COUNT_URL = `https://api.github.com/repos/${USER}/${currentProject}/commits`;
        fetch(COMMIT_COUNT_URL)
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            const filteredCommits = json.filter(
              (project) => project.commit.committer.name === "Linnea Isebrink"
            );
            let commitDate = filteredCommits[0].commit.author.date
            let commitMessage = filteredCommits[0].commit.message
            projectsContainer.innerHTML += `
                <h3>${project.name}</h3>
                <p>Main branch for this project is: ${project.default_branch}</p>
                <a href="${project.html_url}">${project.html_url}</a>
                <p>This repo has been commited to ${filteredCommits.length} times</p>
                <p>The last commit was made: ${commitDate.slice(0, 10)} at ${commitDate.slice(11, 16)}</p>
                <p>And the commit message was: ${commitMessage}</p>
        `;
          });
      });
    });
};

const presentUserData = () => {
  fetch(USER_URL)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      projectsContainer.innerHTML = `
      <img src="${json.avatar_url}"/>
      <h1>${json.login}</h1>
      <p>${json.name}</p>
      <p>This account has a total of ${json.public_repos}</p>)
      `;
    });
};

presentRepoData();
//presentUserData();
