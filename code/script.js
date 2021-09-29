"use strict";
const USER = "Alisebrink";
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const USER_URL = `https://api.github.com/users/${USER}`;

const projectsContainer = document.getElementById("projects");
const userDataContainer = document.getElementById("user-data");

const presentUserData = () => {
  fetch(USER_URL)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      userDataContainer.innerHTML = `
      <header class="my-header"><h1>Welcome to my Github tracker</h1><span>X</span></header>
      <img src="${json.avatar_url}"/>
      <div class="user-text">
      <h1>${json.login}</h1>
      <p class="user-name">${json.name}</p>
      <p>This account has a total of ${json.public_repos} repos</p>
      <canvas id="myChart"></canvas>
      </div>
      `;
    });
};

const presentRepoData = () => {
  fetch(REPOS_URL)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const technigoRepos = json.filter(
        (project) => project.fork && project.name.startsWith("project-")
      );

      technigoRepos.forEach((project, position) => {
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
            let commitDate = filteredCommits[0].commit.author.date;
            let commitMessage = filteredCommits[0].commit.message;
            projectsContainer.innerHTML += `
            <div class="project" id="${position}">
            <div class="project-header"><h3>${
              project.name
            }</h3><span id="deleteRepo">X</span></div>
            <div class="project-text">
                <p>Main branch for this project is: ${
                  project.default_branch
                }</p>
                <a href="${project.html_url}">${project.html_url}</a>
                <p>This repo has been commited to ${
                  filteredCommits.length - 1
                } times</p>
                <p>The last commit was made: ${commitDate.slice(
                  0,
                  10
                )} at ${commitDate.slice(11, 16)}</p>
                <p>And the commit message was: ${commitMessage}</p>
                </div>
            </div>
        `;
            document.getElementById(position).addEventListener("click", deleteElement);
          });
      });
      drawChart(technigoRepos.length);
    });
};

// A function that deletes the box you click on
const deleteElement = () => {
  document.getElementById(this).remove(this);
};

presentRepoData();
presentUserData();
