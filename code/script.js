// DOM-selectors stored as variables
const userContainer = document.getElementById('user-container')
const projectsContainer = document.getElementById('projects-container')

// global variables + storing API
const username = 'mathildakarlsson'
const API_USER = `https://api.github.com/users/${username}`
const API_REPOS = `https://api.github.com/users/${username}/repos`

//personal token
const options = {
    method: 'GET',
    headers: {
          Authorization: `token ${GITHUBTOKEN}`
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
            <div class="repos">
                <button class="project-name">${repo.name}</button>
                <div class="panel">
                    <a href="${repo.html_url}">
                    <p>Link to repo</p></a>
                    <p>Branch: ${repo.default_branch}</p>
                    <p>Main language: ${repo.language}</p>
                    <p id="commit-${repo.name}"> Number of commits: </p>
                    <p>Latest push: ${new Date(repo.pushed_at).toDateString()}</p>
                </div>
            </div>
            `
        //     technigoRepos.forEach((repo) => {
        //         repoContainer.innerHTML += `
        //             <div class="repo-cards" id="${
        // repo.name
        // }">
        //                 <h3><a href="${repo.html_url}"><b>${
        // repo.name
        // }</b></a> 
        //                  (${repo.default_branch})</h3>
        //                 <p>Most recent push: ${new Date(repo.pushed_at).toDateString()}</p>
        //             </div> 
        //             `
        //         }) 


            //open and close accordion with project info
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
const getPullRequests = (filteredRepos) => { 
    filteredRepos.forEach(repo => {
        fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`, options)
        .then(res => res.json())
        .then(data => {
        const myPullRequests = data.find((pull) => pull.user.login === repo.owner.login)
        console.log(myPullRequests)
        if (myPullRequests) {
            getCommits(myPullRequests.commits_url, `${repo.name}`)
         } else {
            document.getElementById(`${repo.name}`).innerHTML += 
            `commits made by group partner`
        //conditionals to use for invoking step 4?
        // if (myPullRequests) {
        //     document.getElementById(`${repo.name}`).innerHTML += 
        //     `<a href="${myPullRequests.html_url}"> Pull request</a>`
        //  } else {
        //      document.getElementById(`${repo.name}`).innerHTML += `
        //         <p>PR made by group partner</p>
        //          `
        //  }
        //  if (myPullRequests) {
        //     getCommits(myPullRequests.commits_url, repo.name)
            
        //  } else {
        //      document.getElementById(`${repo.name}`).innerHTML += `
        //         <p>Commit made by group partner</p>
        //          `
        //  }
    }
    })



//Step 4 - fetch commits and display the amount
const getCommits = (URL, repoName) => { 
    // const GIT_COMMIT_API = `https://api.github.com/repos/${username}/${repo.name}/commits`
        fetch(`https://api.github.com/repos/${username}/${repo.name}/commits`, options)
        .then(res => res.json())
        .then(data => {
            // let numberOfCommits = data.length
            document.getElementById(`commit-${repo.name}`).innerHTML += data.length
        })
        }
    })
}
    // const getCommits = (URL, repoName) => {
    //     fetch (URL, options)
    //     .then((res) => res.json())
    //     .then(data => {
    //         document.getElementById(`${
    // repo.name
    // }`).innerHTML += `<p>Number of commits: ${data.length}</p>`
    //         // console.log(data.length)
    //     })
    //     }
    //     })
    //     } 



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

                    