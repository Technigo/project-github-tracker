const username = 'Nosslexa'
const imgWrapper = document.getElementById('imgWrapper')
const userDataWrapper = document.getElementById('userDataWrapper')
const projects = document.getElementById('projects')
const API_URL = `https://api.github.com/users/${username}/repos`


/*
const options = {
    method: 'GET',
    headers: {
          Authorization:'API_TOKEN'
  }
*/



// This function fetch all my repos and then filters() out the ones forked = true and starts with "project-"
const getRepos = () => {
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        console.log(data[0].owner)
        
        const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith("project-"))
        console.log(forkedRepos)
        
         getPullRequests(forkedRepos)
         // injects profile img and user data to the HTML. 
         imgWrapper.innerHTML = 
        ` <div>
        <img class="img" src="${data[0].owner.avatar_url}" alt="userimage">
        </div>` 
                
        userDataWrapper.innerHTML += 
        `<h1>${data[0].owner.login}</h1>
        <p>Frida Axelsson</>`

        //display repo info
        forkedRepos.forEach((data) => {

            projects.innerHTML +=
            ` <div class="repo-card"> 
            <a href="${data.html_url}">
                <h3>${data.name}</h3>
                </a>
            
                    <p>Branch: ${data.default_branch}</p>
                    <p>Last push: ${new Date(data.pushed_at).toDateString()}</p>
                    <p ="commits"> nr of commits: ${data.length}</p>
             </div>`
            })
            
            drawChart(forkedRepos.length)
    })
}

//function to find() my pullrequests and comments
const getPullRequests = (forkedRepos) => {
    forkedRepos.forEach(repo => {
        fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`,)
        .then(res => res.json())
        .then(data => {
            console.log(data)

          const myPullRequests = data.find((pull) => pull.user.login === repo.owner.login)
            console.log(myPullRequests)
         const myCommitsURL = myPullRequests.commits_url
         console.log(myCommitsURL)
         
        })
    })
}

const getCommits = (myCommitsURL) => {
fetch (myCommitsURL)
.then((res) => res.json())
.then(data => {
    document.getElementById('commits ${repo.name}').innerHTML += data[data.length]
})
}


getRepos()















