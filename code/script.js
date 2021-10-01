const main = document.getElementById('projects')
const username = document.getElementById('username')
const profilepic = document.getElementById('profilepic')
const projectContainer = document.getElementById('projectscontainer')


//fetch github userinfo
const API_USER_KALIINE = 'https://api.github.com/users/kaliine'
fetch (API_USER_KALIINE)
    .then((response) => {
        return response.json()
    })
    .then ((json) => {
        username.innerHTML = json.login //display username
        profilepic.innerHTML += `<img width="150" src="https://avatars.githubusercontent.com/u/80845418?v=4" class="user-img" alt="profilepic" />` //display profile pic
    })



//fetch all repos
const REPOS_URL = 'https://api.github.com/users/Kaliine/repos'

const getRepos = () => {
fetch (REPOS_URL)
    .then((response) => response.json())
    .then(data => {
        //filter out the ones that are forked and starting with "project-"
        const technigoProjects = data.filter(repo => repo.fork === true && repo.name.startsWith('project-')) 
        
        
        //display the data in the browser  
        technigoProjects.forEach((repo => {
            projectContainer.innerHTML += `
            <div class="card">
            <a class="card-title" href=">${repo.html_url}">${repo.name}</a>
            <p class="card-info">Default branch: ${repo.default_branch}</p>
            <p class="card-info">Latest update: ${new Date(repo.pushed_at).toDateString()}</p>
            <p class="card-info" id="commit-${repo.name}">Number of commit messages: </p>
            </div>`
        }))

    //Call the drawChart function. Connect the two JS files with my number of technigo repos.
        drawChart(technigoProjects.length)

    //Call the fetchPullRequestArray function
    fetchPullRequestsArray(technigoProjects)


    })

}
//fetch pullRequest for each repository from Technigos main repositories
const fetchPullRequestsArray = (allRepositories) => {
    allRepositories.forEach(repo => {
        fetch(`https://api.github.com/repos/Technigo/${repo.name}/pulls?per_page=100`)
        .then((res) => res.json())
        .then((data) => {
            //Find only the PR that I made by comparing pull.user.login with repo.owner.login
        const myPullRequest = data.find((pull) => pull.user.login === repo.owner.login) //Use 'find' to present the data as an element instead of an array

        console.log(myPullRequest)

        // Detect if I have pull requests or not.
				// If yes - call fetchCommits function
				// If no - inform user that no pull request has been done yet
        if (myPullRequest) {
            fetchCommits(myPullRequest.commits_url, repo.name);
            
            //3. You can also get the comments for each PR by calling another function with the review_comments_url as argument
            /* getReview(myPullRequest.review_comments_url, repo.name); */

        } else {
            document.getElementById(`commit-${repo.name}`).innerHTML = "No pull request yet";
        }


        })
    })
}


//fetch number of commits
const fetchCommits = (myCommitsUrl, myRepoName) => {
    fetch(myCommitsUrl)
    .then((res) => res.json())
    .then((data) => {
        document.getElementById(`commit-${myRepoName}`).innerHTML += data.length
    })
}





//Call the getRepos function
getRepos()



  /* To do:
    - review_comments_url
    - A chart  */

 