const owner = 'joannaringqvist';
//const API_URL_USERNAME = `https://api.github.com/users/${owner}`;
const API_URL_REPOS = `https://api.github.com/users/${owner}/repos`;
//const API_URL_PR = `https://api.github.com/repos/technigo/${repoName}/pulls`;
const projects = document.getElementById('projects');
const username = document.getElementById('username');
const picture = document.getElementById('picture');
const numberOfProjects = document.getElementById('numberOfProjects');
const sort = document.getElementById('sort');

let ownerLogin = '';
//Count amount of repos for the chart
//let countRepos = 0;

//Function that renders the table
//const renderTable = () => {}

const getRepos = (sort) => {
    fetch(API_URL_REPOS)
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            ownerLogin = json[0].owner.login;
            username.innerHTML = ownerLogin;
            picture.src = json[0].owner.avatar_url;
            let arrayWithRepos = [];

            json.forEach((repo) => {
                console.log(repo);

                if (repo.fork === true && repo.name.startsWith('project')) {
                    arrayWithRepos.push(repo.name);
                    projects.innerHTML += `<tr id="tr-${repo.name}"><td>${repo.name}</td><td>${new Date(repo.updated_at).toLocaleDateString('sv-SE')}</td><td>${repo.default_branch}</td><td id="commits-${repo.name}"></td><td><a class="repo-url" href="${repo.html_url}">${repo.html_url}</a></td><td id="open-${repo.name}">Open</td></tr>`
                }
            });
            countRepos = arrayWithRepos.length;
            numberOfProjects.innerHTML = `I have finished ${countRepos} projects and have ${19-countRepos} left.`;
            console.log(arrayWithRepos.length);
            showChart(countRepos);
            getPullRequests(arrayWithRepos);

            /*if (sort === 'alphabetically') {
                console.log('ABCD');
            }*/

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
    fetch(commitsURL)
    .then(res => res.json())
    .then(json => {
      document.getElementById(`commits-${repoName}`).innerHTML += json.length;
    });
}

getRepos();

/*
sort.addEventListener('change', () => {
    console.log('sort');
    
    if (sort.value === 'alphabetically') {
        getRepos('alphabetically');

    }
})*/
