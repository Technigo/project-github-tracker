"use strict";
// Settig my user name
const USER = "Alisebrink";
// getting my repos
const REPOS_URL = `https://api.github.com/users/${USER}/repos`;
// getting my user info
const USER_URL = `https://api.github.com/users/${USER}`; 

// getting the container for my projects
const projectsContainer = document.getElementById("projects");
// getting the container for my user data
const userDataContainer = document.getElementById("user-data"); 

// My function that fetches the user data from the GitHub API
const presentUserData = () => {
  // fetching using my global variable
  fetch(USER_URL) 
    // This first then handles the json data and returns it
    .then((response) => {
      return response.json();
    })
    // The second one I use to present my user data with the innerHTML functionality
    .then((json) => {
      userDataContainer.innerHTML = `
      <header class="my-header"><h1>Welcome to my Github tracker</h1><span>X</span></header>
      <img src="${json.avatar_url}"/>
      <div class="user-text">
      <h1>GitHub user ${json.login}</h1>
      <p class="user-name">Full name: ${json.name}</p>
      <p>Workplace: ${json.company}</p>
      <p>Current location: ${json.location}
      <p>Portfolio: <a href="${json.blog}">${json.blog}</a></p>
      <p>This account has a total of ${json.public_repos} repos</p>
      <p>Bio: ${json.bio}</p>
      </div>
      `;
    });
};

// This function is used to present the repo data for my projects
const presentRepoData = () => {
  // fetching my data using the global variable
  fetch(REPOS_URL) 
    .then((response) => {
      // this handles the json data that is fetched from the api
      return response.json(); 
    })
    .then((json) => {
      // creating a filter that filters out every repo that has been forked and starts with "project-"
      const technigoRepos = json.filter(
        (project) => project.fork && project.name.startsWith("project-")
      );
      
      // The data that is fetched from the API is put in an array and I use my forEach loop to present every project
      technigoRepos.forEach((project, position) => {
        // creates a variable to use for the current project
        let currentProject = project.name;
        // creates a new url to fetch from where i use the current project and my user name
        const COMMIT_COUNT_URL = `https://api.github.com/repos/${USER}/${currentProject}/commits`;
        // fetches the data from the API with the variable above
        // I do a fetch within the fetch because I want to use the data from the first fetch to create the url for the second fetch
        fetch(COMMIT_COUNT_URL) 
          .then((response) => {
            // this return handles the json data
            return response.json(); 
          })
          .then((json) => {
            // This filter outs the commits to only show the ones that has been made by me
            const filteredCommits = json.filter(
              (project) => project.commit.committer.name === "Linnea Isebrink"
            );
            // This is the date and it gets the latest post
            let commitDate = filteredCommits[0].commit.author.date;
            // This is the commit message and it gets the latest
            let commitMessage = filteredCommits[0].commit.message;
            // I present the data with innerHTML
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
                <p>There has been ${
                  filteredCommits.length - 1
                } commits</p>
                <p>Commit date: ${commitDate.slice( // I use slice() to make the date look prettier
                  0,
                  10
                )} at ${commitDate.slice(11, 16) // I use slice to make the time look prettier
                }</p> 
                <p>Message: ${commitMessage}</p>
                </div>
            </div>
        `;
            // Failed attempt to make a click effect
            // document.getElementById(position).addEventListener("click", deleteElement);
          });
      });
      drawChart(technigoRepos.length);
    });
};

// This is a failed attempt to make a click function
// A function that deletes the box you click on
/* const deleteElement = () => {
  document.getElementById(project).remove(this);
}; */

presentRepoData();
presentUserData();
