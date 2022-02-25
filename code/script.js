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
    // console.log(user)
    userSection.innerHTML = `
      <p>${user.name}</p>
      <p>Username: ${user.login}</p>
      <a href="${user.html_url}" target="_blank"><img class="avatar" src="${user.avatar_url}" alt="profile picture" /></a>
    ` 
  })
}

const getPRCommits = (pullRequestCommitsUrl, reponame) => {
  fetch(pullRequestCommitsUrl, options)
  .then(res => res.json())
  .then(commits => {

    let repoDiv = document.getElementById(reponame);
    let commitParagraph = document.createElement('p');
    let showCommitsButton = document.createElement('button');
    let commitMessageList = document.createElement('ol');
    commitMessageList.className = 'message-list';

    commitParagraph.innerHTML = `Number of commits: ${commits.length}`;
    showCommitsButton.innerHTML = 'Show commit messages';
    
    repoDiv.appendChild(commitParagraph);
    repoDiv.appendChild(showCommitsButton);
    repoDiv.appendChild(commitMessageList);

    commits.forEach(commit => {
      // console.log(commit.commit.message);
      let listElement = document.createElement('li');
      listElement.innerHTML = commit.commit.message;
      commitMessageList.appendChild(listElement)
    })

    // const showCommits = () => commitMessageList.style.display = 'block';
    const showCommits = () => repoDiv.innerHTML = 'Show messages here'

    showCommitsButton.addEventListener('click', showCommits)
  })
}

const getReviewComment = (myPullRequestUrl, reponame) => {
  fetch(`${myPullRequestUrl}/reviews`)
  .then(res => res.json())
  .then(json => {

    let repoDiv = document.getElementById(reponame);
    let reviewCommentParagraph = document.createElement('p');

    reviewCommentParagraph.className = 'review-comment';

    repoDiv.appendChild(reviewCommentParagraph);

    json.forEach(item => {
      reviewCommentParagraph.innerHTML = item.body;
    })
  })
}

// ------ This function shows the detailed comments ---------

// const getPRComments = (pullRequestCommentsUrl, reponame) => {
//   fetch(pullRequestCommentsUrl, options)
//   .then(res => res.json())
//   .then(comments => {
//     console.log(comments)
//     // console.log(`The comments for ${reponame} are: `)

//     let commentList = document.createElement('ul');
//     let commitParagraph = document.getElementById(reponame);
//     commitParagraph.appendChild(commentList)

//     comments.forEach(comment => {
//       // console.log(comment.body)
//       let listElement = document.createElement('li');
//       // listElement.style.display = 'none';
//       listElement.innerHTML = comment.body;
//       commentList.appendChild(listElement);
//     });

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
        commitParagraph.className = 'no-pullrequest';
        
        repoDiv.appendChild(commitParagraph);
      }

      myPullRequests.forEach(myPullRequest => {

        // const pullNumber = myPullRequest.number;
        // console.log(pullNumber)
        // console.log(myPullRequest.url)
        // console.log(myPullRequest.review_comments_url); 
        
        getPRCommits(myPullRequest.commits_url, repo.name);
        getReviewComment(myPullRequest.url, repo.name);
        // getPRComments(myPullRequest.review_comments_url, repo.name);
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

    //console.log(repos);
    
    const technigoRepos = getTechnigoRepos(repos)
    
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
      <div>
      `
      
      
    })

  });
}


fetchUserInfo();
fetchRepos();
  