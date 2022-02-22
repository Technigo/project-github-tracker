const userSection = document.getElementById("user");
const projectSection = document.getElementById("projects");

const username = 'jessand77';
const API_USER_INFO = `https://api.github.com/users/${username}`;
const API_REPOS = `${API_USER_INFO}/repos`;

// const hardCodeApi = "https://api.github.com/users/jessand77/repos";




// Läs lite här: https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data

const getPullRequests = (repos) => {
  repos.forEach(repo => {
    // const repoName = repo.name;
    fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls`)
    .then(res => res.json())
    .then(pullRequests => {

      const myPullRequests = pullRequests
      .filter(pullRequest => pullRequest.user.login === username);

      myPullRequests.forEach(myPullRequest => {
        // console.log(myPullRequest.commits_url); 
        getPRCommits(myPullRequest.commits_url, repo.name);
        getPRComments(myPullRequest.review_comments_url, repo.name);
      })
    })
  })
}

const getPRCommits = (pullRequestCommitsUrl, repoName) => {
  fetch(pullRequestCommitsUrl)
  .then(res => res.json())
  .then(commits => {

    // console.log(commits)
    // Print number of commits
    // console.log(`Number of commits: ${commits.length}`)

    let commitSpan = document.createElement('span');

    commitSpan.innerHTML = `${commits.length}`;
    
    document.getElementById(repoName).appendChild(commitSpan);

    // // Print commit messages
    // commits.forEach(commit => console.log(commit.commit.message))
    // // 

  })
}

const getPRComments = (pullRequestCommentsUrl, repoName) => {
  fetch(pullRequestCommentsUrl)
  .then(res => res.json())
  .then(comments => {
    console.log(`The comments for ${repoName} are: `)
    comments.forEach(comment => console.log(comment.body));
    //Printa kommentarerna på något sätt på sidan
  })
}

const formatDate = (dateToFormat) => {
  const year = dateToFormat.getFullYear();
  const month = dateToFormat.getMonth() + 1;
  const day = dateToFormat.getDate();
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

const fetchUserInfo = () => {
  fetch(API_USER_INFO, options)
  .then(res => res.json())
  .then(user => {
    console.log(user)
    userSection.innerHTML = `
      <h2>User info</h2
      <p>User name: ${user.login}</p>
      <p>Full name: ${user.name}</p>
      <img class="avatar" src="${user.avatar_url}" alt="profile picture" />
    ` 
  })
  //Fungerar det här överhuvudtaget?
  .catch(err => console.error(err));
}

const fetchRepos = () => {
  fetch(API_REPOS, options)
  // we ask for the res from the API
  .then(res => res.json())
  // we say what we want to be done with the res
  .then(repos => {

    //console.log(repos);
    
    // projectSection.innerHTML = '<h2>Projects</h2>'
    // let htmlAllRepos = '<h3>All my projects</h3><ul>'
    // repos.forEach((repo) => {
    //   htmlAllRepos += `<li>${repo.name}</li>`
    // });
    // htmlAllRepos += '</ul>'
    // projectSection.innerHTML += htmlAllRepos


    // // Returns an array of the forked repos
    // const forkedRepos = repos
    //   .filter((repo) => repo.fork === true)
    //   .map((repo) => repo.name);

    // console.log(forkedRepos);

    // let htmlForkedRepos = '<h3>All forked repos</h3><ul>';
    // forkedRepos.forEach((repo) => {
    //   htmlForkedRepos += `<li>${repo}</li>`
    // });
    // htmlForkedRepos += '</ul>';

    // console.log('Forked repos: ' + htmlForkedRepos)

    // projectSection.innerHTML += htmlForkedRepos
  
    
    // Returns an array of the forked repos from Technigo
    // const reposStartingWithFilter = repos
    //   .filter((repo) => repo.name.startsWith("project"))
    //   .map((repo) => repo.name);

    // console.log(reposStartingWithFilter);

    // let htmlTechnigoRepos = '<h3>Repos forked from Technigo</h3>';
    // reposStartingWithFilter.forEach((repo) => {
    //   htmlTechnigoRepos += `
    //   <div>
    //     <h4>${repo}<h4>
    //     <p>${repo}</p>
    //   </div>
    //   `
    // });

    projectSection.innerHTML = `
      <h2>Repos forked from Technigo</h2>
      <div class="repo-grid" id="repoGrid"></div>
      `;
    
    //The Technigo repos are forked and their names start with project
    const technigoRepos = repos
    .filter(repo => repo.fork === true)
    .filter(repo => repo.name.startsWith("project"));
    
    getPullRequests(technigoRepos);

    technigoRepos.forEach((repo) => {
      
      const mostRecentPush = new Date(repo.pushed_at);
  
    // Not necessary because repoGrid is created in projectSection.innerHTML injection above?
    // const repoGrid = document.getElementById('repoGrid');

      repoGrid.innerHTML += `
      <div class="repo-div">
        <h4>${repo.name}</h4>
        <p>Most recent update: ${formatDate(mostRecentPush)}</p>
        <p>Default branch: ${repo.default_branch}</p>
        <p>URL: <a href="${repo.html_url}">${repo.html_url}</a></p>
        <p id=${repo.name}>Number of commits: </p>
      <div>
      `
      
    })

  });
}


fetchUserInfo();
fetchRepos();
  