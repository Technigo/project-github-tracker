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
                            <p>${username}</p>
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
        const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
        
  
         forkedRepos.forEach(repo => {
  
        //   fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`) 
        //     .then(res => res.json())
        //     .then(data => {
        //         //console.log(data)
        //         //console.log(data.user.login)
        //        // console.log(repo.owner.login)
        //       //const myPullRequest = data.filter((pull) => {return pull.user.login === repo.owner.login})
        //       const myPullRequest = data.filter(pull => pull.user.login === repo.owner.login)
        //       const commitUrl = myPullRequest[0].commits_url
      
        //       fetch(commitUrl)
        //       .then(res => res.json())
        //       .then(data => {
               // const numberCommit = data.length
      
               
      //here innerHTML          
      document.getElementById('projects').innerHTML += `
      <div class="repo" id=${repo.name}> 
        <h2>${repo.name}</h2>
        <h2><a href ="${repo.html_url}"> Github Link</a </h2>
        <h2>Default branch: ${repo.default_branch}</h2>
        <h2>Latest push: ${new Date(repo.pushed_at).toDateString()}</h2>
        
        
      </div>`
              })
            })
        }
  
      //})
  //} 

  getRepos()