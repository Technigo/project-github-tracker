const username = 'faypi'
const API_URL = `https://api.github.com/users/${username}/repos`
const API_USER_PROFILE = `https://api.github.com/users/${username}`
const projects = document.getElementById("projects");
const profile = document.getElementById("profile");
const totalProjectsDuringBootcamp = 19;
// const API_TOKEN = TOKEN || process.env.API_KEY;
const options = {
    method: 'GET',
    headers: {
        Authorization: `token ${API_TOKEN}` // you need to paste your token over here.
    }
}

fetch(API_USER_PROFILE, options)
    .then(res => res.json())
    .then(data => {
        const name = data.name
        const profilePic = data.avatar_url
        // const memberSince = data.created_at
        const followers = data.followers
        const following = data.following
        profile.innerHTML += ` 
            <h1>${username}'s GitHub Tracker</h1>
            <div class="profile-details">
                <img src=${profilePic} />
                <span id="fullname">${name}</span>
                <span id="username">${username}</span>
                <span id="following">following ${following}</span>
                <span id="followers">followed by ${followers}</span>
            </div>
        `
    }
    )


fetch(API_URL, options) // options object is passed as 2nd argument to fetch() function.
    .then(res => res.json())
    .then(data => {
        const myRepos = data.filter((forkedRepos) => forkedRepos.fork == true && forkedRepos.name.startsWith("project-"))
        const numberOfProjects = myRepos.length
        drawChart([numberOfProjects, totalProjectsDuringBootcamp - numberOfProjects])
        getPullRequests(myRepos)
    });

//Remember to pass along your filtered repos as an argument when
//you are calling this function

const getPullRequests = (repos) => {
    //Get all the PRs for each project.
    repos.forEach(repo => {
        fetch('https://api.github.com/repos/technigo/' + repo.name + '/pulls' + '?per_page=100', options)
            .then(res => res.json())
            .then(data => {

                const repoBranchName = repo.default_branch
                const repoName = repo.name
                const repoUrl = repo.html_url

                projects.innerHTML += `
                <div class="repo-card">
                    <div class="repo" id=${repoName}>
                    <h2>
                        <a href=${repoUrl}> 
                            ${repoName}:${repoBranchName}
                        </a>
                    </h2>
                    </div>
                </div>
                `


                const myPullRequests = data.filter((myPR) => myPR.user.login == repo.owner.login);
                handlePullRequest(repoName, myPullRequests)
            })
    })

}

const handlePullRequest = (repoElementId, myPullRequests) => {
    const repo = document.getElementById(repoElementId);

    //Get all the PRs for each project.
    myPullRequests
        .forEach((pullRequest) => {
            const prTitle = pullRequest.title
            const prUrl = pullRequest.html_url
            repo.innerHTML += `
            <div class="pull-request">
                <span>PR: <a href=${prUrl}> ${prTitle}</a></span>
            </div>
          `
        })
    myPullRequests
        .map(pullRequest => pullRequest.commits_url)
        .forEach(commitUrl => {
            fetch(commitUrl + "?per_page=100", options)
                .then(res => res.json())
                .then(data => {
                    const mostRecentCommit = data[data.length - 1]
                    const commitMessage = mostRecentCommit.commit.message
                    const commitAuthor = mostRecentCommit.author.login
                    const commitUrl = mostRecentCommit.html_url
                    const commitDateString = mostRecentCommit.commit.author.date
                    const commitDate = Date.parse(commitDateString)
                    const commitTimeSince = timeSince(commitDate)
                    repo.innerHTML += `
                    <div>
                        <p>${data.length} commits</p>
                        <p>latest: <a href=${commitUrl}>${commitMessage}</a> by ${commitAuthor} ${commitTimeSince}</p>
                    </div>
                `
                })
        })

    myPullRequests
        .map(pullRequest => pullRequest.review_comments_url)
        .forEach(reviewCommentUrl => {
            fetch(reviewCommentUrl + "?per_page=100", options)
                .then(res => res.json())
                .then(data => {
                    repo.innerHTML += `
                        <div class="comments">
                            <span>received ${data.length} comments</span>
                        </div>
                    `
                })
        })
}

function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}