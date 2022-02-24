


//global variables
const username = 'kolkri'
//Endpoint to get all your repos:
const API_URL = `https://api.github.com/users/${username}/repos`


//defining token
console.log(API_TOKEN)

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
        console.log(data)
        //using the fetch data for userdata function
        userData(data)
        //filter out and only show the forked ones
        let forkedOnes = data.filter(element => element.fork === true)
        console.log('Forked ones:', forkedOnes)
        //filter out only the forks from Technigo.
        let technigoForks = forkedOnes.filter(element => element.name.startsWith('project'))
        console.log('Technigo projects:', technigoForks)

        //here invoking the getPullRequests function technigoForks as an argument
        getPullRequests(technigoForks)
    })


//Remember to pass along your filtered repos as an argument when
//you are calling this function

const getPullRequests = (repos) => {
    //Get all the PRs for each project.
    repos.forEach(repo => {
      fetch('https://api.github.com/repos/technigo/' + repo.name + '/pulls?per_page=100', options)
      .then(res => res.json())
      .then(data => {
                 //1. Find only the PR that you made by comparing pull.user.login to your own username
                let myPullRequests = data.filter(element => element.user.login === username)
                console.log('my pull requests:', myPullRequests)
            
                //2. Now you're able to get the commits for each repo by using the commits_url as an argument to call another function
                let commitsURL = myPullRequests[0].commits_url
                console.log('commits URL:',commitsURL)
                myCommits(commitsURL)

                //3. You can also get the comments for each PR by calling another function with the review_comments_url as argument
                let reviewCommentsURL = myPullRequests[0].review_comments_url
                console.log('review comments URL:', reviewCommentsURL)
                reviewComments(reviewCommentsURL)
            
                //just testing
                let pushedDate = repo.pushed_at
                console.log('pushed date:', pushedDate)
                

                //showing results on the page with innerHTML
                document.getElementById('projects').innerHTML += `
                <div class="project-card">
                    <h3>${repo.name}</h3>
                    <p>Most recent update: ${new Date(repo.pushed_at).toLocaleDateString('en-GB', options)}</p>
                    <p>Default branch name: ${repo.default_branch}</p>
                    <p>URL: ${repo.html_url}</p>
                    <button class="reviewCommentsBTN">Review comments (if any)</button>
                    <p></p>
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
  const reviewComments = (url) => {
      fetch(url, options)
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                console.log('review comments:', element.body)
            })
            
        })
        
  }


 // to get the commits for each repo
 const myCommits = (url) => {
    fetch(url, options)
    .then(res => res.json())
    .then(data => {
        data.forEach(element => {
            console.log('my commits:',element.commit.message)
            return element.body
        })
        
    })

 }