const projectSection = document.getElementById('projects');
const headerSection = document.getElementById('header');

const USER = 'jenniferwvng';

const options = {
    method: 'GET',
    headers: {
          Authorization: API_TOKEN
      }
  }

//Displays profile information in HTML
let displayProfileHTML = (data) => {
    headerSection.innerHTML += `
        <section>
            <img src="${data.avatar_url}" alt="profile pic" width="100" height="100"/>
            <h1>Username: ${data.login}</h1>    
        </section>
    `
}

//Stores HTML blueprint generator in separate function to enable code reuse
let generateReposHTML = (data) => {
    projectSection.innerHTML += `
    <article class="project-section">
        <p class="project-repo">Project repo: ${data[i].name}</p>
        <p>Recent push: ${data[i].pushed_at}</p>
        <p>Default branch: ${data[i].default_branch}</p>
        <p>Github repo URL: ${data[i].html_url}</p>
    </article>
    `
}

let generatePullandCommitHTML = () => {
    projectSection.innerHTML += `
    <section class="pull-commit-section">
        <h1 style="text-align: center; text-transform: uppercase">Status bar</h1>
        <p id="loading-status" style="text-align: center; text-transform: uppercase">Loading...</p>
        <p id="pull-request">Pull requests: </p>
        <p id="commits">Commits per pull request: </p>
    </section>
    `
}

let generatePullRequestsHTML = (data, result) => {
    let pullRequest = document.getElementById('pull-request');
    pullRequest.innerHTML += `<p>${result}: ${data.url}</p>`;
}

let invokeWhenLoaded = () => {
     const loadingStatus = document.getElementById('loading-status');
     loadingStatus.innerHTML = '';
}

//Filters through all pull requests to find the user's in each repo, query set to 300 in fetch
let displayPullRequests = (data) => {
    let result;
    //Returns repo name in result variable which is passed in generatePullRequestsHTML as parameter
    data.forEach(element => result = element.base.repo.name)

    data.forEach(element => element.user.login === `${USER}` ? (generatePullRequestsHTML(element, result), fetchCommits(element.commits_url, result)) : console.log('Filtering through other pull requests...'))
    invokeWhenLoaded();
    //console.log('Det är är din pull request: ' + element.url)
    //element.base.repo.name är project name
}

//Displays data for each object in the array containing repo information
let displayRepos = (data) => {
        //Only display forked projects which has corresponding pull request
        //if repo doesnt start with project but is forked - include by adding project- before
    const forkedRepos = data.filter(repo => repo.fork === true && repo.name.startsWith('project-'));

    for (i = 0; i < forkedRepos.length; i++) {
    //data.forEach(element => 
    generateReposHTML(forkedRepos);
    fetchPullRequests(forkedRepos[i].name);
    }
    generatePullandCommitHTML();
}

//Helper function for fetching commits
let fetchCommits = (url, result) => {
    let commitsPullrequest = document.getElementById('commits');
    fetch(url)
    .then(res => res.json())
    .then(
        data =>
        commitsPullrequest.innerHTML += `<p>${result}: ${data.length}</p>`
        )
}

//Helper function to access forkedRepos inside it by invoking it with forkedRepos as parameter inside displayRepos, where it's locally defined
let fetchPullRequests = (projectRepo) => {
    fetch('https://api.github.com/repos/Technigo/' + `${projectRepo}`+ '/pulls?per_page=300', options)
    .then(res => res.json())
    .then(displayPullRequests)
    .catch(err => console.log(err))
}

fetch('https://api.github.com/users/jenniferwvng/repos', options)
.then(res => res.json())
.then(displayRepos)

fetch('https://api.github.com/users/jenniferwvng', options)
.then(res => res.json())
.then(displayProfileHTML)
