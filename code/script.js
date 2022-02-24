const username = "SofiePellegrini"
const API_REPOS = `https://api.github.com/users/${username}/repos`
const API_PROFILE = `https://api.github.com/users/${username}`
const projects = document.getElementById('projects')
const fullName = document.getElementById('full-name')
const userName = document.getElementById('user-name')
const profilePic = document.getElementById('profile-pic')



// Token
const options = {
    method: 'GET',
    headers: {
          Authorization: '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' 
      }
  }
  
  //Fetch picture, name and username
  
  fetch(API_PROFILE, options)
  .then(res => res.json())
  .then(data => { 
    profilePic.src = data.avatar_url
    fullName.innerHTML = `${data.name}`
    userName.innerHTML = `<a href=${data.html_url}>${data.login}</a>`
    
})
 
  
  fetch(API_REPOS, options)
  .then(res => res.json())
  .then((data) => { console.log(data)
    const technigoRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
    console.log(technigoRepos)
    makeChart(technigoRepos.length)
 
technigoRepos.forEach((repo) => { 
  projects.innerHTML+=`
  <div class="repos">
  <a style="font-weight:bold"  href=${repo.html_url}>${repo.name}</a>
  <p>Last push: ${new Date(repo.pushed_at).toLocaleString("sv-SE", {dateStyle: 'short'})}</p>
  <p>Default branch: ${repo.default_branch}</p>
  <p id="${repo.name}-commit">Commits: </p> 
  <p id="pullrequests-${repo.name}">Pull requests: </p>
  </div>
  `
  
  API_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`
  fetch(API_URL, options)
  .then ((res) => res.json())
  .then ((data) => {
    const myPulls = data.find(
      (pull) => pull.user.login === repo.owner.login
    )
    console.log(myPulls)

    if (myPulls) {
      getMyCommits(myPulls.commits_url, repo.name)
      document.getElementById(`pullrequests-${repo.name}`).innerHTML +=  Object.length
    }else{
      document.getElementById(`pullrequests-${repo.name}`).innerHTML += "No pull requests were made."
    }
  })    
})
  }
  )

  const getMyCommits = (myCommitsUrl,repo) => {
    fetch(myCommitsUrl, options)
    .then((res) => res.json())
    .then((data2) => {

      if (data2.length>=1) {
      document.getElementById(`${repo}-commit`).innerHTML += data2.length
    } else {
      document.getElementById(`${repo}-commit`).innerHTML += "No commits were made."
     
    }
    })
  }