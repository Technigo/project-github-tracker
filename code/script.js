const username = 'faypi'
const API_URL = `https://api.github.com/users/${username}/repos`
const API_USER_PROFILE = `https://api.github.com/users/${username}`
// const API_TOKEN = TOKEN || process.env.API_KEY;
const options = {
    method: 'GET',
    headers: {
        Authorization: `token ${API_TOKEN} ` // you need to paste your token over here.
    }
}

fetch(API_USER_PROFILE, options)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const name = data.name
        const profilePic = data.avatar_url
        // const memberSince = data.created_at
        const followers = data.followers
        const following = data.following

    }
    )


fetch(API_URL, options) // options object is passed as 2nd argument to fetch() function.
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        const myRepos = data.filter((forkedRepos) => forkedRepos.fork == true && forkedRepos.name.startsWith("project-"))
        getPullRequests(myRepos)
    });

//Remember to pass along your filtered repos as an argument when
//you are calling this function

const getPullRequests = (repos) => {
    //Get all the PRs for each project.
    repos.forEach(repo => {
        fetch('https://api.github.com/repos/technigo/' + repo.name + '/pulls' + '?per_page=100')
            .then(res => res.json())
            .then(data => {

                // console.log(`repo default branch ${repo.default_branch}`)
                const repoBranchName = repo.default_branch
                const repoName = repo.full_name
                const repoUrl = repo.url
                // console.log()
                //TODO
                //1. Find only the PR that you made by comparing pull.user.login
                // with repo.owner.login
                // console.log(data);
                const myPullRequests = data.filter((myPR) => myPR.user.login == repo.owner.login);
                // console.log('this is my pRs')
                console.log(`pull requests for ${repoName}`);
                // console.log(myPullRequests);
                myPullRequests.forEach(pullRequest => {

                    const prTitle = pullRequest.title
                    const prUrl = pullRequest.url

                    console.log(prTitle)
                    console.log(prUrl)
                })
                // return myPullRequests
                const myCommits = myPullRequests.map((mycomm) => mycomm.commits_url)
                // getCommits(COMMITS)
                // console.log("my commits")
                // console.log(myCommits)
                // getCommits(myCommits)
                //2. Now you're able to get the commits for each repo by using
                // the commits_url as an argument to call another function
                //3. You can also get the comments for each PR by calling
                // another function with the review_comments_url as argument
                const comments = myPullRequests.map((comment) => comment.review_comments_url)
                // console.log(comments)
            })
    })

}



const getCommits = (commitUrls) => {
    //Get all the PRs for each project.
    commitUrls.forEach(commitUrl => {
        fetch(commitUrl + "?per_page=100")
            .then(res => res.json())
            .then(data => {
                console.log('commit new')
                console.log(data.length)
                const mostRecentCommit = data[data.length - 1]
                console.log(mostRecentCommit)
                const commitMessage = mostRecentCommit.commit.message
                console.log(mostRecentCommit.commit.message)
                const commitAuthor = mostRecentCommit.author.login
                const commitUrl = mostRecentCommit.html_url
                const commitDateString = mostRecentCommit.commit.author.date
                console.log(commitDateString)
                const commitDate = Date.parse(commitDateString)
                console.log(commitDate)
                const commitTimeSince = timeSince(commitDate)
                console.log(commitTimeSince)




            })
    })
}

// getCommits(myPullRequests)
// const getCommits = myPullRequests.map((mycomm) =>mycomm.commits_url)
// console.log('this is my commits')
// console.log(getCommits);
// return getCommits

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