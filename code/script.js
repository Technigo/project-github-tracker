// The strict mode in JavaScript prevents several bugs. For example, it won't let you use undeclared variables.
'use strict';

// Global variables
const USER = 'isomoth';
const USER_URL = `https://api.github.com/users/${USER}`;
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
const userInfo = document.getElementById('user-info');
const projectsContainer = document.getElementById('project-grid');

// Fetch user info and inject it into a div
const getUserProfile = () => {
  fetch(USER_URL)
    .then((response) => response.json())
    .then((data) => {
      userInfo.innerHTML += `
      <div class="user-info">
        <img class="user-image" src='${data.avatar_url}'/>
        <div class="user-names">
          <h2 class="nickname">${data.name}</h2>
          <h3><a href="https://github.com/isomoth">${data.login}</a></h3>
          <p class="bio">${data.bio}</p>
          <p class= "public">Public repos: ${data.public_repos}</p>
          <p class= "twitter">Twitter: <a href="https://twitter.com/isomoth">@${data.twitter_username}</a></p>
        </div>
      </div>
      `;
    });
};

getUserProfile();

// Fetch all of the user's projects where a pull request has been made
const getPullRequests = (allRepos) => {
  allRepos.forEach((repo) => {
    const PULL_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`;
    fetch(PULL_URL)
      .then((response) => response.json())
      .then((data) => {
        const userPullRequest = data.find(
          (pull) => pull.user.login === repo.owner.login
        );
        // Filter out pull requests from other users and fetch commits from them
        if (userPullRequest) {
          getCommits(userPullRequest.commits_url, repo.name);
        } else {
          // Catch exception when no pull request has been made
          document.getElementById(`commit-${repo.name}`).innerHTML =
            'No pull requests so far.';
        }
      });
  });
};

//Fetch all commits from filtered projects
const getCommits = (myCommitsUrl, myRepoName) => {
  fetch(myCommitsUrl) // this will be 'commits_url' from line 45
    .then((res) => res.json())
    .then((data) => {
      // Count amount of commits
      document.getElementById(`commit-${myRepoName}`).innerHTML += data.length;
    });
};

// Fetch all repositories that the user has forked from Technigo
const getRepositories = () => {
  fetch(REPOS_URL)
    .then((response) => response.json())
    .then((data) => {
      let forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.includes('project-')
      );
      // Sort repos based on date of creation ("created_at")
      forkedRepos.sort(
        (b, a) => new Date(a.created_at) - new Date(b.created_at)
      );
      // Finally, use a loop to generate a card container for each project and fetch other relevant info about it
      forkedRepos.forEach((repo) => {
        projectsContainer.innerHTML += `<div class="repo-card">
            <h3><a class="repo-link" href="${repo.html_url}" target="_blank">${
          repo.name
        }</a><h3>
            <span>
            <p>Default branch: ${repo.default_branch}</p>
            <p>Latest push: ${new Date(repo.pushed_at).toDateString()}</p>
            <p id="commit-${repo.name}">Amount of commits: </p>
            <span>
          </div>`;
      });
      getPullRequests(forkedRepos),
        //Use the data above to generate the chart from chart.js, displaying elapsed vs. remaining projects
        drawChart(forkedRepos.length);
    });
};

getRepositories();
