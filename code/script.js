const userSection = document.getElementById("user");
const projectSection = document.getElementById("projects");

const username = 'jessand77';
const API_USER_INFO = `https://api.github.com/users/${username}`;
const API_REPOS = `${API_USER_INFO}/repos`;

const options = {
  method: 'GET',
  headers: {
      Authorization: 'token ' + API_TOKEN
  }
};

const fetchUserInfo = () => {
  fetch(API_USER_INFO, options)
  .then(res => res.json())
  .then(user => {
    userSection.innerHTML = `
      <h3>${user.name}</h3>
      <p>Username: ${user.login}</p>
      <a href="${user.html_url}" target="_blank"><img class="avatar" src="${user.avatar_url}" alt="profile picture" /></a>
    `; 
  });
};

const getCommits = (pullRequestCommitsUrl, reponame) => {
  fetch(pullRequestCommitsUrl, options)
  .then(res => res.json())
  .then(commits => {

    let repoDiv = document.getElementById(`${reponame}-div`);
    let repoDivContent = document.getElementById(`${reponame}-div-content`);

    let commitParagraph = document.createElement('p');
    commitParagraph.innerHTML = `Number of commits: <span>${commits.length}</span>`;
    repoDivContent.appendChild(commitParagraph);

    // Create a new div to put the commit messages and the hide commits button in
    let commitDiv = document.createElement('div');
    commitDiv.className = 'commit-div';
    commitDiv.style.display = 'none';
    repoDiv.appendChild(commitDiv);

    let commitMessageList = document.createElement('ol');
    commitMessageList.className = 'message-list';  
    commitDiv.appendChild(commitMessageList);
  
    commits.forEach(commit => {
      let commitMessage = document.createElement('li');
      commitMessage.innerHTML = commit.commit.message;
      commitMessageList.appendChild(commitMessage);
    });

    // Buttons to show or hide commit comments
    let showCommitsButton = document.createElement('button');
    showCommitsButton.className = 'commits-button';
    showCommitsButton.innerHTML = 'Show commits';
    repoDivContent.appendChild(showCommitsButton);

    let hideCommitsButton = document.createElement('button');
    hideCommitsButton.className = 'commits-button';
    hideCommitsButton.innerHTML = 'Hide commits';
    commitDiv.appendChild(hideCommitsButton);

    const showCommitMessageList = () => {
      repoDivContent.style.display = 'none';
      commitDiv.style.display = 'block';
    }

    const hideCommitMessageList = () => {
      commitDiv.style.display = 'none';
      repoDivContent.style.display = 'flex';
    }

    showCommitsButton.addEventListener('click', showCommitMessageList);
    hideCommitsButton.addEventListener('click', hideCommitMessageList); 
  })
}

const getPullRequests = (repos) => {
  repos.forEach(repo => {
    
    fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`, options)
    .then(res => res.json())
    .then(pullRequests => {

      // How can I get the pull requests for the repos that I am not the owner of without hardcoding like this?
      const firstTitleToSearchFor = 'Week 4 project - Sofie Pellegrini & Jessica Sandler';
      const secondTitleToSearchFor = 'Week 6 project : Jessica - Maurii - Nadia - Rijad - Terese';
      const thirdTitleToSearchFor = 'Week 9: Jessica Sandler, Laura Sjölander and Nadia Lefebvre';

      const myPullRequests = pullRequests
      .filter(pullRequest => pullRequest.user.login === username || pullRequest.title === firstTitleToSearchFor || pullRequest.title === secondTitleToSearchFor || pullRequest.title === thirdTitleToSearchFor)

      //If the length is 0 no pull request has been made
      if (myPullRequests.length === 0) {

        let repoDivContent = document.getElementById(`${repo.name}-div-content`);
        let commitParagraph = document.createElement('p');

        commitParagraph.innerHTML = `<span>No pull request found</span>`;
        commitParagraph.className = "no-pullrequest";
        
        repoDivContent.appendChild(commitParagraph);
      }

      //Fetches the commits for all the projects where a pull request has been made
      myPullRequests.forEach(myPullRequest => {
        getCommits(myPullRequest.commits_url, repo.name);
      });
    })
  })
}

// This function filters out repos that are forked and start with "project"
const getTechnigoRepos = (repos) => {
  return repos
  .filter(repo => repo.fork === true && repo.name.startsWith("project"))
};

const fetchRepos = () => {
  fetch(API_REPOS, options)
  .then(res => res.json())
  .then(repos => {
    
    const technigoRepos = getTechnigoRepos(repos);
    
    getPullRequests(technigoRepos);

    projectSection.innerHTML = `
      <h2>My Technigo projects:</h2>
      <div class="repo-container" id="repoContainer"></div>
      `;

    // Get the number of forked Technigo projects and draw the chart
    const numberOfTechnigoRepos = technigoRepos.length;
    drawChart(numberOfTechnigoRepos);
    
    technigoRepos.forEach((repo) => {
      
      const mostRecentPush = new Date(repo.pushed_at).toLocaleDateString('en-GB');

      repoContainer.innerHTML += `
        <div id=${repo.name}-div class="repo-div">
          <div id=${repo.name}-div-content class="repo-div-content">
            <h4><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
            <p>Most recent push: <span>${mostRecentPush}</span></p>
            <p>Default branch: <span>${repo.default_branch}</span></p>
          </div>
        </div>
      `;
    
    });
  });
};


fetchUserInfo();
fetchRepos();


  