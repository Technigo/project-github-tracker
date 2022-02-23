//DOM-selectors
const projectsWrapper = document.getElementById('projects-wrapper')
const userInfo = document.getElementById('user-info')

//GITHUB
const user = 'sofiaringstedt';
const repo_URL = `https://api.github.com/users/${user}/repos`;
const user_URL = `https://api.github.com/users/${user}`;


const options = {
    method: 'GET',
    headers: {
        Authorization: API_TOKEN
    }
}

const profileInfo = () => {
  fetch(user_URL)
  .then(res => res.json())
  .then(data => {
    const profileImg = data.avatar_url
    //console.log(profileImg)
    userInfo.innerHTML += `
      <div class="user-img">
      <img src="${profileImg}" alt="Image of Sofia Ringstedt">
      </div>
      <div class="user-name">
      <h2><a href="${user_URL}" target="_blank">Github account: ${user}</a></h2>
     `
  })
}

const fetchRepos = () => {
    fetch(repo_URL, options) 
    .then(res => res.json())
    .then(data => {
        const filteredRepos = data.filter(repo => repo.name.startsWith("project") && repo.fork === true)
        //console.log(filteredRepos)

        filteredRepos.forEach((repo) => {
            projectsWrapper.innerHTML += `
              <div class="projects">  
                <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
                <p>Branch: ${repo.default_branch}</p>
                <p>Latest push: ${new Date(repo.pushed_at).toDateString()}</p>
                <p id="commit-${repo.name}"> Number of commits: </p>    
              </div>
            `
        })
    getPullRequests(filteredRepos); // varför är denna här??
    })
}

const getPullRequests = (allPullRequests) => {
  allPullRequests.forEach(repo => {
      fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
      .then(res => res.json())
      .then(data => {
        const myPullRequest = data.find((pull) => pull.user.login === repo.owner.login);    
        // here make a conditional if not your pull request   
        const myCommitsURL = myPullRequest.commits_url
        const myCommentsURL = myPullRequest.comments_url
        const repoName = myPullRequest.name
        console.log(myPullRequest)
        console.log(myCommitsURL, myCommentsURL)
        fetchCommits(myCommitsURL, repoName); // varför är denna här??

              //TODO
              //2. Now you're able to get the commits for each repo by using
              // the commits_url as an argument to call another function
              //3. You can also get the comments for each PR by calling
              // another function with the review_comments_url as argument
        })
    })
  }

const fetchCommits = (myCommitsURL, repoName) => {
    fetch(myCommitsURL, repoName)
    .then((res) => res.json())
    .then (data => {
        document.getElementById(`commit-${repo.name}`).innerHTML += data.length
  });
}

profileInfo() // få in denna någon annanstans?
fetchRepos()