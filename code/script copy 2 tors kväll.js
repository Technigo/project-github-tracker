
//DOM SELECTORS
const username = 'HWallberg'
const userbox = document.getElementById('userbox')
const reposbox = document.getElementById('reposbox')

//APIs
const API_PROFIL = `https://api.github.com/users/${username}`
const API_REPOS = `https://api.github.com/users/${username}/repos`
//const API_COMMITS = `https://api.github.com/repos/${username}/${repo.name}/commits`


//PICTURE
const fetchProfilePicture = () => {
    fetch(API_PROFIL)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            picture = data.avatar_url

    let profilePicture =    `<div class = "photobox">
                                <p>${username}</p>
                                <img class = "photo" src="${picture}" />
                            </div>`;
    return (userbox.innerHTML = profilePicture)

})
}

//REPO'S
const fetchRepos = () => {
    fetch(API_REPOS)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            //const reponame = data[1].name

            // const fetchPullRequest = (allRepos) => {
            //     allRepos.forEach(repo => {
            //         fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls`)
            //         .then((res) => res.json())
            //         .then((data) => {
            //             console.log(data)
            //     })
                

            const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith("project-"))

            forkedRepos.forEach((repo) => {
                fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls`)
                .then(res => res.json())
                .then(data => {
                    const pullRequest = data.filter(pull => {
                        return pull.user.login === repo.owner.login
                    })
                    console.log(data)

                    commits(pullRequest)
                    

                    pullRequest.forEach((pull) => {
                        fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls/${pull.number}/commits`)
                        .then(res => res.json())
                        .then(data => {
                            
                            const commits = data.filter((commits) => commits.commit.author.name === 'Hanna Wallberg')
                            
                            console.log(data)
                        })
                    })
                })
                
            })



            forkedRepos.sort((oldestRepo, newestRepo) => new Date(newestRepo.pushed_at) - new Date(oldestRepo.pushed_at));
            forkedRepos.forEach((repo) => {
			reposbox.innerHTML += `
          <a class="project-link" href="${repo.html_url}" target="_blank">
            <div class="project" id="${repo.name}-container">
              <h3 class="project-name">${repo.name}</h3>
              <p class="project-info">Default branch ${repo.default_branch}</p>
              <p class="project-info">Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
              <p class="project-info" id="commits-${repo.name}">Amount of commits:${data.length} </p>
            </div>
          </a>
          <hr>
        `;
			});


        }); 
};

// const fetchPullRequest = (allRepos) => {
//     allRepos.forEach(repo => {
//         fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls`)
//         .then((res) => res.json())
//         .then((data) => {
//             console.log(data)
//     })
// }
// }
// API_PR = `https://api.github.com/repos/Technigo/${repo.name}/pulls`
//             fetch(API_PR)
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data2)


const addCommits = (commits) => {
    commits.forEach((repo) => {
    fetch(`https:/api.github.com/repos/${username}/${repo}/commits`)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            reposbox.getElementById(`commits-${repo.name}`).innerHTML = `commits: ${data.length}`
            })
        }); 
};


// const fetchPullRequest = (allRepos) => {
//     allRepos.forEach(repo => {
//         fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
//         .then((res) => res.json())
//         .then((data) => { 
//             const myPullRequests = data.filter((pullRequest) => pullRequest.user.login === USER)
//             document.getElementById(`pull-request-${repo.name}`).innerHTML = `Pull Requests: ${myPullRequests.length}`
        
//         })
//     })
// }






// const addCommits = (allRepos) => {
//     allRepos.forEach(repo => {
//         fetch(`https://api.github.com/repos/${username}/${repo.name}/commits`)
//         .then((res) => res.json())
//         .then((data) => { 
//             document.getElementById(`commits-${repo.name}`).innerHTML = `commits: ${data.length}`
        
//         })
//     })
// }




// const getPullRequests = (forkedRepos) => {
//     forkedRepos.forEach(repo => {
//         fetch(`https://api.github.com/repos/Technigo/${reponame}/pulls`)
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data)
//             })
//     })
// }



            
//     let user = `<div class="repos">
//                     <p>GitHub repo: ${reponame}</p>
//                 </div>`
        
//     const API_PR = `https://api.github.com/repos/Technigo/${reponame}/pulls`
//         fetch(API_PR)
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data)
//             })
    
//     return (reposbox.innerHTML = user)

//     })
// }







fetchProfilePicture()
fetchRepos()
fetchPullRequest()
addCommits()
//getPullRequests()