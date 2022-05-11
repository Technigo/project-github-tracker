// DOM selectors
const userInfo = document.getElementById('user-info')
const projectBoard = document.getElementById('projects')

// Global variables
const username = 'tiiliu'

// Api for fetching github repos
const API_URL = `https://api.github.com/users/${username}/repos`

// Github token
const TOKEN = API_TOKEN

// Authorization
const options = {
    method: 'GET', 
    headers: {
        Authorization: `token ${TOKEN}`,
    } 
}


// Function for fetching all github projects
const getGithubProjects = () => {

//-------------------------------FETCH 1------------------------------------------------
    fetch(API_URL, options)
        .then(res => res.json())
        .then(data => {

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

    //storing the latest update for each repo
    let recentUpdate = new Date(repo.pushed_at).toLocaleDateString('en', {day: 'numeric', month: 'short', year: 'numeric'})

    // storing the default branch for each repo
    let defaultBranch = repo.default_branch

    // storing the link for each repo
    let linkToRepo = repo.html_url

    // Printing the info about projects
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

                // filtering own pull requests
                const ownPullRequests = data.filter(repo => repo.user.login === username)

                // filtering pull requests done by a team member
                const otherPullRequests = data.filter(item => item.user.login === 'kolkri' && item.base.repo.name === 'project-weather-app')

                // combining the created arrays
                const combinedPullRequests = ownPullRequests.concat(otherPullRequests)

                    // looping through own pull requests
                    combinedPullRequests.forEach(repo => {

                        // storing the reponame of each pull request
                        reponame = repo.base.repo.name

                        // storing the url for commits for each repo
                        const commitsForRepos = repo.commits_url

                        // Invoking the fetchCommits function
                        fetchCommits(commitsForRepos, reponame)

                        // storing the url for comments for each repo -> commented out because not used yet in code
                        //const commentsForRepos = repo.comments_url

                        // storing the pull request number for each repo
                        const pullRequestNumber = repo.number

                        // Invoking the fetchComments function
                        fetchComments(pullRequestNumber, reponame)

                        // storing the url for languages
                        const usedLanguages = repo.base.repo.languages_url

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

        // storing the number of commits
        const numberOfCommits = data.length

        // printing info to the projectBoard with dynamic id
        document.getElementById(`commit-${reponame}`).innerHTML += `
        <p>Amount of commits: ${numberOfCommits}</p>
        `
            // looping through data for commit messages
            data.forEach(item => {
            // storing the commit message from each 
                const commitMessages = item.commit.message
                    
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

        // storing the review message -> commented out because not used yet in the code
        //const reviewMessage = data[0].body

        })    
        .catch(err => console.error(err))
}

// Function for fetching the languages used in projects
const getLanguages = (usedLanguages, reponame) => {
    fetch(usedLanguages, options)
        .then(res => res.json())
        .then(data => {

            // storing the info about used languages
            const languages = Object.keys(data)
        
        })
}

// Invoking the getGithubProjects function
getGithubProjects()