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
// const GITHUB_API = `https://api.github.com/users/${user}`
const API_URL = `https://api.github.com/users/${username}/repos`


//fetching all repos from user
const findingAllRepos = (user) => { // creating function about github repos
    fetch(API_URL) // fetching right API
       .then((res) => res.json()) // response to response.json
       .then((data) => { // data
        console.log(data) // console log
        data.forEach((repo) => // using forEach of repo
        userInfo.innerHTML += `<p>${repo.name}</p>`) // fetching data to userInfo in HTML
       
       })
}
findingAllRepos() // invoking funcion
