//DOMs
const MY_REPOS = 'https://api.github.com/users/anndimi/repos'
const projectsContainer = document.getElementById("projects")
const commitsContainer = document.getElementById("commits")
const user = 'anndimi'
const USER_URL = `https://api.github.com/users/${user}`
const userContainer = document.getElementById("userProfile")

const userProfile = () => {
    fetch(USER_URL)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            userContainer.innerHTML = `
        <a href="${data.html_url}" target="blank"><img src="${data.avatar_url}" class="avatar"/></a>
        <p class="full-name">${data.name}</p>
        <p class="username">Username: ${data.login}</p>
        <p class="location">${data.location}</p>
        `
        })
}

//Function to fetch my repos
const fetchRepos = () => {
    fetch(MY_REPOS)
        .then((res) => res.json())
        .then((data) => {
            const forkedRepos =
                data.filter(repo => repo.fork && repo.name.startsWith("project-"))

            forkedRepos.forEach(repo => {
                projectsContainer.innerHTML += `
                      <div class="repo" id=${repo.name}>
                        <a href="${repo.html_url}" target="blank">Name: ${repo.name}</a> 
                        <p>Branch: ${repo.default_branch}</p>
                        <p>Latest push: ${new Date(repo.pushed_at).toDateString()}</p>
                        <p id="commit-${repo.name}">Amount of commits: </p> 
                      </div>
                        `
            })
            drawChart(forkedRepos.length)
            fetchPullRequests(forkedRepos)
            //console.log(forkedRepos)
        })
}

const fetchPullRequests = (repos) => {
    repos.forEach(repo => {
        const PULL_URL = `https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`

        fetch(PULL_URL)
            .then(res => res.json())
            .then((data) => {
                const myPullRequest =
                    data.find(pull => pull.user.login === repo.owner.login)

                fetchCommits(myPullRequest.commits_url, repo.name)
            })
    })
}

const fetchCommits = (myCommitsUrl, myRepoName) => {
    fetch(myCommitsUrl)
        .then(res => res.json())
        .then(data => {
            document.getElementById(`commit-${myRepoName}`).innerHTML += data.length
        })
}

userProfile()
fetchRepos()



