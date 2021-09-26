const main = document.getElementById('projects')
const username = document.getElementById('username')
const profilepic = document.getElementById('profilepic')
const repolist = document.getElementById('repolist')

//main fetch github user
const API_user_kaliine = 'https://api.github.com/users/kaliine'
fetch (API_user_kaliine)
    .then((response) => {
        return response.json()
    })
    .then ((json) => {
        username.innerHTML = json.login //fetching username
        profilepic.innerHTML += `<img width="150" src="https://avatars.githubusercontent.com/u/80845418?v=4" alt="profilepic" />` //fetching profile pic
        console.log(json)
    })



//fetching all repos
const repos = 'https://api.github.com/users/Kaliine/repos'
fetch (repos)
    .then((response) => {
        return response.json()
    })
    .then ((json) => {
        json.forEach((reponames) => {
            repolist.innerHTML += `<p> Project name: ${reponames.name}</p>`
        })
    })

/* 
//fetching all pull requests
const getPullRequests = (repo) => {
    //Get all the PRs for each project
    repos.forEach(repo => {
        fetch('https://api.github.com/repos/technigo/${reponame}/pulls')
        .then(res => res.json())
        .then(data =>) {
        //TODO
	    //1. Find only the PR that you made by comparing pull.user.login
			// with either USER or repo.owner.login
			//2. Now you're able to get the commits for each repo by using
			// the commits_url as an argument to call another function
			//3. You can also get the comments for each PR by calling
			// another function with the review_comments_url as argument
        })
    })
}
 */


    /* To do:
    - most recent update (push) for each repo
    - Name of your default branch for each repo
    - URL to the actual GitHub repo
    - Number of commit messages for each repo
    - All pull requests
    - A chart */

 