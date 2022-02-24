//DOM-selectors
const projects = document.getElementById('projects')
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
      <h2>Github account: <a href="${user_URL}" target="_blank">${user}</a></h2>
      </div>
     `
  })
}

const fetchRepos = () => {
    fetch(repo_URL, options) 
    .then(res => res.json())
    .then(data => {
        const filteredRepos = data.filter(repo => repo.name.startsWith("project") && repo.fork === true)
        //console.log(filteredRepos)

        filteredRepos.forEach(repo => {
            projects.innerHTML += `
              <div id="card" class="card">  
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>Branch: ${repo.default_branch}</p>
                <p>Latest push: ${new Date(repo.pushed_at).toDateString()}</p>
                <p>Number of commits: ${repo.name.length}</p> 
              </div>
            `
        })

    getPullRequests(filteredRepos); // varför är denna här??
    drawChart(filteredRepos.length)
    })
}

const getPullRequests = (allPullRequests) => { // filteredRepos?
  allPullRequests.forEach(repo => {
    fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
    .then(res => res.json())
    .then(data => {
      const myPullRequest = data.find((pull) => pull.user.login === repo.owner.login);// här göra en conditional ifall ej mina PR?
      const myCommitsURL = myPullRequest.commits_url
      const myCommentsURL = myPullRequest.comments_url
      //const repoName = filteredRepos.name
      console.log(myCommentsURL, myCommitsURL, myPullRequest)
      fetchCommits(myCommitsURL); // varför är denna här??
        })
    })
  }

const fetchCommits = (myCommitsURL) => {
    fetch(myCommitsURL)
    .then((res) => res.json())
    .then (data => {
     // console.log(data)
     //document.getElementById('commit-${repo.name}').innerHTML += data.length
  });
}

profileInfo() 
fetchRepos()