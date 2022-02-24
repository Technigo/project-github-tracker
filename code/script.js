


//global variables
const username = 'kolkri'
//Endpoint to get all your repos:
const API_URL = `https://api.github.com/users/${username}/repos`



//defining options
const options = {
    method: 'GET',
    headers: {
        Authorization: `token ${API_TOKEN}`
    }
}

//fetch all of your repos and log them to the console
fetch(API_URL, options)
    .then(res => res.json())
    .then(data => {
        //using the fetched data for userdata function
        userData(data)
        //filter out and only show the forked ones
        let forkedOnes = data.filter(element => element.fork === true)
        //filter out only the forks from Technigo.
        let technigoForks = forkedOnes.filter(element => element.name.startsWith('project'))

        //here invoking the getPullRequests function technigoForks as an argument
        getPullRequests(technigoForks)
    })


//Remember to pass along your filtered repos as an argument when you are calling getPullRequests function

const getPullRequests = (repos) => {
    //Get all the PRs for each project.
    repos.forEach(repo => {
      fetch('https://api.github.com/repos/technigo/' + repo.name + '/pulls?per_page=100', options)
      .then(res => res.json())
      .then(data => {
                 //1. Find only the PR that you made by comparing pull.user.login to your own username
                let myPullRequests = data.filter(element => element.user.login === username)
               
            
                //2. Now you're able to get the commits for each repo by using the commits_url as an argument to call another function
                let commitsURL = myPullRequests[0].commits_url
                myCommits(commitsURL, repo.name)

                //3. You can also get the comments for each PR by calling another function with the review_comments_url as argument
                 let reviewCommentsURL = myPullRequests[0].review_comments_url
                 reviewComments(reviewCommentsURL, repo.name)
            
                //just testing
                let pushedDate = repo.pushed_at

                //showing results on the page with innerHTML
                document.getElementById('projects').innerHTML += `
                <div class="project-card">
                    <h3>${repo.name}</h3>
                    <p>Most recent update: ${new Date(repo.pushed_at).toLocaleDateString('en-GB', options)}</p>
                    <p>Default branch name: ${repo.default_branch}</p>
                    <p>URL: ${repo.html_url}</p>
                    <button id=commitsButton class="commitsButton">Show commits and comments</button>
                    <div id=${repo.name}>
                    </div>
                </div>
                `
        })
    })
  }

  const commits = (url) => {

  }

  //Userdata function (profile pic etc)
  const userData = (data) => {
      //showing the profile pic
      document.getElementById('profile-pic').innerHTML = `
      <img class="profile-pic" src='${data[0].owner.avatar_url}' alt='image of kolkri at GitHub'>
      `
      //showing the username
      document.getElementById('username').innerHTML = `
      Username: ${data[0].owner.login}
      `
  }


  //to get the comments from a PR
   const reviewComments = (url, repoName) => {
       fetch(url, options)
         .then(res => res.json())
         .then(data => {
            if(data.length > 0){
            document.getElementById(repoName).innerHTML += `
            <h3>Review comments:</h3>
            `
             data.forEach(element => {
                 document.getElementById(repoName).innerHTML += `
                 <li>${element.body}</li>
                 `
             })
            }
         })
        
   }


 // to get the commits for each repo
 const myCommits = (url, repoName) => {
    fetch(url, options)
    .then(res => res.json())
    .then(data => {
        document.getElementById(repoName).innerHTML += `
                <h3>My commits:</h3>
                `
        data.forEach(element => {
            document.getElementById(repoName).innerHTML += `
                <li> ${element.commit.message}</li>
                `
    })

 })

}
 

