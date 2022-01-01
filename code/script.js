let USER = 'vrill'

const USER_URL = `https://api.github.com/users/${USER}`
const USER_REPOS_URL = `${USER_URL}/repos`

const profileContainer = document.getElementById('profile-wrapper')
const projectsContainer = document.getElementById('projects')

const fetchProfile = () => {
    fetch(USER_URL)
        .then((response) => response.json())
        .then((data) => {
            profileContainer.innerHTML += `
                <div id="profile">
                    <figure class="profile-image">
                        <a href="${USER_URL}">
                            <img src="${data.avatar_url}" alt="Avatar of ${data.login}">
                        </a>
                    </figure>
                    <h3>${data.login}</h3>
                    <p>Amount of public repositories: ${data.public_repos}.</p>
                </div>
            `
        })
}
fetchProfile()

const fetchRepos = () => {
    fetch(USER_REPOS_URL)
        .then((response) => response.json())
        .then((data) => {
            const technigoRepos = data.filter(
                (repo) => repo.name.includes('project-') && repo.fork
            )
            technigoRepos.forEach((repo) => {
                projectsContainer.innerHTML += `
                    <div class="projects-card" id="${repo.id}">
                        <h3><a href="${repo.html_url}"><b>${repo.name}</b></a>  <strong>(${repo.default_branch})</strong></h3>
                        <p>Most recent push: ${new Date(repo.pushed_at).toDateString()}</p>
                        <p id="commit_${repo.name}">Number of commits: </p>
                        <p>Main language: ${repo.language}</p>
                    </div>
                `
            })
            fetchPullRequestsArray(technigoRepos)
            drawBarChart(technigoRepos)
        })
}

    /* This URL only seems to work for open pull requests, closed ones do not show up. */
    const fetchPullRequestsArray = (allRepositories) => {
        allRepositories.forEach((repo) => {
            fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
                .then((response) => response.json())
                .then((data) => {
                    const myPullRequest = data.find(
                        (pull) => pull.user.login === repo.owner.login
                    )
                    if (myPullRequest) {
                        fetchCommits(myPullRequest.commits_url, repo.name)
                    } else {
                        document.getElementById(`commit_${repo.name}`)
                        .innerHTML = 'Pull request unavailable, or closed.';
                    }
                })
        })
    }

        const fetchCommits = (myCommitsUrl, myRepoName) => {
            fetch(myCommitsUrl)
                .then((response) => response.json())
                .then((data) => {
                    document.getElementById(`commit_${myRepoName}`).innerHTML += data.length
                })
        }

fetchRepos()