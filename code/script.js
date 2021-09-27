const searchBtn = document.getElementById('searchbtn')
let username = searchBtn.value
const inputValue = document.getElementById('gitusername')
const user = 'Asivol93'
const REPOS_URL = `https://api.github.com/users/${user}/repos`
const container = document.getElementById('projects')

const fetchAll = () => {
  fetch(REPOS_URL)
    .then((res) => res.json())
    .then((data) => {
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith('project-'))
      forkedRepos.forEach((repo) =>
    (container.innerHTML += `
    <h3><a href="${repo.html_url}" target="blank">${repo.name}</a></h3>
    <p>Branch: ${repo.default_branch}<p>
    `))

      //drawChart(forkedRepos.length)
    })
    .catch(() => {
      container.innerHTML = `
    <h1>Sorry we could not find any data!</h1>
    <p>Please try again!</p>
    `
    pullRequests(forkedRepos)
    })
    
  
}

fetchAll()



const pullRequests = (repos) => {
  repos.forEach(repo => {
    console.log(repo)
    fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const myPulls = data.filter(pull => pull.user.login === repo.owner.login)
        console.log(myPulls)
      
      })
    })
}
pullRequests()

//Eventlisteners
searchBtn.addEventListener('click', () => {
  fetchAll()
})
/*
const fetchUsers = async (user) => {
const api_call = await fetch(`https://api.github.com/users/${user}`)

const data = await api_call.json()
return { data: data }
}

const showData = () => {
  fetchUsers(inputValue.value)
}
/*function insertUserName (username) {
  let GIT_USER_API = 'https://api.github.com/users/${username}'
  return {GIT_USER_API}
}

function doFetch (URLs) {
  GIT_USER_API = URLs.GIT_USER_API

  fetch(GIT_USER_API)
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
  })
}*/


