const owner = 'joannaringqvist';
const API_URL_REPOS = `https://api.github.com/users/${owner}/repos`;
const projects = document.getElementById('projects');
const username = document.getElementById('username');
const picture = document.getElementById('picture');
const numberOfProjects = document.getElementById('numberOfProjects');
const sort = document.getElementById('sort');
let ownerLogin = '';

//Function for getting all my repos from Github
const getRepos = (sort) => {
    fetch(API_URL_REPOS)
        .then((res) => res.json())
        .then((data) => {

            //Get the name and picture from the user and pass it to the function for showing them
            ownerLogin = data[0].owner.login;
            userPic = data[0].owner.avatar_url;
            showUsernameAndPic(ownerLogin, userPic);
            
            //Array for storing the repos and counting them
            let arrayWithRepos = [];

            data.forEach((repo) => {
                //I only want to continue working with the repos from Technigo, so they should be forked and start with project
                if (repo.fork === true && repo.name.startsWith('project')) {
                    arrayWithRepos.push(repo.name);
                    //Write the table rows and cells
                    projects.innerHTML += `
                    <tr>
                        <td>${repo.name}</td>
                        <td>${new Date(repo.updated_at).toLocaleDateString('sv-SE')}</td>
                        <td>${repo.default_branch}</td>
                        <td id="commits-${repo.name}"></td>
                        <td><a class="repo-url" href="${repo.html_url}">${repo.html_url}</a></td>
                    </tr>`;
                }
            });

            //Count the repos and show the chart
            countRepos = arrayWithRepos.length;
            numberOfProjects.innerHTML = `I have finished ${countRepos} projects and have ${19-countRepos} left.`;
            showChart(countRepos);
            
            //Get the pull requests for each repo
            getPullRequests(arrayWithRepos);
        })
}

//Function for showing username and picture
const showUsernameAndPic = (ownerLogin, userPic) => {
    username.innerHTML = ownerLogin;
    picture.src = userPic;
}

//Function for getting the pull requests to be able to show the commits and the comments
const getPullRequests = (repos) => {
    repos.forEach(repo => {
        fetch(`https://api.github.com/repos/technigo/${repo}/pulls?per_page=90`)
        .then((res) => res.json())
        .then(data => {

            let commitsURL = '';

            data.forEach((repoData) => {
                //Only go on with the PRs that are from the user
                if (ownerLogin === repoData.user.login) {
                
                    //Get the commits for each repo through the commitsURL. Pass it to the fetchCommits function.
                    commitsURL = repoData.commits_url;
                    fetchCommits(commitsURL, repo);
                } 
            });
        })
    })
}

//Function for showing how many commits are made for each repo
const fetchCommits = (commitsURL, repoName) => {
    fetch(commitsURL)
    .then((res) => res.json())
    .then(data => {
        document.getElementById(`commits-${repoName}`).innerHTML += data.length;
    });
}

//Invoke the getRepo function
getRepos();
