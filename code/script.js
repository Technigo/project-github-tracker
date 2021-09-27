const projects = document.getElementById('projects')
const USER = 'jakobxlindstrom'
const USER_URL = `https://api.github.com/users/${USER}`

const getUserData = () => {
  fetch(USER_URL)
    .then((res) => res.json())
    .then((data) => {
      projects.innerHTML = `
    <h1>Username: ${data.login}</h1>
    <h4>Full name: ${data.name}</h4>
    <h4>Location : ${data.location}</h4>
    <img src="${data.avatar_url}"/>
     `
    })
}

const getRepos = () => {
  fetch(`https://api.github.com/users/${USER}/repos`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      const filtered = data.filter(
        (repo) => repo.fork && repo.name.startsWith('project-')
      )
      filtered
        .forEach((repo) => {
          projects.innerHTML += `<p><a href="${repo.html_url}" target="blank"> my Repo ${repo.name}</a></p>
        <p>Branch ${repo.default_branch}`
          getPR(filtered)
        })
        .catch(error)
      projects.innerHTML += `<p> This is a error message beacuse there is an error. </p>`
    })
}
const getPR = (repos) => {
  repos.forEach((repo) => {
    fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls`)
      .then((res) => res.json())
      .then((data) => {
        const myPR = data.filter((pull) => pull.user.login === repo.owner.login)
        const myCommits = myPR.commits_url
      })
  })
}

getUserData()
getRepos()
getPR()

// add eventlistener here
