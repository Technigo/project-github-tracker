//DOM-selectors
const projects = document.getElementById('projects')
const userInfo = document.getElementById('user-info')
const footer = document.getElementById('footer')

//GITHUB URLS
const user = 'sofiaringstedt';
const repo_URL = `https://api.github.com/users/${user}/repos`;
const user_URL = `https://api.github.com/users/${user}`;


const options = {
    method: 'GET',
    headers: {
        Authorization: API_TOKEN
    }
}

//function to display profileinfo fetched from github
const profileInfo = () => {
  fetch(user_URL)
  .then(res => res.json())
  .then(data => {
    const profileImg = data.avatar_url
    const profileBio = data.bio
    userInfo.innerHTML += `
      <div class="user-img">
      <img src="${profileImg}" alt="Image of Sofia Ringstedt">
      </div>
      <div class="user-name">
      <h2>Github account: <a href="${user_URL}" target="_blank">${user}</a></h2>
      </div>
     `
     footer.innerHTML += `
      <p class="profile-bio">${profileBio}</p>
     `
  })
}

//function to display repository info fetched from github
const fetchRepos = () => {
    fetch(repo_URL, options) 
    .then(res => res.json())
    .then(data => {
        const filteredRepos = data.filter(repo => repo.name.startsWith("project") && repo.fork === true)

        filteredRepos.forEach(repo => {
            projects.innerHTML += `
              <div id="card" class="card">  
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>Branch: ${repo.default_branch}</p>
                <p>Latest push: ${new Date(repo.pushed_at).toLocaleDateString('en-SE', {year: 'numeric', month: 'short', day: 'numeric'})}</p>
                <p id ="${repo.name}">Commits made by team member</p> 
              </div>
            `
        })
    getPullRequests(filteredRepos);
    drawChart(filteredRepos.length)
    })
}

//function to fetch pull requests from github
const getPullRequests = (filteredRepos) => { 
  filteredRepos.forEach(repo => {
    fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
    .then(res => res.json())
    .then(data => {
      const myPullRequest = data.find((pull) => pull.user.login === repo.owner.login);
      const myCommitsURL = myPullRequest.commits_url
      const repoName = repo.name
      fetchCommits(myCommitsURL, repoName); // varför är denna här??
        })
    })
  }

//function to fetch and display commits from github
const fetchCommits = (myCommitsURL, repoName) => {
    fetch(myCommitsURL)
    .then((res) => res.json())
    .then (data => {
      //send the number of commits to innerHTML injected in the fetchRepos function
      document.getElementById(repoName).innerHTML = `Number of commits: ${data.length}`
  });
}


profileInfo() 
fetchRepos()