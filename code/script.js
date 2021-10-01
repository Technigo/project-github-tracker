const USER = 'dandeloid'
const REPOS_URL = `https://api.github.com/users/${USER}/repos`
const profileContainer = document.getElementById('profile')
const projectsContainer = document.getElementById('projects')
const pullContainer = document.getElementById('pullRequests')

//fetch for profile name and profile picture
const getProfile = () => {
fetch (`https://api.github.com/users/${USER}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        profileContainer.innerHTML = `
        <img class="profile-picture" src=${data.avatar_url}>
        <div class = "profile-name">
            <img class="github-icon" src="./github-icon-black.svg">
            <a href="https://github.com/dandeloid" target="_blank" class="profile-title">${data.login}</a>
        </div>
            <p class="bio">"${data.bio}"</p>
            <p class="location">Location - ${data.location}</p>
        `
    })
}
getProfile()

//fetch for Technigo forked repos
const getRepos = () => {
    fetch (REPOS_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const forkedRepos = data.filter(repo => repo.fork && repo.name.startsWith('project-'))
            //forkedRepos.forEach(repo => console.log(repo.name))  //logs all filtered repo

            forkedRepos.forEach((repo) => {
                projectsContainer.innerHTML += `
                <div class="single-project">
                    <a href="${repo.html_url}" class="repo-name" target="_blank" style="text-transform: capitalize;">${repo.name}</a>
                    <p>Recent push: ${repo.pushed_at.slice(0, 10)} - ${repo.pushed_at.slice(11, 16)}</p>
                    <p style="text-transform: capitalize;">Branch: ${repo.default_branch}</p>
                    <p id="commit-${repo.name}">Commits: </p>
                </div>
                `
        })
        drawChart(forkedRepos.length)
        fetchPulls(forkedRepos)
        })
}

//fetch pull request
const fetchPulls = (allRepositories) => {
    allRepositories.forEach((repo) => {
        const PULL_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`
        fetch(PULL_URL)
        .then((response) => response.json())
        .then((data) => {
            //console.log(`Mother repo for project ${repo.name}`, data)
            const myPullRequest = data.find(pull => pull.user.login === repo.owner.login)
            //console.log(myPullRequest)
            if (myPullRequest){
                fetchCommits(myPullRequest.commits_url, repo.name)
            } else {
                document.getElementById(`commit-${repo.name}`).innerHTML = 'Commits: 0'
            }
        })
    })
}

//fetch nr of commits
const fetchCommits = (myCommitsUrl, RepoName) => {
    fetch(myCommitsUrl)
    .then((response) => response.json())
    .then((data) => {
        document.getElementById(`commit-${RepoName}`).innerHTML += data.length
    })
    }

    //https://api.github.com/repos/dandeloid/project-news-site/languages


getRepos()



