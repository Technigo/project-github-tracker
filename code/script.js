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
        profileContainer.innerHTML = `
        <h2>${data.login}</h2>
        <img class="profile-picture" src=${data.avatar_url}>
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
                <h3>${repo.name}</h3>
                <h3>${repo.pushed_at.slice(0, 10)} - ${repo.pushed_at.slice(11, 16)}</h3>
                <h3>${repo.default_branch}</h3>
                <a href="${repo.html_url}">GitHub address</a>
                <h3 id="commit-${repo.name}">Commits amount:</h3>
                `
        })
        drawChart(forkedRepos.length)
        fetchPullRequestsArray(forkedRepos)
        })
}

//fetch pull request
const fetchPullRequestsArray = (allRepositories) => {
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
                document.getElementById(`commit-${repo.name}`).innerHTML = 'Commits amount: No pull'
            }
        })
    })
}

//fetch nr of commits
const fetchCommits = (myCommitsUrl, myRepoName) => {
    fetch(myCommitsUrl)
    .then ((response) => response.json())
    .then((data) => {
        document.getElementById(`commit-${myRepoName}`).innerHTML += data.length
    })
    }


getRepos()



// commit count test
/* fetch ('https://api.github.com/repos/dandeloid/project-guess-who/commits')
        .then(response => response.json())
        .then(data => {
            const count = data.filter(nr => nr.commit.committer.name === 'dandeloid')
            console.log(count.length)
        }) */


