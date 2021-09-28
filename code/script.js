const main = document.getElementById('projects')
const username = document.getElementById('username')
const profilepic = document.getElementById('profilepic')
const projectContainer = document.getElementById('projectscontainer')


//main fetch github userinfo
const API_USER_KALIINE = 'https://api.github.com/users/kaliine'
fetch (API_USER_KALIINE)
    .then((response) => {
        return response.json()
    })
    .then ((json) => {
        username.innerHTML = json.login //fetching username
        profilepic.innerHTML += `<img width="150" src="https://avatars.githubusercontent.com/u/80845418?v=4" alt="profilepic" />` //fetching profile pic
        console.log(json)
    })



//fetching all repos
const REPOS_URL = 'https://api.github.com/users/Kaliine/repos'

const getRepos = () => {
fetch (REPOS_URL)
    .then((response) => response.json())
    .then(data => {
        console.log(data)
        //filter out the ones that are forked and starting with "project-"
        const technigoProjects = data.filter(repo => repo.fork === true && repo.name.startsWith('project-')) 
        technigoProjects.forEach(repo => 
             
        //Code to display it in the browser        
        projectContainer.innerHTML += `
        <h3>${repo.name}</h3>
        <p>Most recent update (push): ${repo.pushed_at}</p>
        <p>Default branch: ${repo.default_branch}</p>
        <p>GitHub link: ${repo.html_url}</p>`)
            

    getCommits(technigoProjects)
    getPushBranchURL(technigoProjects)

    })
}


const getPushBranchURL = (filteredArray) => {
	//getting the most recent update (push) for each repo
	console.log('Latest push:')
	filteredArray.forEach(repo => {
		console.log(repo.pushed_at)  
	})

	//getting the name of default branch for each repo
	console.log('Default branch:')
	filteredArray.forEach(repo => {
		console.log(repo.default_branch)
	});	

	//getting the link to the actual GitHub repo
	console.log('GitHub link:')
	filteredArray.forEach(repo => {
		console.log(repo.html_url)
	});		
}

const getCommits = (url) => {
    console.log(url)
        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const numberOfCommits = data.length
            projectContainer.innerHTML += `<p>Number of commits ${numberOfCommits}</p>`
            console.log(data.length)
        })
}

//Call the getRepos function
getRepos()




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
    - format date, pushes

    - All pull requests
    - A chart */

 