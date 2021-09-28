const searchBtn = document.getElementById('searchbtn')
let username = searchBtn.value
const inputValue = document.getElementById('gitusername')
const user = 'Asivol93'
const REPOS_URL = `https://api.github.com/users/${user}/repos`
const USER_URL = `https://api.github.com/users/${user}`
const container = document.getElementById('projects')
const userContainer = document.getElementById('userProfile')


const userProfile = () => {
  fetch(USER_URL)
  .then(res => res.json())
  .then(data => {
      //console.log(data);
      userContainer.innerHTML = `
      <h2>Username: ${data.login}</h2>
      <p>Full name: ${data.name}</p>
      <p>Location: ${data.location}</p>
      <img src="${data.avatar_url}"/>
      `
    })
}

const fetchAll = () => {
  fetch(REPOS_URL)
    .then(res => res.json())
    .then(data => {
      const forkedRepos = data.filter(
        (repo) => repo.fork && repo.name.startsWith('project-'))
      forkedRepos.forEach(repo =>
    container.innerHTML += `
    <h3><a href="${repo.html_url}" target="blank">${repo.name}</a></h3>
    <p>Branch: ${repo.default_branch}<p>
    `
    )
    drawChart(forkedRepos.length)
      pullRequests(forkedRepos)
    })
    
    
    .catch(() => {
      container.innerHTML = `
    <h1>Sorry we could not find any data!</h1>
    <p>Please try again!</p>
    `
    })
}



const pullRequests = (repos) => {
  repos.forEach(repo => {
    fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`)
      .then(res => res.json())
      .then(data => {
        //console.log(data)
        const myPulls = data.filter(pull => pull.user.login === repo.owner.login)
        //console.log(myPulls)
        //const COMMENTS_URL = myPulls.review_comments_url
        const COMMITS_URL = data.commits_url.number
        //console.log(data)
        //showComments(COMMENTS_URL)
        showCommits(COMMITS_URL)
      })
      
    
    })
}

const showCommits = (repos) => {
repos.forEach(repo => {
  fetch(COMMITS_URL)
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })

})

}

/*const showComments = (repos) =>
repos.forEach(repo => {
  fetch(COMMENTS_URL)
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })
})*/




userProfile()
fetchAll()
//pullRequests()
//showComments()

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


