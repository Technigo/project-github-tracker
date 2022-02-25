const username = 'id4h4lling'
let reponame = ''

const API_GIT_URL = `https://api.github.com/users/${username}/repos`
const API_GIT_USER = `https://api.github.com/users/${username}` //Maybe use to get picture?

const userInfo = document.getElementById('userInfo')
const projects = document.getElementById('projects')



const options = {
    method: 'GET',
    // headers: {
    //     Authorization: `token ${API_TOKEN}`
    // }
}

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


//fetch user and repos a function sabbotage the whole api? 
const getRepos = () =>{

fetch (API_GIT_URL, options)
    .then(res => res.json()) 
    .then(data => {
        console.log(data)
        console.log(username)

        //collect user data from fetch here and put in a function below somehow
        // userInfo.innerHTML += `
        // <h1> ${username}</h1
        // bild
        // `      
        //filter out and only show the forked ones
        const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith("project-"))
        console.log(forkedRepos) 

        // //filter out and only show the forked ones
        // let forkedRepos = data.filter(element => element.fork === true)
        // console.log(forkedRepos)
        // //filter out Technigo projects 
        // let projects = data.filter(project => project.name.startsWith('project'))
        // console.log(projects)

        forkedRepos.forEach((repo) => {
        projects.innerHTML+=
       ` <div class="card" id=${repo.id}>
   
            <h2><a href="${repo.html_url}">${repo.name}</a></h2>
            <p>Default branch: ${repo.default_branch}</p>
            <p id="commit-${repo.name}">Commits amount: ?? </p> 
            <p>Recent push: ${new Date (repo.pushed_at).toDateString()}</p>
            
        </div>` 
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
                const myPullRequests = data.find((pull) => pull.user.login === repo.owner.login)
                console.log('my pull requests:', myPullRequests)     
                // console.log(myPullRequests[0].commits.url)
            
                
                if (myPullRequests.length>0) {
                
                    fetchCommits(myPullRequests.commit_url, repo.name)
                    
                } else {
                    document.getElementById(`commit-${repo.name}`).innerHTML =
                        `No pull request or commits done`
                }
         })
        })
    )}

//how does this work?
const fetchCommits = (myCommitsUrl, myRepoName) => {
    fetch(myCommitsUrl)
    .then((res) => res.json())
    .then((data) => {
        document.getElementById(`commit-${myRepoName}`).innerHTML += data.length
        console.log(`${data.length}`)
    })
}


 

// const getRepos = () =>{
//     fetch (USER_INFO_URL, options)
//     .then(res => res.json()) 
//     .then(data => {
//         const getRepositories = data.filter(
//             (repo) => repo.name.includes('project-') && repo.fork
//          )
//          getRepositories.forEach((repo) => {
//              projects.innerHTML +=
       
             
             
//          })
//         console.log(data)
//         projects.innerHTML += `
//         ${data[11].name}
//         `
// }

// const API_REPO = `https://api.github.com/repos/Technigo/${reponame}/pulls`
// // 'https://api.github.com/repos/technigo/' + repo.name + '/pulls' samma som ovan?



    

