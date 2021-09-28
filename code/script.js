const USER = 'Rosanna86'
const searchBtn = document.getElementById('repo-search')
const REPOS_URL = `https://api.github.com/users/${USER}/repos`
const USER_URL = `https://api.github.com/users/${USER}`
const projectsContainer = document.getElementById('projects')
const userContainer = document.getElementById('myProfile')

let repos;

//profile image and info
const userProfile = () => {
  fetch(USER_URL)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      userContainer.innerHTML = `
      <h2>Username: ${data.login}</h2>
      <p>Full name: ${data.name}</p>
      <p>Location: ${data.location}</p>
      <img src="${data.avatar_url}"/>
      `
    })
}

userProfile()

const getRepos = () => {
  fetch(REPOS_URL, {

  })
    .then(response => response.json())
    .then(data => {
      //console.log(data)
      const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
      repos = forkedRepos
      drawChart(forkedRepos.length)
      getPullRequests(repos)
    })

}
getRepos()

//function to get the repos
const getPullRequests = (repos) => {
  repos.forEach(repo => {
    //console.log(repo)
    fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`, { //added 100 (was 30)

    })
      .then(res => res.json())
      .then(data => {
        //console.log(repo.name)
        //console.log(data)
        const myPullRequest = data.filter((pull) => {
          return pull.user.login === repo.owner.login
        })
        console.log(myPullRequest)
        if (myPullRequest.length === 0){
          return
        } 
        getCommits(myPullRequest[0].commits_url,(data) => {
          const numberOfCommits = data.length
          //added function so the DOM do not self close tags
          let boxHtml = '<div class="box-repo" >'; // https://stackoverflow.com/questions/46300108/innerhtml-closes-tags
          boxHtml += `<h3>${repo.name}</h3>`
          boxHtml += `<p>Number of commits ${numberOfCommits}</p>`
          boxHtml += `<p>Last update (push) ${repo.pushed_at}</p>`
          boxHtml += `<p>Default branch ${repo.default_branch}</p>`
          boxHtml += `<p><a href="${repo.html_url}" target="_blank">Go to repo</a></p>`
          boxHtml += '</div>'
          projectsContainer.innerHTML += boxHtml; //closing the div tag
        })
      })
  })
}

//get my commits
const getCommits = (url, callbackFunction) => {
  //console.log(url)
  fetch(url)
    .then(res => res.json())
    .then(data => {
      callbackFunction (data)
      
      //console.log(data.length)
    })
}






  // searchBtn.addEventListener('click', () => {
  //   getRepos()
  // })