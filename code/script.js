const userSection = document.getElementById ('userSection')
const projectSection = document.getElementById ('projectSection')

const username = 'mistscale'
const API_USER_URL = `https://api.github.com/users/${username}`
const API_REPOS_URL = `https://api.github.com/users/${username}/repos`

const options = {
    method: 'GET',
    headers: {
        Authorization: 'API_TOKEN'
      }
  }

// Display profile picture and username
const fetchUser = () =>  {
    fetch(API_USER_URL)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        userSection.innerHTML = `
        <img src='${data.avatar_url}'/>
        <h2>${data.login}</h2>
        `
    })
   fetchRepos() 
}

const fetchRepos = () => {
    fetch(API_REPOS_URL)
    .then(res => res.json())
    .then(data => {
       const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith('project'))
       forkedRepos.forEach((repo) => {
           projectSection.innerHTML += `
           <section class='projects'>
            <h2>${repo.name}</h2>
            <p>Repo link: <a href='${repo.html_url}'>here</a></p>
            <p>Default branch: ${repo.default_branch}</p>
            <p>Recent update: ${new Date(repo.pushed_at).toLocaleDateString('sv-SE')}</p>
           </section>`
       })
    })
}

fetchUser()
