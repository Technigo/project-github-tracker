const username = "SofiePellegrini"
const API_REPOS = `https://api.github.com/users/${username}/repos`
const API_PROFILE = `https://api.github.com/users/${username}`
const fullName = document.getElementById('full-name')
const userName = document.getElementById('user-name')
const profilePic = document.getElementById('profile-pic')
const projects = document.getElementById('projects')


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
    userName.innerHTML = `${data.login}`
})
 
  
  fetch(API_REPOS, options)
  .then(res => res.json())
  .then((data) => { console.log(data)
    const technigoRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
    console.log(technigoRepos)
 
technigoRepos.forEach((repo) => { 
  projects.innerHTML+=`
  <div class="repos">
  ${repo.name}
  ${new Date(repo.pushed_at).toLocaleString("sv-SE", {dateStyle: 'short'})}
  ${repo.default_branch}
  <p id="commit-${repo.name}">Commits:</p>
  <p id="pullrequests-${repo.name}">Pull requests:</p>
  </div>
  `

  
  API_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`
  fetch(API_URL, options)
  .then ((res) => res.json())
  .then ((data) => {console.log(data)
    const myPulls = data.find(
      (pull) => pull.user.login === repo.owner.login
    )
    console.log(myPulls)

    

    if (myPulls) {
      getMyCommits(myPulls.commits_url, repo.name)
    }else{
      document.getElementById(`pullrequests-${repo.name}`).innerHTML += "No pull requests were done."
    }
  })    
})
  }
  )
  

  const getMyCommits = (myCommitsUrl,repo) => {
    fetch(myCommitsUrl, options)
    .then((res) => res.json())
    .then((data) => {
      console.log("commits:", data)
      document.getElementById(`commit-${repo.name}`).innerHTML +=  data.length
      

    })
  }
  
  