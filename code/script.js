const owner = 'joannaringqvist';
//const API_URL_USERNAME = `https://api.github.com/users/${owner}`;
const API_URL_REPOS = `https://api.github.com/users/${owner}/repos`;
//const API_URL_PR = `https://api.github.com/repos/technigo/${repoName}/pulls`;
const projects = document.getElementById('projects');
const username = document.getElementById('username');
const picture = document.getElementById('picture');
let ownerLogin = '';
//Count amount of repos for the chart
let countRepos = 0;

const getRepos = () => {
    fetch(API_URL_REPOS)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            console.log(json);

            ownerLogin = json[0].owner.login;
            username.innerHTML = ownerLogin;
            picture.src = json[0].owner.avatar_url;
            let arrayWithRepos = [];

            json.forEach((repo) => {

                if (repo.fork === true && repo.name.startsWith('project')) {
                    countRepos++;
                    arrayWithRepos.push(repo.name);
                    projects.innerHTML += `<tr><td id="${repo.name}">${repo.name}</td><td>${new Date(repo.updated_at).toLocaleDateString('sv-SE')}</td><td>${repo.default_branch}</td><td id="commits-${repo.name}"></td><td>${repo.url}</td></tr>`
                }
            });
            const numberOfProjects = document.getElementById('numberOfProjects');
            numberOfProjects.innerHTML = `I have finished ${countRepos} projects and have ${19-countRepos} left.`;
            console.log(arrayWithRepos);
            getPullRequests(arrayWithRepos);
        })
}

const getPullRequests = (repos) => {
    //Get all the PRs for each project.
    repos.forEach(repo => {
        fetch(`https://api.github.com/repos/technigo/${repo}/pulls?per_page=90`)
        .then(res => res.json())
        .then(data => {

            let commitsURL = '';

            data.forEach((repoData) => {
                
                if (ownerLogin === repoData.user.login) {
                
                    //Now you're able to get the commits for each repo by using
                    // the commits_url as an argument to call another function
                    commitsURL = repoData.commits_url;
                    fetchCommits(commitsURL, repo);
                } 
            });

        })
    })
}

const fetchCommits = (commitsURL, repoName) => {
    console.log(repoName);

    fetch(commitsURL)
    .then(res => res.json())
    .then(json => {
      console.log(json.length);
      console.log(repoName);
      document.getElementById(`commits-${repoName}`).innerHTML += json.length;
    });
}

getRepos();
