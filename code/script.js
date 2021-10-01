const USER = 'Rosanna86'
const userContainer = document.getElementById('myProfile')
const searchField = document.getElementById('search-field')
const searchForm = document.getElementById('search-form')
const REPOS_URL = `https://api.github.com/users/${USER}/repos`
const USER_URL = `https://api.github.com/users/${USER}`
const projectsContainer = document.getElementById('projects')
const ldsripple = document.getElementById('loading')
const Auth = {  }

let repos;

//profile image and info
const userProfile = () => {
  fetch(USER_URL, Auth)
    .then(res => res.json())
    .then(data => {
      userContainer.innerHTML = `
      <div class="profileinfo">
      <h2>${data.name}</h2>
      <a href="https://github.com/Rosanna86">@${data.login}</a>
      <p>${data.location}</p>
      </div>
      <div class="profileimg"><img src="${data.avatar_url}"/></div>
      </div>`
    })
}

userProfile()

const getRepos = () => {
  fetch(REPOS_URL, Auth)
    .then(response => response.json())
    .then(data => {
      const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
      repos = forkedRepos
      getPullRequests(repos)
      drawChart(forkedRepos.length)
    })

}
getRepos()

//function to get the repos
const getPullRequests = (repos) => {
  projectsContainer.innerHTML = '';
  repos.forEach(repo => {
    fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`, Auth) //added 100 (was 30)
      .then(res => res.json())
      .then(data => {
        const myPullRequest = data.filter((pull) => {
          return pull.user.login === repo.owner.login
        })
        if (myPullRequest.length === 0) {
          return
        }
        getCommits(myPullRequest[0].commits_url, (data) => {
          const numberOfCommits = data.length
          //added function so the DOM do not self close tags
          let boxHtml = `<div class="box-repo ${repo.name}">`; // https://stackoverflow.com/questions/46300108/innerhtml-closes-tags
          boxHtml += `<h3>${repo.name}</h3>`
          boxHtml += `<p id="commit-${repo.name}">Number of commits: ${numberOfCommits}</p>`
          boxHtml += `<p>Last update: ${new Date(repo.pushed_at).toDateString()}</p>`
          boxHtml += `<p>Default branch: ${repo.default_branch}</p>`
          boxHtml += `<p><a href="${repo.html_url}" target="_blank">Go to repo</a></p>`
          boxHtml += '</div>'
          projectsContainer.innerHTML += boxHtml; //closing the div tag
          ldsripple.style.display = 'none' //loading icon
        })
      })
  })
}

//get my commits
const getCommits = (url, callbackFunction) => {
  fetch(url, Auth)
    .then(res => res.json())
    .then(data => {
      callbackFunction(data)
    })
}

//eventlistener on form-submit
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // this function filters your repos where name contains searchField.value. Where IndexOf returns the position of substring and -1 = doesn't exist in string
  const found = repos.filter(r => r.name.indexOf(searchField.value) > -1);
  getPullRequests(found);
})