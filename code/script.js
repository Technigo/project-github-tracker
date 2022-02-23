const owner = 'joannaringqvist';
//const API_URL_USERNAME = `https://api.github.com/users/${owner}`;
const API_URL_REPOS = `https://api.github.com/users/${owner}/repos`;
//const API_URL_PR = `https://api.github.com/repos/technigo/${repoName}/pulls`;
const projects = document.getElementById('projects');
const username = document.getElementById('username');
const picture = document.getElementById('picture');

const numberOfCommits = 7;
let countRepos = 0;

fetch(API_URL_REPOS)
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json);

        username.innerHTML = json[0].owner.login;
        picture.src = json[0].owner.avatar_url;
        let arrayWithRepos = [];

        json.forEach((repo) => {

            if (repo.fork === true && repo.name.startsWith('project')) {
                countRepos++;
                arrayWithRepos.push(repo.name);
                projects.innerHTML += `<tr><td>${repo.name}</td><td>${repo.updated_at}</td><td>${repo.default_branch}</td><td>${numberOfCommits}</td><td>${repo.url}</td></tr>`
            }
        });
        const numberOfProjects = document.getElementById('numberOfProjects');
        numberOfProjects.innerHTML = `I have finished ${countRepos} projects and have ${19-countRepos} left.`;
        console.log(arrayWithRepos);
        getPullRequests(arrayWithRepos);
    })

    
//Remember to pass along your filtered repos as an argument when
//you are calling this function
//Endpoint to get all PRs from a Technigo repo https://api.github.com/repos/Technigo/${reponame}/pulls

const getPullRequests = (repos) => {
    //Get all the PRs for each project.
    repos.forEach(repo => {
      fetch(`https://api.github.com/repos/technigo/${repo}/pulls`)
      .then(res => res.json())
      .then(data => {

        console.log(data);
        console.log(data[0].user.login);

              //TODO
              //1. Find only the PR that you made by comparing pull.user.login
              // with repo.owner.login
              //2. Now you're able to get the commits for each repo by using
              // the commits_url as an argument to call another function
              //3. You can also get the comments for each PR by calling
              // another function with the review_comments_url as argument

          })
    })
}
