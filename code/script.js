const userSection = document.getElementById("user");
const projectSection = document.getElementById("projects");

const username = 'jessand77';
const API_USER_INFO = `https://api.github.com/users/${username}`;
const API_REPOS = `${API_USER_INFO}/repos`;

//Global variable to be used by the chart
let technigoRepos;

const options = {
  method: 'GET',
  headers: {
      Authorization: 'token' + API_TOKEN
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
    let commitParagraph = document.createElement('p')
    let commitMessageList = document.createElement('ol');

    commitParagraph.innerHTML = `Number of commits: ${commits.length}`;
    repoDiv.appendChild(commitParagraph)
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
  fetch(pullRequestCommentsUrl, options)
  .then(res => res.json())
  .then(comments => {
    console.log(comments)
    // console.log(`The comments for ${reponame} are: `)

    let commentList = document.createElement('ul');
    let commitParagraph = document.getElementById(reponame);
    commitParagraph.appendChild(commentList)

    comments.forEach(comment => {
      // console.log(comment.body)
      let listElement = document.createElement('li');
      // listElement.style.display = 'none';
      listElement.innerHTML = comment.body;
      commentList.appendChild(listElement);
    });

  })
}

const getPullRequests = (repos) => {
  repos.forEach(repo => {
    // const repoName = repo.name;
    fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls`, options)
    .then(res => res.json())
    .then(pullRequests => {

      const myPullRequests = pullRequests
      .filter(pullRequest => pullRequest.user.login === username);

      // console.log(myPullRequests.length)
      //If the length is 1 I have done a pull request
      //If the length is 0 it is an ongoing project or a group project where I haven't done the pull request

      if (myPullRequests.length === 0) {

        let repoDiv = document.getElementById(repo.name);
        let commitParagraph = document.createElement('p')

        commitParagraph.innerHTML = `No pull request done by my username`;
        commitParagraph.className = 'no-pullrequest';
        
        repoDiv.appendChild(commitParagraph);
      }
      
      // console.log(myPullRequests)

      // Hur får jag bara själva huvudkommentaren?

      myPullRequests.forEach(myPullRequest => {

        const pullNumber = myPullRequest.number;
        console.log(pullNumber)

        console.log(myPullRequest.review_comments_url); 
        // https://api.github.com/repos/Technigo/project-business-site/pulls

        //https://api.github.com/repos/Technigo/project-business-site/pulls/comments/289
        
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
  fetch(API_REPOS, options)
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
  