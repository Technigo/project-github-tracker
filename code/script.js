
//DOM SELECTORS
const username = 'HWallberg'
const userbox = document.getElementById('userbox')
const reposbox = document.getElementById('reposbox')

//APIs
const API_PROFIL = `https://api.github.com/users/${username}`
const API_REPOS = `https://api.github.com/users/${username}/repos`

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
            
            //hämtad kodbit
            const forkedRepos = data.filter((repo) => repo.fork && repo.name.startsWith("project-"))
            forkedRepos.sort((oldestRepo, newestRepo) => new Date(newestRepo.pushed_at) - new Date(oldestRepo.pushed_at));
            forkedRepos.forEach((repo) => {
				reposbox.innerHTML += /*html*/ `
          <a class="project-link" href="${repo.html_url}" target="_blank">
            <div class="project" id="${repo.name}-container">
              <h3 class="project-name">${repo.name}</h3>
              <p class="project-info">Default branch ${repo.default_branch}</p>
              <p class="project-info">Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
              <p class="project-info" id="commits-${repo.name}">Amount of commits: </p>
            </div>
          </a>
          <hr>
        `;
			});
        getPullRequests(forkedRepos);


        });
        
};

const getPullRequests = (forkedRepos) => {
    forkedRepos.forEach(repo => {
        fetch(`https://api.github.com/repos/Technigo/${reponame}/pulls`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    })
}
            
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
getPullRequests()


    