const repoContainer = document.getElementById('projects')
const projectInfo = document.getElementById('profile-info')

const USER = 'Skrosen'
const USER_INFO = `https://api.github.com/users/${USER}`
const USER_REPOS = `https://api.github.com/users/${USER}/repos`

const profileInfo = () => {
    fetch(USER_INFO)
    .then(res => res.json())
    .then(userProfile => {
        // console.log('profilinfo:', userProfile)
        projectInfo.innerHTML += /* html */`
        <div class="profile-div">
            <img src="${userProfile.avatar_url}" class="profile-img" alt="Profile picture"/>
            <h3>${userProfile.name}</h3><br>
            <p>${userProfile.login}</p>
        </div>
        `
    })
}
profileInfo()

const getRepos = () => {
    fetch(USER_REPOS)
    .then(res => res.json())
    .then(repos => {
        // console.log('repositories:', repos)

        const forkedRepos = repos.filter (repo => repo.fork && repo.name.startsWith('project-')) 
        // can use .includes instead of startsWith
        // repo.fork är samma som repo.fork === true
        forkedRepos.forEach(repo => console.log(repo.name))
        forkedRepos.forEach(repo => {repoContainer.innerHTML += /* html */ `
        <div class="repo-div">
        <p><a href="${repo.html_url}">${repo.name}</a> (default branch ${repo.default_branch})</p>
        <p>Most recent push: ${new Date(repo.pushed_at).toDateString()}</p>
        <p id="commit-${repo.name}">Number of commits: </p>
        </div>
        `
     })
        fetchPullRequest(forkedRepos)
        repoChart(forkedRepos.length)
    })
}

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
                document.getElementById(`commit-${repo.name}`).innerHTML =
                    'No commits yet :('
            }
        })
    })
}

const fetchCommits = (myCommitsUrl, repo) => {
    fetch(myCommitsUrl)
    .then(res => res.json())
    .then((info) => {
        document.getElementById(`commit-${repo}`).innerHTML += info.length
    })
}
getRepos()

// To get the comments from a PR, you need to get the URL from the review_comments_url property in the PR json object.
// It might look something like this: https://api.github.com/repos/Technigo/project-news-site/pulls/247/comments 
// and then do a fetch with that url.

// To get the commits from a PR, you need to get the URL  from the commits_url property in the PR json object. It might look something like this:
// https://api.github.com/repos/Technigo/project-news-site/pulls/227/commits
// and then do a fetch with that url.



// ### **🔵  Blue Level (Minimum Requirements)**

// Your page should include:

// - A list of all repos that are forked from Technigo
// - Your username and profile picture
// - Most recent update (push) for each repo
// - Name of your default branch for each repo
// - URL to the actual GitHub repo
// - Number of commits for each repo
// - It should be responsive (mobile first)
// - A visualisation, for example through a pie chart, of how many projects you've done so far, compared to how many you will do 
// (in total it will be 19 weekly projects 🥳) using [Chart.js](https://www.chartjs.org/).

// ### **🔴  Red Level (Intermediary Goals)**

// - Sort your list in different ways.
// **Example of what you can sort by:** creation date, name, most commits, followers or stargazers
// - Create the opportunity to filter the repos based on a condition, e.g. only JavaScript repos
// - Display the actual commit messages for each repo in a good way. Maybe by adding a modal (popup) or an accordion?
// - Display the comments you got from each pull request
// - When you're browsing through the repo object, you'll see that there's a lot of data that we can use. Create a chart over some of the data.
// **Example of data to use:** Repo size, people that starred your repo (stargazers) or amount of commits on each repo.

// ### **⚫  Black Level (Advanced Goals)**

// - Implement a search field to find a specific repo based on name