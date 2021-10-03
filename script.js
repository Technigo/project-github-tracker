const repoContainer = document.getElementById('projects')
const projectInfo = document.getElementById('profile-info')

const USER = 'Skrosen'
const USER_INFO = `https://api.github.com/users/${USER}`
const USER_REPOS = `https://api.github.com/users/${USER}/repos`

// Profile information
const profileInfo = () => {
    fetch(USER_INFO)
    .then(res => res.json())
    .then(userProfile => {
        projectInfo.innerHTML += /* html */`
            <img src="${userProfile.avatar_url}" class="profile-img" alt="Profile picture"/>
            <div class="profile-div">
                <a href="https://github.com/Skrosen"><h3 class="username">${userProfile.name}</h3></a>
                <a href="https://github.com/Skrosen"><p class="login">${userProfile.login}</p></a>
            </div>
        `
    })
}
profileInfo()

// Function that filters out the repos starting with 'project-' to only show technigo projects
const getRepos = () => {
    fetch(USER_REPOS)
    .then(res => res.json())
    .then(repos => {
        const forkedRepos = repos.filter (repo => repo.fork && repo.name.startsWith('project-')) 

        forkedRepos.forEach(repo => {repoContainer.innerHTML += /* html */ `
        <div class="repo-div">
        <a href="${repo.html_url}" class="repo-a">${repo.name}</a>
        <p class="repo-p">Default branch: ${repo.default_branch}</p>
        <p class="repo-p">Most recent push: ${new Date(repo.pushed_at).toDateString()}</p>
        <p id="commit-${repo.name}" class="repo-p">Number of commits: </p>
        </div>
        `
     })
        fetchPullRequest(forkedRepos)
        repoChart(forkedRepos.length)
    })
}

// Function that shows the pull requests that has been done by the user to Technigo projects
const fetchPullRequest = (allRepositories) => {
    allRepositories.forEach((repo) => {
        fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
        .then(res => res.json())
        .then((info) => {
            // console.log(`Mother repo for pull request ${repo.name}`, info)
            //find instead of filter because filter will keep in array even if only one element
            const myPullRequest = info.find( 
                (pull) => pull.user.login === repo.owner.login
            )
            if (myPullRequest) {
                fetchCommits(myPullRequest.commits_url, repo.name)
            } else {
                document.getElementById(`commit-${repo.name}`).innerHTML = /* html */ `
                No pulls from this user yet 🚫
                `
            }
        })
    })
}

// Function that counts and returns the amount of commits for the pull requests done in function fetchPullRequests
const fetchCommits = (myCommitsUrl, repo) => {
    fetch(myCommitsUrl)
    .then(res => res.json())
    .then((info) => {
        document.getElementById(`commit-${repo}`).innerHTML += info.length
    })
}
getRepos()