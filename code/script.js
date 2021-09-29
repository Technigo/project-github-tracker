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

// ------------This is what happens inside FIRST FETCH FUNCTION------------

const repoInfo = ((data) =>{
    headerContainer.innerHTML = `<h3>Welcome to ${data[0].owner.login}s GitHub Tracker</h3>`
    projectContainer.innerHTML += `<img class="profile-img" src="https://avatars.githubusercontent.com/u/84288114?v=4" alt="profile pic Ajliin">`
    const forkedRepo = data.filter(repo => repo.fork && repo.name.startsWith('project-'))

    forkedRepo.forEach((repo) => {
        projectContainer.innerHTML += `<div class ="project"> ${repo.name}
        <p id="commit-${repo.name}">Commits amount: </p></div>`
    })
    getProjectInfo(forkedRepo)
})

getProjectInfo = (allRepositories) => {
    console.log('from getProjectInfo från första fetchen', allRepositories)
    allRepositories.forEach((project)=>{
        const PULL_API = `https://api.github.com/repos/technigo/${project.name}/pulls?per_page=100`
        console.log(PULL_API)
   
    const fetchProjectinfo = () => {
        fetch(PULL_API)
            .then ((response) => {
            return response.json()
            })
            .then ((json) => {
            console.log('json',json)
            const myPullRequest = json.filter((project) => project.user.login === USER)
            console.log('project.owner.login', project.owner.login)
            console.log('myPullRequest', myPullRequest)
            console.log('project.name',project.name)
            // if (myPullRequest) {
            //     // fetchCommits(myPullRequest.commit_url, project.name)
            // }else{
            //     document.getElementById(`commit-${project.name}`).innerHTML += 'No pull request done yet'
            // }
        })
        
    } 
    fetchProjectinfo()   
}) 
//    const fetchCommits = () =>{
//        fetch()
//        .then (response)
//         return respons.json()
//        .then ((data) => {
           
//        })
//    }
 
} 



