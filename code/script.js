// Fetching API from Github to add
// A list of all repos that are forked ones from Technigo
// Your username and profile picture
// Most recent update (push) for each repo
// Name of your default branch for each repo
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
        userInfo.innerHTML += `<p>${repo.name}</p>`)
       
       })
}
findingAllRepos()
