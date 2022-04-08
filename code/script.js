//DOM selectors//
const userContainer = document.getElementById('userContainer')

//APIs to fetch from
const username = 'MarianneArdin'
const API_URL = `https://api.github.com/users/${username}`
const REPOS_URL = `https://api.github.com/users/${username}/repos`
//const API_TOKEN = TOKEN || process.env.API_TOKEN
//const API_MY_PROFILE = 'https://api.github.com/users/MarianneArdin'


//option for authorization
const options = {
     method: 'GET',
     headers: {
     Authorization: `token ${API_TOKEN}` 
 } 
 }
//FETCHES PROFILE FROM GITHUB//
const fetchProfile = () => {
    fetch(API_URL, options)
        .then((response) => response.json())
        .then((data) => {
        console.log(data)
        userContainer.innerHTML += `
        <div id="profile" class="profile">
        <div class="profile-image">
        <a href="${API_URL}">
        <img src="${data.avatar_url}" alt="Avatar of ${data.login}">
        </a>
        </div>
        <a href="https://github.com/MarianneArdin"><h1 class="username">${data.login}<h1></a>
        <h2>My projects</h2>
        </div>
        <div>
        <p>Public repositories: ${data.public_repos}</p>
        </div>
         `
        })
}
fetchProfile()

//GET REPOS FROM GITHUB//
const getRepos = () => {
    fetch(REPOS_URL, options)
    .then((res) => res.json())
    .then((reposData) => {
    console.log(reposData)
    const forkedRepos = reposData.filter((repo) => repo.fork && repo.name.startsWith("project-"))
    forkedRepos.forEach(repo => {
    projectContainer.innerHTML += 
       `
       <a class="project-link" href="${repo.html_url}" target="_blank"> 
       <div class="forkedrepo-div">
            <h2 class="project-name"> ${repo.name}</h2>
            <p class="project-info"> Default branch: ${repo.default_branch}</p>
            <p class="project-info"> Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
            <p class="project-info" id="commits-${repo.name}"> Amount of commits: </p>  
        </div> `
       })
       getPullRequests(forkedRepos)
      
       drawChart(forkedRepos.length)
    }) 
}    
getRepos()

//GETS REPOS FROM GITHUB//
const getPullRequests = (repos) => {
    repos.forEach(repo => {
          fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`, options)
            .then(res => res.json())
            .then((pullData) => {
            let myPullRequest = pullData.find((pull) => pull.user.login === repo.owner.login)
            if (myPullRequest) {
                getCommits(myPullRequest.commits_url, repo.name)
             } else {
            document.getElementById(`commits-${repo.name}`).innerHTML += `No pulls yet.`
         }    
         })
    })
}

//GET NUMBER OF COMMITS
const getCommits = (commitsUrl, repo) => {
    fetch(commitsUrl, options)
    .then(res => res.json())
    .then((data) => {
    document.getElementById(`commits-${repo}`).innerHTML += `${data.length}`
    console.log(data.length)
    })
}