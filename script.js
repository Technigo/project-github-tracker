const USER = 'eyahya-khan'
const userContainer      = document.getElementById('myProfile')
const searchField        = document.getElementById('search-field')
const searchForm         = document.getElementById('search-form')
const REPOS_URL          = `https://api.github.com/users/${USER}/repos?per_page=100`
const USER_URL           = `https://api.github.com/users/${USER}`
const projectsContainer  = document.getElementById('projects')
const ldsripple          = document.getElementById('loading')

const Auth = {
  method: 'GET',
  headers: {
    Authorization: `${API_TOKEN}`
	}
}

let repos;

//profile image and info
const userProfile = () => {
  fetch(USER_URL, Auth)
    .then(res => res.json())
    .then(data => {
      //console.log(data)

      userContainer.innerHTML = `
      <div class="profileinfo">
      <h2>${data.name}</h2>
      <a href="https://github.com/eyahya-khan">@${data.login}</a>
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

      //console.log(data)
      
      const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))

      //console.log(forkedRepos.length)


      getPullRequests(forkedRepos)
      drawChart(forkedRepos.length)
    })

}
getRepos()

//function to get the repos
const getPullRequests = (repos) => {

  //console.log(repos)

  projectsContainer.innerHTML = '';
  repos.forEach(repo => {
    //console.log(repo.name)
    fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`, Auth) 
      .then(res => res.json())
      .then(data => {

       //console.log(data)

        const myPullRequest = data.filter((pull) => {

          //console.log('pull-'+ pull.user.login.startsWith('eyahya'))
          //console.log('repo-'+ repo.owner.login)
          return pull.user.login === repo.owner.login
        })
       //console.log('hello:' + myPullRequest[0].commits_url)

        if (myPullRequest.length === 0) {
          return 
        }

        getCommits(myPullRequest[0].commits_url, (data) => {
          
          //added function so the DOM do not self close tags
          let boxHtml = `<div class="box-repo ${repo.name}">`; 
          boxHtml += `<h3>${repo.name}</h3>`
          boxHtml += `<p id="commit-${repo.name}">Number of commits: ${data.length}</p>`
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
  const found = repos.filter(repo => repo.name.indexOf(searchField.value) > -1);

  getPullRequests(found);
})