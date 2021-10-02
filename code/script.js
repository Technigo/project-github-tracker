const USER = `Ajliin`
const REPOS_URL = `https://api.github.com/users/${USER}/repos`

const firstContainer = document.getElementById('first')
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

// ------------function for first lines inside FIRST FETCH FUNCTION------------

const repoInfo = ((data) =>{
    first.innerHTML = `
    <div>
        <h1>Welcome to ${data[0].owner.login}s GitHub Tracker</h1>
        <img class="profile-img" src="https://avatars.githubusercontent.com/u/84288114?v=4" alt="profile pic Ajliin">
    </div>
    <div class=info-square>
        <h2>Elin Diczfalusy</h2>
        <p>User name: ${data[0].owner.login}</p>
        <p>GitHub page: <a href="${data[0].owner.html_url}">${data[0].owner.html_url}</a></p>
    </div>`

// ------------function filters out the forked repos from Technigo
    const forkedRepo = data.filter((repo) => repo.fork && repo.name.startsWith('project-'))
// ------------function to chart.js on how many repos      
    drawChart(forkedRepo.length)
// ------------forEach repo --> send to innerHTML   
    forkedRepo.forEach((repo) => {
        let dateString = new Date(repo.pushed_at)
        
        projectContainer.innerHTML += `<div class ="project"> 
        <p>Project name: ${repo.name}</p>
        <p>Project url: <a href="${repo.html_url}"> ${repo.html_url}</a></p>
        <p>Default branch: ${repo.default_branch}</p>

        <p>Last push: ${dateString.toUTCString()}
        <p id="commit-${repo.name}">Commits amount: </p></div>`
    })

getProjectInfo(forkedRepo)

})

getProjectInfo = (allRepositories) => {
    allRepositories.forEach((project)=>{    
        const PULL_API = `https://api.github.com/repos/technigo/${project.name}/pulls?per_page=100`
    
// ------------SECOND FETCH FUNCTION------------
    const fetchProjectinfo = (forkedRepo) => {
        fetch(PULL_API)
            .then ((response) => {
            return response.json()
            })
            .then ((json) => {
            const myPullRequest = json.find((pull) => (pull.user.login === project.owner.login))
                // Första är alla användare, project.owner.login
        
            
            if (myPullRequest) {
             fetchCommits(myPullRequest.url, project.name)
             
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
    fetch(commitUrl)
    .then ((response) => {
        return response.json()
    })
    .then ((data) => {
        document.getElementById(`commit-${projectName}`).innerHTML += `${data.commits}`
    })
 
})

