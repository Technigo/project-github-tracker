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
const projectBoard = document.getElementById('project-board')

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

// Fetching all Github projects
const getGithubProjects = () => {

    fetch(API_URL, options)
        .then(res => res.json())
        .then(data => {
        //console.log('repo data', data)

            // Invoking the createUser and getTechnigoRepos functions
            createUser(data)
            getTechnigoRepos(data)

        })
}


// Function to display info from user
const createUser = (data) => {
    userInfo.innerHTML += `
        <img class='user-image' src='${data[0].owner.avatar_url}'>
        <h2 class='full-name'>Tiina Liukkonen</h2>
        <h4 class='github-user-name'>Github username: ${data[0].owner.login}</h4>
        `
}
        
// Function to filter out all repos forked from Technigo
const getTechnigoRepos = (data) => {
// console.log('testy testyyyy')

    // variable to store the filtered repos
    const forkedProjects = data.filter(repo => repo.name.includes('project-'))
        //console.log('forked projects', forkedProjects)

    // Looping through the filtered repos
    forkedProjects.forEach(repo => {

    // storing reponame for each repo
    let reponame = repo.name
    reponame = reponame[0].toUpperCase() + reponame.substring(1)
    //console.log('reponame', reponame)

    //storing the latest update for each repo
    let recentUpdate = new Date(repo.pushed_at).toLocaleDateString()
    //console.log(recentUpdate)

    // storing the default branch for each repo
    let defaultBranch = repo.default_branch
    //console.log(defaultBranch)

    // storing the link for each repo
    let linkToRepo = repo.html_url
    //console.log(linkToRepo)

    projectBoard.innerHTML += `
    <div class='repo-container'>
        <h3 class='repo-title'>${reponame}</h3>
        <p>Default branch: ${defaultBranch}</p>
        <p>Number of commits: </p>
        <p>Recent push: ${recentUpdate}</p>
    `
    

        // Fetching the Technigo pull requests
        fetch(`https://api.github.com/repos/Technigo/${reponame}/pulls?per_page=100`, options)
            .then(res => res.json())
            .then(data => {
            //console.log('data from pull requests', data)

                // filtering for my own pull requests
                const ownPullRequests = data.filter(repo => repo.user.login === username)
                console.log('own pull requests', ownPullRequests)

                    // looping through my own pull requests
                    ownPullRequests.forEach(repo => {

                        // storing the reponame of each pull request
                        reponame = repo.base.repo.name

                        // storing the url for commits for each repo
                        const commitsForRepos = repo.commits_url
                        //console.log('commits', commitsForRepos)

                        // Invoking the fetchCommits function
                        fetchCommits(commitsForRepos, reponame)

                        // storing the url for comments for each repo
                        const commentsForRepos = repo.comments_url
                        //console.log('comments', commentsForRepos)

                        // storing the pull request number for each repo
                        const pullRequestNumber = repo.number
                        //console.log('getting the number of the pull request', pullRequestNumber)

                        // Invoking the fetchComments function
                        fetchComments(commentsForRepos, pullRequestNumber, reponame)


                    })
            })
    })

}
                        
// Function for fetching the commits for all repos
const fetchCommits = (commitsForRepos, reponame) => {
    fetch(commitsForRepos, options)
        .then(res => res.json())
        .then(data => {
        console.log('data from commits', data)

            const ownCommits = data.filter(item => item.author.login === username)
            //console.log('own comments:', ownCommits)

            // storing the number of commits
            const numberOfCommits = data.length
            //console.log('how many commits?', numberOfCommits)

                // looping through each commit
                ownCommits.forEach(commit => {
                //console.log('test', commit)

                                
                    // storing the commit message from each 
                    const commitMessages = commit.commit.message
                    //console.log('the message:', commitMessages)
            
                })
                                        
                        // const commitMessages = data.commit.message
                        // console.log('messages', commitMessages)

        })
                    
}

// Function for fetching the comments for each pull request
const fetchComments = (commentsForRepos, pullRequestNumber, reponame) => {
    fetch(`https://api.github.com/repos/Technigo/${reponame}/issues/${pullRequestNumber}/comments`, options)
        .then(res => res.json())
        .then(data => {
        
        //console.log('data from comments url', data)
        //console.log('pleaseee work', data[0].body)
        })
                    
                
}

getGithubProjects()