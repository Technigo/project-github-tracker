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

// Github API
const username = 'emmajosefina'
const GITHUB_API = `https://api.github.com/users/${user}`
const GITHUB_API_REPOS = `https://api.github.com/users/${username}/repos`

//fetching all repos from user
const fetchRepos = (user) => {
    fetch(GITHUB_API)
        .then((response => response.json())
        .then((data) => {
        userInfo.innerHTML = `
        <p>Loading info....</p>
        ` 
        if (data.login !== undefined) {
        userInfo.innerHTML = `
        <div class="user-profile-box">
        <div class="user-info-box">
        ` 
        } else {
        userInfo.innerHTML = `
        <p class="error-message">Fail to load. Come back later.</p>` 
        }

    }))

}
fetchRepos()



// window.onload = showProfileOnLoad

// // display profile info as default upon loading website
// showProfileOnLoad = () => {
//     let username = 'emmajosefina'
//     getUserData(username)
//     fetchRepos(username)
// }