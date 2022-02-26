const avatar = document.getElementById('avatar')
//const fullName = document.getElementById('full-name')
//const githubname = document.getElementById('githubname')
const projects = document.getElementById('projects')
const userInfo = document.getElementById('userinfo')
const username = 'Katarina821'
let repoName 

const API_URL_REPOS =`https://api.github.com/users/${username}/repos`
const API_URL_ID =`https://api.github.com/users/${username}`

const getIntro=()=>{
fetch(API_URL_ID)
.then(res=>res.json())
.then(data =>{

console.log(data.login)
console.log(data.avatar_url)
console.log(data.name)
userInfo.innerHTML = `<h2>${data.name}</h2> <h2> ${data.login}  <img class="logo"src="./GitHubMark.png"></h2>`
//githubname.innerHTML = ``
avatar.src = data.avatar_url
getRepos()
})
}


const getRepos = () => {
      fetch(API_URL_REPOS)
         .then(res => res.json())
         .then(data => {
          console.log(data)

          const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith("project-"))
          console.log(forkedRepos)
        
      forkedRepos.forEach((repo)=>projects.innerHTML+=`
     
      <div class="repo"> 
      <img class="logo"src="./GitHubMark.png">
       <a href="${repo.html_url}"><h3>${repo.name }</h3></a>
        <h4>Defaultbranch  ${repo.default_branch}</h4> 
        <p> Most resent update: ${new Date(repo.updated_at).toLocaleDateString("en-UK")}</p>
        <p id="${repo.name}">Commits amount: </p>
        
      </div>
     
      `)
     
      getPullRequests(forkedRepos)
      drawChart(forkedRepos.length)
      })
}


const getPullRequests = (forkedRepos) => {
      forkedRepos.forEach(repo => {
      fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`)
          .then(res => res.json())
          .then(data2 => 
            {
              const myPullRequests = data2.filter(item => item.user.login === repo.owner.login)
              console.log(myPullRequests)
              if (myPullRequests.length>0) {fetchCommits(myPullRequests[0].commits_url, repo.name)
              
              } else {document.getElementById(`${repo.name}`).innerHTML =
              `No pull request done, commits not avalible`
               console.log("hejdå")
              }}
            )})
}


const fetchCommits = (myCommitsUrl, myRepoName) => {
	fetch(myCommitsUrl)
		.then((res) => res.json())
		.then((data) => {
      document.getElementById(`${myRepoName}`).innerHTML += data.length
		console.log(`${data.length}`)
		})
}
getIntro()





//  console.log(data[1].name)
//console.log(data.name.filter((item)=>item.startsWith("P")))
//console.log('data',data)
//data.forEach((repo) =>{console.log(repo.name)})

      
//data.forEach((element) => { console.log (element.name)  
//})

/*fetch(API_URL_REPOS)
.then(res=>res.json())
.then(data =>{

console.log(data)
const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith("project-"))
console.log(forkedRepos)
forkedRepos.forEach((repo) =>{console.log(repo.name)})
})*/




/*repoName=data[7].name


API_URL_PR=`https://api.github.com/repos/Technigo/${repoName}/pulls`
  fetch(API_URL_PR)
    .then(res=>res.json())
    .then(data =>{
       console.log(data)

     })*/

     
     
     
     // This function fetch all my repos and then filters() out the ones forked = true and starts with "project-"
  
 