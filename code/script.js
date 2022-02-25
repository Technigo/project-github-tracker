const username = 'id4h4lling'
let reponame = ''

const API_GIT_URL = `https://api.github.com/users/${username}/repos`
const API_GIT_USER = `https://api.github.com/users/${username}` //to get a hold of profilepicture

const userInfo = document.getElementById('userInfo')
const projects = document.getElementById('projects')


// paus for now, try token another time. 
const options = {
    method: 'GET',
    headers: {
        // Authorization: `token ${API_TOKEN}`
    }
}

//User info
fetch (API_GIT_USER, options)
    .then(res => res.json()) 
    .then(user => {
        console.log(user)
        userInfo.innerHTML += `
        <div class="user-info">
        <img class="profile-img" src="${user.avatar_url}">  
        <h1> ${username}</h1
        <p class="user-info"> ${user.name}</p>
        <p> ${user.bio}</p>
        </div>
        `      
    })


//fetch repos
const getRepos = () =>{

fetch (API_GIT_URL, options)
    .then(res => res.json()) 
    .then(data => {
        console.log(data)

        //filter out and only show the forked ones, filter out Technigo projects 
        const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith("project-"))
        console.log(forkedRepos) 

        forkedRepos.forEach((repo) => {
        projects.innerHTML+=
       `    <div class="card" id=${repo.id}>
            <h2><a href="${repo.html_url}">${repo.name}</a></h2>
            <p>Default branch: ${repo.default_branch}</p>
            <p class = "repo"id="commit-${repo.name}"">Commits Done: </p>
            <p>Recent push: ${new Date (repo.pushed_at).toDateString()}</p>       
            </div>   ` 
        })
        
        fetchPullRequests(forkedRepos)

        drawChart(forkedRepos.length)
    })
}
 getRepos()


const fetchPullRequests = (repos) => {

    repos.forEach((repo => {
        fetch (`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
            .then(res => res.json()) 
            .then(data => 
                {
            //filter out pr        
            const pulls = data.find((pull) => pull.user.login === repo.owner.login);
                    
            if (pulls) {
                fetchCommits(pulls.commits_url, repo.name)
            }
            else {
                document.getElementById(`commit-${repo.name}`).innerHTML =
                    'Commits Done: (Pull request unavailable)'
                } 
         })
        })
    )}

const fetchCommits = (myCommitsUrl, myRepoName) => {
    fetch(myCommitsUrl, options)
    .then((res) => {
       return res.json()
    })
    .then((data) => {
        document.getElementById(`commit-${myRepoName}`).innerHTML += data.length
        console.log("data", data)
    })
}



    

