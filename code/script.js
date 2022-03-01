// DOM-selectors stored as variables
const userContainer = document.getElementById('user-container')
const projectsContainer = document.getElementById('projects-container')

// global variables + storing API
let repo
const username = 'mathildakarlsson'
const API_USER = `https://api.github.com/users/${username}`
const API_REPOS = `https://api.github.com/users/${username}/repos`

//personal token
const options = {
    method: 'GET',
    headers: {
        Authorization: 'GITHUB_TOKEN'
    }
}

// step 1 - fetch user
const getUser = () => {
    fetch(API_USER, options)
    .then(res => res.json())
    .then(data => {
        userContainer.innerHTML += `
        <img class="user-img"src="${data.avatar_url}">
        <div class="github-user">
            <a href="https://github.com/"><img class="github-logo" src="images/GitHub-Mark-32px.png"></a>
            <a href="https://github.com/mathildakarlsson" class="user-name">${data.login}</a>
        </div>
        `
    })
}

getUser() //invoking step 1

//step 2 - fetch repos and filter + open/closing accordion
const getRepos = () => { 
    fetch(API_REPOS, options)
    .then(res => res.json())
    .then((data) => {
        const filteredRepos = data.filter((repo) => repo.fork && repo.name.startsWith('project'))
        filteredRepos.forEach((repo) => {
            projectsContainer.innerHTML += `
            <div class="repos" id="${repo.name}">
                <button class="project-name">${repo.name}</button>
                <div class="panel">
                    <a href="${repo.html_url}">
                    <p>Link to repo</p></a>
                    <p>Branch: ${repo.default_branch}</p>
                    <p>Nr of commits: ${repo.length}</p>
                    <p>Main language: ${repo.language}</p>
                    <p>Latest push: ${new Date(repo.pushed_at).toDateString()}</p>
                </div>
            </div>
            `
            //Open and close accordion with project info
            const acc = document.getElementsByClassName("project-name")
            let i
            for (i = 0; i < acc.length; i++) {
                acc[i].addEventListener("click", function() {
                    this.classList.toggle("active")
                    const panel = this.nextElementSibling
                    if (panel.style.maxHeight) {
                        panel.style.maxHeight = null
                    } else {
                        panel.style.maxHeight = panel.scrollHeight + "px"
                    } 
                })
            }
        })

        getPullRequests(filteredRepos) //invoke step 3
        
        drawChart(filteredRepos.length) //invoke the functions that draws the chart, passing on the number of projects
    })
}
getRepos()

// step 3 - fetch pull requests
const API_PR = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`
const getPullRequests = (filteredRepos) => { 
    filteredRepos.forEach(repo => {
        fetch(API_PR, options)
        .then(res => res.json())
        .then(data => {

        const myPullRequests = data.find((pull) => pull.user.login === repo.owner.login)
        //for my pull requests - invoke step 4
        if (myPullRequests) {
            getCommits(myPullRequests.commits_url, repo.name)
        } else {
            document.getElementById(`${repo.name}`).innerHTML += `
                <p>Commit made by group partner</p>
                `
        }
    })

//Step 4 - fetch commits and display the amount
const getCommits = (URL, repoName) => { 
        fetch(URL, options)
        .then(res => res.json())
        .then(data => {
            document.getElementById(`${repo.name}`).innerHTML += `
            <p> Number of commits: ${data.length}</p>
            `
        })
    }
    
})   
}


//------------ OLD CODE - MIGHT BE USEFUL ------------

// // step 1 - fetch user
// const getUser = () => {
//     fetch(API_USER, options)
//     .then(res => res.json())
//     .then(data => {
//         userContainer.innerHTML += `
//         <img class="user-img"src="${data.avatar_url}">
//         <div class="github-user">
//             <a href="https://github.com/"><img class="github-logo" src="images/GitHub-Mark-32px.png"></a>
//             <a href="https://github.com/mathildakarlsson" class="user-name">${data.login}</a>
//         </div>
//         `
//     })
// getRepos() //invoking step 2
// }

// //step 2 - fetch repos and filter + open/closing accordion
// const getRepos = () => { 
//     fetch(API_REPOS, options)
//     .then(res => res.json())
//     .then(data => {
//         let repo
//         const repoName = repo.name
//         console.log(data)
//         const filteredRepos = data.filter((repo) => repo.fork && repo.name.startsWith('project'))
//         filteredRepos.forEach((repo) => {
//             projectsContainer.innerHTML += `
//             <div class="repos">
//             <button class="project-name">${repo.name}</button>
//             <div class="panel">
//             <a href="${repo.html_url}">
//             <p>Link to repo</p></a>
//             <p>Branch: ${repo.default_branch}</p>
//             <p id="${repo.name}">Nr of commits: </p>
//             <p>Main language: ${repo.language}</p>
//             <p>Latest push: ${new Date(repo.pushed_at).toDateString()}</p>
//             </div>
//             </div>
//             `
//             // Open and close accordion with project info
//             const acc = document.getElementsByClassName("project-name")
//             let i
//             for (i = 0; i < acc.length; i++) {
//                 acc[i].addEventListener("click", function() {
//                     this.classList.toggle("active")
//                     const panel = this.nextElementSibling
//                     if (panel.style.maxHeight) {
//                         panel.style.maxHeight = null
//                     } else {
//                         panel.style.maxHeight = panel.scrollHeight + "px"
//                     } 
//                 })
//             }
//         })
        
// // step 3 - fetch pull requests
// const API_PR = `https://api.github.com/repos/Technigo/${repoName}/pulls?per_page=100`
// const getPullRequests = (filteredRepos) => { 
//     filteredRepos.forEach(repo => {
//         fetch(API_PR, options)
//         .then(res => res.json())
//         .then(data => {
//             const myPullRequests = data.find((pull) => pull.user.login === repo.owner.login)
//             const API_COMMIT = myPullRequests.commits_url
//             console.log(myPullRequests)
//             // const dataName = data.name
//             if (myPullRequests) {
                
//                 getCommits(myPullRequests, repo.name)
//             } else {
//                 // projectsContainer.innerHTML += `
//                 // <p>No pull requests made</p>
//                 // `
//             }
//         })
//     })
//     drawChart(filteredRepos.length)
//     getPullRequests()
// }
// //Step 4 - fetch commits and display the amount
// const getCommits = (myPullRequests, repoName) => { 
//         fetch(myPullRequests.commits_url, options)
//         .then(res => res.json())
//         .then((commit) => {
//             // let numberOfCommits = [data.length]
//             document.getElementById(`comit-${repoName}`).innerHTML += `
//             <p> Number of commits: ${commit.length}</p>
//             `
//             // data.length        
//         })
//     }
// })
// }
// getUser() //invoking step 1
                    