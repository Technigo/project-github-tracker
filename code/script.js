
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
    .then(response => response.json())
    .then(data => {
    
        const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
        
        const forkedSortedRepos = forkedRepos.sort((oldestRepo, newestRepo) => new Date(newestRepo.pushed_at) - new Date(oldestRepo.pushed_at));
        forkedSortedRepos.forEach(repo => reposbox.innerHTML += `
                <div class="projects">
                 <h3><a href="${repo.html_url}">${repo.name} 
                 with default branch ${repo.default_branch}</h3></a>
                 <p>Recent push: ${new Date(repo.pushed_at).toDateString()}</p>
                 <p id="pull-request-${repo.name}"></p>
                 <p id="commits-${repo.name}"></p>
                </div>`)

        fetchPullRequest(forkedSortedRepos)
        addCommits(forkedSortedRepos)
        renderChart(forkedSortedRepos.length);
        // Chart(forkedSortedRepos.length)
        // console.log(forkedSortedRepos.length)
    })
}

const fetchPullRequest = (allRepos) => {
    allRepos.forEach(repo => {
        fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
        .then((res) => res.json())
        .then((data) => { 
            const myPullRequests = data.filter((pullRequest) => pullRequest.user.login === username)
            document.getElementById(`pull-request-${repo.name}`).innerHTML = `Pull Requests: ${myPullRequests.length}`
        
        })
    })
}
const addCommits = (allRepos) => {
    allRepos.forEach(repo => {
        fetch(`https://api.github.com/repos/${username}/${repo.name}/commits`)
        .then((res) => res.json())
        .then((data) => { 
            document.getElementById(`commits-${repo.name}`).innerHTML = `Commits: ${data.length}`
        
        })
    })
}


//invoking functions
fetchRepos()
fetchProfilePicture()
