//DOM selectors
const username = 'JensBergqvist'
const projects = document.getElementById("projects")


const API_REPOS = `https://api.github.com/users/${username}/repos`;
const API_PROFIL = `https://api.github.com/users/${username}`
//Picture and name

const profilePic = () => {
    fetch(API_PROFIL)
        .then(res => res.json())
        .then(data => {
           // console.log(data)
            picture = data.avatar_url
    let profilePicture =    `<div class = "photobox">
                            <h1>${username}</h1>
                                <img class = "photo" src="${picture}" />
                            </div>`;
    return (projects.innerHTML = profilePicture)
})
}

profilePic()

const getRepos = () => {
    fetch(API_REPOS)
      .then(response => response.json())
      .then(data => {
        const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project'))
        
  
         forkedRepos.forEach(repo => {
             projects.innerHTML += `<div class='repo-card'>
             <a href='${repo.html_url}'><p>Repo name: ${repo.name}</p></a>
             <p>Default branch: ${repo.default_branch}</p>
             <p>Last push: ${new Date(repo.pushed_at).toDateString()}
             <p id =${repo.name}>Number of commits: </p>
             
           </div> 
                `   
               

              })

             getPullRequest(forkedRepos)
             drawChart(forkedRepos.length)
            })
        }
  
    const getPullRequest= (repos) => {
        repos.forEach((repo)=> {
            fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`)
            .then(response => response.json())
            .then(data => {
                const myPullRequest = data.find((pull)=> pull.user.login === repo.owner.login)
                if (myPullRequest) {
                    getCommits(myPullRequest.commits_url, repo.name)
                } else {
                    document.getElementById(`${repo.name}`).innerHTML=`No pullrequest `
                }
                })
            })
        }
    
  const getCommits=(commits, myRepoName) => {
      fetch(commits)
      .then(response => response.json)
      .then(data =>{
          document.getElementById(`${myRepoName}`).innerHTML += data.length
      })
  }

  getRepos()