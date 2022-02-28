

const username = 'LovisaBrorson'
const USER_INFO = `https://api.github.com/users/${username}` //Profilepicture and username
const API_URL_REPOS = `https://api.github.com/users/${username}/repos` // Get the forked repos
const userContainer = document.getElementById('userContainer')
const projectsContainer = document.getElementById('projectsContainer')


const options = { //opject
    method: 'GET', //Kan också var post, patch, delete
     headers: {
        Authorization: `token ${API_TOKEN}`
    }
}

//User information = profilepicture and username
 const profileInfo = () => {
    fetch(USER_INFO, options)
     .then((res) => res.json())
     .then((profileData) => {
         userContainer.innerHTML +=
         `<div class="user-info">
         <img src="${profileData.avatar_url} "class="profile-pic" id="profilePic" alt="Profile picture"/>
         </div>
         <div class="user-text">  
         <p class="name"> ${profileData.name}</p>
         <p class="user-name"> Username: ${profileData.login}</p>
         <img class="github" src="github-cat.png">
         </div>
         `
         
        console.log(profileData)
     })
 }
 profileInfo()

//Funktion that get the repos from Github
const getRepos = () => {

    fetch(API_URL_REPOS, options)
    .then((res) => res.json())
    .then((reposData) => {
        console.log(reposData)
        const forkedRepos = reposData.filter((repo) => repo.fork && repo.name.startsWith("project-"))

        forkedRepos.forEach(repo => {

            console.log('test', repo)

        projectsContainer.innerHTML += `
       <div class="forkedrepo-div">
            <h2 class="project-name"> ${repo.name}</h2>
            <p class="project-info"> Default branch: ${repo.default_branch}</p>
            <p class="project-info"> Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
            <p class="project-info" id="commits-${repo.name}"> Amount of commits: </p>  
            <a class="project-info" href="${repo.html_url}" target="_blank">Link to repository</a>
        </div> 
        `
       })
       
       getPullRequests(forkedRepos)
       drawChart(forkedRepos.length)
    //    
    })
    
}    
getRepos()

//Funciton that shows the pull requests that has been done by the user to Technigo project
const getPullRequests = (repos) => {
    repos.forEach(repo => {
          fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`, options)
            .then(res => res.json())
            .then((pullData) => {
            let myPullRequest = pullData.find((pull) => pull.user.login === repo.owner.login)
            if (myPullRequest) {
                displayCommits(myPullRequest.commits_url, repo.name)
            } else {
                document.getElementById(`commits-${repo.name}`).innerHTML = `No pulls from this user yet.`
            }    
         })
    })
}




const displayCommits = (commitsUrl, repo) => {
    fetch(commitsUrl, options)
        .then(res => res.json())
        .then((data) => {

        document.getElementById(`commits-${repo}`).innerHTML += data.length
    
})
}







