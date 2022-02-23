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
        getPullRequests(filteredRepos);
    })
}

const getPullRequests = (allPullRequests) => {
  allPullRequests.forEach(repo => {
      fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
      .then(res => res.json())
      .then(data => {
        const myPullRequests = data.filter((pullRequest) => pullRequest.user.login === user)
        console.log(myPullRequests)
   
              //TODO
              //2. Now you're able to get the commits for each repo by using
              // the commits_url as an argument to call another function
              //3. You can also get the comments for each PR by calling
              // another function with the review_comments_url as argument
      })
     // fetchCommits(myPullRequest.commits_url, repo.name);
    })
  }

// const fetchCommits = (myCommitsUrl, myRepoName) => {
//     fetch(myCommitsUrl)
//     .then((response) => response.json())
//     .then (data => {
//         document.getElementById(`commit-${myRepoName}`).innerHTML += data.length
//   });
// }

profileInfo()
fetchRepos()