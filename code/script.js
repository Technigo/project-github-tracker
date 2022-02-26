//-----API-----//
const userName = 'toal13'
//let reponame =''
const authorName = 'Tomoyo Alvåg'
const API_URL = `https://api.github.com/users/${userName}/repos`;
const USER_API = `https://api.github.com/users/${userName}`;

//-----DOM-----//
const profileInfo = document.getElementById("profile-info")
const projectsContainer = document.getElementById("projects")



const options = {
    method: 'GET', //POST, PATCH, DELETE
    headers: {
        Authorization: `token ${TOKEN}`
    }
}


//------profile-----//
const getUser = () => {
    fetch(USER_API, options)
        .then(res => res.json())
        .then((data) => {
            // console.log(data)
            profileInfo.innerHTML += `
            <h3><a href="${API_URL}" target="_blank">${data.login}</a></h3>
            <img src = "${data.avatar_url}" class="user-picture"/>
       `
        })
}


//-----repos-----//
const getRepos = () => {
    fetch(API_URL, options)
        .then(res => res.json())
        .then(data => {
            // console.log(data)

            const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith('project-'));


            forkedRepos.forEach((repo) => {
                projectsContainer.innerHTML +=
                    `<div id= "projects">
                       <h3>${repo.name}</h3>
                       <a href = ${repo.html_url}> ${repo.name} </a>
                       <p> Main branch: ${repo.default_branch}</p>
                       
                       <p> Latest push : ${repo.pushed_at.slice(0, 10)}, ${repo.pushed_at.slice(11, 16)}</p>
                       <p id="pull-${repo.name}"></p>
                       <p id="commit-${repo.name}">Commits: </p>
                       </div>`;
                // console.log(repo.commits_url)
            });
            fetchPullRequests(forkedRepos)
            activateChart(forkedRepos.length)
        });



};
//



//Remember to pass along your filtered repos as an argument when
//you are calling this function

//-----My pull request-----//
const fetchPullRequests = (allRepos) => {
    allRepos.forEach((repo) => {
        const PULL_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`;

        fetch(PULL_URL, options)
            .then((res) => res.json())
            .then((data) => {
                const myPullRequest = data.find(
                    (pull) => pull.user.login === repo.owner.login);
                    // console.log(myPullRequest)
                if (myPullRequest) {
                    getCommits(myPullRequest.commits_url, repo.name);
                } else {
                    document.getElementById(`commit-${repo.name}`).innerHTML = 'Group project';
                }
                // console.log(myPullRequest)
            });
    });
};


//-----Function to get amount of commit-----// 
const getCommits = (myCommitsUrl, myRepoName) => {
    fetch(myCommitsUrl, options)
    .then((res) => res.json())
    .then((data) => {
            document.getElementById(`commit-${myRepoName}`).innerHTML += [data.length];
        });
};

getRepos();
getUser();