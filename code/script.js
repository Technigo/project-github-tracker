
//-----DOM-----//
const profileInfo = document.getElementById("profile-info")
const projectsContainer = document.getElementById("projects")


//-----Global variables -----//
const userName = 'toal13'
const authorName = 'Tomoyo Alvåg'
const API_URL = `https://api.github.com/users/${userName}/repos`;
const USER_API = `https://api.github.com/users/${userName}`;


//-----Token-----//
const options = {
    method: 'GET', //POST, PATCH, DELETE
    headers: {
        Authorization: `token ${TOKEN}`
    }
}


//------Profile-----//
const getUser = () => {
    fetch(USER_API, options)
        .then(res => res.json())
        .then((data) => {
            profileInfo.innerHTML += `
            <h2><img src = "./github.png"><a href="https://github.com/${userName}" target="_blank">${data.login}</a></h2>
            <img src = "${data.avatar_url}" class="user-picture"/>
       `
        })
}


//-----Repos-----//
const getRepos = () => {
    fetch(API_URL, options)
        .then(res => res.json())
        .then(data => {
          //-----Filter repos-----//
            const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith('project-'));

          //-----Show repos in projectsContainer-----//
            forkedRepos.forEach((repo) => {
                projectsContainer.innerHTML +=
                    `<div id= "projects">
                       <h3><a href = ${repo.html_url}> ${repo.name} </a></h3>
                       <p>Default branch: ${repo.default_branch}</p>
                       <p>Latest push: ${repo.pushed_at.slice(0, 10)}, ${repo.pushed_at.slice(11, 16)}</p>
                       <p id="pull-${repo.name}"></p>
                       <p id="commit-${repo.name}">Commits: </p>
                       </div>`;
            });
            //-----Initiate next function and chart-----// 
            fetchPullRequests(forkedRepos)
            activateChart(forkedRepos.length)
        });
};


//-----My pull request-----//
const fetchPullRequests = (allRepos) => {
    allRepos.forEach((repo) => {
        const PULL_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`;
        fetch(PULL_URL, options)
        .then((res) => res.json())
        .then((data) => {
            //-----Check if i have a pullrequest for that repo user login and repo owner-----//
            const myPullRequest = data.find(
                (pull) => pull.user.login === repo.owner.login);
                //-----If yes, start function getCommits-----//
                if (myPullRequest) {
                    getCommits(myPullRequest.commits_url, repo.name);
                    //----If not, assume and print Group project-----//
                } else {
                    document.getElementById(`commit-${repo.name}`).innerHTML = 'Group project';
                }
            });
    });
};


//-----Function to get amount of commit. Print on page.-----// 
const getCommits = (myCommitsUrl, myRepoName) => {
    fetch(myCommitsUrl, options)
    .then((res) => res.json())
    .then((data) => {
            document.getElementById(`commit-${myRepoName}`).innerHTML += [data.length];
        });
};

//-----Initiate on page load-----//
getRepos();
getUser();