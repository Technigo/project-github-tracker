const USER = 'hemmahosjessi'
const REPOS_URL = `https://api.github.com/users/${USER}/repos`
const projectsContainer = document.getElementById('projects')
const profileContainer = document.getElementById('profile')
// const PULLS_URL = `https://api.github.com/repos/technigo/${repo.name}/pulls`


// ---- PROFILE -----//

const getProfile = () => {
    fetch (`https://api.github.com/users/${USER}`)
    .then (response => response.json())
    .then(data => {
        // console.log(data)
    profileContainer.innerHTML += `
    <div class="profile-area">
        <div class="user-img">
            <img src=${data.avatar_url}></img>
        </div>
        <div class="user">
            <h2>Jessi Nygren Walhed</h2>
            <h3 class="user-name">${data.login}</h3>
        </div>
    </div>
    <div>
        <p class="bio">${data.bio}</p>
        <button class="button" id="followButton">Follow</button>
    </div>
    `
    })
}
getProfile()

// ---- REPOS -----//

const getRepos = () => {
    fetch(REPOS_URL)
    .then(response => (response.json()))
    .then(data => {
        // console.log(data)
        // data.forEach(repo => console.log(repo.name))

        const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
        console.log('My forked repos', forkedRepos)

        forkedRepos.forEach(repo => projectsContainer.innerHTML += `
        <div class="project-card"> 
                <a class="break" href="${repo.html_url}">${repo.name}</a>
                <div class="most-recent">
                    <p>Most recent push</p>
                    <h4>${new Date(repo.pushed_at).toDateString()}</h4>
                </div>
                <div class="default-branch">
                    <p>Default branch name</p>
                    <h4>${repo.default_branch}</h4>
                </div>
                <div class="commits">
                        <p>No of commits</p>
                        <h4 id="commit-${repo.name}"></h4>
                </div>
        </div>`)
        drawChart(forkedRepos.length)

        fetchPullRequests(forkedRepos)
    })
}

// ---- PULL REQUESTS PER PROJECT / COMMIT MESSAGES PER PULL REQUEST -----//

const fetchPullRequests = (allRepositories) => {
    allRepositories.forEach(repo => {
        fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
        .then(response => (response.json()))
        .then(data => {
            const myPullRequests = data.find(
                (pull) => pull.user.login === repo.owner.login)
            console.log('My Pull requests', myPullRequests)

            if (myPullRequests) {
                fetchCommits(myPullRequests.commits_url, repo.name);
            } else {
                document.getElementById(`commit-${repo.name}`).innerHTML =
                    'No pull request done 🙃';
            }
            
        })
    })
    
}

const fetchCommits = (myCommitsUrl, myRepoName) => {
    fetch(myCommitsUrl)
    .then(response => (response.json()))
    .then(data => {
        console.log('My commits', data)
        document.getElementById(`commit-${myRepoName}`).innerHTML += data.length
    })
}

getRepos()


