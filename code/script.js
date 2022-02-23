// Fetching API from Github to add       X
// A list of all repos that are forked ones from Technigo
// Your username and profile picture
// Most recent update (push) for each repo      X
// Name of your default branch for each repo X
// URL to actual GitHub repo
// Number of commit messages for each repo
// All pull requests
// A chart of how many project you've done so far, compared with how many you will do using chart.js.


// DOM selectors
const userInfo = document.getElementById('userInfo')

// Github API and token
const username = 'emmajosefina'
const API_URL = `https://api.github.com/users/${username}/repos`

const options = {
    method: 'GET',
    headers: {
        Authorization: `token ${API_TOKEN}`
    }
}

//fetching all repos from user
const findingAllRepos = (user) => { 
    fetch(API_URL, options) 
       .then((res) => res.json()) 
       .then((data) => { 
        console.log(data) 
        data.forEach((repo) => 
        userInfo.innerHTML += 
        
        `
        <div class="projectContainer">
            <p>
                <span class="styledHeadingsProject">
                Name of repository: </span>
                ${repo.name}
            </p>
            <p>
                <span class="styledHeadingsProject">
                Latest push: </span>
                ${repo.pushed_at}
            </p>
            <p>
                <span class="styledHeadingsProject">
                Default branch: </span>
                ${repo.default_branch}
            </p>
            <p>
            <span class="styledHeadingsProject">
            URL: </span>
            ${repo.topics.url}
        </p>

        </div>

        `)
       
       })
}
findingAllRepos()
