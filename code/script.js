/*
### What to include
- A list of all repos that are forked ones from Technigo X
- Your username and profile picture X
- Most recent update (push) for each repo X
- Name of your default branch for each repo X
- URL to the actual GitHub repo X
- Number of commit messages for each repo X
- All pull requests X
- A chart of how many projects you've done so far, compared to how many you will do using [Chart.js](https://www.chartjs.org/).
[Here](https://www.chartjs.org/docs/latest/getting-started/)'s documentation on how to get started,
and in the left menu you can also find [example usage](https://www.chartjs.org/docs/latest/getting-started/usage.html).
*/

// DOM selectors
const userInfo = document.getElementById('user-info')
const projectBoard = document.getElementById('projects')

// global variables
const username = 'tiiliu'

// Api for fetching github repos
const API_URL = `https://api.github.com/users/${username}/repos`

// github token
const API_TOKEN = TOKEN
//console.log(TOKEN)

// Authorization..What is this called??
const options = {
    method: 'GET', 
    headers: {
        Authorization: `token ${API_TOKEN}`,
    } 
}


// Function to fetch all github projects
const getGithubProjects = () => {
//-------------------------------FETCH 1------------------------------------------------
    fetch(API_URL, options)
        .then(res => res.json())
        .then(data => {
        //console.log('repo data', data)

            // Invoking the createUser and getTechnigoRepos functions
            createUser(data)
            getTechnigoRepos(data)
        })
        .catch(err => console.error(err))
}

// Function to display info from user
const createUser = (data) => {
    userInfo.innerHTML = `
        <p><img class='user-image' src='${data[0].owner.avatar_url}' alt='profile picture from Github'/></p>
        <h1 class='full-name'>Tiina Liukkonen</h1>
        <h3 class='github-user-name'><a class='nav-item' href='https://github.com/tiiliu' target="-blank"><i class="fab fa-github"></i>  ${data[0].owner.login}</a></h3>
        <h1 class='course-name'>Technigo Web Development Class of Jan '22 student</h1>
        `
}

// Function to filter out all repos forked from Technigo
const getTechnigoRepos = (data) => {
// console.log('testy testyyyy')
    
    // variable to store the filtered repos
    const forkedProjects = data.filter(repo => repo.name.includes('project-'))
    console.log('forked projects:', forkedProjects)

    // Invoking the drawChart function
    drawChart(forkedProjects.length)

    // Looping through the filtered repos
    forkedProjects.forEach(repo => {

    // storing reponame for each repo
    let reponame = repo.name
    reponame = reponame[0].toUpperCase() + reponame.substring(1)
    //console.log('reponame', reponame)

    //storing the latest update for each repo
    let recentUpdate = new Date(repo.pushed_at).toLocaleDateString('en', {day: 'numeric', month: 'short', year: 'numeric'})
    //console.log(recentUpdate)

    // storing the default branch for each repo
    let defaultBranch = repo.default_branch
    //console.log(defaultBranch)

    // storing the link for each repo
    let linkToRepo = repo.html_url
    //console.log(linkToRepo)

    projectBoard.innerHTML += `
    <div class='repo-container'>
        <h2 class='repo-title'>${reponame}</h2>
        <p>Default branch: ${defaultBranch}</p>
        <p id='commit-${repo.name}'></p>
        <p>Most recent push: ${recentUpdate}</p>
        <button class='repo-link-button'><a class='nav-item' href='${repo.html_url}' target="-blank">Click here to view repo</a></button>
    `
    
//-------------------------------FETCH 2------------------------------------------------
        fetch(`https://api.github.com/repos/Technigo/${reponame}/pulls?per_page=100`, options)
            .then(res => res.json())
            .then(data => {
            //console.log('data from pull requests', data)

                // filtering for my own pull requests
                const ownPullRequests = data.filter(repo => repo.user.login === username)
                //console.log('own pull requests', ownPullRequests)

                const otherPullRequests = data.filter(item => item.user.login === 'kolkri' && item.base.repo.name === 'project-weather-app')
                //console.log('commits done by others:', otherPullRequests)

                const combinedPullRequests = ownPullRequests.concat(otherPullRequests)
                //console.log('combined arrays:',combinedPullRequests )

                    // looping through own pull requests
                    combinedPullRequests.forEach(repo => {

                        // storing the reponame of each pull request
                        reponame = repo.base.repo.name

                        // storing the url for commits for each repo
                        const commitsForRepos = repo.commits_url
                        // console.log('commits url:', commitsForRepos)

                        // Invoking the fetchCommits function
                        fetchCommits(commitsForRepos, reponame)

                        // storing the url for comments for each repo
                        //const commentsForRepos = repo.comments_url
                        //console.log('comments', commentsForRepos)

                        // storing the pull request number for each repo
                        const pullRequestNumber = repo.number
                        //console.log('number of the pull request:', pullRequestNumber)

                        // Invoking the fetchComments function
                        fetchComments(pullRequestNumber, reponame)

                          // storing the url for languages
                    const usedLanguages = repo.base.repo.languages_url
                    //console.log('languages url:', usedLanguages)

                    // Invoking the getLanguages function
                    getLanguages(usedLanguages, reponame)

                    })
            })
    })
}
                        
// Function for fetching the commits for all repos
const fetchCommits = (commitsForRepos, reponame) => {

//-------------------------------FETCH 3------------------------------------------------
    fetch(commitsForRepos, options)
        .then(res => res.json())
        .then(data => {
        //console.log('data from commits', data)

        // storing the number of commits
        const numberOfCommits = data.length
        //console.log('number of commits:', numberOfCommits)

        document.getElementById(`commit-${reponame}`).innerHTML += `
        <p>Amount of commits: ${numberOfCommits}</p>
        `

            data.forEach(item => {
            // storing the commit message from each 
                const commitMessages = item.commit.message
                //console.log('commit message:', commitMessages)


            //     item.author.login === username
                    
            })     
        })
        .catch(err => console.error(err))
}

// Function for fetching the comments for each pull request
const fetchComments = (pullRequestNumber, reponame) => {

//-------------------------------FETCH 4------------------------------------------------
    fetch(`https://api.github.com/repos/Technigo/${reponame}/issues/${pullRequestNumber}/comments`, options)
        .then(res => res.json())
        .then(data => {
        //console.log('data from comments url', data)

        // storing the review message
        //const reviewMessage = data[0].body
        //console.log('review message:', reviewMessage)

        })    
        .catch(err => console.error(err))
}

const getLanguages = (usedLanguages, reponame) => {
    fetch(usedLanguages, options)
        .then(res => res.json())
        .then(data => {
            //console.log('data from languages', data)

            const languages = Object.keys(data)
            //console.log(languages)
        
        })
}

getGithubProjects()