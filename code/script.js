//DOM selectors
const username = 'JensBergqvist'
const projects = document.getElementById("projects")
let filterRepo = []
//API token
const API_TOKEN = TOKEN || process.env.API_KEY;

const options = {
    method: 'GET',
    headers: {
        Authorization: `token ${API_TOKEN}`
    }
} 

//let reponame;
//API
const API_REPOS = `https://api.github.com/users/${username}/repos`;
const API_PROFIL = `https://api.github.com/users/${username}`
//Picture and name

const profilePic = () => {
    fetch(API_PROFIL)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            picture = data.avatar_url
    let profilePicture =    `<div class = "photobox">
                            <p>${username}</p>
                                <img class = "photo" src="${picture}" />
                            </div>`;
    return (projects.innerHTML = profilePicture)
})
}

profilePic()












const getRepos = () => {
    fetch(API_REPOS)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            filterRepo = data.filter((repo) => repo.fork && repo.name.startsWith("project-"))
            console.log(filterRepo)
            filterRepo.forEach(repo => {
                document.getElementById('projects').innerHTML += `
                  <div class="repo" id=${repo.name}>
                    <h2>${repo.name}</h2>
                    <h2><a href ="${repo.html_url}"> Github Link</a </h2>
                    <h2>Default branch: ${repo.default_branch}</h2>
                    <h2>Latest push: ${repo.pushed_at}</h2>
                  </div>`
                   console.log(repo.git_commits_url)
                //   fetch(repo.git_commits_url)
                //   .then(res=> res.json())
                //   .then (data =>{
                //       console.log(data)
                //   })
              })
            
            //getPullRequests(filterRepo)
        })
}

// // const getPullRequests = (filterRepo) => {
//     // filterRepo.forEach(repo => {
//         fetch('https://api.github.com/repos/technigo/' + repo.name + '/pulls')
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data)
//             })
//     })
// // }

const getPullRequests = (filterRepo) => {
    filterRepo.forEach(repo => {
        fetch(`https://api.github.com/repos/technigo/${repo.name}/pulls?per_page=100`,)
        .then(res => res.json())
        .then(data => {
            console.log(data)

          const myPullRequests = data.find((pull) => pull.user.login === repo.owner.login)
            console.log(myPullRequests)
         const myCommitsURL = myPullRequests.commits_url
         console.log(myCommitsURL)
         
        })
    })
}
const getCommits = (myCommitsURL) => {
    fetch (myCommitsURL)
    .then((res) => res.json())
    .then(data => {
        document.getElementById('commits ${repo.name}').innerHTML += data[data.length]
    })
    }

getRepos()

