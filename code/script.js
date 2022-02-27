
//DOM
const profileWrapper = document.getElementById('profile-wrapper');
const repoWrapper = document.getElementById('repo-wrapper');

//API
const USER = 'JaEngd'
const PROFILE_URL = `https://api.github.com/users/${USER}`
const REPO_URL = `https://api.github.com/users/${USER}/repos`

const API_TOKEN = TOKEN || process.env.API_KEY;

const options = { //Object
    method: 'GET', //POST, PATCH, DELETE
    headers: {
        Authorization: `token ${API_TOKEN}`
    }
}

const showProfile = () => {
    fetch(PROFILE_URL, options)
        .then(res => res.json()) //Converting the response to a JSON object
		.then(data => {
            console.log(data)
            profileWrapper.innerHTML += `
                <div id="profile">
                    <figure class="profile-image">
                        <a href="${PROFILE_URL}">
                            <img src="${data.avatar_url}" alt="Avatar of ${data.login}">
                        </a>
                    </figure>
                    <h3>${data.login}</h3>
                    <p>Public repositories: ${data.public_repos}.</p>
                </div>
            `
        })
}
showProfile()

const showRepos = () => {
    fetch(REPO_URL, options)
        .then((response) => response.json())
        .then((data) => {
            const myRepos = data.filter((repo) => repo.name.includes("project") && repo.fork)

            myRepos.forEach(repo => {
                repoWrapper.innerHTML += `
                    <div class="projects-card" id="${repo.id}">
                        <h3><a href="${repo.html_url}"><b>${repo.name}</b></a>  <strong>(${repo.default_branch})</strong></h3>
                        <p>Most recent push: ${new Date(repo.pushed_at).toDateString()} </p>
                        <p id="commit_${repo.name}">Number of commits:</p>
                        <p>Main language: ${repo.language}</p>
                    </div>
                `
            })
            showPullRequestsArray(myRepos)
            drawBarChart(myRepos)
        })
}


const showPullRequestsArray = (allRepos) => {
    allRepos.forEach((repo) => {
        fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`, options)
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

showRepos()


  





        

        











		
        

