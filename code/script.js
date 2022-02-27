


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
    //invoking the function drawChart using the amount of projects as an argument
    drawChart(repos.length)
    
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
            
                //fecthing languages
                let languagesURL = repo.languages_url
                languages(languagesURL, repo.name)

                //date for first git push
                console.log('repo:',repo)

                //showing results on the page with innerHTML
                document.getElementById('projects').innerHTML += `
                <div class="project-card">
                        <div class="flexCont"><img src="./assets/githubLogo.svg" alt="GitHub Logo"><h3>${repo.name}</h3></div>
                        <p><span class="boldText">Latest update:</span> ${new Date(repo.pushed_at).toLocaleDateString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'})}</p>
                        <p><span class="boldText">Default branch:</span> ${repo.default_branch}</p>
                        <p id="lang-${repo.name}"><span class="boldText">Languages:</span></p>
                        <p>View project in <a href="${repo.html_url}" target="_blank">GitHub</a></p>
                        <button id="accordionButton" class="accordionButton">Commits and reviews <img src="./assets/comment.svg"></button>
                        <div id=${repo.name} class="comments"></div>
                </div>
                `
                //here i made the accordion for commits messages and reviews:
                let acc = document.getElementsByClassName("accordionButton");

                for (let i = 0; i < acc.length; i++) {
                acc[i].addEventListener("click", function() {
                    this.classList.toggle("active");
                    var comments = this.nextElementSibling;
                    if (comments.style.display === "block") {
                    comments.style.display = "none";
                    } else {
                    comments.style.display = "block";
                    }
                });
                }               
        })
    })
    
  }

  

  //Userdata function (profile pic etc)
  const userData = (data) => {
      //showing the profile pic
      document.getElementById('profile-pic').innerHTML = `
      <img class="profile-pic" src='${data[0].owner.avatar_url}' alt='image of kolkri at GitHub'>
      `
      //showing the username
      document.getElementById('username').innerHTML = `
      <img class="smallLogo" src="./assets/githubLogo.svg" alt="GitHub Logo"><a href="https://github.com/kolkri"><h2 class="whiteColor">${data[0].owner.login}</h2></a>
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
                <p>Number of commits: ${data.length}</p>
                `
        data.forEach(element => {
            document.getElementById(repoName).innerHTML += `
                <li> ${element.commit.message}</li>
                `
    })

 })

}

//language function to show what languages used in each project
const languages = (url, repoName) => {
    fetch(url, options)
    .then(res => res.json())
    .then(data => {
        Object.keys(data).forEach(key => {
            document.getElementById(`lang-${repoName}`).innerHTML += `
                <span class="languagebox">${key}</span> 
                `
        });
    })
}


