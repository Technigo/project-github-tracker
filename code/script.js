const USER = `Ajliin`
const REPOS_URL = `https://api.github.com/users/${USER}/repos`

const headerContainer = document.getElementById('header')
const projectContainer = document.getElementById('projects')

// ------------FIRST FETCH FUNCTION------------
const fetchRepos =() => {
fetch(REPOS_URL)
    .then ((response) => {
        return response.json()
    })
    .then ((data) => {
        repoInfo(data)   
})
}
fetchRepos()

// ------------fetching reop for first lines inside FIRST FETCH FUNCTION------------

const repoInfo = ((data) =>{
    headerContainer.innerHTML = `<h3>Welcome to ${data[0].owner.login}s GitHub Tracker</h3>`
    projectContainer.innerHTML += `<img class="profile-img" src="https://avatars.githubusercontent.com/u/84288114?v=4" alt="profile pic Ajliin">`
    const forkedRepo = data.filter((repo) => repo.fork && repo.name.startsWith('project-'))
        console.log('outside forkedRepo-function', forkedRepo)

    forkedRepo.forEach((repo) => {
        let dateString = new Date(repo.pushed_at)
        console.log(dateString)
        // projectContainer.innerHTML += dateString.toString()
        
        projectContainer.innerHTML += `<div class ="project"> ${repo.name}
        <p>Last push: ${dateString.toUTCString()}
        <p id="commit-${repo.name}">Commits amount: </p></div>`
    })
    getProjectInfo(forkedRepo)
})

getProjectInfo = (allRepositories) => {
    console.log('from getProjectInfo från första fetchen', allRepositories)
    allRepositories.forEach((project)=>{
        const PULL_API = `https://api.github.com/repos/technigo/${project.name}/pulls?per_page=100`
        console.log(PULL_API)
    

// ------------SECOND FETCH FUNCTION------------
   
    const fetchProjectinfo = (forkedRepo) => {
        fetch(PULL_API)
            .then ((response) => {
            return response.json()
            })
            .then ((json) => {
            console.log('json',json)
            const myPullRequest = json.find((pull) => (pull.user.login === project.owner.login))
                // Första är alla användare, project.owner.login
                //console.log('project.user.login', project.user.login)
            
            console.log('project.owner.login', project.owner.login)
            //console.log('json.owner.login', json.owner.login)
            //console.log('forkedRepo.owner.login', forkedRepo.owner.login)
            console.log('project.name',project.name)
            console.log('myPullRequest', myPullRequest)
            
            if (myPullRequest) {
             fetchCommits(myPullRequest.url, project.name)
             console.log('myPullRequest[0].url',myPullRequest.url)
             console.log('project.Name into myPullRequest', project.name)
             console.log('fetchCommits(myPullRequest.url, project.name)', (myPullRequest.url, project.name))
            }else{
                console.log('else part in function works', myPullRequest)
            document.getElementById(`commit-${project.name}`).innerHTML += 'No pull request done yet'
            }
        })
        
    } 
  fetchProjectinfo()   
}) 
}
// ------------THRID FETCH FUNCTION------------
const fetchCommits = ((commitUrl, projectName) => {
    console.log("console commitUrl", commitUrl, projectName)
    fetch(commitUrl)
    .then ((response) => {
        return response.json()
    })
    .then ((data) => {
        console.log('I am the master!')
        document.getElementById(`commit-${projectName}`).innerHTML += `${data.commits}`
    })
 
})

