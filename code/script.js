const userSection = document.getElementById("user");
const projectSection = document.getElementById("projects");

const username = 'jessand77';
const API_USER_INFO = `https://api.github.com/users/${username}`;
const API_REPOS = `${API_USER_INFO}/repos`;

//Global variable to be used by the chart
let technigoRepos;

// const hardCodeApi = "https://api.github.com/users/jessand77/repos";

// Läs lite här: https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data

//Should not be included in git push??
// const options = {
//   method: 'GET',
//   headers: {
//     Authorization: 'token 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'
//   }
// }

const fetchUserInfo = () => {
  fetch(API_USER_INFO)
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
  fetch(pullRequestCommitsUrl)
  .then(res => res.json())
  .then(commits => {

    let commitParagraph = document.getElementById(reponame);
    let commitMessageList = document.createElement('ol');

    commitParagraph.innerHTML = `Number of commits: ${commits.length}`;
    commitParagraph.appendChild(commitMessageList);
    
    commits.forEach(commit => {
      // console.log(commit.commit.message);
      let listElement = document.createElement('li');
      listElement.innerHTML = commit.commit.message;
      commitMessageList.appendChild(listElement)
    })

  })
}

// Hur kan jag ta fram bara huvudkommentaren i stället?

const getPRComments = (pullRequestCommentsUrl, reponame) => {
  fetch(pullRequestCommentsUrl)
  .then(res => res.json())
  .then(comments => {
    // console.log(comments)
    // console.log(`The comments for ${reponame} are: `)

    let commentList = document.createElement('ul');
    let commitParagraph = document.getElementById(reponame);
    commitParagraph.appendChild(commentList)

    comments.forEach(comment => {
      // console.log(comment.body)
      let listElement = document.createElement('li');
      listElement.innerHTML = comment.body;
      commentList.appendChild(listElement);
    });

  })
}

const getPullRequests = (repos) => {
  repos.forEach(repo => {
    // const repoName = repo.name;
    fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls`)
    .then(res => res.json())
    .then(pullRequests => {

      const myPullRequests = pullRequests
      .filter(pullRequest => pullRequest.user.login === username);

      // console.log(myPullRequests.length)
      //If the length is 1 I have done a pull request
      //If the length is 0 it is an ongoing project or a group project where I haven't done the pull request

      if (myPullRequests.length === 0) {
        document.getElementById(repo.name).innerHTML = `No pull request done by my username`;
        document.getElementById(repo.name).className = 'no-pullrequest';
      }
      // console.log(myPullRequests)

      myPullRequests.forEach(myPullRequest => {

        // console.log(myPullRequest.review_comments_url); 

        getPRCommits(myPullRequest.commits_url, repo.name);
        getPRComments(myPullRequest.review_comments_url, repo.name);
      })
    })
  })
}

const getTechnigoRepos = (repos) => {
  return repos
  .filter(repo => repo.fork === true)
  .filter(repo => repo.name.startsWith("project"));
}


const fetchRepos = () => {
  fetch(API_REPOS)
  .then(res => res.json())
  .then(repos => {

    //console.log(repos);
    
    technigoRepos = getTechnigoRepos(repos)
    
    getPullRequests(technigoRepos);

    projectSection.innerHTML = `
      <h2>Technigo projects</h2>
      <div class="repo-container" id="repoContainer"></div>
      `;

    technigoRepos.forEach((repo) => {
      
      const mostRecentPush = new Date(repo.pushed_at).toLocaleDateString('en-GB');

      repoContainer.innerHTML += `
      <div class="repo-div">
        <h4><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
        <p>Most recent push: ${mostRecentPush}</p>
        <p>Default branch: ${repo.default_branch}</p>
        <p id=${repo.name}></p>
      <div>
      `
      
      
    })

  });
}




fetchUserInfo();
fetchRepos();
  