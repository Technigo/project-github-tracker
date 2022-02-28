//DOM SELECTORS

const projectsContainer = document.getElementById('projects')
const userContainer = document.getElementById('user-container')
const userInfo = document.getElementById('user-info')
const userImg = document.getElementById('user-img')

//APIS TO FETCH FROM
const username = 'Thereese'
let reponame
const API_URL = `https://api.github.com/users/${username}/repos`
const API_URL_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`


const options = {
  method: 'GET',
    headers: {
      Authorization: 'API_TOKEN'
    }
}
    

//FETCH USERNAME AND PROFILEPIC 
const getUser = () => {
  fetch (`https://api.github.com/users/${username}`, options)
    .then((res) => res.json())
    .then((data) => {
      userImg.innerHTML=
      `<img class="user-image" src=${data.avatar_url}/>`
      userInfo.innerHTML=
      `<h1>${data.name}</h1>
       <h3> | ${data.login}</h3>`
    })
}


//FETCH REPOS AND FILTER TECHNIGOPROJECTS. DATA TO PROJECTCONTAINER.
const getRepos = () => {
  fetch (API_URL, options)
    .then((res) => res.json())
    .then((data) => {
    const filterTechnigoProjects = data.filter((repo) => repo.fork && repo.name.startsWith("project"))
      filterTechnigoProjects.forEach(repo => {
        let projectID = repo.id
        projectsContainer.innerHTML+=
        `<div class="repocard" id=${projectID}>
          <a href=${repo.html_url}><h3> ${repo.name}</h3></a>
          <p> Default branch: ${repo.default_branch}</p>
          <p> Latest push: ${new Date(repo.pushed_at).toDateString()}</p>
          <p id="commit-${repo.name}">Commits:</p>
        </div>`
           
         })
         getPullRequests(filterTechnigoProjects)
         drawChart(filterTechnigoProjects.length)
    })
}

getRepos()
//FETCH PULLREQUESTS, SORT AND RETURN DATA OR COMMENT
const getPullRequests = (filterTechnigoProjects) => {
  filterTechnigoProjects.forEach(repo => {
    fetch (`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`, options)
      .then((res) => res.json())
      .then((data) => {
        const filterMyPull = data.find((pull) => pull.user.login === repo.owner.login)
        if (filterMyPull) {
          getCommits(filterMyPull.commits_url, repo.name)
        } else {
          document.getElementById(`commit-${repo.name}`).innerHTML =
          '<p>No pull requests made</p>'
        }
    }) 
  })
}

const getCommits = (URL, repoName) => {
  fetch(URL, options)
    .then ((res) => res.json())
    .then (data => {
      document.getElementById(`commit-${repoName}`).innerHTML += data.length;
    })
}
getUser()
    