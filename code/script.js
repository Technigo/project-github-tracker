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
}

const fetchUserInfo = () => {
  fetch(API_USER_INFO, options)
  .then(res => res.json())
  .then(user => {
    userSection.innerHTML = `
      <h3>${user.name}</h3>
      <p>Username: ${user.login}</p>
      <a href="${user.html_url}" target="_blank"><img class="avatar" src="${user.avatar_url}" alt="profile picture" /></a>
    `; 
  })
}

const getCommits = (pullRequestCommitsUrl, reponame) => {
  fetch(pullRequestCommitsUrl, options)
  .then(res => res.json())
  .then(commits => {

    let repoDiv = document.getElementById(reponame);

    let commitParagraph = document.createElement('p');
    commitParagraph.innerHTML = `Number of commits: ${commits.length}`;
    repoDiv.appendChild(commitParagraph);

    let commitMessageList = document.createElement('ol');
    // commitMessageList.className = 'message-list';  
  
    commits.forEach(commit => {
      let commitMessage = document.createElement('li');
      commitMessage.innerHTML = commit.commit.message;
      commitMessageList.appendChild(commitMessage);
    })

    let showCommitsButton = document.createElement('button');
    showCommitsButton.className = 'commits-button';
    showCommitsButton.innerHTML = 'Show commits';
    repoDiv.appendChild(showCommitsButton);
    
    const showCommitMessageList = () => repoDiv.innerHTML = commitMessageList.outerHTML;
    showCommitsButton.addEventListener('click', showCommitMessageList);
  })
}

// const getReviewComment = (myPullRequestUrl, reponame) => {
//   fetch(`${myPullRequestUrl}/reviews`)
//   .then(res => res.json())
//   .then(json => {

//     let repoDiv = document.getElementById(reponame);
//     let reviewCommentParagraph = document.createElement('p');

//     reviewCommentParagraph.className = 'review-comment';

//     repoDiv.appendChild(reviewCommentParagraph);

//     json.forEach(item => {
//       reviewCommentParagraph.innerHTML = item.body;
//     })
//   })
// }

const getPullRequests = (repos) => {
  repos.forEach(repo => {
    
    fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls`, options)
    .then(res => res.json())
    .then(pullRequests => {

      const myPullRequests = pullRequests
      .filter(pullRequest => pullRequest.user.login === username);

      //If the length is 1 I have done a pull request
      //If the length is 0 it is an ongoing project or a group project where I haven't done the pull request
      if (myPullRequests.length === 0) {

        let repoDiv = document.getElementById(repo.name);
        let commitParagraph = document.createElement('p')

        commitParagraph.innerHTML = `Either ongoing or group/pair project where I didn't make the pull request`;
        commitParagraph.className = "no-pullrequest";
        
        repoDiv.appendChild(commitParagraph);
      }

      myPullRequests.forEach(myPullRequest => {
        getCommits(myPullRequest.commits_url, repo.name);
        // getReviewComment(myPullRequest.url, repo.name);
      })
    })
  })
}

// This function filters out repos that are forked and start with "project"
const getTechnigoRepos = (repos) => {
  return repos
  .filter(repo => repo.fork === true && repo.name.startsWith("project"))
}

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
      <div id=${repo.name} class="repo-div">
        <h4><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
        <p>Most recent push: ${mostRecentPush}</p>
        <p>Default branch: ${repo.default_branch}</p>
      </div>
      `
      
      
    })

  });
}


fetchUserInfo();
fetchRepos();


  