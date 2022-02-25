//DOM-selectors 

const imgWrapper = document.getElementById('imgWrapper')
const userDataWrapper = document.getElementById('userDataWrapper')
const projects = document.getElementById('projects')

//Github API
const username = 'Nosslexa'
const API_URL = `https://api.github.com/users/${username}/repos`

const options = {
    method: 'GET',
    headers: {
          Authorization: 'API_TOKEN'
      }
  }
  

// This function fetch all my repos and then filters() out the ones forked = true and starts with "project-"
const getRepos = () => {
    fetch(API_URL, options)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        console.log(data[0].owner)
        
        const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith("project-"))
        console.log(forkedRepos)
        
         getPullRequests(forkedRepos)

        
         // injects profile img and user data to the HTML. 
         imgWrapper.innerHTML = ` 
        <div>
        <img class="img" src="${data[0].owner.avatar_url}" alt="userimage">
        </div>
        ` 
                
        userDataWrapper.innerHTML += `
        <h1>Github tracker</h1>
        <p>${data[0].owner.login} : Frida Axelsson</p>
        `

        //display repo info
        forkedRepos.forEach((data) => {
            let projectID = data.id

            projects.innerHTML +=`
            <div class="repo-card" id="${projectID}"> 
                <a href="${data.html_url}">
                    <h3>${data.name}</h3></a>
                <p>Branch: ${data.default_branch}</p>
                <p>Last push: ${new Date(data.pushed_at).toDateString()}</p>
                <p id="repoName" >  </p>
            </div>`

             getCommits(data, projectID);
        })
        getPullRequests(forkedRepos)
        drawChart(forkedRepos.length)
    })
}

//funktion to get commits
const getCommits = (projects, projectID) => {
    const GIT_COMMIT_API = projects.commits_url.replace("{/sha}", "")
    fetch (GIT_COMMIT_API)
    .then((res) => res.json())
    .then(data => {
        let numberOfCommits = data.length
        document.getElementById(projectID).innerHTML +=`
        <p> Number of commits: ${numberOfCommits}</p>`
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
            })
        })
    }


getRepos()















